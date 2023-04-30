import { PrismaClient } from '@prisma/client';
import { Movie } from '../model/Movie';
import { mapToMovie, mapToMovies } from './movie.mapper';


class MovieRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async addMovieWithGenre(movie: Movie) {
        console.log(movie);
        const genreIds = movie.genres.map((genre) => ({ genreid: genre.genreid }));
        const releaseDate = new Date(movie.releaseDate).toISOString();
        await this.prisma.movie.create({
            data: {
                title: movie.title,
                releaseDate: releaseDate,
                duration: movie.duration,
                genres: {
                    connect: genreIds

                },
                users: {},
                ratings: {},
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


    async updateMovie(id: number, movie: Movie) {
        await this.prisma.movie.update({
            where: {
                movieid: id,
            },
            data: {
                title: movie.title,
                releaseDate: movie.releaseDate,
                duration: movie.duration,
            },
        });


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
