import { Rating } from "./Rating";
import {Genre} from "./Genre";

class Movie {
    private _movieid: number;
    private _title: string;
    private _releaseDate: number;
    private _duration: number;
    private _genres: Genre[];
    private _ratings: Rating[];



    constructor(id: number, name: string, year: number, duration: number, genres: Genre[]) {
        this.movieid = id;
        this.title = name;
        this.releaseDate = year;
        this.duration = duration;
        this.genres = genres;
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


    get genres(): Genre[] {
        return this._genres;
    }

    set genres(value: Genre[]) {
        if (value.length === 0)
            throw new Error('Een film moet minstens 1 genre hebben.');
        this._genres = value;
    }

    get ratings(): Rating[] {
        return this._ratings;
    }

    set ratings(value: Rating[]) {
        this._ratings = value;
    }
}

export { Movie };