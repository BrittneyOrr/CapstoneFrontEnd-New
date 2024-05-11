import React, { useState, useEffect } from 'react';
import { getAllUsers, getAllReviews, fetchUserReviews, fetchUserInfo } from '../api'; 
import { useNavigate } from 'react-router-dom';

const Account = ({ userId, isAdmin }) => {
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAdmin) {
          const usersData = await getAllUsers(); 
          const reviewsData = await getAllReviews(); 
          setUsers(usersData);
          setReviews(reviewsData);
        } else {
          const userInfo = await fetchUserInfo(userId);
          setUser(userInfo);

          const userReviews = await fetchUserReviews(userId);
          setReviews(userReviews);
        }
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId, isAdmin]);

  const navigate = useNavigate();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="container mt-5">
      <h1>{isAdmin ? 'Admin Account' : 'Account Details'}</h1>
      {isAdmin ? (
        <div>
          <h2>All Users</h2>
          <table className="table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>User Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.isadmin ? 'Admin' : 'Regular User'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2>All Reviews</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Movie Id</th>
                <th>Rating</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map(review => (
                <tr key={review.id}>
                  <td>{review.movie_id}</td>
                  <td>{review.rating}</td>
                  <td>{review.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">User: {user.username}</h5>
              <p className="card-text">Email: {user.email}</p>
              <p className="card-text">User Role: {user.isadmin ? 'Admin' : 'Regular User'}</p>
            </div>
          </div>
          <div>
            <h2>Your Reviews</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Movie</th>
                  <th>Rating</th>
                  <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review, index) => (
                  <tr key={index}>
                    <td>{review.movie}</td>
                    <td>{review.rating}</td>
                    <td>{review.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;