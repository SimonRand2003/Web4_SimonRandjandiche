-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_movieid_fkey";

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_movieid_fkey" FOREIGN KEY ("movieid") REFERENCES "Movie"("movieid") ON DELETE CASCADE ON UPDATE CASCADE;
