import { Rating } from "../types/interfaces";

async function getRatings(): Promise<Rating[]> {
    const response = await fetch(`http://127.0.0.1:3000/ratings`);
    const data = await response.json();
    return data as Rating[];
}

async function getRating(id: number): Promise<Rating> {
    const response = await fetch(`http://127.0.0.1:3000/ratings/${id}`);
    const data = await response.json();
    return data as Rating;
}

async function getRatingByUserAndMovieId(userid: string,movieid:number): Promise<Rating> {
    const response = await fetch(`http://127.0.0.1:3000/ratings/${userid}/${movieid}`);
    const data = await response.json();
    return data as Rating;
}

async function updateRating(id: string, newRating: Rating): Promise<Rating> {
    const response = await fetch(`http://127.0.0.1:3000/ratings/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
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
