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
        const errors: string[] = [];

        if (Movie.title === undefined || Movie.title === "") {
            errors.push("title is not defined");
        }
        if (Movie.releaseDate === undefined || Movie.releaseDate === null) {
            errors.push("releaseDate is not defined");
        }
        if (Movie.duration === undefined || Movie.duration === null || Movie.duration <= 0) {
            errors.push("duration cannot be empty or less than 0");
        }
        if (Movie.genres.length === 0) {
            errors.push("you need to add at least one genre");
        }

        if (errors.length > 0) {
            throw new Error(errors.join(":"));
        }

        this.movieid = Movie.movieid;
        this.title = Movie.title;
        this.releaseDate = Movie.releaseDate;
        this.duration = Movie.duration;
        this.genres = Movie.genres;
        this.ratings = Movie.ratings;
    }


}

export { Movie };
