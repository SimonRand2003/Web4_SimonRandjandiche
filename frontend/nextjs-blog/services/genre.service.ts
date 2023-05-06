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
async function getGenre(id: string) {
    const response = await fetch('http://127.0.0.1:3000/genres/' + id);
    try {
        const data = await response.json();
        return data as Genre;
    }catch (e) {
        console.log(e);
    }

}

async function addGenre(genre: Genre) {
    const response = await fetch('http://127.0.0.1:3000/genres/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(genre)
    });
}

async function deleteGenre(genreid: number) {
    const response = await fetch('http://127.0.0.1:3000/genres/delete/' + genreid, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'

        }
    });
}

async function updateGenre(genre: Genre) {
    const response = await fetch('http://127.0.0.1:3000/genres/update/' + genre.genreid, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(genre)
    });
}

const genreService = {
    getGenres,
    addGenre,
    deleteGenre,
    updateGenre,
    getGenre
}

export default genreService;