"use client";

import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { redirect } from "next/navigation";
export default function Custom404() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-8">
      <div className="pointer-events-none text-center">
        <h1 className="text-9xl font-black tracking-wider">404</h1>
        <h2 className="text-4xl font-bold">NOT FOUND</h2>
      </div>
      <Button
        variant="outline"
        className="cursor-pointer"
        onClick={() => redirect("/home")}
      >
        <MoveLeft />
        Home
      </Button>
    </div>
  );
}
