import { RowDataPacket } from 'mysql2';
import { Genre } from '../model/genre';

const mapToGenres = (rows: RowDataPacket[]): Genre[] => {
    const result: Genre[] = [];

    rows.forEach(({ id, name, description }) => {
        const genre = new Genre(id, name, description);
        result.push(genre);
    });

    return result;
};

export default mapToGenres;
