import { User as PrismaUser } from "@prisma/client";
import { User } from '../model/User';
const mapToUser = (prismaUser: PrismaUser): User => {
    return new User(prismaUser.userid, prismaUser.username, prismaUser.email, prismaUser.birthdate, prismaUser.password);
};

const mapToUsers = (prismaUsers: PrismaUser[]): User[] => {
    return prismaUsers.map((prismaUser) => mapToUser(prismaUser));
};

export { mapToUser, mapToUsers };