//// setup the homepage to display the movies
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllMovies } from '../api';
import { useParams } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import StarRating from './StarRating'; // Import the StarRating component
import { deleteMovieById } from '../api/index';

export default function AllMovies({ token, isAdmin }) {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false); // Track admin login status

    const navigate = useNavigate();

    useEffect(() => {
        async function getAllMoviesHandler() {
            try {
                const moviesData = await getAllMovies();
                setMovies(moviesData);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        }
        getAllMoviesHandler();
    }, []);

    const calculateAverageRating = (reviews) => {
        if (!reviews || reviews.length === 0) {
            return 0;
        }
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        return totalRating / reviews.length;
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // const handleDeleteMovie = async (movieId) => {
    //     try {
    //         await deleteMovieById(movieId);
    //         setMovies(prevMovies => prevMovies.filter(movie => movie.id !== movieId)); // Remove deleted movie from state
    //     } catch (error) {
    //         console.error('Error deleting movie:', error);
    //     }
    // };

    const handleAdminLogin = () => {
        const adminUsername = "queen";
        const adminPassword = "queenadmin";

        const username = prompt("Enter username:");
        const password = prompt("Enter password:");

        if (username === adminUsername && password === adminPassword) {
            setIsAdminLoggedIn(true); // Set isAdminLoggedIn to true if login successful
            alert("Successfully logged in as admin!");
        } else {
            alert("Invalid username or password. Please try again.");
        }
    };

    const handleDeleteMovie = async (movieId) => {
        try {
            await deleteMovieById(movieId, token);
            setMovies(prevMovies => prevMovies.filter(movie => movie.id !== movieId)); // Remove deleted movie from state
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            {isAdminLoggedIn && (
                <div>
                    <p>Welcome, Admin!</p>
                    {/* Display admin-specific UI */}
                    <button onClick={() => navigate('/account')}>Account</button>
                </div>
            )}
            {!isAdminLoggedIn && (
                <div>
                    <button onClick={handleAdminLogin}>Admin Login</button>
                    {/* Render Sign In and Create Account only if admin is not logged in */}
                </div>
            )}
            <div className="bg-dark">
                <div className="container py-4">
                    <h1 className="text-light">ReelRave</h1>
                    <h2 className="text-light mb-4">Cinematic Chronicles: Your Ultimate Destination for Film Reviews and Insights!</h2>
                    <input
                        type="text"
                        className="form-control-sm mb-3"
                        placeholder="Search Movies"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <div className='black-background'>
                <div className='container'>
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {movies
                            .filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((movie) => {
                                const { id, title, poster_url, category, release_date, reviews } = movie;
                                return (
                                    <div key={id} className="col">
                                        <div className="card h-100" style={{ backgroundColor: '#333', color: 'white' }}>
                                            <img src={poster_url} alt={title} className="card-img-top img-fluid" style={{ maxHeight: '300px' }} />
                                            <div className="card-body p-2">
                                                <h5 className="card-title" style={{ color: 'cyan' }}>{title}</h5>
                                                <p className="card-text"><strong style={{ color: 'yellow' }}>Category:</strong> {category}</p>
                                                <p className="card-text"><strong style={{ color: 'orange' }}>Release Date:</strong> {release_date}</p>
                                                <div>
                                                    <strong style={{ color: 'green' }}>Average Rating:</strong> {calculateAverageRating(reviews)}
                                                </div>
                                            </div>
                                            <div className="card-footer p-2">
                                                {isAdminLoggedIn ? ( // Check if admin is logged in
                                                    <button onClick={() => handleDeleteMovie(id)} className='btn btn-danger btn-sm'>Delete Movie</button>
                                                ) : (
                                                    <button onClick={() => navigate(`/api/movies/${id}`)} className='btn btn-primary btn-sm' style={{ backgroundColor: 'purple' }}>See Details</button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
}