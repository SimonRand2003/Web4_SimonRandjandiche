import { RowDataPacket } from 'mysql2';
import { Rating } from '../model/rating';

const mapToRatings = (rows: RowDataPacket[]): Rating[] => {
    const result: Rating[] = [];

    rows.forEach(({ id, movie_id, user_id, rating, comment }) => {
        const ratingObj: Rating = new Rating(id, movie_id, user_id, rating, comment);
        result.push(ratingObj);
    });

    return result;
};

export default mapToRatings;
