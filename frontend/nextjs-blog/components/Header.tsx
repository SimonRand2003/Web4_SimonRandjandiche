import Link from 'next/link';
import React from 'react'
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { User } from '../types/interfaces';
import { useRouter } from 'next/router';


const Header : React.FC = () => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        router.push('/signin/');
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
                                <Link href="/genre/">
                                    <p className="nav-link">Genres Overview</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/genre/add">
                                    <p className="nav-link">Add Genre</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/movie/">
                                    <p className="nav-link">Movies Overview</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/movie/add">
                                    <p className="nav-link">Add Movie</p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/movielist/">
                                    <p className="nav-link">My Movie List</p>
                                </Link>
                            </li>
                            {!user && (
                                <>
                                    <li className="nav-item">
                                        <Link href="/signin/">
                                            <p className="nav-link">Sign In</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="/signup/">
                                            <p className="nav-link">Sign Up</p>
                                        </Link>
                                    </li>
                                </>
                            )}
                            {user && (
                                <li className="nav-item">
                                    <div className="nav-link">
                                        Signed in as{' '}
                                        {user.username}

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
