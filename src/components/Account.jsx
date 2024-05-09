// import { useReviews } from "../context/ReviewContext";
import React, { useEffect, useState } from "react";

const Account = () => {
  //  const { reviews } = useReviews();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [reviews, setReviews] = useState(
    JSON.parse(localStorage.getItem("reviews")) || []
  );
  const [movieId, setMovieId] = useState(localStorage.getItem("movieId"));
  const [reviewId, setReviewId] = useState(localStorage.getItem("reviewId"));

  // Fetch data from local storage when the component mounts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || [];
    const storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const storedMovieId = localStorage.getItem("movieId") || [];
    const storedReviewId = localStorage.getItem("reviewId") || [];

    if (storedUser) setUser(storedUser);
    if (storedReviews) setReviews(storedReviews);
    if (storedMovieId) setMovieId(storedMovieId);
    if (storedReviewId) setReviewId(storedReviewId);
  }, []);
  console.log("Retrieved reviews:", reviews);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Account Details</h1>
      {user ? (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">User: {user.username}</h5>
            <p className="card-text">User ID: {user.id}</p>
            <p className="card-text">Email: {user.email}</p>
          </div>
        </div>
      ) : (
        <p>Please log in to view account details.</p>
      )}
      <div>
        <h1>Account Details</h1>
        <h2>Your Reviews</h2>
        {reviews.map((review, index) => (
          <div key={index}>
            <p>Movie ID: {review.movieId}</p>
            <p>Comment: {review.comment}</p>
            <p>Rating: {review.rating}</p>
          </div>
        ))}
      </div>
      <p>Most Recent Movie ID: {movieId}</p>
      <p>Most Recent Review ID: {reviewId}</p>
    </div>
  );
};

export default Account;

// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import UserReviews from './UserReviews';
// // import { fetchUserReviews } from '../api';

// // Updated fetchUserReviews function as shown above

// export const fetchUserInfo = async (userId) => {
//   // Mock implementation for demonstration purposes
//   return Promise.resolve({
//     id: userId,
//     name: '',
//     email: '',
//   });
// };

// const Account = () => {
//   const [userReviews, setUserReviews] = useState([]);
//   const [userInfo, setUserInfo] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [editedReview, setEditedReview] = useState('');
//   const [editedRating, setEditedRating] = useState(0);
//   const { userId } = useParams(); // Assuming you have a userId parameter in the route
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const reviews = await fetchUserReviews(userId);
//         setUserReviews(reviews);
//         const info = await fetchUserInfo(userId);
//         setUserInfo(info);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [userId]); // Include userId in the dependency array

//   const handleEditReview = (id) => {
//     // Logic to handle editing the review
//     navigate(`/edit-review/${id}`); // Assuming you have a route for editing reviews
//   };

//   const handleDeleteReview = (id) => {
//     // Logic to handle deleting the review
//     setUserReviews(userReviews.filter((review) => review.id !== id));
//   };

//   return (
//     <div style={{ textAlign: 'center' }}>
//       <h1 style={{ marginBottom: '20px' }}>Your Account</h1>
//       {loading ? (
//         <p>Loading user information...</p>
//       ) : (
//         <div>
//           <p>
//             <strong>Name:</strong> {userInfo.name}
//           </p>
//           <p>
//             <strong>Email:</strong> {userInfo.email}
//           </p>
//         </div>
//       )}
//       <h1 style={{ marginTop: '50px' }}>Your Reviews</h1>
//       {loading ? (
//         <p>Loading reviews...</p>
//       ) : (
//         <ul>
//           {userReviews.map((review) => (
//             <li key={review.id}>
//               {/* Render review details */}
//               <p>{review.review}</p>
//               <p>Rating: {review.rating}</p>
//               <img src={review.poster} alt="Movie Poster" style={{ maxWidth: '200px', maxHeight: '300px' }} />
//               {/* Edit and delete buttons */}
//               <button onClick={() => handleEditReview(review.id)}>Edit</button>
//               <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       )}
//       {/* Render the ReviewForm component for editing reviews */}
//     </div>
//   );
// };

// export default Account;
