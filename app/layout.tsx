import { Toaster } from "@/components/ui/sonner";
import "dotenv/config";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CineNest",
  description: "Your collaborative movies watchlist/boards with friends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} antialiased`}>
        {children}
        <Toaster richColors theme="light" position="bottom-right" />
      </body>
    </html>
  );
}
