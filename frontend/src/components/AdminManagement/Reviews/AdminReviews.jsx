import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../../utils/config.js';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch(`${BASE_URL}/reviews`);
      const data = await res.json();
      setReviews(data.data);
    };
    fetchReviews();
  }, []);

  const handleDelete = async (reviewId) => {
    await fetch(`${BASE_URL}/reviews/${reviewId}`, {
      method: 'DELETE',
    });
    setReviews(reviews.filter(review => review._id !== reviewId));
  };

  return (
    <div>
      <h2>Manage Reviews</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Tour</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map(review => (
            <tr key={review._id}>
              <td>{review.user.username}</td>
              <td>{review.tour.title}</td>
              <td>{review.rating}</td>
              <td>
                <button onClick={() => handleDelete(review._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReviews;