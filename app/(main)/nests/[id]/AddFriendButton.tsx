"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function AddFriendButton({
  nestId,
  isOwner,
  onAdded, // callback après ajout
}: {
  nestId: number;
  isOwner: boolean;
  onAdded: (newData?: any) => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleAddFriend = async () => {
    if (!isOwner) {
      toast.error("Only the owner can add friends to this nest.");
      return;
    }
    const friendName = prompt("Enter friend's name");
    if (!friendName) return;

    setLoading(true);

    const res = await fetch(`/api/nests/${nestId}/add-friend`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ friendName }),
    });

    if (!res.ok) {
      const data = await res.json();
      toast.error(data.error || "Failed to add friend");
      setLoading(false);
      return;
    }

    const newData = await res.json();

    toast.success(`Successfully added ${friendName} as a friend!`);
    setLoading(false);
    onAdded(newData); // refetch les données pour actualiser la liste
  };

  return (
    <Button
      onClick={handleAddFriend}
      disabled={loading}
      variant="outline"
      className="border-border hover:bg-secondary gap-2 rounded-xl bg-transparent"
    >
      {loading ? "Adding..." : "Add a Friend"}
    </Button>
  );
}
