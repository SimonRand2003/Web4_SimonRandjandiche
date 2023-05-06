import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header';
import { Movie, Genre } from '../../types/interfaces';
import genreService from '../../services/genre.service';
import movieService from '../../services/movie.service';
import AddMovieForm from '../../components/movie/add';
import { useRouter } from 'next/router';

const AddMoviePage: React.FC = () => {
    const router = useRouter();
    const [title, setTitle] = useState<string>('');
    const [releaseDate, setReleaseDate] = useState('');
    const [duration, setDuration] = useState<number>();
    const [genreid, setGenreId] = useState<string[]>([]); // initialize as an empty array
    const [genres, setGenres] = useState<Genre[]>([]);
    const [titleOnce, setTitleOnce] = useState<string>('');

    const movieId = Array.isArray(router.query.movieId)
        ? router.query.movieId[0]
        : router.query.movieId;

    const getMovieInfo = async () => {
        const movie = await movieService.getMovie(movieId);
        setTitle(movie.title);
        setTitleOnce(movie.title)
        const formattedDate = movie.releaseDate.split('T')[0];
        setReleaseDate(formattedDate);
        setDuration(movie.duration);
        setGenreId(movie.genres.map((genre) => genre.genreid.toString()));
    }


    useEffect(() => {
        const fetchGenres = async () => {
            const fetchedGenres = await genreService.getGenres();
            setGenres(fetchedGenres);
        };
        fetchGenres();

        if (movieId) {
            getMovieInfo();
        }
    }, [movieId]);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const movie = {
            movieid: parseInt(movieId),
            title: title,
            releaseDate: releaseDate,
            duration: duration,
            genres: genreid.map((id) =>
                ({ genreid: parseInt(id), name: '', description: '' })),

        };
        try {
            await movieService.editMovie(movie);
            router.push('/movie');
        } catch (err: any) {
            console.error(err);
            router.push('/movie');
        }
    };

    return (
        <>
            <Header />
            <div className="container">
                <div className="container mt-5">
                    <h1>Edit the movie {titleOnce}</h1>
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
                        addEdit={'Edit Movie'}
                    />
                </div>
            </div>
        </>
    );
};

export default AddMoviePage;
