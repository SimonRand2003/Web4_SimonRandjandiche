import React, { useState } from 'react';
import Header from '../../components/Header';
import { useRouter } from "next/router";
import userService from '../../services/user.service';
import SignInForm from '../../components/user/signin';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const [ emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Basic email validation
        if (!email || !emailRegex.test(email)) {
            setEmailErrorMessage('Invalid email format');
            return false;
        }
        setEmailErrorMessage('');
        return true;
    }

    const validatePassword = (password: string) => {
        const minPasswordLength = 5; // Set your desired minimum password length
        if (!password || password.length < minPasswordLength) {
            setPasswordErrorMessage(`Password must be at least ${minPasswordLength} characters long`);
            return false;
        }
        setPasswordErrorMessage('');
        return true;
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);
        if (isEmailValid && isPasswordValid) {
            try {
                const response = await userService.login(email, password);
                if (response.ok) {
                    const responseData = await response.json();
                    sessionStorage.setItem('username', responseData.username);
                    sessionStorage.setItem('userid', responseData.userid);
                    sessionStorage.setItem('token', responseData.token);
                    router.push('/');
                } else {
                    const errorMessage = await response.text();
                    setError(errorMessage);
                }
            } catch (error) {
                setError("An error occurred on the server. Please try again later.");
            }
        }
    };



    return (
        <>
            <Header />
            <SignInForm
                email={email}
                password={password}
                error={error}
                setEmail={setEmail}
                setPassword={setPassword}
                handleSubmit={handleSubmit}
                emailErrorMessage={emailErrorMessage}
                passwordErrorMessage={passwordErrorMessage}

            />
        </>
    );
};

export default SignIn;
