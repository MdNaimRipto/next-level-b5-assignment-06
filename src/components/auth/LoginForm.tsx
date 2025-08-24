import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import PasswordInput from "../ui/passwordInput";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/redux/features/userApis";
import { postApiHandler } from "@/utils/apiHandlers/postApiHandler";
import { useState } from "react";

const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [userLogin] = useLoginMutation();
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const option = { data };
    const optionalTasks = () => {
      navigate("/");
      form.reset();
    };

    await postApiHandler({
      mutateFn: userLogin,
      options: option,
      setIsLoading: setIsLoading,
      optionalTasksFn: optionalTasks,
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login Now</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email and password to login
        </p>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Enter your password"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full flex items-center justify-center">
              <Button
                type="submit"
                disabled={isLoading ? true : false}
                className="w-4/5"
              >
                {isLoading ? "Loading..." : "Login"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          to="/auth/register"
          replace
          className="underline underline-offset-4"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
