import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchMovies, searchMovies } from "../api/tmdb";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
}

const Movies: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        loadMovies();
    }, [page]);

    const loadMovies = async () => {
        const data = searchTerm
            ? await searchMovies(searchTerm, page)
            : await fetchMovies(page);

        setMovies(data.results);
        setTotalPages(data.total_pages);
    };

    const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setPage(1); // Reset to first page when searching
        loadMovies();
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Movies</h1>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search for a movie..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full p-2 mb-6 border border-gray-300 rounded-md"
            />

            {/* Movies Grid */}
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
                            className="max-w-72 h-64 place-self-center"
                        />
                        <div className="p-4">
                            <h2 className="text-lg font-semibold">{movie.title}</h2>
                            <p className="text-gray-600">⭐ {movie.vote_average.toFixed(1)}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-6 space-x-4">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
                >
                    ← Previous
                </button>

                <span className="text-lg font-semibold">{page} / {totalPages}</span>

                <button
                    disabled={page >= totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50"
                >
                    Next →
                </button>
            </div>
        </div>
    );
};

export default Movies;



