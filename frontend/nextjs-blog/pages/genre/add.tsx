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
    const [errorMessage, setErrorMessage] = useState('');
    const [autorized, setAutorized] = useState(true);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage('');
        const genre = {
            genreid: null,
            name: name,
            description: description
        };
        try {
            const response = await genreService.addGenre(genre);
            if (response.ok) {
                router.push('/genre');
            }else if (response.status === 401){
                setAutorized(false);
            }else {
                const errorMessage = await response.json();
                setErrorMessage(errorMessage.error);
            }
        } catch (err: any) {
            setErrorMessage("An error occurred on the server. Please try again later.");
        }
    };
    return (
        <>
            <Header />
            <div className="container">
                <div className="container mt-5">
                    <h1>Add a genre</h1>
                    {autorized ? null : <p className="alert alert-danger">You are not authorized to add a genre</p>}
                    <AddGenreForm
                        name={name}
                        description={description}
                        setName={setName}
                        setDescription={setDescription}
                        handleSubmit={handleSubmit}
                        addEdit={'Add Genre'}
                        errorMessage={errorMessage}
                    />
                </div>
            </div>
        </>
    );
};

export default AddGenrePage;
