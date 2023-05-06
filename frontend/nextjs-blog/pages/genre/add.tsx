import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header';
import AddGenreForm from '../../components/genre/add';
import {useRouter} from "next/router";
import genreService from "../../services/genre.service";


const AddGenrePage: React.FC = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const genre = {
            genreid: null,
            name: name,
            description: description
        };
        try {
            await genreService.addGenre(genre);
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
                    <h1>Add a genre</h1>
                    <AddGenreForm
                        name={name}
                        description={description}
                        setName={setName}
                        setDescription={setDescription}
                        handleSubmit={handleSubmit}
                        addEdit={'Add Genre'}
                    />
                </div>
            </div>
        </>
    );
};

export default AddGenrePage;
