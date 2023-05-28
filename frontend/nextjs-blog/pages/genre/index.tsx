'use client';
import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header';
import GenreOverview from "../../components/genre/overview";
import { Genre } from '../../types/interfaces';
import genreService from '../../services/genre.service';

const Genres: React.FC = () => {
    const [genres, setGenres] = React.useState<Genre[]>([]);
    const [authError, setAuthError] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const getGenres = async () => {
        setError(null)
        setAuthError(null)
        try {
            const response = await genreService.getGenres();
            if (!response.ok) {
                if (response.status === 401) {
                    setAuthError("You are not authorized to view this page. Please log in.");
                }else {
                    const errorMessage = await response.text();
                    setError(errorMessage);
                }
            }else {
                const genres = await response.json();
                setGenres(genres);
            }
        }catch (error) {
            setError('An error occurred on the server. Please try again later.');
        }

    };

    useEffect(() => {
        getGenres();
    }, []);

    const handleGenreDeleted = async (genre)=> {
        const response = await genreService.deleteGenre(genre.genreid);
        debugger;
        if (!response.ok) {
            const errorMessage = await response.json();
            setError(errorMessage.error)
        }else {
        getGenres();
        }
    };

    return (
        <>
            <Header />
            <main>
                <GenreOverview
                    genres={genres}
                    onGenreDeleted={handleGenreDeleted}
                    authError={authError}
                    error={error}
                />
            </main>
        </>
    );
};

export default Genres;
