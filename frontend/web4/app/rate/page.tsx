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
            const movieId = movie?._id;
            const userId = parseInt(localStorage.user.toString().split(",")[0].split(":")[1])
            console.log(movie?._id)

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
        } catch (err: any) {
            setError(err.message);
        }
    };


    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <Header />
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3">
                        <h2>Rate movie {movie._title}</h2>
                        {error && <p>{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="ratingSelect">Rating:</label>
                                <select className="form-control" id="ratingSelect" value={rating._rating} onChange={handleRatingChange}>
                                    <option value="">Please select a rating</option>
                                    {[...Array(10)].map((_, i) => (
                                        <option key={i} value={i + 1}>
                                            {i + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="commentTextarea">Comment:</label>
                                <textarea className="form-control" id="commentTextarea" value={rating._comment} onChange={handleCommentChange} />
                            </div>
                            <input type="hidden" name="movieId" value={movie?._id} />
                            <input type="hidden" name="userId" value={localStorage.user.toString().split(",")[0].split(":")[1]} />
                            <button className="btn btn-primary" type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RatingPage;
