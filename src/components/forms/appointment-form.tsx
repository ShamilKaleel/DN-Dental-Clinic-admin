import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBooking } from "@/hooks/useBooking";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";
import Lorder from "@/components/Lorder";
import { CreateBooking } from "@/types/booking";

// Define Zod schema
const bookingSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(20, "Name should be less than 20 characters"),
  nic: z
    .string()
    .regex(/^(\d{9}[VX]|[1-9]\d{11})$/, "Please enter a valid NIC number")
    .min(10, "NIC number should be 10 characters")
    .max(12, "NIC number should be 12 characters"),
  contactNumber: z
    .string()
    .regex(/^\d{10}$/, "Contact number must be 10 digits"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  scheduleId: z.number({ required_error: "Schedule Id is required" }),
});

// Infer TypeScript types
type BookingForm = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  setIsOpen: (isOpen: boolean) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ setIsOpen }) => {
  const { createBooking } = useBooking();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit: SubmitHandler<BookingForm> = async (data) => {
    try {
      await createBooking(data as CreateBooking);
      setIsOpen(false);
      toast({
        title: "Booking successful",
        description: "Booking created successfully",
      });
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `${error.response?.data?.details.error || error.message}`,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-5 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <Input
            id="name"
            placeholder="Enter your name"
            {...register("name")}
            className="mt-1 block w-full border rounded-md p-2"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="nic" className="block text-sm font-medium">
            NIC
          </label>
          <Input
            id="nic"
            placeholder="Enter your NIC number"
            {...register("nic")}
            className="mt-1 block w-full border rounded-md p-2"
          />
          {errors.nic && (
            <p className="text-red-500 text-sm">{errors.nic.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="contactNumber" className="block text-sm font-medium">
            Contact Number
          </label>
          <Input
            id="contactNumber"
            placeholder="Enter your contact number"
            {...register("contactNumber")}
            className="mt-1 block w-full border rounded-md p-2"
          />
          {errors.contactNumber && (
            <p className="text-red-500 text-sm">
              {errors.contactNumber.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="scheduleId" className="block text-sm font-medium">
            Schedule ID
          </label>
          <Input
            id="scheduleId"
            placeholder="Enter schedule ID"
            type="number"
            {...register("scheduleId", { valueAsNumber: true })}
            className="mt-1 block w-full border rounded-md p-2"
          />
          {errors.scheduleId && (
            <p className="text-red-500 text-sm">{errors.scheduleId.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          placeholder="Enter your email"
          {...register("email")}
          className="mt-1 block w-full border rounded-md p-2"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-medium">
          Address
        </label>
        <Input
          id="address"
          placeholder="Enter your address"
          {...register("address")}
          className="mt-1 block w-full border rounded-md p-2"
        />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address.message}</p>
        )}
      </div>

      <div className="flex justify-center gap-5 pt-5 relative">
        <Button
          className="bg-muted  px-8"
          onClick={() => setIsOpen(false)}
          variant={"ghost"}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} className="px-8">
          {isSubmitting ? <Lorder /> : "Submit"}{" "}
        </Button>

        <p className=" text-center text-red-500  pl-1 absolute top-32 left-0 right-0">
          {errors.root?.message}
        </p>
      </div>
    </form>
  );
};

export default BookingForm;
