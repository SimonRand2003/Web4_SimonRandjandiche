import { PrismaClient, Prisma } from '@prisma/client';
import { Genre } from '../model/Genre';
import { mapToGenre, mapToGenres } from './genre.mapper';

class GenreRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async addGenre(genre: Genre){
        try {
            mapToGenre(genre)
            await this.prisma.genre.create({
                data: {
                    name: genre.name,
                    description: genre.description,
                },
            });
        } catch (error) {
            throw new Error(error.message);
        }

    }

    async getGenreById(id: number): Promise<Genre> {
        const genre = await this.prisma.genre.findUnique({
            where: {
                genreid: id,
            },
        });
        return genre ? mapToGenre(genre): undefined;
    }

    async getAllGenres(): Promise<Genre[]> {
        const genres = await this.prisma.genre.findMany({
            orderBy: {genreid: 'asc'}
        });
        return mapToGenres(genres)
    }





    async updateGenre(id: number, genre: Genre) {
        try {
            mapToGenre(genre);
            await this.prisma.genre.update({
                where: {
                    genreid: id,
                },
                data: {
                    name: genre.name,
                    description: genre.description,
                },
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new Error('A genre with the same name already exists.');
            }
            throw new Error(error.message);
        }
    }


    async deleteGenre(id: number): Promise<void> {
        const genre = await this.prisma.genre.findUnique({
            where: { genreid: id },
            include: { movies: true },
        });

        if (genre.movies.length > 0) {
            throw new Error('This genre is still in use and cannot be deleted.');
        }

        await this.prisma.genre.delete({
            where: { genreid: id }
        });
    }



    async close(): Promise<void> {
        await this.prisma.$disconnect();
    }


}

export { GenreRepository };


