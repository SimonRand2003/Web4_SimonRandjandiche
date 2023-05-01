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
    const [userid, setUserid] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const movieId = Array.isArray(router.query.movieId)
        ? router.query.movieId[0]
        : router.query.movieId;

    const getMovie = async () => {
        const movie = await movieService.getMovie(movieId);
        console.log(movie);
        setMovie(movie);
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
            const userid = parseInt(localStorage.user?.toString().split(",")[0].split(":")[1] ?? "");
            setUserid(userid);
            await movieService.rateMovie(rating, comment, movieid, userid);
            router.push('/movie');
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
