import { createContext, ReactNode, useEffect, useState } from "react";
import axios from "axios";

interface User {
  username: string | null;
  roles: string[] | null;
}

// Create context
export const AuthContext = createContext<{
  authState: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (
    username: string,
    password: string,
    roles: string[]
  ) => Promise<void>;
  isLording: boolean;
  setIsLording: any;
}>(null!);

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<User | null>(null);
  const [isLording, setIsLording] = useState(true);

  useEffect(() => {
    if (!authState) {
      setIsLording(true);
      console.log("user start", authState);

      axios
        .get("http://localhost:8080/api/auth/user", { withCredentials: true })
        .then(({ data }) => {
          const { username, roles } = data;
          setAuthState({ username, roles });
          console.log("User fetched successfully:", username);
        })
        .catch((error) => {
          console.error(
            "Error fetching user data:",
            error.response?.data || error.message
          );
        })
        .finally(() => {
          setIsLording(false);
        });
    }
  }, [authState]);

  // Login function
  const login = async (name: string, password: string) => {
    try {
      setIsLording(true);
      const response = await axios.post(
        "http://localhost:8080/api/auth/signin",
        {
          username: name,
          password,
        },
        {
          withCredentials: true,
        }
      );

      const { username, roles } = response.data;

      setAuthState({ username, roles });
    } catch (error: any) {
      console.error("Login failed", error);
      throw error.response?.data?.message || "Invalid credentials";
    } finally {
      setIsLording(false);
      console.log("finally", authState?.username);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLording(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signout",
        {},
        { withCredentials: true }
      );

      console.log("logout", response.data);
      setAuthState(null);
    } catch (error: any) {
      console.error("Logout failed", error);
      throw error.response?.data?.error || "Logout error";
    } finally {
      setIsLording(false);
    }
  };

  // Signup function
  const signup = async (
    username: string,
    password: string,
    roles: string[]
  ) => {
    try {
      await axios.post("http://localhost:8080/api/auth/signup", {
        username,
        password,
        roles,
      });
    } catch (error: any) {
      console.error("Signup failed", error);
      throw error.response?.data?.message || "Signup error";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        signup,
        isLording,
        authState,
        setIsLording,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
