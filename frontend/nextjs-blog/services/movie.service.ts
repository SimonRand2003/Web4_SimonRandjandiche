import {Genre, Movie} from "../types/interfaces";

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

const movieService = {
    getMovies,
    addMovie
}

export default movieService;