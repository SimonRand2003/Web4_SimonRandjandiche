'use client';
import React, { useEffect, useState } from 'react';
import Header from "../../Components/Header";

interface Movie {
    _id: string;
    _title: string;
}

interface Rating {
    _id?: string;
    _rating: number;
    _comment: string;
    _movieId: string;
    _userId: string;
}

const RatingPage = () => {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [rating, setRating] = useState<Rating>({ _rating: 0, _comment: '', _movieId: '', _userId: '' });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const pathNameArr = window.location.href.split('=');
        const id = pathNameArr[1];

        fetch(`http://127.0.0.1:3000/movies/${id}`)
            .then(res => res.json())
            .then(data => {
                setMovie(data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRating(prevState => ({ ...prevState, _rating: Number(e.target.value) }));
    };

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setRating(prevState => ({ ...prevState, _comment: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const movieId = movie._movieid
            const userId = parseInt(localStorage.user.toString().split(",")[0].split(":")[1])
            console.log(movie.movieid)

            const response = await fetch('http://localhost:3000/ratings/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    rating: rating._rating,
                    comment: rating._comment,
                    movieId: movieId,
                    userId: userId,
                }),
            });
            window.location.href = '/movie';
        } catch (err) {
            setError(err.message);
        }
    };


    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <Header />
            <div>
                <h2>Rate movie {movie._title}</h2>
                {error && <p>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label>
                        Rating:
                        <select value={rating._rating} onChange={handleRatingChange}>
                            <option value="">Please select a rating</option>
                            {[...Array(10)].map((_, i) => (
                                <option key={i} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <label>
                        Comment:
                        <textarea value={rating._comment} onChange={handleCommentChange} />
                    </label>
                    <br />
                    <hidden name ="movieId" value={movie._id}></hidden>
                    <hidden name ="userId" value={localStorage.user.toString().split(",")[0].split(":")[1]}></hidden>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default RatingPage;
