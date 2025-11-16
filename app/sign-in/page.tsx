"use client";

// Necessary modules
import { authClient, useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// UI components
// import {
//   AlertDialog,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
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

// Social media icons
import GithubIcon from "@/public/github.svg";
import GoogleIcon from "@/public/google.png";

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  // Handle form submission for sign-in
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
      setUsername("");
      setPassword("");
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

  return (
    <div className="flex flex-col items-center justify-center p-16">
      <div className="font-manrope z-10 w-full max-w-5xl items-center justify-center text-sm lg:flex">
        <div className="w-full max-w-md rounded-lg border p-8 px-8 shadow-sm md:max-w-lg md:px-16">
          <Field>
            <FieldSet className="flex w-full items-center">
              <FieldLabel className="font-manrope -mb-3 flex text-xl font-bold md:text-3xl">
                Welcome back!
              </FieldLabel>
              <FieldDescription className="text-muted-foreground md:text-md pointer-events-none text-center text-sm">
                Enter your username and password to access your account.
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
                <FieldGroup className="mt-4">
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
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      type="text"
                      placeholder="Username"
                      className={`placeholder:text-xs md:placeholder:text-sm ${error ? "border-destructive" : ""}`}
                      required
                    ></Input>
                  </Field>
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="********"
                      className={`placeholder:text-xs md:placeholder:text-sm ${error ? "border-destructive" : ""}`}
                      required
                    ></Input>
                    <FieldError className="mb-2 text-center text-xs">
                      {error ? "Invalid username/password combination" : null}
                    </FieldError>
                    <FieldDescription className="cursor-pointer text-right text-xs hover:underline">
                      Reset password
                    </FieldDescription>
                  </Field>
                  <Field>
                    <Button type="submit" className="cursor-pointer">
                      Login to your account
                    </Button>
                  </Field>
                </FieldGroup>
              </form>
            </FieldSet>
            <p className="text-muted-foreground mt-3 text-center text-xs md:text-sm">
              Don't have an account yet?{" "}
              <Link
                className="text-xs font-bold hover:underline md:text-sm"
                href="/sign-up"
              >
                Sign up
              </Link>
            </p>
          </Field>
        </div>
        {/* {SignInErrorAlertDialog(error)} */}
      </div>
    </div>
  );
}
