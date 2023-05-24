import { Rating } from "./Rating";
import { Genre } from "./Genre";


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
        } else {
            const releaseDateObj = new Date(Movie.releaseDate);
            const releaseYear = releaseDateObj.getFullYear();
            const currentYear = new Date().getFullYear();
            if (releaseYear < 1888 || releaseYear > currentYear + 1) {
                errors.push('Release Date must be between 1888 and next year');
            }
        }

        if (Movie.duration === undefined || Movie.duration === null || Movie.duration <= 0 || Movie.duration > 51420) {
            errors.push("duration has to be between 0 and 51420");
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
