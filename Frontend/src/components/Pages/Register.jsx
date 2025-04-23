<<<<<<< HEAD

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
=======
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

>>>>>>> demo
function Register() {
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    phone: '',
    password: '',
    password2: ''
  });
<<<<<<< HEAD
=======
  
>>>>>>> demo
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

<<<<<<< HEAD
=======
  // Helper function to get CSRF token from cookies
  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

>>>>>>> demo
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
<<<<<<< HEAD
=======
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validatePasswords = () => {
    if (formData.password !== formData.password2) {
      setErrors(prev => ({
        ...prev,
        password2: ['Passwords do not match']
      }));
      return false;
    }
    return true;
>>>>>>> demo
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    setIsSubmitting(true); // Show the user something is happening
    
    console.log("Submitting form data:", formData); // Debug log
    
    try {
=======
    
    if (!validatePasswords()) {
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});

    try {
      // 1. First get CSRF token
      await fetch('http://localhost:8000/get-csrf-token/', {
        credentials: 'include'
      });

      // 2. Then submit registration with CSRF token
>>>>>>> demo
      const response = await fetch('http://localhost:8000/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
<<<<<<< HEAD
=======
          'X-CSRFToken': getCookie('csrftoken')
>>>>>>> demo
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });
<<<<<<< HEAD
  
      console.log("Response status:", response.status); // Debug log
      
      const data = await response.json();
      console.log('Response data:', data);
      
      if (!response.ok) {
        setErrors(data);
        throw new Error(data.message || 'Registration failed');
      }
      
      // If successful, redirect or show success message
      alert('Registration successful!');
      navigate('/login');
      
    } catch (error) {
      console.error('Registration error:', error);
      // Set general error if not caught by the response handling
      setErrors(prev => ({...prev, non_field_errors: [error.message]}));
=======

      const data = await response.json();
      
      if (!response.ok) {
        setErrors(data);
        throw new Error(data.non_field_errors?.[0] || 'Registration failed');
      }

      navigate('/login', {
        state: { 
          registrationSuccess: true,
          message: 'Registration successful! Please login.' 
        }
      });

    } catch (error) {
      console.error('Registration error:', error);
      setErrors(prev => ({
        ...prev,
        non_field_errors: [error.message]
      }));
>>>>>>> demo
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-12">
      <div className="bg-[#fbfcfc] p-8 rounded-lg shadow-md w-full max-w-[600px]">
        <h2 className="text-3xl font-semi-bold mb-6 text-center text-[#287588]">Create Account</h2>

<<<<<<< HEAD
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-gray-600 text-[17px] font-semi-bold mb-2" htmlFor="username">
              Username*
            </label>
            <input
              className={`shadow appearance-none border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="username"
=======
        {errors.non_field_errors && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errors.non_field_errors.map((error, index) => (
              <p key={index} className="text-sm">{error}</p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-gray-600 text-[17px] font-semi-bold mb-2">Username*</label>
            <input
              className={`shadow appearance-none border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
>>>>>>> demo
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
          </div>

          {/* First Name */}
          <div>
<<<<<<< HEAD
            <label className="block text-gray-600 text-[17px] font-semi-bold mb-2" htmlFor="first_name">
              First Name*
            </label>
            <input
              className={`shadow appearance-none border ${errors.first_name ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="first_name"
=======
            <label className="block text-gray-600 text-[17px] font-semi-bold mb-2">First Name*</label>
            <input
              className={`shadow appearance-none border ${errors.first_name ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
>>>>>>> demo
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
            {errors.first_name && <p className="text-red-500 text-xs italic">{errors.first_name}</p>}
          </div>

          {/* Last Name */}
          <div>
<<<<<<< HEAD
            <label className="block text-gray-600 text-[17px] font-semi-bold mb-2" htmlFor="last_name">
              Last Name*
            </label>
            <input
              className={`shadow appearance-none border ${errors.last_name ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="last_name"
=======
            <label className="block text-gray-600 text-[17px] font-semi-bold mb-2">Last Name*</label>
            <input
              className={`shadow appearance-none border ${errors.last_name ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
>>>>>>> demo
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
            {errors.last_name && <p className="text-red-500 text-xs italic">{errors.last_name}</p>}
          </div>

          {/* Email */}
          <div>
<<<<<<< HEAD
            <label className="block text-gray-600 text-[17px] font-semi-bold mb-2" htmlFor="email">
              Email*
            </label>
            <input
              className={`shadow appearance-none border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="email"
=======
            <label className="block text-gray-600 text-[17px] font-semi-bold mb-2">Email*</label>
            <input
              className={`shadow appearance-none border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
>>>>>>> demo
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
<<<<<<< HEAD
            <label className="block text-gray-600 text-[17px] font-semi-bold mb-2" htmlFor="phone">
              Phone Number* (10 digits)
            </label>
            <input
              className={`shadow appearance-none border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              title="Phone number should be 10 digits"
=======
            <label className="block text-gray-600 text-[17px] font-semi-bold mb-2">Phone*</label>
            <input
              className={`shadow appearance-none border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                handleChange({
                  target: {
                    name: 'phone',
                    value
                  }
                });
              }}
              required
              pattern="[0-9]{10}"
              title="10 digit phone number"
>>>>>>> demo
            />
            {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone}</p>}
          </div>

          {/* Address */}
          <div>
<<<<<<< HEAD
            <label className="block text-gray-600 text-[17px] font-semi-bold mb-2" htmlFor="address">
              Address*
            </label>
            <textarea
              className={`shadow appearance-none border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="address"
=======
            <label className="block text-gray-600 text-[17px] font-semi-bold mb-2">Address*</label>
            <textarea
              className={`shadow appearance-none border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
>>>>>>> demo
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows="2"
            />
            {errors.address && <p className="text-red-500 text-xs italic">{errors.address}</p>}
          </div>

          {/* Password */}
          <div>
<<<<<<< HEAD
            <label className="block text-gray-600 text-[17px] font-semi-bold mb-2" htmlFor="password">
              Password*
            </label>
            <input
              className={`shadow appearance-none border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="password"
=======
            <label className="block text-gray-600 text-[17px] font-semi-bold mb-2">Password*</label>
            <input
              className={`shadow appearance-none border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
>>>>>>> demo
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
<<<<<<< HEAD
=======
              minLength="8"
>>>>>>> demo
            />
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
<<<<<<< HEAD
            <label className="block text-gray-600 text-[17px] font-semi-bold mb-2" htmlFor="password2">
              Confirm Password*
            </label>
            <input
              className={`shadow appearance-none border ${errors.password2 ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="password2"
=======
            <label className="block text-gray-600 text-[17px] font-semi-bold mb-2">Confirm Password*</label>
            <input
              className={`shadow appearance-none border ${errors.password2 ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
>>>>>>> demo
              type="password"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              required
            />
            {errors.password2 && <p className="text-red-500 text-xs italic">{errors.password2}</p>}
          </div>

<<<<<<< HEAD
          {/* Non-field errors */}
          {errors.non_field_errors && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {errors.non_field_errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              className="bg-[#1b5968] hover:bg-[#4b5f64] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </div>
=======
          <button
            className="bg-[#1b5968] hover:bg-[#4b5f64] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:opacity-50"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
>>>>>>> demo

          <div className="text-center mt-4">
            <p>Already have an account? <Link to="/login" className="text-[#12a0c4] hover:text-blue-700">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

