import React from "react";
import { Movie } from "../../types/interfaces";
import { Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardText, ListGroup, ListGroupItem } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from 'react';
import userService from "../../services/user.service";

type Props = {
    movie: Movie;
};

const MovieInfoComponent = ({ movie }: Props) => {
    const { movieid, title, releaseDate, duration, genres, ratings } = movie;
    const date = new Date(releaseDate);
    const formattedDate = date.toLocaleDateString();
    const [usernames, setUsernames] = useState<Record<number, string>>({});
    useEffect(() => {
        fetchUsernames();
    }, []);
    async function fetchUsernames() {
        const userIds = ratings.map((rating) => rating.userid);
        let usernamesData: Record<number, string> = {};
        for (let id of userIds) {
            usernamesData[id] = await userService.getUserName(id);
        }
        setUsernames(usernamesData);
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                                <>
                                    <CardTitle tag="h2">{title}</CardTitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted">Movie id: {movieid}</CardSubtitle>
                                    <CardText>Release date: {formattedDate}</CardText>
                                    <CardText>Duration: {duration} minutes</CardText>
                                    <CardText>Genres:</CardText>
                                    <ListGroup>
                                        {genres.map((genre) => (
                                            <ListGroupItem key={genre.genreid}>
                                                {genre.name}
                                                <ul>
                                                    <li>{genre.description}</li>
                                                </ul>
                                            </ListGroupItem>
                                        ))}
                                    </ListGroup>
                                    <CardText>Ratings:</CardText>
                                    <ListGroup>
                                        {ratings.map((rating) => (
                                            <ListGroupItem key={rating.ratingid}>
                                                <CardText>
                                                    User {usernames[rating.userid]} gave a rating of {rating.rating}.
                                                </CardText>
                                                <ul>
                                                    <li>
                                                        <CardText>Comment: {rating.comment}</CardText>
                                                    </li>
                                                </ul>
                                            </ListGroupItem>
                                        ))}
                                    </ListGroup>
                                </>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default MovieInfoComponent;
