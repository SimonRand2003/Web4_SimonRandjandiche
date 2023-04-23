import { PrismaClient } from '@prisma/client';
import { Movie } from '../model/Movie';
import { mapToMovie, mapToMovies } from './movie.mapper';


class MovieRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async addMovie(movie: Movie) {
        mapToMovie(movie)
        await this.prisma.movie.create({
            data: {
                title: movie.title,
                releaseDate: movie.releaseDate,
                duration: movie.duration,
            },
        });
    }

    async getMovieById(id: number): Promise<Movie> {
        const movie = await this.prisma.movie.findUnique({
            where: {
                movieid: id,
            },
            include: {
                genres: true,
                ratings: true,
                users: true,
            },
        });
        return mapToMovie(movie);
    }

    async getAllMovies(): Promise<Movie[]> {
        const movies = await this.prisma.movie.findMany({
            include: {
                genres: true,
                ratings: true,
                users: true,
            },
        });
        return mapToMovies(movies);
    }



    async deleteMovie(id: number): Promise<void> {
        await this.prisma.movie.delete({
            where: { movieid: id }
        });
    }

    async close(): Promise<void> {
        await this.prisma.$disconnect();
    }
}

export { MovieRepository };
