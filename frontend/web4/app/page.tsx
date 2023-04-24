'use client';
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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

function MovieComponent({ movie }: { movie: Movie }) {
    const { _movieid, _title, _releaseDate, _duration } = movie;

    return (
        <tr>
            <td>{_movieid}</td>
            <td>{_title}</td>
            <td>{_releaseDate}</td>
            <td>{_duration}</td>
            <td>
                <button className="btn btn-primary">Add to list</button>
            </td>
            <td>
                <button className="btn btn-secondary">Rate</button>
            </td>
        </tr>
    );
}

export default function MoviesPage() {
    const [movies, setMovies] = React.useState<Movie[]>([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getMovies();
            setMovies(data);
        }

        fetchData();
    }, []);


    return (
        <div className="container">
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
                    return <MovieComponent key={movie._movieid} movie={movie} />;
                })}
                </tbody>
            </table>
        </div>
    );
}
