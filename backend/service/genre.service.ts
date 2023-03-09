import { Genre } from "../domain/model/Genre";
import { GenreRepository } from '../domain/data-access/genre.db';

export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    public async getAllGenres(): Promise<Genre[]> {
        return this.genreRepository.getAllGenres();
    }

    public async getGenreById(id: number): Promise<Genre | null> {
        return this.genreRepository.getGenreById(id);
    }

    public async addGenre(genre: Genre): Promise<void> {
        await this.genreRepository.addGenre(genre);
    }

    public async updateGenre(genre: Genre): Promise<void> {
        await this.genreRepository.updateGenre(genre);
    }

    public async deleteGenre(id: number): Promise<void> {
        await this.genreRepository.deleteGenre(id);
    }
}
