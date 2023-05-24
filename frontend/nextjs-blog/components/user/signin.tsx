import React from 'react';

interface Props {
    email: string;
    password: string;
    error: string;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    emailErrorMessage: string;
    passwordErrorMessage: string;
}

const SignInForm: React.FC<Props> = ({
                                         email,
                                         password,
                                         error,
                                         setEmail,
                                         setPassword,
                                         handleSubmit,
                                         emailErrorMessage,
                                         passwordErrorMessage
                                     }) => {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="card-title">Sign In</h1>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSubmit} noValidate={true}>
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
                                <button type="submit" className="btn btn-primary">
                                    Sign In
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInForm;
