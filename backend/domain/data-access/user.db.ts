import { PrismaClient } from '@prisma/client';
import { User } from '../model/User';
import {mapToUser,mapToUsers} from './user.mapper';
import {Movie} from "../model/Movie";
import {mapToMovies} from "./movie.mapper";

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

    async getUserMoviesById(id: number): Promise<Movie[] | undefined> {
        const movies = await this.prisma.user.findUnique({
            where: {
                userid: id,
            },
            select: {
                movies: {
                    include: {
                        genres: true,
                        ratings: true,
                    },
                },
            },
        });
        return movies ? mapToMovies(movies.movies) : undefined;
    }

    async getUserById(id: number): Promise<User | undefined> {
        const user = await this.prisma.user.findUnique({
            where: {
                userid: id,
            },include: {
                movies: true,
                ratings: true,
            }
        });
        return user ? mapToUser(user) : undefined;
    }
    async getUserByName(name: string): Promise<User | undefined> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: name,
            },
        });
        if (user){
            return user ? mapToUser(user) : undefined;
        }
        else{
            throw new Error("User not found")
        }
    }

    async getAllUsers(): Promise<User[]> {
        const users = await this.prisma.user.findMany({
            include: {
                movies: true,
                ratings: true,
            }});
        return mapToUsers(users);
    }


    async updateUser(id: number, user: User): Promise<void> {
        await this.prisma.user.update({
            where: {
                userid: id,
            },
            data: {
                username: user.username,
                email: user.email,
                birthdate: user.birthdate,
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

    async getUserName(id: number): Promise<string | undefined> {
        const user = await this.prisma.user.findUnique({
            where: {
                userid: id,
            },select: {
                username: true,
            },
        });
        return user ? user.username : undefined;
    }

    async close(): Promise<void> {
        await this.prisma.$disconnect();
    }
}

export { UserRepository };