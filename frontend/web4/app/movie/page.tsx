'use client';
import React, { useEffect } from 'react';
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../Components/Header';

interface Movie {
    _movieid: number;
    _title: string;
    _releaseDate: string;
    _duration: number;
}

async function getMovies() {
    const response = await fetch('http://127.0.0.1:3000/movies');
    const data = await response.json();
    return data as Movie[];
}

function MovieComponent({ movie, onAddToWatchlist }: { movie: Movie, onAddToWatchlist: (movie: Movie) => void }) {
    const { _movieid, _title, _releaseDate, _duration } = movie;

    const handleAddToWatchlist = () => {
        onAddToWatchlist(movie);
    };

    return (
        <tr>
            <td>{_movieid}</td>
            <td>{_title}</td>
            <td>{_releaseDate}</td>
            <td>{_duration}</td>
            <td>
                <button className="btn btn-primary" onClick={handleAddToWatchlist}>Add to list</button>
            </td>
            <td className="btn btn-secondary">
                <Link href={{ pathname: '../rate', query: { movieId: _movieid } }}>
                    Rate
                </Link>
            </td>
        </tr>
    );
}

export default function MoviesPage() {
    const [movies, setMovies] = React.useState<Movie[]>([]);
    const [watchlist, setWatchlist] = React.useState<Movie[]>([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getMovies();
            setMovies(data);
        }

        fetchData();
    }, []);

    const handleAddToWatchlist = (movie: Movie) => {
        setWatchlist(watchlist => [...watchlist, movie]);
    };

    return (
        <div className="container">
            <Header />
            <h1>Movies</h1>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Release Date</th>
                    <th>Duration</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {movies.map((movie) => {
                    return <MovieComponent key={movie._movieid} movie={movie} onAddToWatchlist={handleAddToWatchlist} />;
                })}
                </tbody>
            </table>
            <h2>Watchlist</h2>
            <ul>
                {watchlist.map((movie) => (
                    <li key={movie._movieid}>{movie._title}</li>
                ))}
            </ul>
        </div>
    );
}
