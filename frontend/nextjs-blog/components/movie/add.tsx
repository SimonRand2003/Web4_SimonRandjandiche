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
    addEdit: string;
    errorMessage: string;
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
                                           addEdit,
                                           errorMessage
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
                <label htmlFor="title">Title:</label>
                {errorMessage && (
                    <div className="alert alert-danger">
                        {errorMessage.split(':').map((message, index) => (
                            <div key={index}>{message}</div>
                        ))}
                    </div>
                )}
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
                <label htmlFor="release-date">Release date:</label>
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
                <label htmlFor="duration">Duration (minutes):</label>
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
                {genres?.length > 0 ? (
                    genres.map((genre) => (
                        <div key={genre.genreid} className="form-check">
                            <input
                                type="checkbox"
                                id={`genre-${genre.genreid}`}
                                value={genre.genreid}
                                onChange={handleGenreChange}
                                checked={genreid.includes(genre.genreid.toString())}
                                className="form-check-input"
                            />
                            <label htmlFor={`genre-${genre.genreid}`} className="form-check-label">
                                {genre.name}
                            </label>
                        </div>
                    ))
                ) : (
                    <div>There are no genres to display..</div>
                )}
            </div>
            <button type="submit" className="btn btn-primary">
                {addEdit}
            </button>
        </form>
    );
};

export default AddMovieForm;
