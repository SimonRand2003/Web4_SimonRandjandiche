import { User as PrismaUser, Movie as PrismaMovie, Rating as PrismaRating } from "@prisma/client";
import { mapToRatings } from "./rating.mapper";
import { User } from '../model/User';
import { Movie } from '../model/Movie';
import { Rating } from '../model/Rating';
import {mapToJustMovies} from "./movie.mapper";

export const mapToUser = ({
                              userid,
                              username,
                              email,
                              birthdate,
                              password,
                              movies,
                              ratings,
                          }: PrismaUser & { movies?: PrismaMovie[], ratings?: PrismaRating[] }): User => {
    return new User(
        userid,
        username,
        email,
        birthdate,
        password,
        movies ? mapToJustMovies(movies) : [],
        ratings ? mapToRatings(ratings) : [],
    );
}

export const mapToUsers = (prismaUsers: PrismaUser[]): User[] => {
    return prismaUsers.map((prismaUser) => mapToUser(prismaUser));
}


export default {
    mapToUser,
    mapToUsers
};
