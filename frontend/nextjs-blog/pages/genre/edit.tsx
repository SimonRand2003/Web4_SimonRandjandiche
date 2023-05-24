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
    const [errorMessage, setErrorMessage] = useState('');
    const [ nameErrorMessage, setNameErrorMessage] = useState('');
    const [descriptionErrorMessage, setDescriptionErrorMessage] = useState('');

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
    const validateName = (name: string) => {
        if (!name || name.length < 3) {
            setNameErrorMessage('Name is required and must be at least 3 characters long');
            return false;
        }
        setNameErrorMessage('');
        return true;
    }

    const validateDescription = (description: string) => {
        if (!description || description.length < 3) {
            setDescriptionErrorMessage('Description is required and must be at least 3 characters long');
            return false;
        }
        setDescriptionErrorMessage('');
        return true;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage('');    
        const isNameValid = validateName(name);
        const isDescriptionValid = validateDescription(description);
        if (isNameValid && isDescriptionValid) {
            const genre = {
                genreid: parseInt(genreid),
                name: name,
                description: description
            };
            try {
                const response = await genreService.updateGenre(genre);
                if (response.ok) {
                    router.push('/genre');
                }else{
                    const errorMessage = await response.text();
                    setErrorMessage(errorMessage);
                }
            } catch (err: any) {
                setErrorMessage('There was an error updating the genre. Please try again.');
                console.error(err);
            }
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
                        errorMessage={errorMessage}
                        nameErrorMessage={nameErrorMessage}
                        descriptionErrorMessage={descriptionErrorMessage}
                    />
                </div>
            </div>
        </>
    );
};

export default AddGenrePage;
