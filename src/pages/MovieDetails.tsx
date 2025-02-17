import { useParams } from "react-router-dom";

const MovieDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Movie Details for ID: {id}</h1>
            <p>Movie details will go here...</p>
        </div>
    );
};

export default MovieDetails;
