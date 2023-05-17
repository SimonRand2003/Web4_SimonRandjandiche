import React from 'react'
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';
const Header : React.FC = () => {
    const router = useRouter();
    const [user, setUserName] = useState<string | null>(null);

    useEffect(() => {
        const username = sessionStorage.getItem('username');
        if (username) {
            setUserName(username);
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('userid');
        sessionStorage.removeItem('token');
        setUserName(null);
        router.push('/signin/');
    };


    return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Link href="/" className="navbar-brand" style={{ paddingLeft: '10px' }}>
                Inazuma Movies
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link href="/" className="nav-link" style={{ paddingLeft: '10px' }}>
                        Home
                    </Link>
                    <Link href="/genre/" className="nav-link" style={{ paddingLeft: '10px' }}>
                        Genres Overview
                    </Link>
                    <Link href="/genre/add" className="nav-link" style={{ paddingLeft: '10px' }}>
                        Add Genre
                    </Link>
                    <Link href="/movie/" className="nav-link" style={{ paddingLeft: '10px' }}>
                        Movies Overview
                    </Link>
                    <Link href="/movie/add" className="nav-link" style={{ paddingLeft: '10px' }}>
                        Add Movie
                    </Link>
                    <Link href="/movielist/" className="nav-link" style={{ paddingLeft: '10px' }}>
                        My Movie List
                    </Link>
                    {!user && (
                        <>
                            <Link href="/signin/" className="nav-link" style={{ paddingLeft: '10px' }}>
                                Sign In
                            </Link>
                            <Link href="/signup/" className="nav-link" style={{ paddingLeft: '10px' }}>
                                Sign Up
                            </Link>
                        </>
                    )}
                    {user && (
                        <NavDropdown title={`Signed in as ${user}`} id="basic-nav-dropdown" style={{ paddingLeft: '10px' }}>
                            <NavDropdown.Item onClick={handleLogout}>Log out</NavDropdown.Item>
                        </NavDropdown>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );

};

export default Header;
