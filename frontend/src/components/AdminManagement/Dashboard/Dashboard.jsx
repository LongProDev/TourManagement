import React, { useState } from 'react';
import { Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import BookingManagement from '../Bookings/BookingManagement.jsx';
import TourManagement from '../Tours/ToursManagement.jsx';
import UserManagement from '../Users/UsersManagement.jsx';
import ReviewManagement from '../Reviews/ReviewsManagement.jsx';
import './dashboard.css';

const { TabPane } = Tabs;

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = React.useContext(AuthContext);

  React.useEffect(() => {
    // Check if we're still loading the auth state
    if (user === undefined) return;
    
    // If user is not logged in, redirect to login
    if (!user) {
      navigate('/login');
      return;
    }

    // If user is logged in but not admin, redirect to home
    if (user.role !== 'admin') {
      navigate('/home');
    }
  }, [user, navigate]);

  // Don't render anything while checking auth state
  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <BookingManagement />
        </TabPane>
        <TabPane tab="Tours" key="2">
          <TourManagement />
        </TabPane>
        <TabPane tab="Users" key="3">
          <UserManagement />
        </TabPane>
        <TabPane tab="Reviews" key="4">
          <ReviewManagement />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Dashboard;