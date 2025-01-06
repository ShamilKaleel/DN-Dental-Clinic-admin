import { Booking } from "./Booking";

export interface Schedule {
  id: string;
  date: string;
  dayOfWeek: string;
  status: "AVAILABLE" | "UNAVAILABLE" | "CANCELLED" | "FULL" | "FINISHED";
  numberOfBookings: number;
  bookings: Booking[];
  startTime: string;
  endTime: string;
  duration: number;
  dentistId: number;
  createdAt: string;
  capacity: number;
}

// Create Schedule interface
export interface CreateSchedule {
  date: string;
  status: string;
  startTime: string;
  endTime: string;
  dentistId: string;
  capacity: number;
}
