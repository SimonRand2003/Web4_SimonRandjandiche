'use client';
import { useEffect, useState } from 'react';

interface Movie {
    _id: string;
    _title: string;
}

const RatingPage = () => {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [rating, setRating] = useState<number | null>(null);
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
        setRating(Number(e.target.value));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/ratings/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    rating,
                    movie_id: movie?._id,
                    user_id: localStorage.user.toString().split(",")[1].split(":")[1],
                }),
            });
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Rate movie {movie._title}</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Rating:
                    <select value={rating ?? ''} onChange={handleRatingChange}>
                        <option value="">Please select a rating</option>
                        {[...Array(10)].map((_, i) => (
                            <option key={i} value={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default RatingPage;
