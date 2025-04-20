


import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useContext(ShopContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:8000/login/',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { access, refresh, user } = response.data;

      // Store tokens securely
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      // Update context
      setIsLoggedIn(true);
      setUser(user);

      // Set default axios authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;

      // Redirect to home or intended page
      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          'Login failed. Please check your credentials.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-semi-bold mb-6 text-center text-[#287588]">Login</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 text-[17px] font-semi-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          
          <div >
            <label className="block text-gray-600 text-[17px] font-semi-bold mb-2 mt-4 " htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              placeholder="******************"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="flex items-center justify-between">
            <button
              className="bg-[#1b5968] hover:bg-[#4b5f64] text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:opacity-50"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Sign In'}
            </button>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#2d98b3] hover:text-gray-700">
                Register
              </Link>
            </p>
            
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
// src/pages/Login.js
// import React, { useState, useContext } from 'react';
// import { AuthContext } from '../Context/AuthContext';
// import Register from './Register';
// const Login = () => {
//   const { login } = useContext(AuthContext);
//   const [formData, setFormData] = useState({ username: '', password: '' });
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);
//     try {
//       await login(formData.username, formData.password);
//     } catch (err) {
//       setError(err.response?.data?.detail || 'Login failed');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Login</h2>
//       {error && <p className="text-red-500 mb-2">{error}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           onChange={handleChange}
//           value={formData.username}
//           className="w-full border px-3 py-2"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           value={formData.password}
//           className="w-full border px-3 py-2"
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 w-full rounded"
//           disabled={isLoading}
//         >
//           {isLoading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
