// Account.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserReviews from './UserReviews';
import { fetchUserReviews, fetchUserInfo } from '../api';

const Account = ({ userId }) => {
  const [userReviews, setUserReviews] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [editedReview, setEditedReview] = useState('');
  // const [editedRating, setEditedRating] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData () {
      try {
        const info = await fetchUserInfo(userId);
        setUserInfo(info);
        setLoading(false);
        console.log({info});

        const reviews = await fetchUserReviews(userId);
        setUserReviews(reviews);
        console.log({reviews});
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]); // Include userId in the dependency array

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  // const handleEditReview = (id) => {
  //   // Logic to handle editing the review
  //   navigate(`/edit-review/${id}`); // Assuming you have a route for editing reviews
  // };

  // const handleDeleteReview = (id) => {
  //   // Logic to handle deleting the review
  //   setUserReviews(userReviews.filter((review) => review.id !== id));
  // };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ marginBottom: '20px' }}>Your Account</h1>
      <div>
        <p>
          <strong>Name:</strong> {userInfo.name}
        </p>
        <p>
          <strong>Email:</strong> {userInfo.email}
        </p>
      </div>
      <h1 style={{ marginTop: '50px' }}>Your Reviews</h1>
      <UserReviews userReviews={userReviews} />
    </div>
  );
};

export default Account;
