import React, { useEffect, useState } from "react";
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
import Lorder from "../Lorder";
import { CreateSchedule } from "@/types/schedule";
import { useDentist } from "@/hooks/useDentist";
import { Dentist } from "@/types/dentist";

const editScheduleSchema = z.object({
  date: z
    .string()
    .nonempty("Date is required")
    .refine((val) => !isNaN(Date.parse(val)), "Invalid date format"),
  status: z.enum(
    ["AVAILABLE", "UNAVAILABLE", "FULL", "CANCELLED", "FINISHED"],
    {
      errorMap: () => ({
        message: "Status must be AVAILABLE, UNAVAILABLE, or FULL",
      }),
    }
  ),
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
  dentistId: z.string().min(1, "Dentist ID must be a positive number"),

  capacity: z
    .number()
    .min(1, "Capacity must be a positive number")
    .nonnegative("Capacity must be valid"),
});

type EditSchedule = z.infer<typeof editScheduleSchema>;

interface EditScheduleFormProps {
  cardId: string;
  setIsOpen: (isOpen: boolean) => void;
}

const ScheduleEditForm: React.FC<EditScheduleFormProps> = ({
  cardId,
  setIsOpen,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const { toast } = useToast();
  const { getSchedule, updateSchedule } = useSchedules();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EditSchedule>({
    resolver: zodResolver(editScheduleSchema),
  });
  const { dentistState } = useDentist();

  const scheduleId = cardId;

  useEffect(() => {
    setIsLoading(true);
    const fetchSchedule = async () => {
      try {
        const schedule = await getSchedule(scheduleId);
        setValue("date", schedule.date);
        setValue("status", schedule.status);
        setValue("startTime", schedule.startTime);
        setValue("endTime", schedule.endTime);
        setValue("dentistId", schedule.dentistId);
        setValue("capacity", schedule.capacity);
        setDate(new Date(schedule.date));
      } catch (error: any) {
        setIsOpen;
        toast({
          title: "Error fetching schedule",
          description:
            error.response?.data?.details.error || "An error occurred",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedule();
  }, [cardId, setValue, toast, getSchedule]);

  const onSubmit: SubmitHandler<EditSchedule> = async (data) => {
    try {
      await updateSchedule(scheduleId, data as CreateSchedule);
      setIsOpen(false);
      toast({
        title: "Schedule Updated",
        description: `Schedule ${scheduleId} has been updated successfully.`,
      });
    } catch (error: any) {
      toast({
        title: "Error updating schedule",
        description: error.response?.data?.error || "An error occurred",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-60">
        <Lorder />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-5 md:px-0">
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

      <div>
        <label htmlFor="status" className="block text-sm font-medium">
          Status:
        </label>
        <Select
          onValueChange={(value) => {
            setValue("status", value as any);
          }}
        >
          <SelectTrigger className={`w-[240px]`}>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AVAILABLE">AVAILABLE</SelectItem>
            <SelectItem value="UNAVAILABLE">UNAVAILABLE</SelectItem>
            <SelectItem value="FULL">FULL</SelectItem>
            <SelectItem value="CANCELLED">CANCELLED</SelectItem>
            <SelectItem value="FINISHED">FINISHED</SelectItem>
          </SelectContent>
        </Select>
        {errors.status && (
          <p className="text-red-500 text-sm">{errors.status.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="startTime" className="block text-sm font-medium">
            Start Time:
          </label>
          <Input
            type="text"
            id="startTime"
            {...register("startTime")}
            className={`mt-1 block w-full rounded-md shadow-sm`}
          />
          {errors.startTime && (
            <p className="text-red-500 text-sm">{errors.startTime.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="endTime" className="block text-sm font-medium">
            End Time:
          </label>
          <Input
            type="text"
            id="endTime"
            {...register("endTime")}
            className={`mt-1 block w-full rounded-md shadow-sm`}
          />
          {errors.endTime && (
            <p className="text-red-500 text-sm">{errors.endTime.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="capacity" className="block text-sm font-medium">
            Capacity:
          </label>
          <Input
            type="number"
            id="capacity"
            {...register("capacity", { valueAsNumber: true })}
            className={`mt-1 block w-full rounded-md shadow-sm`}
          />
          {errors.capacity && (
            <p className="text-red-500 text-sm">{errors.capacity.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="dentistId" className="block text-sm font-medium">
            Dentist ID:
          </label>
          <Select
            onValueChange={(value) => {
              setValue("dentistId", value as any); // Directly update the dentistId form field
            }}
          >
            <SelectTrigger className={`w-[240px] `}>
              <SelectValue placeholder="Select Doctor" />
            </SelectTrigger>
            <SelectContent>
              {dentistState.dentists.map((dentist: Dentist) => (
                <SelectItem key={dentist.id} value={dentist.id.toString()}>
                  dr.{dentist.firstName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.dentistId && (
            <p className="text-red-500 text-sm">{errors.dentistId.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};

export default ScheduleEditForm;
