import {
  createContext,
  useReducer,
  ReactNode,
  useEffect,
  useState,
} from "react";
import axios from "axios";

// Define the initial state and its type
type AuthState = {
  user: { username: string; roles: string[] } | null;

  isAuthenticated: boolean;
};
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};
// Define action types and payloads
type AuthAction =
  | {
      type: "LOGIN_SUCCESS";
      payload: {
        user: { username: string; roles: string[] };
        isAuthenticated: boolean;
      };
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
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        user: null,
        isAuthenticated: false,
      };
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
  logout: () => Promise<void>;
  signup: (
    username: string,
    password: string,
    roles: string[]
  ) => Promise<void>;
  isLording: boolean;
}>(null!);

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [isLording, setIsLording] = useState(false);

  // Rehydrate authentication state from localStorage on app load
  useEffect(() => {
    if (!state.user) {
      console.log("user start", state.user);
      axios
        .get("http://localhost:8080/api/auth/user")
        .then(({ data }) => {
          const { username: user, roles } = data;
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: {
              user: { username: user, roles },
              isAuthenticated: true,
            },
          });
          console.log("user end", state.user);
        })
        .catch((error: any) => {
          console.log(error.response.data);
        });
    }

    // const storedState = localStorage.getItem("authState");

    // if (storedState) {
    //   const parsedState: AuthState = JSON.parse(storedState);
    //   console.log("hi", state.isAuthenticated, state.user);
    //   dispatch({
    //     type: "LOGIN_SUCCESS",
    //     payload: {
    //       user: parsedState.user!,
    //       isAuthenticated: true,
    //     },
    //   });
    //   console.log("bye", state.isAuthenticated);
    // } else {
    //   console.log("No stored state found in localStorage");
    // }
  }, []);

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
      console.log("response", response.data);
      console.log("response", response.data);
      // Persist state to localStorage

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: { username, roles },
          isAuthenticated: true,
        },
      });

      console.log("login", state.user);
    } catch (error: any) {
      console.error("Login failed", error);
      throw error.response?.data?.message || "Invalid credentials";
    } finally {
      setIsLording(false);
    }
  };

  // Logout function
  const logout = async () => {
    // Clear localStorage
    setIsLording(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signout"
      );

      console.log("logout", response.data);
      localStorage.removeItem("authState");
      dispatch({ type: "LOGOUT" });
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
      dispatch({ type: "SIGNUP_SUCCESS" });
    } catch (error: any) {
      console.error("Signup failed", error);
      throw error.response?.data?.message || "Signup error";
    }
  };

  return (
    <AuthContext.Provider value={{ state, login, logout, signup, isLording }}>
      {children}
    </AuthContext.Provider>
  );
};
