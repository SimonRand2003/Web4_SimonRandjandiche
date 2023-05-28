async function getMovieList(){
    const token = sessionStorage.getItem('token');
    const id = sessionStorage.getItem('userid');
    return await fetch(`http://127.0.0.1:3000/users/getUserMoviesById/${id}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
}

async function getUserName(id:number): Promise<string> {
    const token = sessionStorage.getItem('token');

    const response = await fetch(`http://127.0.0.1:3000/users/getUserName/${id}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
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
