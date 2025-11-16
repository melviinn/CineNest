"use client";

import { authClient, useSession } from "@/lib/auth-client";
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
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  if (session) {
    // if the user is already logged in, redirect to home
    router.push("/");
    return null; // or a loader
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const res = await authClient.signIn.username({
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    });

    if (res.error) {
      setError(res.error.message || "Something went wrong.");
    } else {
      router.push("/");
    }
  }

  async function handleGoogleSignIn() {
    setError(null);

    const res = await authClient.signIn.social({
      provider: "google",
    });

    if (res.error) {
      setError(res.error.message || "Something went wrong.");
    }
    // On success, the user will be redirected to the callback URL automatically
  }
  function SignInErrorAlertDialog(error: string | null) {
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
    <div className="flex flex-col items-center justify-center p-24">
      <div className="font-manrope z-10 w-full max-w-5xl items-center justify-center text-sm lg:flex">
        <Field className="w-full max-w-md">
          <FieldSet>
            <form onSubmit={handleSubmit}>
              <FieldLabel className="font-manrope mb-3 text-3xl font-bold">
                Welcome back!
              </FieldLabel>
              <FieldDescription className="text-muted-foreground">
                Enter your username and password to access your account.
              </FieldDescription>
              <FieldGroup className="mt-6">
                <Field>
                  <FieldLabel htmlFor="username">Username</FieldLabel>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="your_username"
                    required
                  ></Input>
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="********"
                    required
                  ></Input>
                </Field>
                <Field>
                  <Button type="submit" className="cursor-pointer">
                    Login to your account
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </FieldSet>
          <FieldSeparator />
          <FieldSet>
            <FieldLabel className="text-xl font-medium">
              Connect with Google
            </FieldLabel>
            <FieldGroup>
              <Field
                orientation="horizontal"
                className="flex items-center justify-center"
              >
                <Button
                  className="h-12 cursor-pointer"
                  variant="outline"
                  onClick={handleGoogleSignIn}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="icon icon-tabler icons-tabler-filled icon-tabler-brand-google mr-2"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1 -1.265 .06a6 6 0 1 0 2.103 6.836l.001 -.004h-3.66a1 1 0 0 1 -.992 -.883l-.007 -.117v-2a1 1 0 0 1 1 -1h6.945a1 1 0 0 1 .994 .89c.04 .367 .061 .737 .061 1.11c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10z" />
                  </svg>
                  Google
                </Button>
                <Button
                  className="h-12 cursor-pointer"
                  variant="outline"
                  onClick={handleGoogleSignIn}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="icon icon-tabler icons-tabler-filled icon-tabler-brand-google mr-2"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1 -1.265 .06a6 6 0 1 0 2.103 6.836l.001 -.004h-3.66a1 1 0 0 1 -.992 -.883l-.007 -.117v-2a1 1 0 0 1 1 -1h6.945a1 1 0 0 1 .994 .89c.04 .367 .061 .737 .061 1.11c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10z" />
                  </svg>
                  Github
                </Button>
              </Field>
            </FieldGroup>
          </FieldSet>
        </Field>
        {SignInErrorAlertDialog(error)}
      </div>
    </div>
  );
}
