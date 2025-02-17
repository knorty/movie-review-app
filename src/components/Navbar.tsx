import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold">
                    🎬 MovieApp
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6">
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/movies" className="hover:underline">Movies</Link>
                    <Link to="/profile" className="hover:underline">Profile</Link>
                    <Link to="/login" className="hover:bg-blue-700 px-3 py-1 rounded">Login</Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden focus:outline-none"
                >
                    {isOpen ? "✖" : "☰"}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden flex flex-col space-y-2 bg-blue-700 p-4 mt-2">
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/movies" className="hover:underline">Movies</Link>
                    <Link to="/profile" className="hover:underline">Profile</Link>
                    <Link to="/login" className="hover:bg-blue-800 px-3 py-1 rounded">Login</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
