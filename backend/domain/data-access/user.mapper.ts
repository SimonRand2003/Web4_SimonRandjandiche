import { RowDataPacket } from 'mysql2';
import { User } from '../model/user';

const mapToUsers = (rows: RowDataPacket[]): User[] => {
    const result: User[] = [];

    rows.forEach(({ id, username, email, birthdate, password }) => {
        const user: User = new User(id, username, email, birthdate, password);
        result.push(user);
    });

    return result;
};

export default mapToUsers;
