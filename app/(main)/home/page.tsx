import { HomePage } from "./home-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CineNest - Home",
  description: "Welcome to CineNest, your collaborative movies watchlist/boards with friends.",
};

export default function Home() {
  return <HomePage />;
}
