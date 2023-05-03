import {Movie, User} from "../types/interfaces";
import { Rating } from '../types/interfaces';


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

async function getUserinSession(): Promise<User> {
    const userData = localStorage.getItem('user');
    return userData as User;
}




async function login(email:string, password:string): Promise<any> {
    const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });
    return response;
}

async function register(username:string, email:string, birthdate:string, password:string): Promise<any> {
    const res = await fetch('http://localhost:3000/users/add', {
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
    return res;
}

const userService = {
    getMovieList,
    login,
    register,
    getUserinSession,
};

export default userService;
