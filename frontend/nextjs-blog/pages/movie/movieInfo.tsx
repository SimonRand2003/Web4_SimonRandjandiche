import React, { useEffect, useState } from 'react';
import { Movie } from "../../types/interfaces";
import movieService from "../../services/movie.service";
import Header from "../../components/Header";
import { useRouter } from "next/router";
import MovieInfoComponent from "../../components/movie/info";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

const MovieInfo: React.FC = () => {
    const router = useRouter();
    const [movie, setMovie] = useState<Movie>();
    const [error, setError] = useState<string | null>(null);
    const movieId = Array.isArray(router.query.movieId)
        ? router.query.movieId[0]
        : router.query.movieId;

    const getMovieInfo = async () => {
        if (!movieId) return;
        const response = await movieService.getMovie(movieId);
        setError(null);
        if (!response.ok) {
            if (response.status === 401) {
                setError("You are not authorized to view this page. Please log in.");
            } else {
                setError("Something went wrong.");
            }
        } else {
            const movie = await response.json();
            setMovie(movie);
        }
    };

    useEffect(() => {
        getMovieInfo();
    }, [movieId]);

    return (
        <>
            <Header />
            <Container>
                <Row className="mt-3">
                    <Col>
                        {error && (
                            <div className="alert alert-danger p-3" role="alert">
                                {error}
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
            <main>
                {movie && <MovieInfoComponent movie={movie} />}
            </main>
        </>
    );


};

export default MovieInfo;
