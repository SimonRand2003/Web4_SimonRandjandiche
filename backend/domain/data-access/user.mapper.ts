import { User as PrismaUser, Movie as PrismaMovie, Rating as PrismaRating } from "@prisma/client";
import { mapToRatings } from "./rating.mapper";
import { User } from '../model/User';
import { Movie } from '../model/Movie';
import { Rating } from '../model/Rating';

const mapToUser = (prismaUser: PrismaUser): User => {


    return new User(
        prismaUser.userid,
        prismaUser.username,
        prismaUser.email,
        prismaUser.birthdate,
        prismaUser.password,
        null,null
    );
}

const mapToUsers = (prismaUsers: PrismaUser[]): User[] => {
    return prismaUsers.map((prismaUser) => mapToUser(prismaUser));
};

export { mapToUser, mapToUsers };
