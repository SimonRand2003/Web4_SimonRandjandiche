export interface Genre {
    genreid: number;
    name: string;
}

export interface Movie {
    movieid: string;
    title: string;
    releaseDate: string;
    duration: number;
    genres : Genre[] ;
}


export interface Rating {
    id: string;
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