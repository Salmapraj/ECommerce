
// import React, { useState, useContext, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { ShopContext } from '../Context/ShopContext';
// import axios from 'axios';

// function Login() {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//   });
//   const [errors, setErrors] = useState({
//     username: '',
//     password: '',
//     form: ''
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const { setIsLoggedIn, setUser } = useContext(ShopContext);

//   useEffect(() => {
//     if (localStorage.getItem('access_token')) {
//       navigate('/');
//     }
//   }, [navigate]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//     // Clear error when typing
//     if (errors[e.target.name]) {
//       setErrors({
//         ...errors,
//         [e.target.name]: '',
//       });
//     }
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.username.trim()) newErrors.username = 'Username is required';
//     if (!formData.password) newErrors.password = 'Password is required';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleApiError = (error) => {
//     if (error.response) {
//       switch (error.response.status) {
//         case 400: return 'Invalid credentials';
//         case 401: return 'Unauthorized';
//         case 500: return 'Server error';
//         default: return error.response.data?.detail || 'Login failed';
//       }
//     } else if (error.request) {
//       return 'Network error - please check your connection';
//     } else {
//       return 'An unexpected error occurred';
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;
    
//     setErrors({ ...errors, form: '' });
//     setIsLoading(true);

//     try {
//       await axios.get('http://localhost:8000/get-csrf-token/', {
//         withCredentials: true
//       });

//       const response = await axios.post(
//         'http://localhost:8000/login/',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           withCredentials: true
//         }
//       );

//       const { user } = response.data;
      
//       // Update context
//       setIsLoggedIn(true);
//       setUser(user);

//       // Redirect to home or intended page
//       navigate('/');
//     } catch (err) {
//       setErrors({
//         ...errors,
//         form: handleApiError(err)
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-3xl font-semi-bold mb-6 text-center text-[#287588]">Login</h2>
        
//         {errors.form && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {errors.form}
//           </div>
//         )}
        
//         <form onSubmit={handleSubmit} className="space-y-4" noValidate>
//           <div>
//             <label className="block text-gray-600 text-[17px] font-semi-bold mb-2" htmlFor="username">
//               Username
//             </label>
//             <input
//               className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//                 errors.username ? 'border-red-500' : ''
//               }`}
//               id="username"
//               type="text"
//               name="username"
//               placeholder="Username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//             />
//             {errors.username && (
//               <p className="text-red-500 text-xs italic mt-1">{errors.username}</p>
//             )}
//           </div>
          
//           <div className="relative">
//             <label className="block text-gray-600 text-[17px] font-semi-bold mb-2" htmlFor="password">
//               Password
//             </label>
//             <input
//               className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
//                 errors.password ? 'border-red-500' : ''
//               }`}
//               id="password"
//               type={showPassword ? 'text' : 'password'}
//               name="password"
//               placeholder="******************"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//             <button
//               type="button"
//               className="absolute right-3 top-10 transform -translate-y-1/2"
//               onClick={() => setShowPassword(!showPassword)}
//               tabIndex="-1"
//             >
//               {showPassword ? '👁️' : '👁️‍🗨️'}
//             </button>
//             {errors.password && (
//               <p className="text-red-500 text-xs italic mt-1">{errors.password}</p>
//             )}
//           </div>
          
//           <div className="flex items-center justify-between">
//             <button
//               className="bg-[#1b5968] hover:bg-[#4b5f64] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:opacity-50"
//               type="submit"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <>
//                   <span className="inline-block animate-spin mr-2">↻</span>
//                   Logging in...
//                 </>
//               ) : 'Sign In'}
//             </button>
//           </div>
          
//           <div className="text-center mt-4">
//             <p className="text-sm">
//               Don't have an account?{' '}
//               <Link to="/register" className="text-[#2d98b3] hover:text-gray-700">
//                 Register
//               </Link>
//             </p>
//             <p className="text-sm mt-2">
//               <Link to="/forgot-password" className="text-[#2d98b3] hover:text-gray-700">
//                 Forgot password?
//               </Link>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;



import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      // 1. First get CSRF token
      await fetch('http://localhost:8000/get-csrf-token/', {
        credentials: 'include',
      });

      // 2. Then submit login with CSRF token
      const response = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data);
        throw new Error(data.detail || 'Login failed');
      }

      // Successful login - redirect to home
      navigate('/', { 
        state: { from: 'login' } 
      });

    } catch (error) {
      console.error('Login error:', error);
      setErrors(prev => ({
        ...prev,
        nonFieldErrors: [error.message],
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-semi-bold mb-6 text-center text-[#287588]">Login</h2>
        
        {errors.nonFieldErrors && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errors.nonFieldErrors.map((error, index) => (
              <p key={index} className="text-sm">{error}</p>
            ))}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 text-[17px] font-semi-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className={`shadow appearance-none border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="username"
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && (
              <p className="text-red-500 text-xs italic mt-1">{errors.username}</p>
            )}
          </div>
          
          <div>
            <label className="block text-gray-600 text-[17px] font-semi-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className={`shadow appearance-none border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic mt-1">{errors.password}</p>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <button
              className="bg-[#1b5968] hover:bg-[#4b5f64] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:opacity-50"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="inline-block animate-spin mr-2">↻</span>
                  Logging in...
                </>
              ) : 'Sign In'}
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