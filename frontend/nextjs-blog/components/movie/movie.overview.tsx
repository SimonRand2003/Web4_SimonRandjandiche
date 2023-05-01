import React, { useState } from 'react';
import { Movie } from "../../types/interfaces";
import Link from "next/link";
import movieService from '../../services/movie.service';
import { useRouter } from "next/router";
type Props = {
    movie: Movie;
    onDelete: () => void;
};

const MovieComponent: React.FC<Props> = ({ movie, onDelete }) => {
    const router = useRouter();
    const { movieid, title, releaseDate, duration, genres } = movie;
    const genreNames = genres.map((genre) => genre.name);
    const genreString = genreNames.join(', ');
    const formattedDate = releaseDate.split('T')[0];

    const handleAddToListClick = () => {
            movieService.addUserToMovie(movie.movieid);
            router.push('/movielist');
    };

    const handelDeleteClick = async () => {
        await movieService.deleteMovie(movie.movieid);
        onDelete();
        router.push('/movie');
    };
    const handleRateClick = () => {
        router.push({ pathname: '../rate', query: { movieId: movieid } });
    };

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
                <button className="btn btn-secondary" onClick={handleAddToListClick}>
                    <a>Add to list</a>
                </button>
            </td>
            <td>
                <button className="btn btn-secondary" onClick={handleRateClick}>
                    <a>Rate</a>
                </button>
            </td>
            <td>
                <button className="btn btn-danger" onClick={handelDeleteClick}>
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

const MovieOverview: React.FC<MovieOverviewProps> = ({ movies,onMovieDeleted  }) => {


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
