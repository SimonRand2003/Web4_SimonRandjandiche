import { Movie } from '../domain/model/Movie';
import { MovieRepository } from '../domain/data-access/movie.db';

export class MovieService {
    constructor(private readonly movieRepository: MovieRepository) {}

    public async getAllMovies(): Promise<Movie[]> {
        return this.movieRepository.getAll();
    }

    public async getMovieById(id: number): Promise<Movie | null> {
        return this.movieRepository.getById(id);
    }

    public async addMovie(movie: Movie): Promise<void> {
        await this.movieRepository.add(movie);
    }

    public async updateMovie(movie: Movie): Promise<void> {
        await this.movieRepository.update(movie);
    }

    public async deleteMovie(movie: Movie): Promise<void> {
        await this.movieRepository.remove(movie);
    }
}
