'use client';
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header';
import GenreOverview from "../../components/genre/overview";
import { Genre } from '../../types/interfaces';
import genreService from '../../services/genre.service';

const Genres: React.FC = () => {
    const [genres, setGenres] = React.useState<Genre[]>([]);

    const getGenres = async () => {
        const genres = await genreService.getGenres();
        setGenres(genres);
    };

    useEffect(() => {
        getGenres();
    }, []);

    const handleGenreDeleted = () => {
        getGenres();
    };

    return (
        <>
            <Header />
            <main>
                <GenreOverview
                    genres={genres}
                    onGenreDeleted={handleGenreDeleted}
                />
            </main>
        </>
    );
};

export default Genres;
