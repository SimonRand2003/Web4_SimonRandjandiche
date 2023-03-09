import { User } from "../model/User";

class UserRepository {
    private users: User[];
    private nextId: number;


    public addUser(user: User): void {
        user.id = this.nextId;
        this.users.push(user);
        this.nextId++;
    }

    public getUserById(id: number): User | undefined {
        return this.users.find((user) => user.id === id);
    }

    public getUserByUsername(username: string): User | undefined {
        return this.users.find((user) => user.username === username);
    }

    public getAllUsers(): User[] {
        return this.users;
    }
    public async update(user: User): Promise<void> {
        const index = this.users.findIndex((u) => u.id === user.id);
        if (index === -1) {
            throw new Error(`User with id ${user.id} not found`);
        }
        this.users[index] = user;
    }

    public async deleteById(id: number): Promise<void> {
        const index = this.users.findIndex((u) => u.id === id);
        if (index === -1) {
            throw new Error(`User with id ${id} not found`);
        }
        this.users.splice(index, 1);
    }
}

export { UserRepository };
