import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const Location = useLocation();

  if (!isAuthenticated) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/support/signin" />;
  }

  sessionStorage.setItem('previous_path', Location.pathname);

  // Render the children components if the user is authenticated
  return children;
};

export default ProtectedRoute;
