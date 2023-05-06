import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header';
import { Genre } from '../../types/interfaces';
import genreService from '../../services/genre.service';
import movieService from '../../services/movie.service';
import AddMovieForm from '../../components/movie/add';
import { useRouter } from 'next/router';
import userService from "../../services/user.service";

const AddMoviePage: React.FC = () => {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [duration, setDuration] = useState<number>();
    const [genreid, setGenreId] = useState<string[]>([]); // initialize as an empty array
    const [genres, setGenres] = useState<Genre[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        const fetchGenres = async () => {
            const fetchedGenres = await genreService.getGenres();
            setGenres(fetchedGenres);
        };
        fetchGenres();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const movie = {
            movieid: null,
            title: title,
            releaseDate: releaseDate,
            duration: duration,
            genres: genreid.map((id) =>
                ({ genreid: parseInt(id), name: '', description: '' })),
            retings: null// convert genre ids to genre objects
        };



        try {
            const response = await movieService.addMovie(movie);
            if (response.ok) {
                router.push('/movie');
            } else {
                const errorMessage = await response.text();
                setErrorMessage(errorMessage);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Something went wrong');
        }



    };

    return (
        <>
            <Header />
            <div className="container">
                <div className="container mt-5">
                    <h1>Add a movie</h1>
                    <AddMovieForm
                        title={title}
                        releaseDate={releaseDate}
                        duration={duration}
                        genreid={genreid}
                        genres={genres}
                        setTitle={setTitle}
                        setReleaseDate={setReleaseDate}
                        setDuration={setDuration}
                        setGenreId={setGenreId}
                        handleSubmit={handleSubmit}
                        addEdit={'Add Movie'}
                        errorMessage={errorMessage}
                    />
                </div>
            </div>
        </>
    );
};

export default AddMoviePage;
