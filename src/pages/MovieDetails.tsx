import { useParams, Link } from "react-router-dom";

interface Movie {
    id: number;
    title: string;
    poster: string;
    rating: number;
    description: string;
}

// Sample movies (Replace with API later)
const movies: Movie[] = [
    { id: 1, title: "Inception", poster: "https://via.placeholder.com/300", rating: 8.8, description: "A mind-bending thriller by Christopher Nolan." },
    { id: 2, title: "Interstellar", poster: "https://via.placeholder.com/300", rating: 8.6, description: "A sci-fi epic exploring space and time." },
    { id: 3, title: "The Dark Knight", poster: "https://via.placeholder.com/300", rating: 9.0, description: "A legendary Batman film directed by Nolan." },
    { id: 4, title: "Dune", poster: "https://via.placeholder.com/300", rating: 8.3, description: "An adaptation of Frank Herbert's sci-fi novel." },
];

const MovieDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const movie = movies.find((m) => m.id === Number(id));

    if (!movie) {
        return <div className="text-center text-red-500 text-2xl mt-10">Movie not found</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={movie.poster} alt={movie.title} className="w-full h-96 object-cover" />
                <div className="p-6">
                    <h1 className="text-3xl font-bold">{movie.title}</h1>
                    <p className="text-gray-600 text-lg">⭐ {movie.rating}</p>
                    <p className="mt-4 text-gray-700">{movie.description}</p>
                    <Link to="/movies" className="inline-block mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        ← Back to Movies
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;

