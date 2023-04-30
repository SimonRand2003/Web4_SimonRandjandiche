import { Movie } from './Movie';
import {Rating} from "./Rating";

class User {
    readonly userid: number;
    readonly username: string;
    readonly email: string;
    readonly birthdate: Date;
    readonly password: string;
    readonly movies: Movie[];
    readonly ratings: Rating[];

    constructor(userid:number,username: string, email: string, birthdate: Date, password: string,movies: Movie[],ratings: Rating[]) {
        this.userid=userid;
        this.username = username;
        this.email = email;
        this.birthdate = birthdate;
        this.password = password;
        this.movies=movies;
        this.ratings=ratings;
    }
}
export { User };


