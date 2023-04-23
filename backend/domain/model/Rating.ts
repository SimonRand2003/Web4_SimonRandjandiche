import {Movie} from "./Movie";
import {User} from "./User";

class Rating{
    private _id: number;
    private _movie: Movie;
    private _rating: number;
    private _comment: string;
    private _user: User;
    private _movieId: number;
    private _userId: number;

    constructor(id: number, rating: number, comment: string) {
        this.id = id;
        //this.movieId = movieId;
        //this.userId = userId;
        this.rating = rating;
        this.comment = comment;
    }

    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }

    get movie(): Movie {
        return this._movie;
    }

    set movie(value: Movie) {
        if (!value) {
            throw new Error("movie mag niet leeg zijn");
        }
        this._movie = value;
    }

    get user(): User {
        return this._user;
    }

    set user(value: User) {
        if (!value) {
            throw new Error("user mag niet leeg zijn");
        }
        this._user = value;
    }

    public get rating(): number {
        return this._rating;
    }
    public set rating(rating: number){
        if (rating < 0 || rating > 10) {
            throw new Error("rating moet tussen 0 en 10 liggen");
        }
        this._rating = rating;
    }
    public get comment(): string {
        return this._comment;
    }
    public set comment(comment: string){
        if (!comment || !comment.trim()) {
            throw new Error("comment mag niet leeg zijn");
        }
        this._comment = comment;
    }


    get movieId(): number {
        return this._movieId;
    }

    set movieId(value: number) {
        this._movieId = value;
    }

    get userId(): number {
        return this._userId;
    }

    set userId(value: number) {
        this._userId = value;
    }
}
export { Rating };
