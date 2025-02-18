import axios from "axios";

const API_KEY = "33ead8149c2e60a01b7bc7edf475cb13"; // Replace with your API key
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (page = 1) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching movies:", error);
        return { results: [], total_pages: 1 };
    }
};

export const fetchMovieDetails = async (movieId: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
        return response.data; // Returns movie details
    } catch (error) {
        console.error("Error fetching movie details:", error);
        return null;
    }
};

export const searchMovies = async (query: string, page = 1) => {
    try {
        const response = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`);
        return response.data;
    } catch (error) {
        console.error("Error searching movies:", error);
        return { results: [], total_pages: 1 };
    }
};

