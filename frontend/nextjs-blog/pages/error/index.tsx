'use client';
import Header from '../../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
const error: React.FC = () => {
    return (
        <div>
            <Header />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body text-center">
                                <h1 className="card-title text-danger">Access Denied</h1>
                                <p className="card-text">
                                    You are not authorized to access this page. Please contact your administrator if you believe this is an error.
                                </p>
                                <Link href="/" className="btn btn-danger mt-3"> Return Home</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default error;
