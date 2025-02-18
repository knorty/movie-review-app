import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchMovies } from "../api/tmdb";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
}

const Movies: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const loadMovies = async () => {
            const data = await fetchMovies();
            setMovies(data);
        };
        loadMovies();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Movies</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movies.map((movie) => (
                    <Link
                        key={movie.id}
                        to={`/movies/${movie.id}`}
                        className="bg-white shadow-md rounded-lg overflow-hidden transform transition hover:scale-105"
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-lg font-semibold">{movie.title}</h2>
                            <p className="text-gray-600">⭐ {movie.vote_average.toFixed(1)}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Movies;

