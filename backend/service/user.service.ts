import { User } from '../domain/model/User';
import { UserRepository } from '../domain/data-access/user.db';
import { Movie } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserService {
    private jwtSecret: string;

    constructor(private readonly userRepository: UserRepository) {
        this.jwtSecret = process.env.JWT_SECRET || '';
    }

    public async getAllUsers(): Promise<User[]> {
        return this.userRepository.getAllUsers();
    }

    public async getUserById(id: number): Promise<User | null> {
        return this.userRepository.getUserById(id);
    }

    public async getUserByName(name: string): Promise<User | null> {
        return this.userRepository.getUserByName(name);
    }

    public async addUser({ username, email, birthdate, password }): Promise<void> {
        const hashedPassword = await bcrypt.hash(password, 12);
        await this.userRepository.addUser({ username, email, birthdate, password: hashedPassword });
    }

    public async authenticate({ email, password }) {
        const user = await this.userRepository.getUserByName(email);
        if (!user) {
            throw new Error("Invalid email or password");
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            return this.generateJwtToken(email);
        } else {
            throw new Error("Invalid email or password");
        }
    }

    public async updateUser(id: number, user: User): Promise<void> {
        await this.userRepository.updateUser(id, user);
    }

    public async deleteUser(id: number): Promise<void> {
        await this.userRepository.deleteById(id);
    }

    public async getUserMoviesById(id: number): Promise<Movie[] | undefined> {
        return this.userRepository.getUserMoviesById(id);
    }

    public async getUserName(id: number): Promise<string | undefined> {
        return this.userRepository.getUserName(id);
    }

    private generateJwtToken(email: string): string | null {
        const options = { expiresIn: process.env.JWT_EXPIRATION_HOURS + 'h', issuer: process.env.JWT_ISSUER };
        try {
            return jwt.sign({ email }, this.jwtSecret, options);
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}
