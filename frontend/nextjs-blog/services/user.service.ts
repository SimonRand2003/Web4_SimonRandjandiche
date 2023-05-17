import {Movie} from "../types/interfaces";


async function getMovieList(): Promise<Movie[]> {
    const id = sessionStorage.getItem('userid');
    if (!id) {
        return [];
    }
    const response = await fetch(`http://127.0.0.1:3000/users/getUserMoviesById/${id}`);
    const data = await response.json();
    return data as Movie[];
}

async function getUserName(id:number): Promise<string> {
    const response = await fetch(`http://127.0.0.1:3000/users/getUserName/${id}`);
    const data = await response.json();
    return data as string;
}


async function login(email:string, password:string): Promise<any> {
    return await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });
}

async function register(username:string, email:string, birthdate:string, password:string): Promise<Response> {
    return await fetch('http://localhost:3000/users/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            email,
            birthdate,
            password,
        }),
    });
}


const userService = {
    getMovieList,
    login,
    register,
    getUserName

};

export default userService;
