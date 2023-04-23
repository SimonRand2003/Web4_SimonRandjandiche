import { Movie as PrismaMovie } from "@prisma/client";
import { Movie } from '../model/Movie';

const mapToMovie = (prismaMovie: PrismaMovie): Movie => {
    return new Movie(
        prismaMovie.movieid,
        prismaMovie.title,
        prismaMovie.releaseDate,
        prismaMovie.duration,
        null
    );
};

const mapToMovies = (prismaMovies: PrismaMovie[]): Movie[] => {
    return prismaMovies.map((prismaMovie) => mapToMovie(prismaMovie));
};

export { mapToMovie, mapToMovies };
