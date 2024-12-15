import { SubmitHandler, useForm } from "react-hook-form";
import { Card } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import Lorder from "./Component/Lorder";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormValues = z.infer<typeof schema>;

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>({
    defaultValues: {
      email: "test@emil.com",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      setError("email", {
        type: "manual",
        message: "Invalid email or password",
      });
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  };
  return (
    <div className="flex justify-center w-full h-screen items-center">
      <Card className=" px-8 py-16">
        <h1 className="text-2xl font-bold text-center mb-5">Login</h1>

        <form
          className="grid grid-flow-row grid-rows-3 gap-8 w-[300px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col items-start relative">
            <label htmlFor="email" className="pl-1">
              Email
            </label>
            <Input {...register("email")} type="text" placeholder="Email" />
            <p className="text-red-500 text-center absolute top-16">
              {errors.email?.message}
            </p>
          </div>

          <div className="flex flex-col items-start relative">
            <label htmlFor="password" className="pl-1">
              Password
            </label>
            <Input
              {...register("password")}
              type="password"
              placeholder="Password"
            />
            <p className="text-red-500 text-center pl-1 absolute top-16">
              {errors.password?.message}
            </p>
          </div>

          <div className="w-full pt-5">
            <Button
              disabled={isSubmitting}
              type="submit"
              className="mx-auto w-full"
            >
              {isSubmitting ? <Lorder /> : "Submit"}
            </Button>
            <p className="text-red-500 text-center pl-1">
              {errors.root?.message}
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default App;
