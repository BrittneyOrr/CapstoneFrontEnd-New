import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserReviews from './UserReviews';
// import { fetchUserReviews } from '../api';

// Updated fetchUserReviews function as shown above

export const fetchUserInfo = async (userId) => {
  // Mock implementation for demonstration purposes
  return Promise.resolve({
    id: userId,
    name: '',
    email: '',
  });
};

const Account = () => {
  const [userReviews, setUserReviews] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [editedReview, setEditedReview] = useState('');
  const [editedRating, setEditedRating] = useState(0);
  const { userId } = useParams(); // Assuming you have a userId parameter in the route
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviews = await fetchUserReviews(userId);
        setUserReviews(reviews);
        const info = await fetchUserInfo(userId);
        setUserInfo(info);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]); // Include userId in the dependency array

  const handleEditReview = (id) => {
    // Logic to handle editing the review
    navigate(`/edit-review/${id}`); // Assuming you have a route for editing reviews
  };

  const handleDeleteReview = (id) => {
    // Logic to handle deleting the review
    setUserReviews(userReviews.filter((review) => review.id !== id));
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ marginBottom: '20px' }}>Your Account</h1>
      {loading ? (
        <p>Loading user information...</p>
      ) : (
        <div>
          <p>
            <strong>Name:</strong> {userInfo.name}
          </p>
          <p>
            <strong>Email:</strong> {userInfo.email}
          </p>
        </div>
      )}
      <h1 style={{ marginTop: '50px' }}>Your Reviews</h1>
      {loading ? (
        <p>Loading reviews...</p>
      ) : (
        <ul>
          {userReviews.map((review) => (
            <li key={review.id}>
              {/* Render review details */}
              <p>{review.review}</p>
              <p>Rating: {review.rating}</p>
              <img src={review.poster} alt="Movie Poster" style={{ maxWidth: '200px', maxHeight: '300px' }} />
              {/* Edit and delete buttons */}
              <button onClick={() => handleEditReview(review.id)}>Edit</button>
              <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      {/* Render the ReviewForm component for editing reviews */}
    </div>
  );
};

export default Account;
