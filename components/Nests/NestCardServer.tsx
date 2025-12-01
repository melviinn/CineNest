// NestCardServer.tsx
import { enrichNestWithStats } from "@/lib/nest-utils";
import NestCard from "./NestCard";

type NestCardServerProps = {
  nest: {
    id: string;
    name: string;
    owner: string;
    membersCount: number;
    moviesCount: number;
    imageUrl?: string | null;
  };
  shared?: boolean;
};

export default async function NestCardServer({
  nest,
  shared,
}: NestCardServerProps) {
  const enrichedNest = await enrichNestWithStats(nest);
  return <NestCard nest={enrichedNest} shared={shared} />;
}
