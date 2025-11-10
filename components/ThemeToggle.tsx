"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      onClick={toggleTheme}
      size="icon"
      variant="outline"
      aria-label="Change theme"
      className="cursor-pointer"
    >
      {theme === "dark" ? <Moon fill="#f9f6f1" /> : <Sun fill="yellow" />}
    </Button>
  );
}
