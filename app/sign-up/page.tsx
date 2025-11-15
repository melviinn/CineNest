"use client";

import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";



export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  if (session) {
    // utilisateur déjà connecté → redirige vers "/"
    router.push("/");
    return null; // ou un loader
  }

  // useEffect(() => {
  //   if (session) {
  //     // l'utilisateur est connecté, tu peux le rediriger vers "/" par ex
  //     router.push("/");
  //   }
  //   else {
  //     return null;
  //   }
  // }, [session]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const res = await signUp.email({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      username: formData.get("username") as string,
      // fields: {
      //   username: formData.get("username") as string,
      // },
    });

    if (res.error) {
      setError(res.error.message || "Something went wrong");
    } else {
      router.push("/");
    }
  }

  return (
    <div className="flex flex-col items-center justify-between p-24">
      <div className="font-manrope z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
        <h1 className="text-4xl font-bold tracking-tight">Sign Up Page</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            required
            className="w-full rounded-md border border-neutral-700 px-3 py-2"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full rounded-md border border-neutral-700 px-3 py-2"
          />
          <input
            name="username"
            placeholder="Username"
            required
            className="w-full rounded-md border border-neutral-700 px-3 py-2"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            minLength={8}
            className="w-full rounded-md border border-neutral-700 px-3 py-2"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-white px-4 py-2 font-medium text-black hover:bg-gray-200"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
