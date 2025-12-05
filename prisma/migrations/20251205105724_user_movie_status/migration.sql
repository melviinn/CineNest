/*
  Warnings:

  - You are about to drop the column `status` on the `NestMovie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "NestMovie" DROP COLUMN "status";

-- CreateTable
CREATE TABLE "NestMovieStatus" (
    "id" SERIAL NOT NULL,
    "nestMovieId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "MovieStatus" NOT NULL DEFAULT 'UNWATCHED',
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NestMovieStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NestMovieStatus_nestMovieId_userId_key" ON "NestMovieStatus"("nestMovieId", "userId");

-- AddForeignKey
ALTER TABLE "NestMovieStatus" ADD CONSTRAINT "NestMovieStatus_nestMovieId_fkey" FOREIGN KEY ("nestMovieId") REFERENCES "NestMovie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NestMovieStatus" ADD CONSTRAINT "NestMovieStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
