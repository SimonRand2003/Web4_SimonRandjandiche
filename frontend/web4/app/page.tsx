import '../app/css/tailwind.css';

interface Movie {
    _movieid: string;
    _title: string;
    _releaseDate: string;
    _duration: number;
}
async function getMovies() {
        const response = await fetch('http://127.0.0.1:3000/movies');
        const data = await response.json();
        return data as Movie[];
}
function MovieComponent({ movie }: { movie: Movie }) {
    const { _movieid, _title, _releaseDate, _duration } = movie;

    return (
        <tr>
            <td className="border px-4 py-2">{_movieid}</td>
            <td className="border px-4 py-2">{_title}</td>
            <td className="border px-4 py-2">{_releaseDate}</td>
            <td className="border px-4 py-2">{_duration}</td>
            <td className="border px-4 py-2">add to list</td>
            <td className="border px-4 py-2">Rate</td>
        </tr>
    );
}

export default async function MoviesPage() {
    const movies = await getMovies();
    return (
        <div>
            <h1>Movies</h1>
            <table className="table-auto">
                <thead>
                <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2">Release Date</th>
                    <th className="px-4 py-2">Duration</th>
                    <th className="px-4 py-2"></th>
                    <th className="px-4 py-2"></th>
                </tr>
                </thead>
                <tbody>
                {movies?.map((movie) => {
                    return <MovieComponent key={movie._movieid} movie={movie} />;
                })}
                </tbody>
            </table>
        </div>
    );

}
