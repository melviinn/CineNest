import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const nestId = Number(id);

    console.log("Fetching nest with id:", nestId);
    console.log("TEST", id);

    if (isNaN(nestId)) {
      return NextResponse.json({ error: "Invalid nest id" }, { status: 400 });
    }

    const nest = await prisma.nest.findUnique({
      where: { id: nestId },
      include: {
        owner: true,
        movies: { include: { movie: true }, orderBy: { addedAt: "asc" } },
        sharedWith: { include: { user: true } },
      },
    });

    if (!nest) {
      return NextResponse.json({ error: "Nest not found" }, { status: 404 });
    }

    // const nestMovies = nest.movies.map((nm) => ({
    //   ...nm.movie,
    //   status: nm.status,
    //   nestMovieId: nm.id,
    //   addedAt: nm.addedAt,
    // }));

    const nestMovies = nest.movies
      .sort((a, b) => a.id - b.id) // stable
      .map((nm) => ({
        ...nm.movie,
        status: nm.status,
        nestMovieId: nm.id,
        addedAt: nm.addedAt,
      }));

    const nestFriends = nest.sharedWith.map((nf) => nf.user);

    return NextResponse.json({
      nest,
      movies: nestMovies,
      friends: nestFriends,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, ownerId } = await req.json();

    if (!name || !ownerId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const nest = await prisma.nest.create({
      data: {
        name,
        ownerId,
      },
    });

    return NextResponse.json(nest, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
