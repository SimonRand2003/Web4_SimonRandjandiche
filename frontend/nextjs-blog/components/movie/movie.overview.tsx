import React, {useEffect, useState} from 'react';
import { Movie } from "../../types/interfaces";
import Link from "next/link";
import movieService from '../../services/movie.service';
import { useRouter } from "next/router";
import { Rating } from '../../types/interfaces';
import userService from "../../services/user.service";
import ratingService from "../../services/rating.service";

type Props = {
    movie: Movie;
    onDelete: () => void;
    rating?: Rating;
};

const MovieComponent: React.FC<Props> = ({
                                             movie,
                                             onDelete,
                                         }) => {
    const router = useRouter();
    const { movieid, title, releaseDate, duration, genres } = movie;
    const genreNames = genres.map((genre) => genre.name);
    const genreString = genreNames.join(', ');
    const formattedDate = releaseDate.split('T')[0];
    const [rating, setRating] = useState<Rating>(undefined);
    useEffect(() => {
        async function fetchRatings() {
            const userId = sessionStorage.getItem('userid');
            if (!userId) {
                return;
            }
            const rating = await ratingService.getRatingByUserAndMovieId(userId,movieid);
            setRating(rating);
        }
        fetchRatings();
    }, []);


    const handleAddToListClick = () => {
            movieService.addUserToMovie(movie.movieid);
            router.push('/movielist');
    };

    const handelDeleteClick = async () => {
        await movieService.deleteMovie(movie.movieid);
        onDelete();
    };
    const handleRateClick = () => {
        router.push({ pathname: '../rate', query: { movieId: movieid } });
    };
    const handleEditRatingClick = () => {
        router.push({ pathname: '../rate/editRate', query: { movieId: movieid, ratingId: rating.userid } });
    };

    const handelEditClick = () => {
        router.push({ pathname: '../movie/editMovie', query: { movieId: movieid } });
    }

    return (
        <tr>
            <td>{movieid}</td>
            <td>
                <Link href={{ pathname: '../movie/movieInfo', query: { movieId: movieid } }}>
                    {title}
                </Link>
            </td>
            <td>{formattedDate}</td>
            <td>{duration}</td>
            <td>{genreString}</td>

            <td>
                <button className='btn btn-secondary' onClick={handleAddToListClick}>
                    <a>Add to list</a>
                </button>
            </td>
            <td>
                {rating && rating.userid !== undefined ? (
                    <button className='btn btn-secondary' style={{ width: "80px" }} onClick={handleEditRatingClick}>
                        {rating.rating}
                    </button>
                ) : (
                    <button className='btn btn-secondary' style={{ width: "80px" }} onClick={handleRateClick}>
                        Rate
                    </button>
                )}
            </td>
            <td>
                <button className='btn btn-primary' onClick={handelEditClick}>
                    <a>Edit</a>
                </button>
            </td>
            <td>
                <button className='btn btn-danger' onClick={handelDeleteClick}>
                    <a>Delete</a>
                </button>
            </td>
        </tr>
    );
};

type MovieOverviewProps = {
    movies: Movie[];
    onMovieDeleted: () => void; // Add this line
};

const MovieOverview: React.FC<MovieOverviewProps> = ({ movies = [], onMovieDeleted }) => {
    if (!Array.isArray(movies)) {
        return (
            <div className="container">
                <h1>Movies</h1>
                <p>Error: Movies data is not available</p>
            </div>
        );
    }
    return (
        <div className="container">
            <h1>Movies</h1>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Release Date</th>
                    <th>Duration</th>
                    <th>Genres</th>
                    <th>Add to list</th>
                    <th>Rate</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {movies.map((movie) => (
                    <MovieComponent
                        key={movie.movieid}
                        movie={movie}
                        onDelete={onMovieDeleted}
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
};


export default MovieOverview;
