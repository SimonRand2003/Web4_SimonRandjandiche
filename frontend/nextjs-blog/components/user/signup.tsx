import React from 'react';
import {useRouter} from "next/router";

interface SignUpFormProps {
    username: string;
    password: string;
    birthdate: string;
    email: string;
    errorMessage: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    setBirthdate: React.Dispatch<React.SetStateAction<string>>;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    usernameErrorMessage: string;
    emailErrorMessage: string;
    birthdateErrorMessage: string;
    passwordErrorMessage: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
                                                   username,
                                                   password,
                                                   birthdate,
                                                   email,
                                                   errorMessage,
                                                   setUsername,
                                                   setPassword,
                                                   setBirthdate,
                                                   setEmail,
                                                   handleSubmit,
                                                    usernameErrorMessage,
                                                    emailErrorMessage,
                                                    birthdateErrorMessage,
                                                    passwordErrorMessage
                                               }) => {

    return (

        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="card-title">Sign Up</h1>
                            {errorMessage && (
                                <div className="alert alert-danger">
                                    {errorMessage.replace('Error: ', '').split(":").map((error, index) => (
                                        <React.Fragment key={index}>
                                            {error}
                                            <br/>
                                        </React.Fragment>
                                    ))}
                                </div>
                            )}


                            <form onSubmit={handleSubmit} noValidate={true}>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                    {usernameErrorMessage && (
                                        <div className="alert alert-danger">{usernameErrorMessage}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    {passwordErrorMessage && (
                                        <div className="alert alert-danger">{passwordErrorMessage}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="birthdate">Birthdate</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="birthdate"
                                        value={birthdate}
                                        onChange={(e) => setBirthdate(e.target.value)}
                                        required
                                    />
                                    {birthdateErrorMessage && (
                                        <div className="alert alert-danger">{birthdateErrorMessage}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    {emailErrorMessage && (
                                        <div className="alert alert-danger">{emailErrorMessage}</div>
                                    )}
                                </div>
                                <input type="hidden" name="userid" value="1" />
                                <button type="submit" className="btn btn-primary">
                                    Sign Up
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
