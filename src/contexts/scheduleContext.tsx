import { createContext, useReducer, ReactNode } from "react";
import axiosInstance from "@/api/axiosInstance";
import { Schedule, CreateSchedule } from "@/types/schedule";

// Schedule interface

// Schedule API actions
type ScheduleAction =
  | { type: "FETCH_SCHEDULES"; payload: Schedule[] }
  | { type: "CREATE_SCHEDULE"; payload: Schedule }
  | { type: "DELETE_SCHEDULE"; payload: string }
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
  createSchedule: (schedule: CreateSchedule) => Promise<void>;
  deleteSchedule: (id: string) => Promise<void>;
  updateSchedule: (id: string, schedule: CreateSchedule) => Promise<void>;
  getSchedule: (id: string) => Promise<Schedule>;
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

  const createSchedule = async (schedule: CreateSchedule) => {
    const response = await axiosInstance.post("/schedules/create", schedule);
    dispatch({ type: "CREATE_SCHEDULE", payload: response.data });
  };

  const deleteSchedule = async (id: string) => {
    await axiosInstance.delete(`/schedules/${id}`);
    dispatch({ type: "DELETE_SCHEDULE", payload: id });
  };

  const updateSchedule = async (id: string, schedule: CreateSchedule) => {
    const response = await axiosInstance.put(`/schedules/${id}`, schedule);
    dispatch({
      type: "UPDATE_SCHEDULE",
      payload: response.data,
    });
  };

  const getSchedule = async (id: string) => {
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
