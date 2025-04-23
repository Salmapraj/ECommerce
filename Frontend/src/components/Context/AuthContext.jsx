// // src/Context/AuthContext.js
// import React, { createContext, useState, useEffect } from 'react';
// import axios from '../api/axiosInstance';
// import { useNavigate } from 'react-router-dom';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const navigate = useNavigate();

//   const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access_token'));

//   const login = async (username, password) => {
//     const response = await axios.post('/login/', { username, password });
//     const { access, refresh, user } = response.data;

//     localStorage.setItem('access_token', access);
//     localStorage.setItem('refresh_token', refresh);
//     localStorage.setItem('user', JSON.stringify(user));

//     axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;

//     setUser(user);
//     setIsLoggedIn(true);
//     navigate('/');
//   };

//   const logout = () => {
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('refresh_token');
//     localStorage.removeItem('user');

//     delete axios.defaults.headers.common['Authorization'];

//     setUser(null);
//     setIsLoggedIn(false);
//     navigate('/login');
//   };

//   useEffect(() => {
//     const accessToken = localStorage.getItem('access_token');
//     if (accessToken) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
