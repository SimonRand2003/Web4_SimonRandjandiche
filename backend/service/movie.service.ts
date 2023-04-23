import { Movie } from '../domain/model/Movie';
import { MovieRepository } from '../domain/data-access/movie.db';

export class MovieService {
    constructor(private readonly movieRepository: MovieRepository) {}

    public async getAllMovies(): Promise<Movie[]> {
        return this.movieRepository.getAllMovies();
    }

    public async getMovieById(id: number): Promise<Movie | null> {
        return this.movieRepository.getMovieById(id);
    }

    public async addMovie(movie: Movie): Promise<void> {
        await this.movieRepository.addMovieWithGenre(movie);
    }

    public async updateMovie(id : number,movie: Movie): Promise<void> {
        await this.movieRepository.updateMovie(id,movie);
    }

    public async deleteMovie(movie: number): Promise<void> {
        await this.movieRepository.deleteMovie(movie);
    }
}
