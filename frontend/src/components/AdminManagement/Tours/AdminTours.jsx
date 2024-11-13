import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../../utils/config.js';

const AdminTours = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      const res = await fetch(`${BASE_URL}/tours`);
      const data = await res.json();
      setTours(data.data);
    };
    fetchTours();
  }, []);

  const handleDelete = async (tourId) => {
    await fetch(`${BASE_URL}/tours/${tourId}`, {
      method: 'DELETE',
    });
    setTours(tours.filter(tour => tour._id !== tourId));
  };

  return (
    <div>
      <h2>Manage Tours</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tours.map(tour => (
            <tr key={tour._id}>
              <td>{tour.title}</td>
              <td>{tour.city}</td>
              <td>
                <button onClick={() => handleDelete(tour._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTours;