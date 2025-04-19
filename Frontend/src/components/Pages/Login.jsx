
// import React, { useState, useContext } from 'react';
// import { useNavigate,Link } from 'react-router-dom';
// import { ShopContext } from '../Context/ShopContext';
// import Register from './Register';
// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const { setIsLoggedIn, setUser } = useContext(ShopContext);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
    
//     try {
//       const response = await fetch('http://localhost:8000/api/login/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username,
//           password
//         })
//       });
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.detail || 'Login failed');
//       }
      
//       const data = await response.json();
      
//       // Store tokens in localStorage
//       localStorage.setItem('access_token', data.access);
//       localStorage.setItem('refresh_token', data.refresh);
      
//       // Update context
//       setIsLoggedIn(true);
//       setUser({
//         username: data.username,
//         phone: data.phone
//       });
      
//       // Redirect to home page
//       navigate('/');
//     } catch (err) {
//       setError(err.message || 'Login failed. Please check your credentials.');
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-[#fbfcfc] p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-3xl font-semi-bold mb-6 text-center text-[#287588]">Login</h2>
        
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//         )}
        
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-600 text-[17px] font-semi-bold mb-2" htmlFor="username">
//               Username
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="username"
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
          
//           <div className="mb-6">
//             <label className="block text-gray-600 text-[17px] font-semi-bold mb-2" htmlFor="password">
//               Password
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="password"
//               type="password"
//               placeholder="******************"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
          
//           <div className="flex items-center justify-between">
//             <button
//               className="bg-[#1b5968] hover:bg-[#4b5f64] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
//               type="submit"
//             >
//               Sign In
//             </button>
//           </div>
          
//           <div className="text-center mt-4">
//             <p>Don't have an account? <Link to="/register" className="text-[#12a0c4] hover:text-blue-700">Register</Link></p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;

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
        'http://localhost:8000/api/login/',
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
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Login</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
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
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:opacity-50"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Sign In'}
            </button>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-500 hover:text-blue-700">
                Register
              </Link>
            </p>
            <p className="text-sm mt-2">
              <Link to="/forgot-password" className="text-blue-500 hover:text-blue-700">
                Forgot password?
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;