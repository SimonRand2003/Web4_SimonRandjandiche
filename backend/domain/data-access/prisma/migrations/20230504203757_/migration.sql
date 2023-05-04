/*
  Warnings:

  - A unique constraint covering the columns `[userid,movieid]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Rating_userid_movieid_key" ON "Rating"("userid", "movieid");
