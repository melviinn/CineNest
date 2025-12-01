// Cette fonction récupère les membersCount depuis NestShare et moviesCount depuis NestMovie
import { prisma } from "@/lib/prisma" // À adapter selon votre configuration

export async function enrichNestWithStats(nest: any) {
  const membersCount = await prisma.nestShare.count({
    where: { nestId: nest.id },
  })

  const moviesCount = await prisma.nestMovie.count({
    where: { nestId: nest.id },
  })

  const owner = await prisma.user.findUnique({
    where: { id: nest.ownerId },
    select: { name: true },
  })

  return {
    nestId: nest.id,
    title: nest.name,
    owner: owner?.name || "Unknown",
    moviesCount: moviesCount,
    membersCount: membersCount + 1, // +1 pour inclure le propriétaire
    imageUrl: nest.image || "/placeholder.svg",
  }
}

export async function enrichNestsWithStats(nests: any[]) {
  return Promise.all(nests.map(enrichNestWithStats))
}

export async function getUserNestsData(userId: string) {
  // Récupérer les nests de l'utilisateur
  const rawMyNests = await prisma.nest.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "desc" },
  })

  // Récupérer les nests partagés avec l'utilisateur
  const rawSharedNests = await prisma.nestShare.findMany({
    where: { userId },
    include: { nest: true },
    orderBy: { sharedAt: "desc" },
  })

  // Enrichir les deux listes avec les stats
  const myNests = await enrichNestsWithStats(rawMyNests)
  const sharedNests = await enrichNestsWithStats(rawSharedNests.map((share) => share.nest))

  return { myNests, sharedNests }
}
