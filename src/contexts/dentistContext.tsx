import { createContext, useReducer, ReactNode,  } from "react";
import axiosInstance from "@/api/axiosInstance";

// Dentist interface
export interface Dentist {
  id: string;
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
  | { type: "DELETE_DENTIST"; payload: string };

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
  fetchDentists: () => Promise<void>;
  createDentist: (dentist: CreateDentist) => Promise<void>;
  updateDentist: (id: number, dentist: Dentist) => Promise<void>;
  deleteDentist: (id: string) => Promise<void>;
} | null>(null);

// Provider
export const DentistProvider = ({ children }: { children: ReactNode }) => {
  const [dentistState, dispatch] = useReducer(dentistReducer, initialState);

  const fetchDentists = async () => {
    const response = await axiosInstance.get("/dentist/all");
    dispatch({ type: "FETCH_DENTISTS", payload: response.data });
  };

  const createDentist = async (dentist: CreateDentist) => {
    const response = await axiosInstance.post<Dentist>(
      "/dentist/create",
      dentist
    );
    dispatch({ type: "CREATE_DENTIST", payload: response.data });
  };

  const updateDentist = async (id: number, dentist: Dentist) => {
    const response = await axiosInstance.put<Dentist>(
      `/dentist/${id}`,
      dentist
    );
    dispatch({ type: "UPDATE_DENTIST", payload: response.data });
  };

  const deleteDentist = async (id: string) => {
    await axiosInstance.delete(`/dentist/${id}`);
    dispatch({ type: "DELETE_DENTIST", payload: id });
  };

  return (
    <DentistContext.Provider
      value={{
        dentistState,
        fetchDentists,
        createDentist,
        updateDentist,
        deleteDentist,
      }}
    >
      {children}
    </DentistContext.Provider>
  );
};
