'use client';
import Header from '../Components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage: React.FC = () => {
    return (
        <div>
            <Header />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <h1 className="card-title">Home</h1>
                                <p className="card-text">
                                    Welkom op de homepagina van de Movie App!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
