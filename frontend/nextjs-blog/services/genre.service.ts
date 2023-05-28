import {Genre} from "../types/interfaces";

async function getGenres() {
    const token = sessionStorage.getItem('token');
    return  await fetch('http://127.0.0.1:3000/genres',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
}
async function getGenre(id: string) {
    const token = sessionStorage.getItem('token');
    return await fetch('http://127.0.0.1:3000/genres/' + id,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
}

async function addGenre(genre: Genre) {
    const token = sessionStorage.getItem('token');

    return await fetch('http://127.0.0.1:3000/genres/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(genre)
    });
}

async function deleteGenre(genreid: number) {
    const token = sessionStorage.getItem('token');
    return await fetch('http://127.0.0.1:3000/genres/delete/' + genreid, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,

        }
    });
}

async function updateGenre(genre: Genre) {
    const token = sessionStorage.getItem('token');

    return await fetch('http://127.0.0.1:3000/genres/update/' + genre.genreid, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
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