import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.js';

const ProtectedRoute = ({ element, allowedRoles }) => {
    const { user } = useContext(AuthContext);
  
    if (!user) {
      return <Navigate to="/login" />;
    }
  
    if (!allowedRoles.includes(user.role)) {
      return <Navigate to="/" />; 
    }
  
    return element; 
  };

export default ProtectedRoute;