import Link from 'next/link';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = '/Signin';
    };

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link href="/">
                        <p className="navbar-brand">Inazuma Movies</p>
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link href="/">
                                    <p className="nav-link">Home</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/movie">
                                    <p className="nav-link">Movies Overview</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/add">
                                    <p className="nav-link">Add Movie</p>
                                </Link>
                            </li>
                            {!localStorage.user && (
                                <>
                                    <li className="nav-item">
                                        <Link href="/Signin">
                                            <p className="nav-link">Sign In</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/Signup">
                                            <p className="nav-link">Sign Up</p>
                                        </Link>
                                    </li>
                                </>
                            )}
                            {localStorage.user && (
                                <li className="nav-item">
                                    <div className="nav-link">
                                        Signed in as{' '}
                                        {localStorage.user
                                            .toString()
                                            .split(',')[1]
                                            .split(':')[1]}
                                        <button
                                            className="btn btn-outline-light ms-3"
                                            onClick={handleLogout}
                                        >
                                            Log out
                                        </button>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
