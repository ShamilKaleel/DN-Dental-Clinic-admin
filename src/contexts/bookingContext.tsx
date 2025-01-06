import { createContext, useReducer, ReactNode, useEffect } from "react";
import axiosInstance from "@/api/axiosInstance";
import { useAuth } from "@/hooks/useAuth";

// Booking interface
export interface Booking {
  referenceId: string;
  name: string;
  nic: string;
  contactNumber: string;
  email: string;
  address: string;
  scheduleId: number;
  status: "PENDING" | "ACTIVE" | "CANCEL" | "ABSENT" | "FINISHED";
  date: string;
  dayofweek: string;
  createdAt: string;
}

export interface CreateBooking {
  name: string;
  nic: string;
  contactNumber: string;
  email: string;
  address: string;
  scheduleId: number;
}

// Booking API actions
type BookingAction =
  | { type: "FETCH_BOOKINGS"; payload: Booking[] }
  | { type: "CREATE_BOOKING"; payload: Booking }
  | { type: "DELETE_BOOKING"; payload: string };

// Booking state interface
interface BookingState {
  bookings: Booking[];
}

// Initial state
const initialState: BookingState = {
  bookings: [],
};

// Reducer
const bookingReducer = (
  state: BookingState,
  action: BookingAction
): BookingState => {
  switch (action.type) {
    case "FETCH_BOOKINGS":
      return { bookings: action.payload };
    case "CREATE_BOOKING":
      return { bookings: [...state.bookings, action.payload] };
    case "DELETE_BOOKING":
      return {
        bookings: state.bookings.filter(
          (b) => b.referenceId !== action.payload
        ),
      };
    default:
      return state;
  }
};

// Context
export const BookingContext = createContext<{
  state: BookingState;

  createBooking: (
    name: string,
    nic: string,
    contactNumber: string,
    email: string,
    address: string,
    scheduleId: number
  ) => Promise<void>;
  deleteBooking: (id: string) => Promise<void>;
} | null>(null);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);
  const { authState } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get<Booking[]>("/bookings/all");
        dispatch({ type: "FETCH_BOOKINGS", payload: response.data });
      } catch (error: any) {
        console.error(
          error.response.data.error || "Failed to fetch bookings :",
          error.response.data.message || error.message
        );
      }
    };

    fetchBookings();
  }, [authState]);

  const createBooking = async (
    name: string,
    nic: string,
    contactNumber: string,
    email: string,
    address: string,
    scheduleId: number
  ) => {
    const response = await axiosInstance.post("/bookings/create", {
      name,
      nic,
      contactNumber,
      email,
      address,
      scheduleId,
    });
    dispatch({ type: "CREATE_BOOKING", payload: response.data });
  };

  const deleteBooking = async (id: string) => {
    await axiosInstance.delete(`/bookings/${id}`);
    dispatch({ type: "DELETE_BOOKING", payload: id });
  };

  return (
    <BookingContext.Provider value={{ state, createBooking, deleteBooking }}>
      {children}
    </BookingContext.Provider>
  );
};
