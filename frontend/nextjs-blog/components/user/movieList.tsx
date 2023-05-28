import React from 'react';
import { Movie } from "../../types/interfaces";
import Link from "next/link";
import movieService from "../../services/movie.service";
import {router} from "next/client";

type Props = {
    movie: Movie;
    onRemoveMovie: (movieId: number) => void;
};
type MovieOverviewProps = {
    movies: Movie[];
    onRemoveMovie: (movieId: number) => void;
    error?: string;
};
const MovieComponent: React.FC<Props> = ({ movie, onRemoveMovie }) => {
    const { movieid, title, releaseDate, duration, genres } = movie;
    const genreNames = genres.map((genre) => genre.name);
    const genreString = genreNames.join(', ');
    const formattedDate = releaseDate.split('T')[0];


    const handleRemoveMovieClick = () => {
        movieService.removeUserFromMovie(movieid)
            .then(() => {
                onRemoveMovie(movieid);
            });
    };

    return (
        <tr>
            <td>{movieid}</td>
            <td>{title}</td>
            <td>{formattedDate}</td>
            <td>{duration}</td>
            <td>{genreString}</td>
            <td>
                <button onClick={handleRemoveMovieClick}>remove</button>
            </td>
            <td className="btn btn-secondary">
                <Link href={{ pathname: '../rate', query: { movieId: movieid } }}>
                    Rate
                </Link>
            </td>
        </tr>
    );
};



const MovieList: React.FC<MovieOverviewProps> = ({ movies, onRemoveMovie ,error}) => {
    if (error) {
        return (
            <div className="container">
                <h1>Movie List</h1>
                <div className="alert alert-danger">{error}</div>
            </div>
        );
    }
    return (
        <div className="container">
            <h1>Movie List</h1>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Release Date</th>
                    <th>Duration</th>
                    <th>Genres</th>
                    <th>Remove</th>
                    <th>Rate</th>
                </tr>
                </thead>
                <tbody>
                {movies.map((movie) => {
                    return (
                        <MovieComponent
                            key={movie.movieid}
                            movie={movie}
                            onRemoveMovie={onRemoveMovie}
                        />
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default MovieList;