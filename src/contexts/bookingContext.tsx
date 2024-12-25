import { createContext, useReducer, ReactNode, useEffect } from "react";
import axiosInstance from "@/api/axiosInstance";
import { useAuth } from "@/hooks/useAuth";
// Booking interface
export interface Booking {
  referenceId: number;
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
  | { type: "DELETE_BOOKING"; payload: number };

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

  createBooking: (booking: Booking) => Promise<void>;
  deleteBooking: (id: number) => Promise<void>;
} | null>(null);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);
  const { authState } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get<Booking[]>("/bookings/all");
        dispatch({ type: "FETCH_BOOKINGS", payload: response.data });
      } catch (error) {
        console.error("Failed to fetch bookings", error);
      }
    };

    fetchBookings();
  }, [authState]);

  const createBooking = async (booking: Booking) => {
    try {
      const response = await axiosInstance.post<Booking>(
        "/bookings/create",
        booking
      );
      dispatch({ type: "CREATE_BOOKING", payload: response.data });
    } catch (error) {
      console.error("Failed to create booking", error);
    }
  };

  const deleteBooking = async (id: number) => {
    try {
      await axiosInstance.delete(`/bookings/${id}`);
      dispatch({ type: "DELETE_BOOKING", payload: id });
    } catch (error) {
      console.error("Failed to delete booking", error);
    }
  };

  return (
    <BookingContext.Provider value={{ state, createBooking, deleteBooking }}>
      {children}
    </BookingContext.Provider>
  );
};
