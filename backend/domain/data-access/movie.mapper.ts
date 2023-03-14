import { RowDataPacket } from 'mysql2';
import { Movie } from '../model/movie';
import { Rating } from '../model/rating';

const mapToMovies = (rows: RowDataPacket[]): Movie[] => {
    const result: Movie[] = [];

    rows.forEach(({ movie_id, movie_name, genre, year, duration, rating_id, rating, comment, user_id }) => {
        const movieIndex = result.findIndex((movie) => movie.id === movie_id);
        const ratingObj: Rating = new Rating(rating_id, movie_id, user_id, rating, comment);

        if (movieIndex === -1) {
            const movie: Movie = new Movie(movie_name, genre, year, duration);
            movie.id = movie_id;
            movie.ratings = [ratingObj];
            result.push(movie);
        } else {
            result[movieIndex].ratings.push(ratingObj);
        }
    });

    return result;
};

export default mapToMovies;
