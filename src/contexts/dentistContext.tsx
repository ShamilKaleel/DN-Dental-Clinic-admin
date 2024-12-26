import { createContext, useReducer, ReactNode, useEffect } from "react";
import axiosInstance from "@/api/axiosInstance";

// Dentist interface
export interface Dentist {
  id: number;
  userName: string;
  email: string;
  gender: string;
  firstName: string;
  specialization: string;
  licenseNumber: string;
  nic: string;
  phoneNumber: string;
  roles: string[];
}

// CreateDentist type
export interface CreateDentist {
  userName: string;
  email: string;
  gender: string;
  firstName: string;
  specialization: string;
  licenseNumber: string;
  nic: string;
  phoneNumber: string;
  password: string;
}

// Actions for Dentist
type DentistAction =
  | { type: "FETCH_DENTISTS"; payload: Dentist[] }
  | { type: "CREATE_DENTIST"; payload: Dentist }
  | { type: "UPDATE_DENTIST"; payload: Dentist }
  | { type: "DELETE_DENTIST"; payload: number };

// Dentist state
interface DentistState {
  dentists: Dentist[];
}

const initialState: DentistState = {
  dentists: [],
};

// Reducer
const dentistReducer = (
  _state: DentistState,
  action: DentistAction
): DentistState => {
  switch (action.type) {
    case "FETCH_DENTISTS":
      return { dentists: action.payload };
    case "CREATE_DENTIST":
      return { dentists: [..._state.dentists, action.payload] };
    case "UPDATE_DENTIST":
      return {
        dentists: _state.dentists.map((dentist) =>
          dentist.id === action.payload.id ? action.payload : dentist
        ),
      };
    case "DELETE_DENTIST":
      return {
        dentists: _state.dentists.filter(
          (dentist) => dentist.id !== action.payload
        ),
      };
    default:
      return _state;
  }
};

// Context
export const DentistContext = createContext<{
  dentistState: DentistState;
  createDentist: (dentist: Dentist) => Promise<void>;
  updateDentist: (id: number, dentist: Dentist) => Promise<void>;
  deleteDentist: (id: number) => Promise<void>;
} | null>(null);

// Provider
export const DentistProvider = ({ children }: { children: ReactNode }) => {
  const [dentistState, dispatch] = useReducer(dentistReducer, initialState);

  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const response = await axiosInstance.get("/dentist/all");
        dispatch({ type: "FETCH_DENTISTS", payload: response.data });
      } catch (error) {
        console.error("Failed to fetch dentists", error);
      }
    };
    fetchDentists();
  }, []);

  const createDentist = async (dentist: Dentist) => {
    try {
      const response = await axiosInstance.post<Dentist>(
        "/dentist/create",
        dentist
      );
      dispatch({ type: "CREATE_DENTIST", payload: response.data });
    } catch (error) {
      console.error("Failed to create dentist", error);
    }
  };

  const updateDentist = async (id: number, dentist: Dentist) => {
    try {
      const response = await axiosInstance.put<Dentist>(
        `/dentist/${id}`,
        dentist
      );
      dispatch({ type: "UPDATE_DENTIST", payload: response.data });
    } catch (error) {
      console.error("Failed to update dentist", error);
    }
  };

  const deleteDentist = async (id: number) => {
    try {
      await axiosInstance.delete(`/dentist/${id}`);
      dispatch({ type: "DELETE_DENTIST", payload: id });
    } catch (error) {
      console.error("Failed to delete dentist", error);
    }
  };

  return (
    <DentistContext.Provider
      value={{ dentistState, createDentist, updateDentist, deleteDentist }}
    >
      {children}
    </DentistContext.Provider>
  );
};
