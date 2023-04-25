import Link from 'next/link';
import { useState, useEffect } from 'react';

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
            <nav>
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/movie">Movies Overview</Link>
                    </li>
                    <li>
                        <Link href="/add">Add Movie</Link>
                    </li>
                    {!localStorage.user && (
                        <>
                            <li>
                                <Link href="/Signin">Sign In</Link>
                            </li>
                            <li>
                                <Link href="/Signup">Sign Up</Link>
                            </li>
                        </>
                    )}
                    {localStorage.user && (
                        <li>
                            
                            Signed in as {localStorage.user.toString().split(",")[1].split(":")[1]}


                            <button onClick={handleLogout}>Log out</button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
