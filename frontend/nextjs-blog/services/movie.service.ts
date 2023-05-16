import {Movie, MovieNoRAting, Rating} from "../types/interfaces";

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
    } catch (error) {
        throw new Error(`An error occurred while fetching movie: ${error}`);
    }
}

async function addMovie(movie: MovieNoRAting) {
    return fetch('http://localhost:3000/movies/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie)
    });
}

async function addUserToMovie(movieid: number) {
    const userData = sessionStorage.getItem('user');
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
    const userData = sessionStorage.getItem('user');
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

async function editRateMovie(
    ratingid: number,
    rating: number,
    comment: string,
    movieid: number,
    userid: number
): Promise<void> {
    const updatedRating: Rating = {
        ratingid: ratingid,
        rating: rating,
        comment: comment,
        movieid: movieid,
        userid: userid,
    };

    try {
        const response = await fetch(`http://localhost:3000/ratings/update/${ratingid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedRating),
        });

        if (response.ok) {
            console.log('Rating updated successfully');
        } else {
            console.error('Failed to update rating');
        }
    } catch (error) {
        console.error('An error occurred while updating the rating:', error);
    }
}





async function editMovie(movie: MovieNoRAting) {
    const response = await fetch(`http://localhost:3000/movies/update/${movie.movieid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie)
    });

    return response;
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