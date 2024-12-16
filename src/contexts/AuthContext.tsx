import { createContext, useReducer, ReactNode } from "react";
import axios from "axios";

// Define the initial state and its type
type AuthState = {
  user: { username: string; roles: string[] } | null;
  token: string | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

// Define action types and payloads
type AuthAction =
  | {
      type: "LOGIN_SUCCESS";
      payload: { user: { username: string; roles: string[] }; token: string };
    }
  | { type: "LOGOUT" }
  | { type: "SIGNUP_SUCCESS" };

// Reducer function
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return initialState;
    case "SIGNUP_SUCCESS":
      return state; // Add any signup success logic if needed
    default:
      return state;
  }
}

// Create context
export const AuthContext = createContext<{
  state: AuthState;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (
    username: string,
    password: string,
    roles: string[]
  ) => Promise<void>;
}>({
  state: initialState,
  login: async () => {},
  logout: () => {},
  signup: async () => {},
});

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Login function
  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signin",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      const { username: user, roles, jwtToken } = response.data;

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: { username: user, roles },
          token: jwtToken,
        },
      });
    } catch (error: any) {
      console.error("Login failed", error);
      throw error.response?.data?.message || "Invalid credentials";
    }
  };

  // Logout function
  const logout = () => {
    // Clear cookies or token here if needed
    dispatch({ type: "LOGOUT" });
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
      dispatch({ type: "SIGNUP_SUCCESS" });
    } catch (error: any) {
      console.error("Signup failed", error);
      throw error.response?.data?.message || "Signup error";
    }
  };

  return (
    <AuthContext.Provider value={{ state, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
