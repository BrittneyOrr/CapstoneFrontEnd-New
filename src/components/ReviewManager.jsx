// ReviewManager.jsx
import React, { useState, useEffect } from 'react';
import { fetchMovieReviews, submitReview } from '../api';
import ReviewForm from './ReviewForm';

const ReviewManager = ({ movieId, userId }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // Fetch initial reviews when component mounts
        async function fetchReviews() {
            try {
                const initialReviews = await fetchMovieReviews(movieId);
                setReviews(initialReviews);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        }
        fetchReviews();
    }, []);

console.log({reviews})
    
const handleReviewSubmit = async (reviewData) => {
        try {
            // Submit review
            await submitReview(reviewData);
            // Fetch updated reviews after submission
            const updatedReviews = await fetchMovieReviews(movieId);
            setReviews(updatedReviews);
        } catch (error) {
            console.error('Error submitting review:', error);
            // Handle error
        }
    };

    console.log({ reviews });

    return (
        <div>
            <ReviewForm
                movieId={movieId}
                userId={userId}
                onReviewSubmit={handleReviewSubmit}
            />

            <div>
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id}>
                            {/* Display review details */}
                            <p>{review.rating}</p>
                            <p>{review.comment}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews available</p>
                )}
            </div>
        </div>
    );
};

export default ReviewManager;
