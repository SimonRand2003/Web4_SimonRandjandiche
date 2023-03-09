import { Movie } from '../model/Movie';

class MovieRepository {
    private movies: Movie[];
    private lastId: number;


    async getById(id: number): Promise<Movie> {
        const movie = this.movies.find((m) => m.id === id);
        if (!movie) {
            throw new Error(`Movie with id ${id} not found`);
        }
        return movie;
    }

    async getAll(): Promise<Movie[]> {
        return this.movies;
    }

    async add(movie: Movie): Promise<void> {
        movie.id = ++this.lastId;
        this.movies.push(movie);
    }

    async update(movie: Movie): Promise<void> {
        const index = this.movies.findIndex((m) => m.id === movie.id);
        if (index === -1) {
            throw new Error(`Movie with id ${movie.id} not found`);
        }
        this.movies[index] = movie;
    }

    async remove(movie: Movie): Promise<void> {
        const index = this.movies.findIndex((m) => m.id === movie.id);
        if (index === -1) {
            throw new Error(`Movie with id ${movie.id} not found`);
        }
        this.movies.splice(index, 1);
    }
}

export { MovieRepository };
