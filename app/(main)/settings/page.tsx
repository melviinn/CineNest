import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CineNest - Settings",
  description: "Manage your application settings here.",
};

export default function SettingsPage() {
  return (
    <div>
      <h1>Settings Page</h1>
      <p>Manage your application settings here.</p>
    </div>
  );
}
