import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';

function LogOut() {
  const navigate = useNavigate();
  const { setUser, clearCart } = useContext(ShopContext);

  const handleLogout = async () => {
    try {
      // Call Django logout endpoint using the URL name
      await axios.post('http://localhost:8000/logout/', {}, {
        withCredentials: true, // Required for session cookies
        headers: {
          'X-CSRFToken': getCookie('csrftoken'), // Needed if using CSRF protection
          'Content-Type': 'application/json'
        }
      });

      // Clear frontend state
      localStorage.removeItem('token');
      if (setUser) setUser(null);
      if (clearCart) clearCart();
      
      // Redirect to home
      navigate('/');
      
    } catch (error) {
      console.error('Logout failed:', error.response?.data || error.message);
      // Optional: Show error to user
      alert('Logout failed. Please try again.');
    }
  };

  // Helper function to get CSRF token
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  return (
    <button 
      onClick={handleLogout}
      className="text-gray-700 hover:text-gray-900 cursor-pointer py-2 px-4"
    >
      Logout
    </button>
  );
}

export default LogOut;