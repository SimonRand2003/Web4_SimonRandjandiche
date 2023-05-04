import {Genre} from "../types/interfaces";

async function getGenres() {
    const response = await fetch('http://127.0.0.1:3000/genres');
    try {
        const data = await response.json();
        return data as Genre[];
    }catch (e) {
        console.log(e);
    }

}

const genreService = {
    getGenres
}

export default genreService;