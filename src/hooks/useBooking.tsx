import { useContext } from "react";
import { BookingContext } from "@/contexts/bookingContext";

export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookingContext must be used within a BookingProvider");
  }
  return context;
};
