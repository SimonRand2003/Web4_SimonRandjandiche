import { Movie } from "../domain/model/Movie";

class MovieService {
    private movies: Movie[];

    getAllMovies(): Movie[] {
        return this.movies;
    }

    getMovieById(id: number): Movie {
        return this.movies.find((movie) => movie.id === id);
    }

    addMovie(movie: Movie): void {
        this.movies.push(movie);
    }

    filterMoviesByGenre(genre: string): Movie[] {
        return this.movies.filter((movie) => movie.genre === genre);
    }

    filterMoviesByYear(year: number): Movie[] {
        return this.movies.filter((movie) => movie.year === year);
    }

    filterMoviesByDuration(minDuration: number, maxDuration: number): Movie[] {
        return this.movies.filter(
            (movie) => movie.duration >= minDuration && movie.duration <= maxDuration
        );
    }

}

export { MovieService };