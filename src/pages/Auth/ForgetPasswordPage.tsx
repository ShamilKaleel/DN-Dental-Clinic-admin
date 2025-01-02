import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/api/axiosInstance";
// Define the validation schema using Zod
const forgetPasswordSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address.")
    .nonempty("Email is required."),
});

// Define the type for form data
type ForgetPasswordFormData = z.infer<typeof forgetPasswordSchema>;

const ForgetPasswordPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<ForgetPasswordFormData>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ForgetPasswordFormData> = async (data) => {
    try {
      // Send a POST request to the forgot password API endpoint
      await axiosInstance.post("/auth/forgot-password", {
        email: data.email,
      });
      alert(`Password reset link sent to ${data.email}`);
    } catch (error: any) {
      console.log(error);
      setError("root", {
        type: "manual",
        message: error.response?.data?.message || "Forgot password error",
      });
    }

    // Simulate API call
    // return new Promise<void>((resolve) => {
    //   setTimeout(() => {
    //     alert(`Password reset link sent to ${data.email}`);
    //     resolve();
    //   }, 1000);
    // });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5 ">
      <Card className=" p-8  shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center  mb-6">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block  font-medium mb-2">
              Email Address
            </label>
            <Input
              type="email"
              id="email"
              {...register("email")}
              placeholder="Enter your email"
              className={`w-full px-4 py-2 border focus:outline-none `}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4  `}
          >
            {isSubmitting ? "Submitting..." : "Reset Password"}
          </Button>
          <p className="text-red-500 text-sm mt-1">{errors.root?.message}</p>
        </form>
      </Card>
    </div>
  );
};

export default ForgetPasswordPage;
