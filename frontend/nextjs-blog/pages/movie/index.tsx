'use client';
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header';
import MovieOverview from "../../components/movie/movie.overview";
import { Movie} from '../../types/interfaces';
import  movieService from '../../services/movie.service';

const movies: React.FC = () => {
    const [movies, setMovies] = React.useState<Movie[]>([]);
    const getMovies = async () => {
        const movies = await movieService.getMovies();
        setMovies(movies);
    };

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <>
            <Header></Header>
            <main>
                <MovieOverview movies={movies}></MovieOverview>
            </main>
        </>
    )
}


export default movies;
