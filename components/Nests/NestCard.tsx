"use client";

import SinisterImage from "@/public/sinister.jpg";
import { Film, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Card, CardFooter, CardHeader } from "../ui/card";

interface NestCardProps {
  nest: {
    title: string;
    owner: string;
    membersCount: number;
    moviesCount: number;
    nestId: string;
    imageUrl?: string;
  };
  shared?: boolean;
  user: any;
}

const NestCard = ({ nest, shared, user }: NestCardProps) => {
  const [open, setOpen] = useState(false);

  const onHoverMembers = () => {
    setOpen(true);
  };

  if (!nest) return null;
  if (!user) return null;

  if (nest.owner === user.name) {
    nest.owner = "you";
  }

  return (
    <Link
      href={`/nests/${nest.nestId}`}
      className="w-full max-w-68"
      key={nest.nestId}
    >
      <Card className="group cursor-pointer pt-0 transition-all hover:scale-105 hover:shadow-lg">
        <CardHeader className="relative h-48 overflow-hidden">
          <Image
            src={nest.imageUrl || SinisterImage}
            alt={nest.title || "Nest Image"}
            fill
            sizes="100%"
            className="rounded-lg object-cover"
          />
          {shared && (
            <div className="bg-accent text-accent-foreground absolute top-3 right-3 rounded px-2 py-1 text-xs font-medium">
              Shared
            </div>
          )}
        </CardHeader>
        <CardFooter className="flex flex-col items-start space-y-3">
          <div>
            <h3 className="text-foreground text-lg font-medium transition-colors">
              {nest.title}
            </h3>
            <p className="text-muted-foreground text-sm">by {nest.owner}</p>
          </div>

          <div className="text-muted-foreground flex gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Film className="h-4 w-4" />
              <span>{nest.moviesCount} movie(s)</span>
            </div>
            <div
              className="flex items-center gap-1"
              onMouseEnter={() => {
                console.log("test");
              }}
            >
              <Users className="h-4 w-4" />
              <span>{nest.membersCount} member(s)</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default NestCard;
