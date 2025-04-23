// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';

// function Login() {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//   });
//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   // Helper function to get CSRF token from cookies
//   const getCookie = (name) => {
//     let cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//       const cookies = document.cookie.split(';');
//       for (let i = 0; i < cookies.length; i++) {
//         const cookie = cookies[i].trim();
//         if (cookie.substring(0, name.length + 1) === (name + '=')) {
//           cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//           break;
//         }
//       }
//     }
//     return cookieValue;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//     // Clear error when typing
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setErrors({});

//     try {
//       // 1. First get CSRF token
//       await fetch('http://localhost:8000/get-csrf-token/', {
//         credentials: 'include',
//       });

//       // 2. Then submit login with CSRF token
//       const response = await fetch('http://localhost:8000/login/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-CSRFToken': getCookie('csrftoken'),
//         },
//         body: JSON.stringify(formData),
//         credentials: 'include',
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setErrors(data);
//         throw new Error(data.detail || 'Login failed');
//       }

//       // Successful login - redirect to home
//       navigate('/', {
//         state: { from: 'login' }
//       });

//     } catch (error) {
//       console.error('Login error:', error);
//       setErrors(prev => ({
//         ...prev,
//         nonFieldErrors: [error.message],
//       }));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-3xl font-semi-bold mb-6 text-center text-[#287588]">Login</h2>

//         {errors.nonFieldErrors && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {errors.nonFieldErrors.map((error, index) => (
//               <p key={index} className="text-sm">{error}</p>
//             ))}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-gray-600 text-[17px] font-semi-bold mb-2" htmlFor="username">
//               Username
//             </label>
//             <input
//               className={`shadow appearance-none border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
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

//           <div>
//             <label className="block text-gray-600 text-[17px] font-semi-bold mb-2" htmlFor="password">
//               Password
//             </label>
//             <input
//               className={`shadow appearance-none border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
//               id="password"
//               type="password"
//               name="password"
//               placeholder="••••••••"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
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

//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});
	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [loginSuccess, setLoginSuccess] = useState(false);
	const navigate = useNavigate();

	// Helper function to get CSRF token from cookies
	const getCookie = (name) => {
		let cookieValue = null;
		if (document.cookie && document.cookie !== "") {
			const cookies = document.cookie.split(";");
			for (let i = 0; i < cookies.length; i++) {
				const cookie = cookies[i].trim();
				if (cookie.substring(0, name.length + 1) === name + "=") {
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
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	// Effect to handle redirect after successful login
	useEffect(() => {
		let redirectTimer;
		if (loginSuccess) {
			redirectTimer = setTimeout(() => {
				navigate("/", { state: { from: "login" } });
			}, 2000); // Wait 2 seconds before redirecting
		}
		return () => clearTimeout(redirectTimer);
	}, [loginSuccess, navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setErrors({});

		try {
			// 1. First get CSRF token
			await fetch("http://localhost:8000/get-csrf-token/", {
				credentials: "include",
			});

			// 2. Then submit login with CSRF token
			const response = await fetch("http://localhost:8000/login/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-CSRFToken": getCookie("csrftoken"),
				},
				body: JSON.stringify(formData),
				credentials: "include",
			});

			const data = await response.json();

			if (!response.ok) {
				setErrors(data);
				throw new Error(data.detail || "Login failed");
			}

			// Show success message
			setLoginSuccess(true);
		} catch (error) {
			console.error("Login error:", error);
			setErrors((prev) => ({
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
				<h2 className="text-3xl font-semi-bold mb-6 text-center text-[#287588]">
					Login
				</h2>

				{loginSuccess && (
					<div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
						<p className="text-sm">
							Login successful! Redirecting to home page...
						</p>
					</div>
				)}

				{errors.nonFieldErrors && (
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
						{errors.nonFieldErrors.map((error, index) => (
							<p key={index} className="text-sm">
								{error}
							</p>
						))}
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label
							className="block text-gray-600 text-[17px] font-semi-bold mb-2"
							htmlFor="username"
						>
							Username
						</label>
						<input
							className={`shadow appearance-none border ${
								errors.username ? "border-red-500" : "border-gray-300"
							} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
							id="username"
							type="text"
							name="username"
							placeholder="Username"
							value={formData.username}
							onChange={handleChange}
							required
							disabled={loginSuccess}
						/>
						{errors.username && (
							<p className="text-red-500 text-xs italic mt-1">
								{errors.username}
							</p>
						)}
					</div>

					<div>
						<label
							className="block text-gray-600 text-[17px] font-semi-bold mb-2"
							htmlFor="password"
						>
							Password
						</label>
						<input
							className={`shadow appearance-none border ${
								errors.password ? "border-red-500" : "border-gray-300"
							} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
							id="password"
							type="password"
							name="password"
							placeholder="••••••••"
							value={formData.password}
							onChange={handleChange}
							required
							disabled={loginSuccess}
						/>
						{errors.password && (
							<p className="text-red-500 text-xs italic mt-1">
								{errors.password}
							</p>
						)}
					</div>

					<div className="flex items-center justify-between">
						<button
							className="bg-[#1b5968] hover:bg-[#4b5f64] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:opacity-50"
							type="submit"
							disabled={isLoading || loginSuccess}
						>
							{isLoading ? (
								<>
									<span className="inline-block animate-spin mr-2">↻</span>
									Logging in...
								</>
							) : loginSuccess ? (
								"Logged In"
							) : (
								"Sign In"
							)}
						</button>
					</div>

					<div className="text-center mt-4">
						<p className="text-sm">
							Don't have an account?{" "}
							<Link
								to="/register"
								className="text-[#2d98b3] hover:text-gray-700"
							>
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
