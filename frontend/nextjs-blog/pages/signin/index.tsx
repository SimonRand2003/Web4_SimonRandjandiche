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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await userService.login(email, password);
            if (response.ok) {
                const user = await response.json();
                localStorage.setItem('user', JSON.stringify(user));
                router.push('/');
            } else {
                const errorMessage = await response.text();
                setError(errorMessage);
            }
        } catch (error) {
            setError('An error occurred while logging in. Please try again.');
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
            />
        </>
    );
};

export default SignIn;
