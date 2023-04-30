import { Movie } from "../types/interfaces";

async function getMovieList(): Promise<Movie[]> {
    const userData = localStorage.getItem('user');
    const id = JSON.parse(userData)?.userid;
    if (!id) {
        return [];
    }
    const response = await fetch(`http://127.0.0.1:3000/users/getUserMoviesById/${id}`);
    const data = await response.json();
    return data as Movie[];
}

const movieListService = {
    getMovieList,
};

export default movieListService;
