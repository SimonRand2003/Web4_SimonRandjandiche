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
    const [titleErrorMessage, setTitleErrorMessage] = useState('');
    const [releaseDateErrorMessage, setReleaseDateErrorMessage] = useState('');
    const [durationErrorMessage, setDurationErrorMessage] = useState('');
    const [genreErrorMessage, setGenreErrorMessage] = useState('');

    useEffect(() => {
        const fetchGenres = async () => {
            const fetchedGenres = await genreService.getGenres();
            setGenres(fetchedGenres);
        };
        fetchGenres();
    }, []);

    const validateTitle = (title: string) => {
        if (!title || title.length < 3) {
            setTitleErrorMessage('Title is required and must be at least 3 characters long');
            return false;
        }
        setTitleErrorMessage('');
        return true;
    }

    const validateReleaseDate = (releaseDate: string) => {
        if (!releaseDate) {
            setReleaseDateErrorMessage('Release Date is required');
            return false;
        } else {
            const releaseDateObj = new Date(releaseDate);
            const releaseYear = releaseDateObj.getFullYear();
            const currentYear = new Date().getFullYear();
            if (releaseYear < 1888 || releaseYear > currentYear + 1) {
                setReleaseDateErrorMessage('Release Date must be between 1888 and next year');
                return false;
            }
        }
        setReleaseDateErrorMessage('');
        return true;
    }


    const validateDuration = (duration: number) => {
        if (!duration || duration < 1 || duration > 51420) {
            setDurationErrorMessage('Duration is required and must be between 1 and 51420 minutesZ');
            return false;
        }
        setDurationErrorMessage('');
        return true;
    }
    const validateGenres = (genreid: string[]) => {
        if (!genreid || genreid.length === 0) {
            setGenreErrorMessage('At least one genre is required');
            return false;
        }
        setGenreErrorMessage('');
        return true;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isTitleValid = validateTitle(title);
        const isReleaseDateValid = validateReleaseDate(releaseDate);
        const isDurationValid = validateDuration(duration);
        const isGenresValid = validateGenres(genreid);
        if (isTitleValid && isReleaseDateValid && isDurationValid && isGenresValid) {
            const movie = {
                movieid: null,
                title: title,
                releaseDate: releaseDate,
                duration: duration,
                genres: genreid.map((id) =>
                    ({ genreid: parseInt(id), name: 'dummy', description: 'dummy' })),
                ratings: null // convert genre ids to genre objects
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
                        titleErrorMessage={titleErrorMessage}
                        releaseDateErrorMessage={releaseDateErrorMessage}
                        durationErrorMessage={durationErrorMessage}
                        genreErrorMessage={genreErrorMessage}
                    />

                </div>
            </div>
        </>
    );
};

export default AddMoviePage;
