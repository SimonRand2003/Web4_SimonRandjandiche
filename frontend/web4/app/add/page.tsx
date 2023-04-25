'use client';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Components/Header';

interface Movie {
    _movieid: number;
    _title: string;
    _releaseDate: string;
    _duration: number;
}

export default function AddMoviePage() {
    const [newMovie, setNewMovie] = React.useState<Movie>({
        _movieid: 0,
        _title: "",
        _releaseDate: "",
        _duration: 0,
    });

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setNewMovie({ ...newMovie, [name]: value });
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const response = await fetch("http://127.0.0.1:3000/movies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newMovie),
        });
        const data = await response.json();
        setNewMovie({ _movieid: 0, _title: "", _releaseDate: "", _duration: 0 });
    }

    return (
        <div className="container">
            <Header />
            <h1>Add Movie</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="_title" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="_title"
                        name="_title"
                        value={newMovie._title}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="_releaseDate" className="form-label">
                        Release Date
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="_releaseDate"
                        name="_releaseDate"
                        value={newMovie._releaseDate}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="_duration" className="form-label">
                        Duration
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="_duration"
                        name="_duration"
                        value={newMovie._duration}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Add Movie
                </button>
            </form>
        </div>
    );
}
