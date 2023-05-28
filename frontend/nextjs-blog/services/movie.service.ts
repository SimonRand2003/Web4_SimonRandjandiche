import {MovieNoRAting, Rating} from "../types/interfaces";

async function getMovies() {
    const token = sessionStorage.getItem('token');
    return  await fetch('http://127.0.0.1:3000/movies',
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
}

async function getMovie(id: string) {
    const token = sessionStorage.getItem('token');
    return await fetch(`http://127.0.0.1:3000/movies/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
}

async function addMovie(movie: MovieNoRAting) {
    const token = sessionStorage.getItem('token');

    return fetch('http://localhost:3000/movies/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(movie)
    });
}

async function addUserToMovie(movieid: number) {
    const token = sessionStorage.getItem('token');

    const userid = sessionStorage.getItem('userid');
    if (!userid) {
        return;
    }
    await fetch(`http://localhost:3000/movies/addUser/${movieid}/${userid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    });
}

async function removeUserFromMovie(movieid: number) {
    const token = sessionStorage.getItem('token');

    const userid = sessionStorage.getItem('userid');
    if (!userid) {
        return;
    }
    await fetch(`http://localhost:3000/movies/removeUser/${movieid}/${userid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    });
}

async function deleteMovie(id: number) {
    const token = sessionStorage.getItem('token');

    await fetch(`http://localhost:3000/movies/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    });
}

async function rateMovie(rating: number, comment: string, movieid: number, userid: number) {

    const token = sessionStorage.getItem('token');
    return await fetch('http://localhost:3000/ratings/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            rating: rating,
            comment: comment,
            movieid: movieid,
            userid: userid,
        }),
    });
}

async function editRateMovie(
    ratingid: number,
    rating: number,
    comment: string,
    movieid: number,
    userid: number
): Promise<Response> {
    const token = sessionStorage.getItem('token');
    const updatedRating: Rating = {
        ratingid: ratingid,
        rating: rating,
        comment: comment,
        movieid: movieid,
        userid: userid,
    };
        return await fetch(`http://localhost:3000/ratings/update/${ratingid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedRating),
        });
}






async function editMovie(movie: MovieNoRAting) {
    const token = sessionStorage.getItem('token');
    return await fetch(`http://localhost:3000/movies/update/${movie.movieid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
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
    editMovie,
    editRateMovie
}

export default movieService;