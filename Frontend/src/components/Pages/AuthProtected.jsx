import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';

const AuthProtected = ({ children }) => {
  const { isLoggedIn } = useContext(ShopContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthProtected;