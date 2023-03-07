class Rating{
    private _id: number;
    private _movieId: number;
    private _rating: number;
    private _comment: string;
    private _userId: number;

    constructor(id: number, movieId: number, userId: number, rating: number, comment: string) {
        this.id = id;
        this.movieId = movieId;
        this.userId = userId;
        this.rating = rating;
        this.comment = comment;
    }

    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }
    public get movieId(): number {
        return this._movieId;
    }
    public set movieId(movieId: number){
        this._movieId = movieId;
    }
    public get userId(): number {
        return this._userId;
    }
    public set userId(userId: number){
        this._userId = userId;
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




}