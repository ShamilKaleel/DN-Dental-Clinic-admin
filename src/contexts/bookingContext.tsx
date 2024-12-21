import React, { createContext, useReducer, useEffect, ReactNode } from "react";
import axios from "axios";

export interface Booking {
  referenceId: number;
  name: string;
  nic: string;
  contactNumber: string;
  email: string;
  address: string;
  scheduleId: number;
}

interface BookingState {
  bookings: Booking[];
  isLoading: boolean;
  error: string | null;
}

interface BookingContextProps extends BookingState {
  fetchBookings: () => void;
}

const initialState: BookingState = {
  bookings: [],
  isLoading: false,
  error: null,
};

export const BookingContext = createContext<BookingContextProps | undefined>(
  undefined
);

type Action =
  | { type: "FETCH_BOOKINGS_START" }
  | { type: "FETCH_BOOKINGS_SUCCESS"; payload: Booking[] }
  | { type: "FETCH_BOOKINGS_FAILURE"; payload: string };

const bookingReducer = (state: BookingState, action: Action): BookingState => {
  switch (action.type) {
    case "FETCH_BOOKINGS_START":
      return { ...state, isLoading: true, error: null };
    case "FETCH_BOOKINGS_SUCCESS":
      return { ...state, isLoading: false, bookings: action.payload };
    case "FETCH_BOOKINGS_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const BookingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  const fetchBookings = async () => {
    dispatch({ type: "FETCH_BOOKINGS_START" });
    try {
      const response = await axios.get(
        "http://localhost:8080/api/bookings/all",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("dn_dental_clinic")}`,
          },
          withCredentials: true,
        }
      ); // Direct URL
      dispatch({ type: "FETCH_BOOKINGS_SUCCESS", payload: response.data });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      dispatch({ type: "FETCH_BOOKINGS_FAILURE", payload: errorMessage });
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <BookingContext.Provider value={{ ...state, fetchBookings }}>
      {children}
    </BookingContext.Provider>
  );
};
