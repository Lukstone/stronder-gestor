import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authContext';

interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated)

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};