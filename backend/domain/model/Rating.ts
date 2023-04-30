import {Movie} from "./Movie";
import {User} from "./User";

class Rating{
    readonly ratingid: number;
    readonly movie: Movie;
    readonly rating: number;
    readonly comment: string;
    readonly user: User;
    readonly movieid: number;
    readonly userid: number;

    constructor(ratingid: number, rating: number, comment: string, movieid: number, userid: number) {
        this.ratingid = ratingid;
        this.movieid = movieid;
        this.userid = userid;
        this.rating = rating;
        this.comment = comment;
    }

}
export { Rating };
