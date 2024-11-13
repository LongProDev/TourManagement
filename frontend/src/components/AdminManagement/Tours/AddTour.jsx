import React, { useState } from 'react';
import { BASE_URL } from '../../../utils/config.js';

const AddTour = () => {
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${BASE_URL}/tours`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, city }),
    });
    if (res.ok) {
      // Handle success (e.g., redirect or show a success message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>City:</label>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
      </div>
      <button type="submit">Create Tour</button>
    </form>
  );
};

export default AddTour;