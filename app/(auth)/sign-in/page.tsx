import type { Metadata } from "next";
import { SignInForm } from "./sign-in-form";

export const metadata: Metadata = {
  title: "Sign In - CineNest",
  description: "Sign in to your CineNest account.",
};

export default function SignInPage() {
  return <SignInForm />;
}
