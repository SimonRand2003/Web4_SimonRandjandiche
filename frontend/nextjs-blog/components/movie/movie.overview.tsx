import React, { useState } from 'react';
import { Movie } from "../../types/interfaces";
import Link from "next/link";
import movieService from '../../services/movie.service';
import {router} from "next/client";

type Props = {
    movie: Movie;
};

const MovieComponent: React.FC<Props> = ({ movie }) => {
    const { movieid, title, releaseDate, duration, genres } = movie;
    const genreNames = genres.map((genre) => genre.name);
    const genreString = genreNames.join(', ');
    const formattedDate = releaseDate.split('T')[0];

    const handleAddToListClick = () => {
            movieService.addUserToMovie(movie.movieid);
            router.push('/movielist');
    };

    return (
        <tr>
            <td>{movieid}</td>
            <td>{title}</td>
            <td>{formattedDate}</td>
            <td>{duration}</td>
            <td>{genreString}</td>

            <td>
                <button onClick={handleAddToListClick}>
                    <a>Add to list</a>
                </button>
            </td>
            <td className="btn btn-secondary">
                <Link href={{ pathname: '../rate', query: { movieId: movieid } }}>
                    Rate
                </Link>
            </td>
        </tr>
    );
};

type MovieOverviewProps = {
    movies: Movie[];
};

const MovieOverview: React.FC<MovieOverviewProps> = ({ movies }) => {


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
                </tr>
                </thead>
                <tbody>
                {movies.map((movie) => (
                    <MovieComponent
                        key={movie.movieid}
                        movie={movie}
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default MovieOverview;
