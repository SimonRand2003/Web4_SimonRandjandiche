import { Movie as moviePrisma, Genre as genrePrisma, User as userPrisma, Rating as ratingPrisma } from "@prisma/client";
import { mapToGenres } from "./genre.mapper";
import { mapToRatings } from "./rating.mapper";
import { mapToUsers } from "./user.mapper";
import { Movie } from "../model/Movie";

export const mapToMovie = ({
                               movieid,
                               title,
                               releaseDate,
                               duration,
                               genres,
                               ratings,
                               users,
                           }: moviePrisma & { genres?: genrePrisma[], ratings?: ratingPrisma[], users?: userPrisma[] }): Movie => {
    return new Movie({
        movieid,
        title,
        releaseDate,
        duration,
        genres: genres ? mapToGenres(genres) : [],
        ratings: ratings ? mapToRatings(ratings) : [],
        users: users ? mapToUsers(users) : [],
    });
};

export const mapToMovies = (moviePrisma: (moviePrisma & { genres: genrePrisma[], ratings: ratingPrisma[], users: userPrisma[] })[]): Movie[] => {
    return moviePrisma.map(mapToMovie);
};

export const mapFromMovie = ({ movieid, title, releaseDate, duration, genres,ratings,users }: Movie): moviePrisma => {
    return {
        movieid,
        title,
        releaseDate,
        duration,
    };
};

export default {
    mapToMovie,
    mapToMovies,
    mapFromMovie,
};
