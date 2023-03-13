import { Rating } from "./Rating";

class Movie {
    private _id: number;
    private _name: string;
    private _genre: string;
    private _year: number;
    private _duration: number;
    private _ratings: Rating[];

    constructor(name: string, genre: string, year: number, duration: number) {
        this.name = name;
        this.genre = genre;
        this.year = year;
        this.duration = duration;
    }

    public get id(): number {
        return this._id;
    }

    public set id(id: number) {
        this._id = id;
    }

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        if (!name || !name.trim()) {
            throw new Error('Naam mag niet leeg zijn.');
        }
        this._name = name;
    }

    public get genre(): string {
        return this._genre;
    }

    public set genre(genre: string) {
        if (!genre || !genre.trim()) {
            throw new Error('Genre mag niet leeg zijn.');
        }
        this._genre = genre;
    }

    public get year(): number {
        return this._year;
    }

    public set year(year: number) {
        if (year < 1800) {
            throw new Error('Jaar moet groter dan 1800 zijn.');
        }
        this._year = year;
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

    public get ratings(): Rating[] {
        return this._ratings;
    }

    public set ratings(ratings: Rating[]) {
        this._ratings = ratings;
    }
}

export { Movie };