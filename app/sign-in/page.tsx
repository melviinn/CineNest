"use client";

import { signIn, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  if (session) {
    // utilisateur déjà connecté → redirige vers "/"
    router.push("/");
    return null; // ou un loader
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const res = await signIn.email({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    if (res.error) {
      setError(res.error.message || "Something went wrong.");
    } else {
      router.push("/");
    }
  }

  return (
    <div className="flex flex-col items-center justify-between p-24">
      <div className="font-manrope z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
        <h1 className="text-4xl font-bold tracking-tight">Sign In Page</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full rounded-md border border-neutral-700 px-3 py-2"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full rounded-md border border-neutral-700 px-3 py-2"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-white px-4 py-2 font-medium text-black hover:bg-gray-200"
          >
            Sign In
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}
