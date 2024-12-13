import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider'; // Assuming you have an AuthContext

const ProtectedPage = ({ children }) => {
  const { user } = useContext(AuthContext);

  // Check if the user is authenticated by checking if the email exists
  if (!user || !user.email) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedPage;
