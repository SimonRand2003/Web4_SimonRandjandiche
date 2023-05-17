import React, { useState } from 'react';
import Header from "../../components/Header";
import userService from '../../services/user.service';
import SignUpForm from '../../components/user/signup';
import {useRouter} from "next/router";


const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await userService.register(username, email, birthdate, password);
            if (response.ok) {
                const responseData = await response.json();
                sessionStorage.setItem('username', responseData.username);
                sessionStorage.setItem('userid', responseData.userid);
                sessionStorage.setItem('token', responseData.token);
                router.push('/');
            } else {
                const errorMessage = await response.text();
                setErrorMessage(errorMessage);
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    };


    return (
        <>
            <Header />
            <SignUpForm
                username={username}
                password={password}
                birthdate={birthdate}
                email={email}
                errorMessage={errorMessage}
                setUsername={setUsername}
                setPassword={setPassword}
                setBirthdate={setBirthdate}
                setEmail={setEmail}
                handleSubmit={handleSubmit}
            />
        </>
    );
};

export default SignUp;
