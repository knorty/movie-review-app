import { Link } from "react-router-dom";

interface Movie {
    id: number;
    title: string;
    poster: string;
    rating: number;
}

// Sample movie data (Replace with API later)
const movies: Movie[] = [
    { id: 1, title: "Inception", poster: "https://via.placeholder.com/150", rating: 8.8 },
    { id: 2, title: "Interstellar", poster: "https://via.placeholder.com/150", rating: 8.6 },
    { id: 3, title: "The Dark Knight", poster: "https://via.placeholder.com/150", rating: 9.0 },
    { id: 4, title: "Dune", poster: "https://via.placeholder.com/150", rating: 8.3 },
];

const Movies: React.FC = () => {
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
                        <img src={movie.poster} alt={movie.title} className="w-full h-64 object-cover" />
                        <div className="p-4">
                            <h2 className="text-lg font-semibold">{movie.title}</h2>
                            <p className="text-gray-600">⭐ {movie.rating}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Movies;
