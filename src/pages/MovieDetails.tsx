import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchMovieDetails } from "../api/tmdb";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    overview: string;
}

const MovieDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        const loadMovie = async () => {
            if (id) {
                const data = await fetchMovieDetails(id);
                setMovie(data);
            }
        };
        loadMovie();
    }, [id]);

    if (!movie) {
        return <div className="text-center text-red-500 text-2xl mt-10">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-96 object-cover"
                />
                <div className="p-6">
                    <h1 className="text-3xl font-bold">{movie.title}</h1>
                    <p className="text-gray-600 text-lg">⭐ {movie.vote_average.toFixed(1)}</p>
                    <p className="mt-4 text-gray-700">{movie.overview}</p>
                    <Link to="/movies" className="inline-block mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        ← Back to Movies
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;


