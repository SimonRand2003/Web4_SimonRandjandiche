import { PrismaClient } from '@prisma/client';
import { User } from '../model/User';
import {mapToUser, mapToUsers} from './user.mapper';

class UserRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async addUser(user: User){
        await this.prisma.user.create({
            data: {
                username: user.username,
                email: user.email,
                birthdate: user.birthdate,
                password: user.password,
            },
        });

    }

    async getUserById(id: number): Promise<User | undefined> {
        const user = await this.prisma.user.findUnique({
            where: {
                userid: id,
            },
        });
        return user ? mapToUser(user) : undefined;
    }

    async getAllUsers(): Promise<User[]> {
        const users = await this.prisma.user.findMany();
        return mapToUsers(users);
    }

    async updateUser(user: User): Promise<void> {
        await this.prisma.user.update({
            where: {
                userid: user.id,
            },
            data: {
                username: user.username,
                email: user.email,
                password: user.password,
            },
        });
    }

    async deleteById(id: number): Promise<void> {
        await this.prisma.user.delete({
            where: {
                userid: id
            },
        });
    }

    async close(): Promise<void> {
        await this.prisma.$disconnect();
    }
}

export { UserRepository };