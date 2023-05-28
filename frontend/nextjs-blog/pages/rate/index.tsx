import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import Header from "../../components/Header";
import { Movie, Rating } from '../../types/interfaces';
import movieService from '../../services/movie.service';
import RateMovieForm from '../../components/movie/rate';

const RatingPage = () => {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const movieId = Array.isArray(router.query.movieId)
        ? router.query.movieId[0]
        : router.query.movieId;

    const getMovie = async () => {
        try {
            const response = await movieService.getMovie(movieId);
            if (!response.ok) {
                if (response.status === 401) {
                    router.push('../error');
                }

            }else {
                const movie = await response.json();
                setMovie(movie);
            }
        }catch (error) {
            setError('An error occurred on the server. Please try again later.');
        }

    }
    useEffect(() => {
        if (movieId) {
            getMovie();
        }
    }, [movieId]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const movieid = movie.movieid;
            const id = parseInt(sessionStorage.getItem('userid'));
            const response = await movieService.rateMovie(rating, comment, movieid, id);
            console.log(response.status);
            if (response.ok) {
                router.push('/movie');
            }else if (response.status === 401) {
                setError("You are not authorized to rate this movie.");
            }else {
                const errorMessage = await response.text();
                setError(errorMessage);
            }

        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <>
            <Header />
            <RateMovieForm
                rating={rating}
                comment={comment}
                movie={movie}
                setRating={setRating}
                setComment={setComment}
                handleSubmit={handleSubmit}
                error={error}
            />
        </>
    );
};

export default RatingPage;
