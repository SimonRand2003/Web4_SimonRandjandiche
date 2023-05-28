'use client';
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header';
import { Movie } from '../../types/interfaces';
import userService from '../../services/user.service';
import MovieList from '../../components/user/movieList';


const Movies: React.FC = () => {
    const [movies, setMovies] = React.useState<Movie[]>([]);
    const [error, setError] = React.useState<string | null>(null);
    const handleRemoveMovie = (movieId: number) => {
        setMovies((prevMovies) => prevMovies.filter((movie) => movie.movieid !== movieId));
    };
    const fetchMovies = async () => {
        try {
            const response = await userService.getMovieList();
            if (!response.ok) {
                if (response.status === 401) {
                    setError("You are not authorized to view this page. Please log in.");
                } else {
                    const errorMessage = await response.statusText;
                    setError(errorMessage);
                }

            }else {
                const movies = await response.json();
                setMovies(movies);
            }
        }catch (error) {
            setError('An error occurred on the server. Please try again later.');
        }

    };

    useEffect(() => {

        fetchMovies();
    }, []);

    return (
        <>
            <Header />
            <main>
                <MovieList movies={movies}
                           onRemoveMovie={handleRemoveMovie}
                            error={error}
                />
            </main>
        </>
    );
};

export default Movies;
