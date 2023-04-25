import { User as PrismaUser } from "@prisma/client";
import { Movie as PrismaMovie } from "@prisma/client";
import { Rating as PrismaRating } from "@prisma/client";
import {mapToMovies} from "./movie.mapper";
import {mapToRatings} from "./rating.mapper";
import { User } from '../model/User';
const mapToUser = (prismaUser: PrismaUser): User => {
    console.log(prismaUser[0]);


    return new User(prismaUser.userid,
        prismaUser.username,
        prismaUser.email,
        prismaUser.birthdate,
        prismaUser.password,
        [],[]
    );
}

const mapToUsers = (prismaUsers: PrismaUser[]): User[] => {
    return prismaUsers.map((prismaUser) => mapToUser(prismaUser));
};

export { mapToUser, mapToUsers };