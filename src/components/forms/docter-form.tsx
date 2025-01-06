import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDentist } from "@/hooks/useDentist";
import { useToast } from "@/hooks/use-toast";
import Lorder from "@/components/Lorder";

const doctorSchema = z.object({
  userName: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  gender: z.enum(["Male", "Female"]).refine((val) => val !== undefined, {
    message: "Gender is required",
  }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one digit")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
  firstName: z.string().min(1, "First Name is required"),
  specialization: z.string().min(1, "Specialization is required"),
  licenseNumber: z.string().min(1, "License Number is required"),
  nic: z
    .string()
    .regex(/^(\d{9}[VX]|[1-9]\d{11})$/, "Please enter a valid NIC number")
    .min(10, "NIC number should be 10 characters")
    .max(12, "NIC number should be 12 characters"),
  phoneNumber: z.string().regex(/^\d{10}$/, "Phone Number must be 10 digits"),
});

// CreateDentist type
export interface CreateDentist {
  userName: string;
  email: string;
  gender: string;
  firstName: string;
  specialization: string;
  licenseNumber: string;
  nic: string;
  phoneNumber: string;
  password: string;
}

export type DoctorFormInputs = z.infer<typeof doctorSchema>;

interface DocterFormProps {
  setIsOpen: (isOpen: boolean) => void;
}

const DoctorForm: React.FC<DocterFormProps> = ({ setIsOpen }) => {
  const { createDentist } = useDentist();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<DoctorFormInputs>({
    resolver: zodResolver(doctorSchema),
  });

  const onSubmit = async (data: DoctorFormInputs) => {
    try {
      await createDentist(data as CreateDentist);

      toast({
        title: "Doctor Created",
        description:
          "New Doctor has been added Doctor user name: " + data.userName,
      });
      reset();
      setIsOpen(false);
    } catch (error: any) {
      toast({
        title: "Error creating doctor",
        description: error.response?.data?.details.error || "An error occurred",
        variant: "destructive",
      });

      console.error(
        "Error creating doctor:",
        error.response?.data?.details.error
      );
    }
  };

  return (
    <div className="w-full   rounded ">
      <h2 className="text-2xl font-bold mb-4">Create Doctor</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Add this div to wrap the input fields */}
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label htmlFor="userName" className="block font-medium">
              Username
            </label>
            <input
              id="userName"
              {...register("userName")}
              className="w-full border p-2 rounded"
            />
            {errors.userName && (
              <p className="text-red-500 text-sm">{errors.userName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <input
              id="email"
              {...register("email")}
              className="w-full border p-2 rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Add this div to wrap the input fields */}
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label htmlFor="firstName" className="block font-medium">
              First Name
            </label>
            <input
              id="firstName"
              {...register("firstName")}
              className="w-full border p-2 rounded"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="gender" className="block font-medium">
              Gender
            </label>
            <select
              id="gender"
              {...register("gender")}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
          </div>
        </div>

        {/* Add this div to wrap the input fields */}
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label htmlFor="specialization" className="block font-medium">
              Specialization
            </label>
            <input
              id="specialization"
              {...register("specialization")}
              className="w-full border p-2 rounded"
            />
            {errors.specialization && (
              <p className="text-red-500 text-sm">
                {errors.specialization.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="licenseNumber" className="block font-medium">
              License Number
            </label>
            <input
              id="licenseNumber"
              {...register("licenseNumber")}
              className="w-full border p-2 rounded"
            />
            {errors.licenseNumber && (
              <p className="text-red-500 text-sm">
                {errors.licenseNumber.message}
              </p>
            )}
          </div>
        </div>

        {/* Add this div to wrap the input fields */}
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label htmlFor="nic" className="block font-medium">
              NIC
            </label>
            <input
              id="nic"
              {...register("nic")}
              className="w-full border p-2 rounded"
            />
            {errors.nic && (
              <p className="text-red-500 text-sm">{errors.nic.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block font-medium">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              {...register("phoneNumber")}
              className="w-full border p-2 rounded"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="w-full border p-2 rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Create Doctor"}
        </button>
      </form>
    </div>
  );
};

export default DoctorForm;
