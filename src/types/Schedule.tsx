import { Booking } from "./booking";

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
  dentistId: string;
  createdAt: string;
  capacity: number;
  availableSlots: number;
}

// Create Schedule interface
export interface CreateSchedule {
  date: string;
  status: "AVAILABLE" | "UNAVAILABLE" | "FULL";
  startTime: string;
  endTime: string;
  dentistId: string;
  capacity: number;
}

export interface SelectSchedule {
  id: number;
  date: string;
  dayOfWeek: string;
  startTime: string;
}
