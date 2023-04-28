import { Movie as moviePrisma, Genre as genrePrisma, Rating as ratingPrisma } from "@prisma/client";
import { mapToGenres } from "./genre.mapper";
import { mapToRatings } from "./rating.mapper";
import { Movie } from "../model/Movie";

export const mapToMovie = ({
                               movieid,
                               title,
                               releaseDate,
                               duration,
                               genres,
                               ratings,
                           }: moviePrisma & { genres?: genrePrisma[], ratings?: ratingPrisma[] }): Movie => {
    return new Movie({
        movieid,
        title,
        releaseDate,
        duration,
        genres: genres ? mapToGenres(genres) : [],
        ratings: ratings ? mapToRatings(ratings) : [],
    });
};

export const mapToMovies = (moviePrisma: (moviePrisma & { genres: genrePrisma[], ratings: ratingPrisma[] })[]): Movie[] => {
    return moviePrisma.map(mapToMovie);
};

export const mapFromMovie = ({ movieid, title, releaseDate, duration}: Movie): moviePrisma => {
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
