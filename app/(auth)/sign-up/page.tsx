import type { Metadata } from "next";
import { SignUpForm } from "./sign-up-form";

export const metadata: Metadata = {
  title: "Sign Up - CineNest",
  description: "Create a new CineNest account.",
};

export default function SignUp() {
  return <SignUpForm />;
}
