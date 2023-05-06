import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header';
import AddGenreForm from '../../components/genre/add';
import {useRouter} from "next/router";
import genreService from "../../services/genre.service";


const AddGenrePage: React.FC = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [titleOnce , setTitleOnce] = useState('');
    const [description, setDescription] = useState('');

    const genreid = Array.isArray(router.query.genreid)
        ? router.query.genreid[0]
        : router.query.genreid;


    const getGenreInfo = async () => {
        const genre = await genreService.getGenre(genreid);
        setName(genre.name);
        setDescription(genre.description);
        setTitleOnce(genre.name);
    }

    useEffect(() => {
        if (genreid) {
            getGenreInfo();
        }
    }  , [genreid]);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const genre = {
            genreid: parseInt(genreid),
            name: name,
            description: description
        };
        try {
            await genreService.updateGenre(genre);
            router.push('/genre');
        } catch (err: any) {
            console.error(err);
            router.push('/genre');
        }
    };
    return (
        <>
            <Header />
            <div className="container">
                <div className="container mt-5">
                    <h1>Edit the genre: {titleOnce}</h1>
                    <AddGenreForm
                        name={name}
                        description={description}
                        setName={setName}
                        setDescription={setDescription}
                        handleSubmit={handleSubmit}
                        addEdit={'Edit Genre'}
                    />
                </div>
            </div>
        </>
    );
};

export default AddGenrePage;
