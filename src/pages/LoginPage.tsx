import { SubmitHandler, useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Lorder from "@/Component/Lorder";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import axios from "axios";

// Schema validation using Zod
const schema = z.object({
  username: z.string(),
  password: z.string().min(8),
});

// Infer the form values' types from the schema
type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  // Initialize React Hook Form with Zod resolver and default values
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  // Function to handle form submission
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // Send a POST request to the login API endpoint
      const response = await axios.post(
        "http://localhost:8080/api/auth/signin",
        {
          username: data.username,
          password: data.password,
        }
      );

      console.log(response.data);
      alert("Login successful!");
    } catch (error: any) {
      // Handle API error response
      setError("root", {
        type: "manual",
        message: error.response?.data?.message || "Invalid email or password",
      });
    }
  };

  return (
    <div className="flex justify-center w-full h-screen items-center">
      <Card className="px-8 py-16">
        <h1 className="text-2xl font-bold text-center mb-5">Login</h1>

        {/* Form for email and password input */}
        <form
          className="flex flex-col gap-5  w-[300px]"
          onSubmit={handleSubmit(onSubmit)} // Attach form submission handler
        >
          {/* Email input field */}
          <div className="flex flex-col items-start relative">
            <label htmlFor="email" className="pl-1">
              Email
            </label>
            <Input {...register("username")} type="text" placeholder="Email" />
            {/* Display email validation error */}
            <p className="text-red-500 absolute top-16 text-xs text-center pl-1">
              {errors.username?.message}
            </p>
          </div>

          {/* Password input field */}
          <div className="flex flex-col items-start relative">
            <label htmlFor="password" className="pl-1">
              Password
            </label>
            <Input
              {...register("password")}
              type="password"
              placeholder="Password"
            />
            {/* Display password validation error */}
            <p className="text-red-500 absolute top-16 text-xs text-center pl-1">
              {errors.password?.message}
            </p>
          </div>

          {/* Submit button with loader */}
          <div className="w-full pt-5 relative">
            <Button
              disabled={isSubmitting} // Disable button during submission
              type="submit"
              className="mx-auto w-full"
            >
              {isSubmitting ? <Lorder /> : "Submit"} {/* Show loader or text */}
            </Button>
            {/* Display form-level error message */}
            <p className="text-center block mt-5">
              I don't have an accout{" "}
              <Link to="/signup" className=" underline text-gray-500">
                Signup
              </Link>
            </p>

            <p className=" text-start text-red-500  pl-1 absolute top-20">
              {errors.root?.message}
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
}
