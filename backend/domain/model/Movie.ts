import { Rating } from "./Rating";
import { Genre } from "./Genre";
import {User} from "./User";

class Movie {
    private _movieid: number;
    private _title: string;
    private _releaseDate: number;
    private _duration: number;
    private _genres: Genre[];
    private _ratings: Rating[];




    constructor(Movie: {movieid: number, title: string, releaseDate: number, duration: number, genres: Genre[], ratings: Rating[]}) {
        this.movieid = Movie.movieid;
        this.title = Movie.title;
        this.releaseDate = Movie.releaseDate;
        this.duration = Movie.duration;
        this.genres = Movie.genres;
        this.ratings = Movie.ratings;


    }

    public get movieid(): number {
        return this._movieid;
    }

    public set movieid(id: number) {
        this._movieid = id;
    }

    public get title(): string {
        return this._title;
    }

    public set title(name: string) {
        if (!name || !name.trim()) {
            throw new Error('Naam mag niet leeg zijn.');
        }
        this._title = name;
    }

    public get releaseDate(): number {
        return this._releaseDate;
    }

    public set releaseDate(year: number) {
        if (year < 1800) {
            throw new Error('Jaar moet groter dan 1800 zijn.');
        }
        this._releaseDate = year;
    }

    public get duration(): number {
        return this._duration;
    }

    public set duration(duration: number) {
        if (duration < 0) {
            throw new Error('Duur moet groter dan 0 zijn.');
        }
        this._duration = duration;
    }

    public get genres(): Genre[] {
        return this._genres;
    }

    public set genres(genres: Genre[]) {
        if (genres.length === 0) {
            throw new Error('Een film moet minstens 1 genre hebben.');
        }
        this._genres = genres;
    }

    public get ratings(): Rating[] {
        return this._ratings;
    }

    public set ratings(ratings: Rating[]) {
        this._ratings = ratings;
    }
}

export { Movie };
