-- CreateTable
CREATE TABLE "Genre" (
    "genreid" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("genreid")
);

-- CreateTable
CREATE TABLE "Movie" (
    "movieid" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("movieid")
);

-- CreateTable
CREATE TABLE "Rating" (
    "ratingid" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "movieid" INTEGER NOT NULL,
    "userid" INTEGER NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("ratingid")
);

-- CreateTable
CREATE TABLE "User" (
    "userid" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userid")
);

-- CreateTable
CREATE TABLE "_GenreMovies" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UserMovies" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_userid_movieid_key" ON "Rating"("userid", "movieid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_GenreMovies_AB_unique" ON "_GenreMovies"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreMovies_B_index" ON "_GenreMovies"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserMovies_AB_unique" ON "_UserMovies"("A", "B");

-- CreateIndex
CREATE INDEX "_UserMovies_B_index" ON "_UserMovies"("B");

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_movieid_fkey" FOREIGN KEY ("movieid") REFERENCES "Movie"("movieid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreMovies" ADD CONSTRAINT "_GenreMovies_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre"("genreid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreMovies" ADD CONSTRAINT "_GenreMovies_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie"("movieid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserMovies" ADD CONSTRAINT "_UserMovies_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("movieid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserMovies" ADD CONSTRAINT "_UserMovies_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userid") ON DELETE CASCADE ON UPDATE CASCADE;
