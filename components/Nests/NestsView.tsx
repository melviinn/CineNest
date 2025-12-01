// components/NestsViewClient.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import NestCard from "./NestCard";

export default function NestsView({ initialNests, user }: { initialNests: any[], user: any }) {
  const [nests, setNests] = useState(initialNests);
  const [sharedNests, setSharedNests] = useState(initialNests.filter(nest => nest.isShared));

  const createNewNest = async () => {
    const res = await fetch("/api/nests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "New Nest", ownerId: user.id }),
    });
    if (!res.ok) return;

    const newNest = await res.json();
    setNests([...nests, newNest]);
  };

  return (
    <div>
      <Button onClick={createNewNest}>Create Nest</Button>
      <div className="flex flex-wrap gap-4 mt-4">
        {nests.map((nest) => (
          <NestCard key={nest.nestId} nest={nest} />
        ))}
      </div>
      <div className="flex flex-wrap gap-4 mt-4">
        {sharedNests.map((nest) => (
          <NestCard key={nest.nestId} nest={nest} shared />
        ))}
      </div>
    </div>
  );
}
