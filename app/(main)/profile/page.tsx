import ProfilePage from "./profile-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CineNest - Profile",
  description: "Manage your CineNest profile and settings here.",
};

export default function Profile() {
  return <ProfilePage />;
}
