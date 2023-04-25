'use client';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Components/Header';

const AddMovie = () => {
    const [title, setTitle] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [duration, setDuration] = useState('');
    const [genreid, setGenreid] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const movie = {
            title,
            releaseDate: parseInt(releaseDate),
            duration: parseInt(duration),
            genres: [{ genreid: parseInt(genreid) }],
        };

        try {
            const response = await fetch('http://localhost:3000/movies/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movie)
            });
            if (response.ok) {
                alert('Film toegevoegd');
            } else {
                console.error('Er is een fout opgetreden');
            }
        } catch (error) {
            console.error('Er is een fout opgetreden', error);
        }
    };

    return (
        <>
            <Header />
        <div className="container">

            <div className="container mt-5">
                <h1>Voeg movie toe</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Titel:</label>
                        <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="release-date">Release datum:</label>
                        <input type="number" className="form-control" id="release-date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="duration">Duur (minuten):</label>
                        <input type="number" className="form-control" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="genre-id">Genre ID:</label>
                        <input type="number" className="form-control" id="genre-id" value={genreid} onChange={(e) => setGenreid(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Film toevoegen</button>
                </form>
            </div>
        </div>
        </>
    );
};

export default AddMovie;
