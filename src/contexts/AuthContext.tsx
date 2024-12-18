import {
  createContext,
  useReducer,
  ReactNode,
  useEffect,
  useState,
} from "react";
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

  // Rehydrate authentication state from localStorage on app load
  useEffect(() => {
    if (!authState) {
      setIsLording(true);
      console.log("user start", authState);
      const storedAuthState = localStorage.getItem("authState");

      if (storedAuthState) {
        console.log("local storage", JSON.parse(storedAuthState));

        setAuthState(JSON.parse(storedAuthState));
      }

      // axios
      //   .get("http://localhost:8080/api/auth/user")
      //   .then(({ data }) => {
      //     const { username, roles } = data;
      //     dispatch({
      //       type: "LOGIN_SUCCESS",
      //       payload: {
      //         user: { username, roles },
      //         isAuthenticated: true,
      //       },
      //     });
      //     console.log("user end", state.user);
      //   })
      //   .catch((error: any) => {
      //     console.log(error.response.data);
      //   });
      setIsLording(false);
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
      localStorage.setItem("authState", JSON.stringify({ username, roles }));

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
        "http://localhost:8080/api/auth/signout"
      );

      console.log("logout", response.data);
      localStorage.removeItem("authState");
      // dispatch({ type: "LOGOUT" });
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

  // Log the user when state.user changes
  useEffect(() => {
    if (authState) {
      console.log("Logged in user:", authState);
    } else {
      console.log("No user logged in.");
    }
    setIsLording(false);
  }, [authState]);

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
