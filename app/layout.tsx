import Navbar from "@/components/Navbar";
import "dotenv/config";
import type { Metadata } from "next";
import { IBM_Plex_Sans, Manrope, Outfit } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
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
      <body
        className={`${manrope.variable} ${outfit.variable} ${ibmPlexSans.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
