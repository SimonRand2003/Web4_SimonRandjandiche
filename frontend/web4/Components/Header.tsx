import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header: React.FC = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link href="/">
                    <p className="navbar-brand">Inazuma Movies</p>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
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
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
