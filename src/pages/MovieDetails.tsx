import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { fetchMovieDetails } from "../api/tmdb"; // ✅ Import the function

interface Review {
    id: number;
    username: string;
    rating: number;
    review: string;
    created_at: string;
}

const MovieDetails: React.FC = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const [movie, setMovie] = useState<any>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [username, setUsername] = useState("");
    const [rating, setRating] = useState<number>(5);
    const [reviewText, setReviewText] = useState("");

    useEffect(() => {
        const loadMovieDetails = async () => {
            const movieData = await fetchMovieDetails(movieId!);
            setMovie(movieData);
            console.log(movieData);
        };

        const fetchReviews = async () => {
            const response = await axios.get(`http://localhost:5000/reviews/${movieId}`);
            setReviews(response.data);
        };

        loadMovieDetails();
        fetchReviews();
    }, [movieId]);

    const submitReview = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !reviewText) return;

        const newReview = {
            movie_id: Number(movieId),
            username,
            rating,
            review: reviewText,
        };

        try {
            const response = await axios.post("http://localhost:5000/reviews", newReview);

            // Use the response data to update the state properly
            setReviews([response.data, ...reviews]);

            // Clear form
            setUsername("");
            setReviewText("");
            setRating(5);
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };


    if (!movie) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="max-w-50 md:w-1/2 rounded-lg my-4"
            />

            {/* Review Form */}
            <div className="mt-6">
                <h2 className="text-2xl font-bold mb-2">Add a Review</h2>
                <form onSubmit={submitReview} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <select
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1} Stars
                            </option>
                        ))}
                    </select>
                    <textarea
                        placeholder="Write your review..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                        Submit Review
                    </button>
                </form>
            </div>

            {/* Reviews Section */}
            <div className="mt-6">
                <h2 className="text-2xl font-bold mb-2">Reviews</h2>
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id} className="border p-4 rounded-md my-2">
                            <p className="font-semibold">{review.username}</p>
                            <p>⭐ {review.rating}/10</p>
                            <p>{review.review}</p>
                            <p className="text-sm text-gray-500">{new Date(review.created_at).toLocaleDateString()}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet. Be the first to review!</p>
                )}
            </div>
        </div>
    );
};

export default MovieDetails;
