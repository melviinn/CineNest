"use client";

import { deleteNest } from "@/app/data/nests/delete-nest";
import SinisterImage from "@/public/sinister.jpg";
import { Film, MoreVertical, Users } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardFooter, CardHeader } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface NestCardProps {
  nest: {
    title: string;
    owner: string;
    membersCount: number;
    moviesCount: number;
    nestId: number;
    imageUrl?: string;
  };
  shared?: boolean;
  user: any;
  onRemove: (id: number) => void;
}

const NestCard = ({ nest, shared, user, onRemove }: NestCardProps) => {
  if (!nest) return null;
  if (!user) return null;

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const isOwner = nest.owner === user.name;

  const handleDeleteNest = (nestId: number) => async () => {
    try {
      await deleteNest(nestId);
      // update the data or UI after deletion:
    } catch (error) {
      toast.error("Failed to delete the nest. Please try again.");
    } finally {
      onRemove(nest.nestId);
      setIsOpen(false);
      toast.info("Nest deleted successfully.", { className: "bg-yellow-600", position: "top-center" });
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Ne pas naviguer si on clique sur le dropdown ou ses enfants
    if (
      (e.target as HTMLElement).closest("[data-dropdown-trigger]") ||
      (e.target as HTMLElement).closest('[role="menu"]')
    ) {
      return;
    }
    router.push(`/nests/${nest.nestId}`);
  };


  return (
    <Card
      className="group cursor-pointer pt-0 transition-all hover:scale-105 hover:shadow-lg"
      onMouseEnter={() => setIsOpen(true)}
      onClick={handleCardClick}
    >
      <CardHeader className="relative h-48 min-h-60 overflow-hidden">
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
        {isOwner && isOpen ? (
          <div className="absolute top-3 right-3 transition-opacity duration-200 active:opacity-100">
            <DropdownMenu onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon-sm"
                  className="bg-background hover:bg-background/70"
                  data-dropdown-trigger
                >
                  <MoreVertical size={20} className="text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  variant="destructive"
                  className="cursor-pointer"
                  onClick={handleDeleteNest(nest.nestId)}
                >
                  Delete Nest
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : null}
      </CardHeader>
      <CardFooter className="flex flex-col items-start space-y-3">
        <div className="w-full text-center">
          <h3 className="text-foreground mb-4 text-lg font-medium">
            {nest.title}
          </h3>
          {isOwner ? (
            ""
          ) : (
            <p className="text-muted-foreground text-sm">by {nest.owner}</p>
          )}
        </div>

        <div className="text-muted-foreground flex gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Badge
              variant="outline"
              className="text-muted-foreground flex h-5 min-w-5 items-center gap-1 rounded-full px-2"
            >
              <Film className="h-4 w-4" />
              {nest.moviesCount} movie(s)
            </Badge>
          </div>
          <div
            className="flex items-center gap-1"
            onMouseEnter={() => {
              console.log("test");
            }}
          >
            <Badge
              variant="outline"
              className="text-muted-foreground flex h-5 min-w-5 items-center gap-1 rounded-full px-2"
            >
              <Users className="h-4 w-4" />
              {nest.membersCount} member(s)
            </Badge>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default NestCard;
