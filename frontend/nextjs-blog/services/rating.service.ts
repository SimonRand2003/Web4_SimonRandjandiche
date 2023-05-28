import { Rating } from "../types/interfaces";

async function getRatings(): Promise<Rating[]> {
    const token = sessionStorage.getItem('token');

    const response = await fetch(`http://127.0.0.1:3000/ratings`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
    const data = await response.json();
    return data as Rating[];
}

async function getRating(id: number): Promise<Rating> {
    const token = sessionStorage.getItem('token');

    const response = await fetch(`http://127.0.0.1:3000/ratings/${id}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
    const data = await response.json();
    return data as Rating;
}

async function getRatingByUserAndMovieId(userid: string,movieid:number): Promise<Rating> {
    const token = sessionStorage.getItem('token');

    const response = await fetch(`http://127.0.0.1:3000/ratings/${userid}/${movieid}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
    const data = await response.json();
    return data as Rating;
}

async function updateRating(id: string, newRating: Rating): Promise<Rating> {
    const token = sessionStorage.getItem('token');

    const response = await fetch(`http://127.0.0.1:3000/ratings/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            rating: newRating,
        })
    });

    const data = await response.json();
    return data as Rating;
}

const ratingService = {
    getRatings,
    getRating,
    updateRating,
    getRatingByUserAndMovieId
};

export default ratingService;
