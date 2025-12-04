-- DropForeignKey
ALTER TABLE "NestMovie" DROP CONSTRAINT "NestMovie_nestId_fkey";

-- DropForeignKey
ALTER TABLE "NestShare" DROP CONSTRAINT "NestShare_nestId_fkey";

-- AddForeignKey
ALTER TABLE "NestMovie" ADD CONSTRAINT "NestMovie_nestId_fkey" FOREIGN KEY ("nestId") REFERENCES "Nest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NestShare" ADD CONSTRAINT "NestShare_nestId_fkey" FOREIGN KEY ("nestId") REFERENCES "Nest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
