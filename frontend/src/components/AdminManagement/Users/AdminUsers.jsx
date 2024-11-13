import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../../utils/config.js';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`${BASE_URL}/users`);
      const data = await res.json();
      setUsers(data.data);
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    await fetch(`${BASE_URL}/users/${userId}`, {
      method: 'DELETE',
    });
    setUsers(users.filter(user => user._id !== userId));
  };

  return (
    <div>
      <h2>Manage Users</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;