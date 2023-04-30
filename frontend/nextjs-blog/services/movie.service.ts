import {Movie} from "../types/interfaces";

async function getMovies() {
    const response = await fetch('http://127.0.0.1:3000/movies');
    const data = await response.json();
    return data as Movie[];
}
async function addMovie(movie: Movie){
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

const movieService = {
    getMovies,
    addMovie,
    addUserToMovie,
    removeUserFromMovie
}

export default movieService;