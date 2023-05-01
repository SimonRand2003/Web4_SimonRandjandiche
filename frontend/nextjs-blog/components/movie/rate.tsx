import React from "react";
import {Movie} from "../../types/interfaces";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

interface RateMovieFormProps {
    movie: Movie | null;
    rating: number;
    comment: string;
    setRating: (rating: number) => void;
    setComment: (comment: string) => void;
    error: string | null;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const RateMovieForm: React.FC<RateMovieFormProps> = ({ movie, rating, comment, setRating, setComment,handleSubmit ,error}) => {

    if (!movie) {
        return <h2>Loading...</h2>;
    }
    return (
        <Container style={{marginTop: "50px"}}>
            <Row className="justify-content-center">
                <Col md={8}>
                    <h2>Rate movie: {movie.title}</h2>
                    {error && <p>{error}</p>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formRating">
                            <Form.Label>Rating:</Form.Label>
                            <Form.Control as="select" value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
                                <option value="">Please select a rating</option>
                                {[...Array(10)].map((_, i) => (
                                    <option key={i} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formComment">
                            <Form.Label>Comment:</Form.Label>
                            <Form.Control as="textarea" value={comment} onChange={(e) => setComment(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default RateMovieForm;
