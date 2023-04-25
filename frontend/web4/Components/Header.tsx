
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';


const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link href="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/movie">
                            Movies Overview
                        </Link>
                    </li>
                    <li>
                        <Link href="/add">
                            Add Movie
                        </Link>
                    </li>
                    {!localStorage.user &&
                        <>
                            <li>
                                <Link href="/Signin">
                                    Sign In
                                </Link>
                            </li>
                            <li>
                                <Link href="/Signup">
                                    Sign Up
                                </Link>
                            </li>
                        </>
                    }
                    {localStorage.user &&
                        <li>
                            Signed in as {localStorage.user.toString().split(",")[1].split(":")[1]}
                        </li>
                    }
                </ul>
            </nav>
        </header>


    )
};



export default Header;
