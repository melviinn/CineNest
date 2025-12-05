"use client";

// Necessary modules
import { authClient, signIn } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

// UI components
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Social media icons
import { PasswordInput } from "@/components/PasswordInput";
import { signInFormSchema, SignInFormType } from "@/lib/zod/zodAuthSchemas";
import GithubIcon from "@/public/github.svg";
import GoogleIcon from "@/public/google.png";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema for sign-in form validation

export function SignInForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SignInFormType>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle form submission for sign-in
  async function onSubmit({ email, password }: SignInFormType) {
    setError(null);
    setLoading(true);

    toast.promise(
      new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      }),
      {
        loading: "Signing in...",
        success: "Successfully signed in!",
        error: "Failed to sign in.",
        position: "top-center",
      }
    );

    const { error } = await signIn.email({
      email,
      password,
      callbackURL: "/home",
    });

    setLoading(false);

    if (error) {
      setError(error.message || "Something went wrong.");
      form.reset();
    }
  }

  // Handle social sign-in
  async function handleSocialsSignIn(provider: "google" | "github") {
    setError(null);
    setLoading(true);

    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: "/home",
    });

    setLoading(false);

    if (error) {
      toast.error("Social sign-in failed." + (error.message || ""), {
        position: "top-center",
      });
      setError(error.message || "Something went wrong.");
    } else {
      toast.success("Successfully signed in!", { position: "top-center" });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-16">
      <div className="font-manrope z-10 w-full max-w-5xl items-center justify-center text-sm lg:flex">
        <Card className="w-full max-w-md p-8 md:max-w-lg md:px-16">
          <CardHeader className="text-center">
            <CardTitle className="font-manrope text-xl font-bold md:text-3xl">
              Welcome back!
            </CardTitle>
            <CardDescription className="text-muted-foreground md:text-md text-center text-sm">
              Enter your username and password to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center space-x-4">
              <Button
                className="h-10 cursor-pointer md:min-w-40"
                variant="outline"
                onClick={() => handleSocialsSignIn("google")}
              >
                <Image
                  src={GoogleIcon}
                  alt="google icon"
                  width={20}
                  height={20}
                  className="mr-1"
                ></Image>
                Google
              </Button>
              <Button
                className="h-10 cursor-pointer md:min-w-40"
                variant="outline"
                onClick={() => handleSocialsSignIn("github")}
              >
                <Image
                  src={GithubIcon}
                  alt="github icon"
                  width={18}
                  height={18}
                  className="mr-1"
                ></Image>
                Github
              </Button>
            </div>

            <hr className="mt-7 mb-3" />
            <p className="text-muted-foreground mb-6 text-center text-sm">
              Or continue with
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          required
                          type="email"
                          placeholder="Email"
                          className={`placeholder:text-xs md:placeholder:text-sm ${error ? "border-destructive" : ""}`}
                          {...field}
                        ></Input>
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
                      <FormLabel htmlFor="password-input">Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          autoComplete="current-password"
                          id="password-input"
                          placeholder="********"
                          className={`placeholder:text-xs md:placeholder:text-sm ${error ? "border-destructive" : ""}`}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="cursor-pointer text-right hover:underline">
                        Forgot password?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {error && (
                  <div role="alert" className="text-sm text-red-600">
                    {error}
                  </div>
                )}

                <LoadingButton
                  type="submit"
                  loading={loading}
                  className="w-full cursor-pointer"
                >
                  Login to your account
                </LoadingButton>
              </form>
            </Form>
            <p className="text-muted-foreground mt-3 text-center text-xs md:text-sm">
              Don't have an account yet?{" "}
              <Link
                className="text-xs font-bold hover:underline md:text-sm"
                href="/sign-up"
              >
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
