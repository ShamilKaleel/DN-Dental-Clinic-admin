import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/api/axiosInstance";

// Define the validation schema using Zod
const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .nonempty("Password is required."),
    confirmPassword: z.string().nonempty("Confirm Password is required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"], // Set the error to confirmPassword field
  });

// Define the type for form data
type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // Extract token from the route
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ResetPasswordFormData> = async (data) => {
    try {
      // Send a POST request to the reset password API endpoint
      await axiosInstance.post("/auth/reset-password", {
        token,
        newPassword: data.password,
      });

      alert("Password has been reset successfully!");
      navigate("/login"); // Redirect to login page
    } catch (error: any) {
      console.error(error);
      setError("root", {
        type: "manual",
        message: error.response?.data?.message || "Reset password error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <Card className="p-8 shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-2">
              New Password
            </label>
            <Input
              type="password"
              id="password"
              {...register("password")}
              placeholder="Enter your new password"
              className={`w-full px-4 py-2 border focus:outline-none`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block font-medium mb-2">
              Confirm Password
            </label>
            <Input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword")}
              placeholder="Confirm your new password"
              className={`w-full px-4 py-2 border focus:outline-none`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4`}
          >
            {isSubmitting ? "Submitting..." : "Reset Password"}
          </Button>
          {errors.root?.message && (
            <p className="text-red-500 text-sm mt-1">{errors.root?.message}</p>
          )}
        </form>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
