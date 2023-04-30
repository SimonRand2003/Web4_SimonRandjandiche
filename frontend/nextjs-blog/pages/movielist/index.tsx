'use client';
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header';
import { Movie } from '../../types/interfaces';
import movieService from '../../services/user.service';
import MovieList from '../../components/user/movieList';


const Movies: React.FC = () => {
    const [movies, setMovies] = React.useState<Movie[]>([]);

    const handleRemoveMovie = (movieId: number) => {
        setMovies((prevMovies) => prevMovies.filter((movie) => movie.movieid !== movieId));
    };

    useEffect(() => {
        const fetchMovies = async () => {
            const movies = await movieService.getMovieList();
            setMovies(movies);
        };
        fetchMovies();
    }, []);

    return (
        <>
            <Header />
            <main>
                <MovieList movies={movies} onRemoveMovie={handleRemoveMovie} />
            </main>
        </>
    );
};

export default Movies;
