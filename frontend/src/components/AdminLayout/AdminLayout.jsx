import React from 'react';
import { Link } from 'react-router-dom';
// import './AdminLayout.css';

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li><Link to="/admin/users">Manage Users</Link></li>
          <li><Link to="/admin/tours">Manage Tours</Link></li>
          <li><Link to="/admin/bookings">Manage Bookings</Link></li>
          <li><Link to="/admin/reviews">Manage Reviews</Link></li>
        </ul>
      </aside>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;