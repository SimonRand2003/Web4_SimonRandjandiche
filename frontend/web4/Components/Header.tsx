import Link from 'next/link';

const Header: React.FC = () => {
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
                        <Link href="../movie">
                            Movies Overview
                        </Link>
                    </li>
                    <li>
                        <Link href="../add">
                            Add Movie
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
