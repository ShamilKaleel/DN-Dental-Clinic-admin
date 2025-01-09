import { createContext, useReducer, ReactNode, useEffect } from "react";
import axiosInstance from "@/api/axiosInstance";
import { useAuth } from "@/hooks/useAuth";

import { Booking, CreateBooking } from "@/types/booking";

// Booking API actions
type BookingAction =
  | { type: "FETCH_BOOKINGS"; payload: Booking[] }
  | { type: "CREATE_BOOKING"; payload: Booking }
  | { type: "DELETE_BOOKING"; payload: string }
  | { type: "UPDATE_BOOKING"; payload: Booking }
  | { type: "FETCH_BOOKING"; payload: Booking };

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
    case "UPDATE_BOOKING":
      return {
        bookings: state.bookings.map((b) =>
          b.referenceId === action.payload.referenceId ? action.payload : b
        ),
      };
    default:
      return state;
  }
};

// Context
export const BookingContext = createContext<{
  state: BookingState;

  createBooking: (booking: CreateBooking) => Promise<void>;
  deleteBooking: (id: string) => Promise<void>;
  updateBooking: (id: string, booking: CreateBooking) => Promise<void>;
  getBookingById: (id: string) => Promise<Booking>;
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

  const createBooking = async (booking: CreateBooking) => {
    const response = await axiosInstance.post("/bookings/create", booking);
    dispatch({ type: "CREATE_BOOKING", payload: response.data });
  };

  const deleteBooking = async (id: string) => {
    await axiosInstance.delete(`/bookings/${id}`);
    dispatch({ type: "DELETE_BOOKING", payload: id });
  };

  const updateBooking = async (id: string, booking: CreateBooking) => {
    const response = await axiosInstance.put(`/bookings/${id}`, booking);
    dispatch({ type: "UPDATE_BOOKING", payload: response.data });
  };

  const getBookingById = async (id: string) => {
    const response = await axiosInstance.get<Booking>(`/bookings/${id}`);
    return response.data;
  };

  return (
    <BookingContext.Provider
      value={{
        state,
        createBooking,
        deleteBooking,
        updateBooking,
        getBookingById,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
