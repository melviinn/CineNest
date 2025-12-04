"use client";

// Necessary modules
import { signUp } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

// UI components
import LoadingButton from "@/components/LoadingButton";
import { PasswordInput } from "@/components/PasswordInput";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Zod schema for sign-up form validation
const signUpFormSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.email({ message: "Please enter a valid email address" }),
    password: z.string().min(1, "Password is required"),
    passwordConfirmation: z
      .string()
      .min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

type SignUpFormData = z.infer<typeof signUpFormSchema>;

export function SignUpForm() {
  const router = useRouter();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const { setError, clearErrors, formState } = form;

  async function onSubmit({ email, password, name }: SignUpFormData) {

    const { error } = await signUp.email({
      email,
      name,
      password,
    });

    if (error) {
      // Détecte les erreurs serveur et les associe au champ correspondant
      if (error.message?.includes("email")) {
        setError("email", { message: "Email is already in use" });
      } else {
        toast.error(error.message || "Something went wrong.");
      }
      return;
    }

    toast.success("Account created successfully!", { position: "top-center" });
    router.push("/home");
  }

  // async function handleUsernameBlur(e: React.FocusEvent<HTMLInputElement>) {
  //   const username = e.target.value;

  //   if (!username) return;

  //   // const { data: response, error } = await authClient.isUsernameAvailable({
  //   //   username,
  //   // });

  //   // if (!response?.available) {
  //   //   setError("username", { message: "Username is already taken" });
  //   // } else {
  //   //   clearErrors("username");
  //   // }
  // }

  const loading = form.formState.isSubmitting;

  return (
    <div className="flex flex-col items-center justify-center p-16">
      <div className="font-manrope z-10 w-full max-w-5xl items-center justify-center text-sm lg:flex">
        <Card className="w-full max-w-md p-8 md:max-w-xl md:px-16">
          <CardHeader className="text-center">
            <CardTitle className="font-manrope text-xl font-bold md:text-3xl">
              Create an account
            </CardTitle>
            <CardDescription className="text-muted-foreground md:text-md text-center text-sm">
              Fill in the details below to create your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                          className={`placeholder:text-xs md:placeholder:text-sm ${formState.errors.email ? "border-destructive" : ""}`}
                          {...field}
                        ></Input>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          required
                          type="text"
                          placeholder="Username"
                          className={`placeholder:text-xs md:placeholder:text-sm ${formState.errors.name ? "border-destructive" : ""}`}
                          {...field}
                          // onBlur={(e) => {
                          //   field.onBlur();
                          //   handleUsernameBlur(e);
                          // }}
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          autoComplete="current-password"
                          placeholder="********"
                          className={`placeholder:text-xs md:placeholder:text-sm ${formState.errors.password ? "border-destructive" : ""}`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="passwordConfirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Re-enter your password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="********"
                          className={`placeholder:text-xs md:placeholder:text-sm ${formState.errors.passwordConfirmation ? "border-destructive" : ""}`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* {formState.errors && (
                  <div role="alert" className="text-sm text-red-600">
                    {Object.values(formState.errors).map((error) => error.message).join(", ")}
                  </div>
                )} */}

                <LoadingButton
                  type="submit"
                  loading={loading}
                  className="w-full cursor-pointer"
                >
                  Create my account
                </LoadingButton>
              </form>
            </Form>
            <p className="text-muted-foreground mt-3 text-center text-xs md:text-sm">
              Already have an account?{" "}
              <Link
                className="text-xs font-bold hover:underline md:text-sm"
                href="/sign-in"
              >
                Login
              </Link>
            </p>
          </CardContent>
        </Card>

        {/* <div className="w-full max-w-md rounded-lg border p-8 px-8 shadow-sm md:max-w-xl md:px-16">
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
                    {/* <Button type="submit" className="w-full cursor-pointer">
                      Create my account
                    </Button> */}
        {/* <LoadingButton
                      type="submit"
                      loading={loading}
                      className="w-full cursor-pointer"
                    >
                      Create my account
                    </LoadingButton> */}
        {/* </Field>
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
          </Field> */}
        {/* </div> */}

        {/* {SignUpErrorAlertDialog(error)} */}
      </div>
    </div>
  );
}
