"use client";

import { authClient, useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import GithubIcon from "@/public/github.svg";
import GoogleIcon from "@/public/google.png";

export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { data: session } = useSession();

  if (session) {
    // if the user is already logged in, redirect to home
    router.push("/");
    return null; // ou un loader
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const password2 = formData.get("password-2") as string;

    if (formData.get("password") !== password2) {
      setErrorMsg("Passwords do not match");
      return;
    }

    const res = await authClient.signUp.email({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      username: formData.get("username") as string,
      displayUsername: formData.get("username") as string,
    });

    if (res.error) {
      setError(res.error.message || "Something went wrong");
    } else {
      router.push("/");
    }
  }

  // Handle Google sign-in
  async function handleGoogleSignIn() {
    setError(null);

    const res = await authClient.signIn.social({
      provider: "google",
    });

    if (res.error) {
      setError(res.error.message || "Something went wrong.");
    }
  }

  // Handle GitHub sign-in
  async function handleGithubSignIn() {
    setError(null);

    const res = await authClient.signIn.social({
      provider: "github",
    });

    if (res.error) {
      setError(res.error.message || "Something went wrong.");
    }
  }

  function SignUpErrorAlertDialog(error: string | null) {
    return (
      <AlertDialog
        open={error ? true : false}
        onOpenChange={() => setError(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="mb-3 text-xl font-medium">
              An error just occured
            </AlertDialogTitle>
            <AlertDialogDescription className="text-red-500">
              {error}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Return
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-16">
      <div className="font-manrope z-10 w-full max-w-5xl items-center justify-center text-sm lg:flex">
        <div className="w-full max-w-md rounded-lg border p-8 px-8 shadow-sm md:max-w-xl md:px-16">
          <Field>
            <FieldSet className="flex w-full items-center">
              <FieldLabel className="font-manrope -mb-3 text-xl font-bold md:text-3xl">
                Create an account
              </FieldLabel>
              <FieldDescription className="text-muted-foreground md:text-md pointer-events-none text-center text-sm">
                Fill in the details below to create your account.
              </FieldDescription>
              <FieldGroup className="mt-4">
                <Field
                  orientation="horizontal"
                  className="flex items-center justify-center"
                >
                  <Button
                    className="h-10 cursor-pointer md:min-w-40"
                    variant="outline"
                    onClick={handleGoogleSignIn}
                  >
                    <Image
                      src={GoogleIcon}
                      alt="google icon"
                      width={18}
                      height={18}
                    ></Image>
                    Google
                  </Button>
                  <Button
                    className="h-10 cursor-pointer md:min-w-40"
                    variant="outline"
                    onClick={handleGithubSignIn}
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
                </Field>
              </FieldGroup>
            </FieldSet>
            <FieldSeparator className="mt-2" />
            <p className="text-muted-foreground text-center text-sm">
              Or continue with
            </p>
            <FieldSet>
              <form onSubmit={handleSubmit}>
                <FieldGroup className="mt-4 -space-y-4">
                  <Field>
                    <FieldLabel
                      htmlFor="full-name"
                      className="text-xs md:text-sm"
                    >
                      Full Name
                    </FieldLabel>
                    <Input
                      required
                      id="full-name"
                      name="name"
                      type="text"
                      placeholder="Max Mustermann"
                      className="placeholder:text-xs md:placeholder:text-sm"
                    ></Input>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="email" className="text-xs md:text-sm">
                      Email
                    </FieldLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="email@example.com"
                      className="placeholder:text-xs md:placeholder:text-sm"
                      required
                    ></Input>
                  </Field>
                  <Field>
                    <FieldLabel
                      htmlFor="username"
                      className="text-xs md:text-sm"
                    >
                      Username
                    </FieldLabel>
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="m.mustermann"
                      className="placeholder:text-xs md:placeholder:text-sm"
                      required
                    ></Input>
                  </Field>
                  <div className="mb-2 grid grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel
                        htmlFor="password"
                        className="text-xs md:text-sm"
                      >
                        Password
                      </FieldLabel>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="********"
                        className={`placeholder:text-xs md:placeholder:text-sm ${errorMsg ? "border-destructive" : ""}`}
                        required
                      ></Input>
                      <FieldDescription
                        className={`text-xs ${errorMsg ? "text-destructive" : ""}`}
                      >
                        {errorMsg
                          ? "Passwords do not match"
                          : "Your password must be at least 8 characters long."}
                      </FieldDescription>
                    </Field>
                    <Field>
                      <FieldLabel
                        htmlFor="password-2"
                        className="text-xs md:text-sm"
                      >
                        Re-enter password
                      </FieldLabel>
                      <Input
                        id="password-2"
                        name="password-2"
                        type="password"
                        placeholder="********"
                        className={`placeholder:text-xs md:placeholder:text-sm ${errorMsg ? "border-destructive" : ""}`}
                        required
                      ></Input>
                      <FieldError className="text-xs">
                        {errorMsg === "Passwords do not match"
                          ? errorMsg
                          : null}
                      </FieldError>
                    </Field>
                  </div>
                  <Field>
                    <Button type="submit" className="w-full cursor-pointer">
                      Create my account
                    </Button>
                  </Field>
                </FieldGroup>
              </form>
              <p className="text-muted-foreground text-center text-xs md:text-sm">
                Already have an account?{" "}
                <Link
                  className="text-xs font-bold hover:underline md:text-sm"
                  href="/sign-in"
                >
                  Login
                </Link>
              </p>
            </FieldSet>
          </Field>
        </div>

        {SignUpErrorAlertDialog(error)}
      </div>
    </div>
  );
}
