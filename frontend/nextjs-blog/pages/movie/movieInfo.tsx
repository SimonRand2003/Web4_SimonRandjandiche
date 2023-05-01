import React, { useEffect, useState } from 'react';
import { Movie } from "../../types/interfaces";
import movieService from "../../services/movie.service";
import Header from "../../components/Header";
import { useRouter } from "next/router";
import MovieInfoComponent from "../../components/movie/info";
import 'bootstrap/dist/css/bootstrap.min.css';
const MovieInfo: React.FC = () => {
    const router = useRouter();
    const [movie, setMovie] = useState<Movie>();
    const movieId = Array.isArray(router.query.movieId)
        ? router.query.movieId[0]
        : router.query.movieId;

    const getMovieInfo = async () => {
        const movie = await movieService.getMovie(movieId);
        console.log(movie);
        setMovie(movie);
    }

    useEffect(() => {
        if (movieId) {
            getMovieInfo();
        }
    }, [movieId]);

    return (
        <>
            <Header />
            <main>
                {movie && <MovieInfoComponent movie={movie} />}
            </main>
        </>
    )
}

export default MovieInfo;
