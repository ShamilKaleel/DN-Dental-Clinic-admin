import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useSchedules } from "@/hooks/useSchedule";
import { useToast } from "@/hooks/use-toast";
// Zod schema for validation
const createScheduleSchema = z.object({
  date: z
    .string()
    .nonempty("Date is required")
    .refine((val) => !isNaN(Date.parse(val)), "Invalid date format"),
  status: z.enum(["AVAILABLE", "UNAVAILABLE", "FULL"], {
    errorMap: () => ({
      message: "Status must be AVAILABLE, UNAVAILABLE, or FULL",
    }),
  }),
  startTime: z
    .string()
    .nonempty("Start time is required")
    .regex(
      /^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
      "Invalid time format (HH:MM:SS)"
    ),
  endTime: z
    .string()
    .nonempty("End time is required")
    .regex(
      /^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/,
      "Invalid time format (HH:MM:SS)"
    ),
  dentistId: z
    .number()
    .min(1, "Dentist ID must be a positive number")
    .nonnegative("Dentist ID must be valid"),
  capacity: z
    .number()
    .min(1, "Capacity must be a positive number")
    .nonnegative("Capacity must be valid"),
});

// TypeScript type inferred from Zod schema
type CreateSchedule = z.infer<typeof createScheduleSchema>;

interface ScheduleFormProps {
  setIsOpen: (isOpen: boolean) => void;
}

const CreateScheduleForm: React.FC<ScheduleFormProps> = ({ setIsOpen }) => {
  const [date, setDate] = useState<Date | undefined>();
  const { toast } = useToast();
  const { createSchedule } = useSchedules();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateSchedule>({
    resolver: zodResolver(createScheduleSchema),
  });

  const onSubmit: SubmitHandler<CreateSchedule> = async (data) => {
    console.log(data);
    try {
      await createSchedule(
        data.date,
        data.status,
        data.startTime,
        data.endTime,
        data.dentistId,
        data.capacity
      );
      setIsOpen(false);
      toast({
        title: "Schedule Created",
        description: "New schedule has been added Doctor id: " + data.dentistId,
      });
    } catch (error: any) {
      toast({
        title: "Error creating schedule",
        description: error.response?.data?.error || "An error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-5 md:px-0">
      {/* Date Field */}
      <div>
        <label htmlFor="date" className="block text-sm font-medium">
          Date:
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2" />
              {date ? format(date, "yyyy-MM-dd") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => {
                setDate(newDate);
                setValue("date", format(newDate as Date, "yyyy-MM-dd"));
              }}
              disabled={(current) => current < new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {errors.date && (
          <p className="text-red-500 text-sm">{errors.date.message}</p>
        )}
      </div>

      {/* Status Field */}
      <div>
        <label htmlFor="status" className="block text-sm font-medium">
          Status:
        </label>
        <Select
          onValueChange={(value) => {
            setValue("status", value as any); // Cast to the expected type
          }}
        >
          <SelectTrigger className={`w-[240px] `}>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AVAILABLE">AVAILABLE</SelectItem>
            <SelectItem value="UNAVAILABLE">UNAVAILABLE</SelectItem>
            <SelectItem value="FULL">FULL</SelectItem>
          </SelectContent>
        </Select>
        {errors.status && (
          <p className="text-red-500 text-sm">{errors.status.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Start Time Field */}
        <div>
          <label htmlFor="startTime" className="block text-sm font-medium">
            Start Time:
          </label>
          <Input
            type="text"
            id="startTime"
            {...register("startTime")}
            step="1"
            className={`mt-1 block w-full rounded-md shadow-sm =`}
          />
          {errors.startTime && (
            <p className="text-red-500 text-sm">{errors.startTime.message}</p>
          )}
        </div>

        {/* End Time Field */}
        <div>
          <label htmlFor="endTime" className="block text-sm font-medium">
            End Time:
          </label>
          <Input
            type="text"
            id="endTime"
            {...register("endTime")}
            step="1"
            className={`mt-1 block w-full rounded-md shadow-sm =`}
          />
          {errors.endTime?.message && (
            <p className="text-red-500 text-sm">
              {errors.endTime.message as string}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Dentist ID Field */}
        <div>
          <label htmlFor="dentistId" className="block text-sm font-medium">
            Dentist ID:
          </label>
          <Input
            type="number"
            id="dentistId"
            {...register("dentistId", { valueAsNumber: true })}
            className={`mt-1 block w-full rounded-md  shadow-sm `}
          />
          {errors.dentistId && (
            <p className="text-red-500 text-sm">{errors.dentistId.message}</p>
          )}
        </div>

        {/* Capacity Field */}
        <div>
          <label htmlFor="capacity" className="block text-sm font-medium">
            Capacity:
          </label>
          <Input
            type="number"
            id="capacity"
            {...register("capacity", { valueAsNumber: true })}
            className={`mt-1 block w-full rounded-md  shadow-sm `}
          />
          {errors.capacity && (
            <p className="text-red-500 text-sm">{errors.capacity.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};

export default CreateScheduleForm;
