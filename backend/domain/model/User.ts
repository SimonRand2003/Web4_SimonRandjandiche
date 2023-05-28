import { Movie } from './Movie';
import {Rating} from "./Rating";

class User {
    readonly userid?: number;
    readonly username: string;
    readonly email: string;
    readonly birthdate: Date;
    readonly password: string;
    readonly movies?: Movie[];
    readonly ratings?: Rating[];

    constructor(userid:number,username: string, email: string, birthdate: Date, password: string,movies?: Movie[],ratings?: Rating[]) {
        const errors: string[] = [];
        if (username.length < 5){
            errors.push("Username must be at least 5 character long");
        }
        if (email === undefined || email === null || !email.match("^[a-zA-Z0-9]+@[a-z]+\\.[a-z]{2,5}$")){
            errors.push("Email cant be empty and have a valid format");
        }
        if (password.length < 5){
            errors.push("Password must be at least 5 character long");
        }
        if (birthdate === undefined || birthdate === null || birthdate.toString() === "Invalid Date"){
            errors.push("Birthdate is not defined");
        } else {
            var currentDate = new Date();
            var maxAllowedDate = new Date();
            maxAllowedDate.setFullYear(maxAllowedDate.getFullYear() - 150);

            if (birthdate > currentDate || birthdate < maxAllowedDate) {
                errors.push("Invalid birthdate");
            }
        }
        if (errors.length > 0) {
            console.log("pass: " + password);

            throw new Error(errors.join(":"));
        }

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


