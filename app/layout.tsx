import Navbar from "@/components/Navbar";
import ThemeProviders from "@/components/ThemeProviders";
import type { Metadata } from "next";
import { Manrope, Outfit, IBM_Plex_Sans } from "next/font/google";
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
      <body className={`${manrope.variable} ${outfit.variable} ${ibmPlexSans.variable} antialiased`}>
        <ThemeProviders>

          <Navbar />
          {children}
        </ThemeProviders>
      </body>
    </html>
  );
}
