'use client';
import React, { useState } from 'react';
import Header from "../../Components/Header";

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [email, setEmail] = useState('');
    const [userid, setUserId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:3000/users/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userid,
                username,
                email,
                birthdate,
                password,
            }),
        })
            .then(response => {
                if (response.ok) {
                    // User was added successfully, display success message
                    console.log('User added successfully!');
                } else {
                    // There was an error adding the user, display error message
                    response.text().then(text => setErrorMessage(text));
                }
            })
            .catch(error => {
                // There was a network error, display error message
                console.error('Network error:', error);
                setErrorMessage('Network error');
            });
    };

    return (
        <div className="container">
            <Header />
            <h1>Signup</h1>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>
                        Username:
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                </div>
                <div className="mb-3">
                    <label>
                        Password:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                </div>
                <div className="mb-3">
                    <label>
                        Birthdate:
                        <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
                    </label>
                </div>
                <div className="mb-3">
                    <label>
                        Email:
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                </div>
                <input type="hidden" name="userid" value='1' />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;

