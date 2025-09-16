import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getCurrentUserToken } from '../services/apiService';

const ProtectedRoute = () => {
  const isAuthenticated = !!getCurrentUserToken(); // Checks if the token exists in localStorage

  // If the user is authenticated, show the dashboard (Outlet).
  // Otherwise, send them back to the /login page.
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;