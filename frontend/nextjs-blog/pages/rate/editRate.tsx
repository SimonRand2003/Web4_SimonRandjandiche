import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import Header from "../../components/Header";
import { Movie, Rating } from '../../types/interfaces';
import movieService from '../../services/movie.service';
import EditRateMovieForm from "../../components/movie/editrate";
import ratingService from "../../services/rating.service";
import collectSiblings from "dom-helpers/collectSiblings";

const RatingPage = () => {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>("");
    const [ratingId, setRatingId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const movieId = Array.isArray(router.query.movieId)
        ? router.query.movieId[0]
        : router.query.movieId;

    const getMovie = async () => {
        const movie = await movieService.getMovie(movieId);
        setMovie(movie);
    };

    const getRatingId = async () => {
        const userid = sessionStorage.getItem('userid');
        const response = await ratingService.getRatingByUserAndMovieId(userid,parseInt(movieId ?? ""));
        if (response) {
            setRatingId(response.ratingid);
            setRating(response.rating);
            setComment(response.comment);
        }    };

    useEffect(() => {
        if (movieId) {
            getMovie();
            getRatingId();
        }
    }, [movieId]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const movieid = movie.movieid;
            const ratingid = ratingId;
            const userid = parseInt(sessionStorage.getItem('userid'));
            await movieService.editRateMovie(ratingid, rating, comment, movieid,userid);
            router.push('/movie');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <>
            <Header />
            <EditRateMovieForm
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