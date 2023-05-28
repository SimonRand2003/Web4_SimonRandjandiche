import React from 'react';
import { Genre } from '../../types/interfaces';
import movieService from "../../services/movie.service";
import genreService from "../../services/genre.service";
import { router } from "next/client";
import { useRouter } from "next/router";

type Props = {
    genres: Genre[];
    onGenreDeleted: (genre: Genre) => void;
    authError: string | null;
    error: string | null;
};

const GenreOverview: React.FC<Props> = ({
                                            genres,
                                            onGenreDeleted,
                                            authError,
                                            error,
                                        }) => {
    const handleEditClick = (genre: Genre) => {
        router.push({ pathname: '../genre/edit', query: { genreid: genre.genreid } });
    };

    const router = useRouter();

    const handleDeleteClick = async (genre: Genre) => {
            onGenreDeleted(genre);
    };
    return (
        <div className="container">
            <h1>Genres</h1>
            {error && (
                <div className="alert alert-danger">{error}</div>
            )}
            {authError ? (
                <div className="alert alert-danger">{authError}</div>
            ) : (
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {genres?.length < 1 ? (
                        <tr>
                            <td colSpan={5}>There are no genres to display.</td>
                        </tr>
                    ) : (
                        genres?.map((genre) => (
                            <tr key={genre.genreid}>
                                <td>{genre.genreid}</td>
                                <td>{genre.name}</td>
                                <td>{genre.description}</td>
                                <td>
                                    <button className='btn btn-primary' onClick={() => handleEditClick(genre)}>Edit</button>
                                </td>
                                <td>
                                    <button className='btn btn-danger' onClick={() => handleDeleteClick(genre)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            )}
        </div>
    );

};

export default GenreOverview;
