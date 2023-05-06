import {Movie, MovieNoRAting} from "../types/interfaces";

async function getMovies() {
    const response = await fetch('http://127.0.0.1:3000/movies');
    const data = await response.json();
    return data as Movie[];
}

async function getMovie(id: string) {
    try {
        const response = await fetch(`http://127.0.0.1:3000/movies/${id}`);
        const data = await response.json();
        return data as Movie;
    }catch (e) {
        console.log(e);
    }
}
async function addMovie(movie: MovieNoRAting){
    await fetch('http://localhost:3000/movies/add', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(movie)
    });
}

async function addUserToMovie(movieid: number) {
    const userData = localStorage.getItem('user');
    const userid = JSON.parse(userData)?.userid;
    if (!userid) {
        return;
    }
    await fetch(`http://localhost:3000/movies/addUser/${movieid}/${userid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

async function removeUserFromMovie(movieid: number) {
    const userData = localStorage.getItem('user');
    const userid = JSON.parse(userData)?.userid;
    if (!userid) {
        return;
    }
    await fetch(`http://localhost:3000/movies/removeUser/${movieid}/${userid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

async function deleteMovie(id: number) {
    await fetch(`http://localhost:3000/movies/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

async function rateMovie(rating: number, comment: string, movieid: number, userid: number) {
    const response = await fetch('http://localhost:3000/ratings/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            rating: rating,
            comment: comment,
            movieid: movieid,
            userid: userid,
        }),
    });
}

async function editMovie(movie: MovieNoRAting) {
    await fetch(`http://localhost:3000/movies/update/${movie.movieid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie)
    });
}



const movieService = {
    getMovies,
    addMovie,
    addUserToMovie,
    removeUserFromMovie,
    getMovie,
    deleteMovie,
    rateMovie,
    editMovie
}

export default movieService;