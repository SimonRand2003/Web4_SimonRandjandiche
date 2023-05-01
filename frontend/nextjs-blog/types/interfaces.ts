export interface Genre {
    genreid: number;
    name: string;
    description: string;
}

export interface Movie {
    movieid: number;
    title: string;
    releaseDate: string;
    duration: number;
    genres : Genre[] ;
    ratings: Rating[];
}
export interface MovieNoRAting {
    movieid: number;
    title: string;
    releaseDate: string;
    duration: number;
    genres : Genre[] ;
}


export interface Rating {
    ratingid: number;
    rating: number;
    comment: string;
    movieid: string;
    userid: string;
}

export interface User {
    userid: number;
    username: string;
    email: string;
    birthdate: string;
}