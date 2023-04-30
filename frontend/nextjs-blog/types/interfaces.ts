export interface Genre {
    genreid: number;
    name: string;
}

export interface Movie {
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
    movieId: string;
    userId: string;
}

export interface User {
    userid: number;
    username: string;
    email: string;
    birthdate: string;
}