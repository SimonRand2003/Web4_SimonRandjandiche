import React from 'react';
import { Genre } from '../../types/interfaces';
import movieService from "../../services/movie.service";
import genreService from "../../services/genre.service";
import {router} from "next/client";
import {useRouter} from "next/router";

type Props = {
    genres: Genre[];
    onGenreDeleted: (genre: Genre) => void;
};

const GenreOverview: React.FC<Props> = ({
                                            genres,
                                            onGenreDeleted,
                                        }) => {
    const handleEditClick = (genre: Genre) => {
        router.push({ pathname: '../genre/edit', query: { genreid: genre.genreid } });
    };
    const router = useRouter();
    const handleDeleteClick = async (genre: Genre) => {
        await genreService.deleteGenre(genre.genreid);
        onGenreDeleted(genre);
    };

    return (
        <div className="container">
            <h1>Genres</h1>
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
                {genres?.length > 0 ? (
                        <div>There are no genres to display..</div>
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
        </div>
    );
};

export default GenreOverview;
