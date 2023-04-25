'use client';
import { useEffect, useState } from 'react';

interface Movie {
    id: string;
    _title: string;
}

const RatingPage = () => {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [rating, setRating] = useState<number | null>(null);

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`Rating ${rating} for movie ${movie?.title}`);
        // TODO: Send the rating to the server
    };

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Rate movie {movie._title}</h2>
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
