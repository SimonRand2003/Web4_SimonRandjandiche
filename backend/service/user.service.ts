import { User } from '../domain/model/User';
import { UserRepository } from '../domain/data-access/user.db';

export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    public async getAllUsers(): Promise<User[]> {
        return this.userRepository.getAllUsers();
    }

    public async getUserById(id: number): Promise<User | null> {
        return this.userRepository.getUserById(id);
    }

    public async addUser(user: User): Promise<void> {
        await this.userRepository.addUser(user);
    }

    public async updateUser(id: number, user: User): Promise<void> {
        await this.userRepository.updateUser(id, user);
    }

    public async deleteUser(id: number): Promise<void> {
        await this.userRepository.deleteById(id);
    }
}
