import React from 'react';
import { Genre } from '../../types/interfaces';

interface Props {
    title: string;
    releaseDate: string;
    duration: number | undefined;
    genreid: string[];
    genres: Genre[];
    setTitle: (title: string) => void;
    setReleaseDate: (date: string) => void;
    setDuration: (duration: number) => void;
    setGenreId: (genreid: string[]) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AddMovieForm: React.FC<Props> = ({
                                           title,
                                           releaseDate,
                                           duration,
                                           genreid,
                                           genres,
                                           setTitle,
                                           setReleaseDate,
                                           setDuration,
                                           setGenreId,
                                           handleSubmit,
                                       }) => {
    const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedGenreId = e.target.value;
        if (e.target.checked) {
            // add selected genre id to array
            setGenreId([...genreid, selectedGenreId]);
        } else {
            // remove selected genre id from array
            setGenreId(genreid.filter((id) => id !== selectedGenreId));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">Titel:</label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="release-date">Release datum:</label>
                <input
                    type="date"
                    className="form-control"
                    id="release-date"
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="duration">Duur (minuten):</label>
                <input
                    type="number"
                    className="form-control"
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="genre-id">Genres:</label>
                {genres.map((genre) => (
                    <div key={genre.genreid} className="form-check">
                        <input
                            type="checkbox"
                            id={`genre-${genre.genreid}`}
                            value={genre.genreid}
                            onChange={handleGenreChange}
                            className="form-check-input"
                        />
                        <label htmlFor={`genre-${genre.genreid}`} className="form-check-label">
                            {genre.name}
                        </label>
                    </div>
                ))}
            </div>

            <button type="submit" className="btn btn-primary">
                Film toevoegen
            </button>
        </form>
    );
};

export default AddMovieForm;
