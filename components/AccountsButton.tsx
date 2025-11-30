"use client";

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

const AccountsButton = () => {
  function handleOnClick(to: string) {
    redirect("/" + to);
  }

  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        onClick={() => handleOnClick("sign-up")}
        className="cursor-pointer"
      >
        Don't have an account?
      </Button>
      <Button
        variant="outline"
        onClick={() => handleOnClick("sign-up")}
        className="cursor-pointer"
      >
        Already have an account?
      </Button>
    </div>
  );
}

export default AccountsButton;
