import { z } from "zod";

export const signInFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type SignInFormType = z.infer<typeof signInFormSchema>;

export const signUpFormSchema = z
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

export type SignUpFormType = z.infer<typeof signUpFormSchema>;
