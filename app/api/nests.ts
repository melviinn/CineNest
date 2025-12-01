// pages/api/nests.ts
import { getUserNestsData } from "@/lib/nest-utils";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET": {
      const userId = req.query.userId as string;
      if (!userId) return res.status(400).json({ error: "Missing userId" });

      try {
        const data = await getUserNestsData(userId);
        return res.status(200).json(data);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
      }
    }

    case "POST": {
      try {
        const { name, ownerId } = req.body;
        if (!name || !ownerId)
          return res.status(400).json({ error: "Missing parameters" });

        // Ici tu peux créer un nouveau Nest avec Prisma
        // const newNest = await prisma.nest.create({ ... });
        // return res.status(201).json(newNest);

        return res.status(201).json({ id: "temp-id", name, ownerId }); // exemple temporaire
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
      }
    }

    default:
      return res.setHeader("Allow", ["GET", "POST"]).status(405).end();
  }
}
