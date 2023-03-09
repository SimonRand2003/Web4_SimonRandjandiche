import { Genre } from "../model/Genre";

class GenreRepository {
    private genres: Genre[];
    private nextId: number;


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
