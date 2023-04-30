import { Rating } from "./Rating";
import { Genre } from "./Genre";
import {User} from "./User";

class Movie {
    readonly movieid: number;
    readonly title: string;
    readonly releaseDate: Date;
    readonly duration: number;
    readonly genres: Genre[];
    readonly ratings: Rating[];


    constructor(Movie: {movieid: number, title: string, releaseDate: Date, duration: number, genres: Genre[], ratings: Rating[]}) {
        this.movieid = Movie.movieid;
        this.title = Movie.title;
        this.releaseDate = Movie.releaseDate;
        this.duration = Movie.duration;
        this.genres = Movie.genres;
        this.ratings = Movie.ratings;
    }

}

export { Movie };
