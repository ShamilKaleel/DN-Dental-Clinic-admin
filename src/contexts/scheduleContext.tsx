import { createContext, useReducer, ReactNode } from "react";
import axiosInstance from "@/api/axiosInstance";

// Schedule interface
export interface Schedule {
  id: number;
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
  dentistId: number;
  capacity: number;
}

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
  dayOfWeek: string;
  createdAt: string;
}

// Schedule API actions
type ScheduleAction =
  | { type: "FETCH_SCHEDULES"; payload: Schedule[] }
  | { type: "CREATE_SCHEDULE"; payload: Schedule }
  | { type: "DELETE_SCHEDULE"; payload: number }
  | { type: "UPDATE_SCHEDULE"; payload: Schedule };

// Schedule state interface
interface ScheduleState {
  schedules: Schedule[];
}

// Initial state
const initialState: ScheduleState = {
  schedules: [],
};

// Reducer
const scheduleReducer = (
  state: ScheduleState,
  action: ScheduleAction
): ScheduleState => {
  switch (action.type) {
    case "FETCH_SCHEDULES":
      return { schedules: action.payload };
    case "CREATE_SCHEDULE":
      return { schedules: [...state.schedules, action.payload] };
    case "DELETE_SCHEDULE":
      return {
        schedules: state.schedules.filter((s) => s.id !== action.payload),
      };
    case "UPDATE_SCHEDULE":
      return {
        schedules: state.schedules.map((s) =>
          s.id === action.payload.id ? action.payload : s
        ),
      };
    default:
      return state;
  }
};

// Context
export const ScheduleContext = createContext<{
  state: ScheduleState;
  fetchSchedules: () => Promise<void>;
  createSchedule: (
    date: string,
    status: string,
    startTime: string,
    endTime: string,
    dentistId: number,
    capacity: number
  ) => Promise<void>;
  deleteSchedule: (id: number) => Promise<void>;
  updateSchedule: (
    id: number,
    date: string,
    status: string,
    startTime: string,
    endTime: string,
    dentistId: number,
    capacity: number
  ) => void;
  getSchedule: (id: number) => Promise<Schedule>;
} | null>(null);

// Provider
export const ScheduleProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(scheduleReducer, initialState);

  const fetchSchedules = async () => {
    try {
      const response = await axiosInstance.get<Schedule[]>("/schedules/all");
      dispatch({ type: "FETCH_SCHEDULES", payload: response.data });
    } catch (error) {
      console.error("Failed to fetch schedules", error);
    }
  };

  const createSchedule = async (
    date: string,
    status: string,
    startTime: string,
    endTime: string,
    dentistId: number,
    capacity: number
  ) => {
    const response = await axiosInstance.post("/schedules/create", {
      date,
      status,
      startTime,
      endTime,
      dentistId,
      capacity,
    });
    dispatch({ type: "CREATE_SCHEDULE", payload: response.data });
  };

  const deleteSchedule = async (id: number) => {
    try {
      await axiosInstance.delete(`/schedules/${id}`);
      dispatch({ type: "DELETE_SCHEDULE", payload: id });
    } catch (error) {
      console.error("Failed to delete schedule", error);
    }
  };

  const updateSchedule = async (
    id: number,
    date: string,
    status: string,
    startTime: string,
    endTime: string,
    dentistId: number,
    capacity: number
  ) => {
    try {
      const response = await axiosInstance.put(`/schedules/${id}`, {
        date,
        status,
        startTime,
        endTime,
        dentistId,
        capacity,
      });
      dispatch({
        type: "UPDATE_SCHEDULE",
        payload: response.data,
      });
    } catch (error) {
      console.error("Failed to update schedule", error);
    }
  };

  const getSchedule = async (id: number) => {
    const response = await axiosInstance.get<Schedule>(`/schedules/${id}`);
    return response.data;
  };

  return (
    <ScheduleContext.Provider
      value={{
        state,
        createSchedule,
        deleteSchedule,
        fetchSchedules,
        updateSchedule,
        getSchedule,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};
