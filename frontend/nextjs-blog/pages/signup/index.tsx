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
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [birthdateErrorMessage, setBirthdateErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const router = useRouter();

    const validateUsername = (username: string) => {
        if (!username || username.length < 5) {
            setUsernameErrorMessage('Username must be at least 5 characters long');
            return false;
        }
        setUsernameErrorMessage('');
        return true;
    }

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Basic email validation
        if (!email || !emailRegex.test(email)) {
            setEmailErrorMessage('Invalid email format');
            return false;
        }
        setEmailErrorMessage('');
        return true;
    }

    const validateBirthdate = (birthdate: string) => {
        if (!birthdate) {
            setBirthdateErrorMessage('Birthdate is required');
            return false;
        }
        setBirthdateErrorMessage('');
        return true;
    }

    const validatePassword = (password: string) => {
        if (!password || password.length < 5) {
            setPasswordErrorMessage('Password must be at least 5 characters long');
            return false;
        }
        setPasswordErrorMessage('');
        return true;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage('');
        const isUsernameValid = validateUsername(username);
        const isEmailValid = validateEmail(email);
        const isBirthdateValid = validateBirthdate(birthdate);
        const isPasswordValid = validatePassword(password);
        if (isUsernameValid && isEmailValid && isBirthdateValid && isPasswordValid) {
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
                usernameErrorMessage={usernameErrorMessage}
                emailErrorMessage={emailErrorMessage}
                birthdateErrorMessage={birthdateErrorMessage}
                passwordErrorMessage={passwordErrorMessage}
            />
        </>
    );
};

export default SignUp;
