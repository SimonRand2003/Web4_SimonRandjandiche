import { Genre } from "../domain/model/Genre";
import { GenreRepository } from '../domain/data-access/genre.db';

export class GenreService {
    constructor(private readonly genreRepository: GenreRepository) {}

    public async getAllGenres(){
        return this.genreRepository.getAllGenres();
    }

    public async getGenreById(id: number) {
        return this.genreRepository.getGenreById(id);
    }

    public async addGenre(genre: Genre): Promise<void> {
        await this.genreRepository.addGenre(genre);
    }

    public async updateGenre(id: number,genre: Genre): Promise<void> {

        await this.genreRepository.updateGenre(id,genre);
    }

    public async deleteGenre(id: number): Promise<void> {
        await this.genreRepository.deleteGenre(id);
    }
}
