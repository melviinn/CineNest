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
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
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
    <div className="flex flex-col items-center justify-center p-24">
      <div className="font-manrope z-10 w-full max-w-5xl items-center justify-center text-sm lg:flex">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <Field>
            <FieldSet>
              <FieldLabel className="font-manrope -mb-3 text-3xl font-bold">
                Create an account
              </FieldLabel>
              <FieldDescription className="text-muted-foreground">
                Fill in the details below to create your account.
              </FieldDescription>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="full-name">Full Name</FieldLabel>
                  <Input
                    required
                    id="full-name"
                    name="name"
                    type="text"
                    placeholder="Max Mustermann"
                  ></Input>
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                    required
                  ></Input>
                </Field>
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
                  <Button type="submit" className="cursor-pointer w-full">
                    Create my account
                  </Button>
                </Field>
              </FieldGroup>
            </FieldSet>
          </Field>
        </form>
        {SignUpErrorAlertDialog(error)}
      </div>
    </div>
  );
}
