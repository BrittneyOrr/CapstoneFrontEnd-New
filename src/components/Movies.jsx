//// setup the homepage to display the movies
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllMovies } from '../api';
import ReviewForm from './ReviewForm';
import StarRating from './StarRating'; // Import the StarRating component

export default function AllMovies() {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [averageRating, setAverageRating] = useState(0); // State to hold the average rating
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

    const handleRatingChange = (newValue) => {
        setAverageRating(newValue); // Update the average rating state with the new value
    };

    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) {
        return <p>Loading...</p>;
    } if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
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
                        {filteredMovies.map((movie) => {
                            const { id, title, poster_url, category, release_date, reviews } = movie;
                            return (
                                <div key={id} className="col">
                                    <div className="card h-100" style={{ backgroundColor: '#333', color: 'white' }}>
                                        <img src={poster_url} alt={title} className="card-img-top img-fluid" style={{ maxHeight: '300px' }} />
                                        <div className="card-body p-2">
                                            <h5 className="card-title" style={{ color: 'cyan' }}>{title}</h5>
                                            <p className="card-text"><strong style={{ color: 'yellow' }}>Category:</strong> {category}</p>
                                            <p className="card-text"><strong style={{ color: 'orange' }}>Release Date:</strong> {release_date}</p>
                                            {/* Integrate the StarRating component here */}
                                            <div>
                                                <strong style={{ color: 'green' }}>Average Rating:</strong> <StarRating value={calculateAverageRating(reviews)} onChange={handleRatingChange} />
                                            </div>
                                        </div>
                                        <div className="card-footer p-2">
                                            <button onClick={() => navigate(`/api/movies/${id}`)} className='btn btn-primary btn-sm' style={{ backgroundColor: 'purple' }}>See Details</button>
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