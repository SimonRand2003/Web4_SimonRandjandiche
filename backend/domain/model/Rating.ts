import {Movie} from "./Movie";
import {User} from "./User";

class Rating{
    readonly ratingid: number;
    readonly rating: number;
    readonly comment: string;
    readonly movieid: number;
    readonly userid: number;

    constructor(ratingid: number, rating: number, comment: string, movieid: number, userid: number) {
        const errors: string[] = [];
        if (rating < 0 || rating > 10){
            errors.push("Rating must be between 0 and 10");
        }
        if (comment.length < 5){
            errors.push("Comment must be at least 5 character long");
        }
        if (errors.length > 0) {
            throw new Error(errors.join(":"));
        }
        this.ratingid = ratingid;
        this.movieid = movieid;
        this.userid = userid;
        this.rating = rating;
        this.comment = comment;
    }

}
export { Rating };
