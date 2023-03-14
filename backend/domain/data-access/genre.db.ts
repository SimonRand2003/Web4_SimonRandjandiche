import { Genre } from "../model/Genre";

class GenreRepository {
    private genres: Genre[] = [];
    private nextId: number = 0;


    public addGenre(genre: Genre): void {
        genre.id = this.nextId;
        this.genres.push(genre);
        this.nextId++;
    }

    public getGenreById(id: number): Genre | undefined {
        return this.genres.find((genre) => genre.id === id);
    }

    public getGenreByName(name: string): Genre | undefined {
        return this.genres.find((genre) => genre.name === name);
    }

    public getAllGenres(): Genre[] {
        return this.genres;
    }
    async updateGenre(genre: Genre): Promise<Genre> {
        const index = this.genres.findIndex(g => g.id === genre.id);
        if (index === -1) {
            throw new Error(`Genre with ID ${genre.id} not found.`);
        }

        this.genres[index] = genre;

        return genre;
    }

    async deleteGenre(id: number): Promise<void> {
        const index = this.genres.findIndex(g => g.id === id);
        if (index === -1) {
            throw new Error(`Genre with ID ${id} not found.`);
        }

        this.genres.splice(index, 1);
    }

}

export { GenreRepository };


/*
import { Genre } from "../model/Genre";
import { PrismaClient } from '@prisma/client';

class GenreRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async addGenre(genre: Genre): Promise<void> {
        await this.prisma.genre.create({
            data: {
                name: genre.name,
                description: genre.description,
            },
        });
    }

    async getGenreById(id: number): Promise<Genre | null> {
        const genre = await this.prisma.genre.findUnique({
            where: { id },
        });

        return genre.id;
    }




    async getAllGenres(): Promise<Genre[]> {
        const genres = await this.prisma.genre.findMany();
        return genres as Genre[];
    }



    async updateGenre(genre: Genre): Promise<Genre> {
        const updatedGenre = await this.prisma.genre.update({
            where: { id: genre.id },
            data: { name: genre.name, description: genre.description },
        });
        return updatedGenre;
    }


    async deleteGenre(id: number): Promise<void> {
        await this.prisma.genre.delete({
            where: { id },
        });
    }

    async disconnect(): Promise<void> {
        await this.prisma.$disconnect();
    }
}

export { GenreRepository };
*/
