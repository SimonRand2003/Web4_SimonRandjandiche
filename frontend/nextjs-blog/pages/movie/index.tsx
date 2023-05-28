'use client';
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header';
import MovieOverview from "../../components/movie/movie.overview";
import { Movie} from '../../types/interfaces';
import  movieService from '../../services/movie.service';

const movies: React.FC = () => {
    const [movies, setMovies] = React.useState<Movie[]>([]);
    const [error, setError] = React.useState<string | null>(null);

    const getMovies = async () => {
        try {
            const response = await movieService.getMovies();
            if (!response.ok) {
                if (response.status === 401) {
                    setError("You are not authorized to view this page. Please log in.");
                } else {
                    const errorMessage = await response.text();
                    setError(errorMessage);
                }
            }else
            {
                const movies = await response.json();
                setMovies(movies);
            }
        }catch (error) {
            setError('An error occurred on the server. Please try again later.');
        }

    };
    useEffect(() => {
        getMovies();
    }, []);
    const handleMovieDeleted = () => {
        getMovies();
    };

    return (
        <>
            <Header></Header>
            <main>
                <MovieOverview movies={movies}
                               onMovieDeleted={handleMovieDeleted}
                               error={error}
                ></MovieOverview>

            </main>
        </>
    )
}


export default movies;
