import React from 'react';
import { Navigate } from 'react-router-dom';
import { useCheckUserQuery } from './features/api/baseApiSlice'; // Import the hook to check user status

// ProtectedRoute component that checks if user is authenticated
const ProtectedRoute = ({ children }) => {
  const { data, isLoading, isError } = useCheckUserQuery();

  // Show loading message if the data is still being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Redirect to login page if the user is not authenticated or there's an error
  if (isError || !data?.user) {
    return <Navigate to="/login" />;
  }

  // Render the protected content if the user is authenticated
  return children;
};

export default ProtectedRoute;