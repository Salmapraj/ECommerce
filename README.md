# ECommerce Project
   
A simple E-Commerce web application built with modern web technologies.

## Features

- User authentication (login/register)
- Product catalog with categories
- Shopping cart functionality
- Order processing
- Admin dashboard for product management

## Technologies Used

- Frontend: React.js, Redux, Material-UI
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Salmapraj/ECommerce.git
   cd ECommerce

   # Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install


#Create a .env file in the backend directory with your MongoDB connection string and JWT secret:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

# Start backend server (from backend directory)
npm start

# Start frontend development server (from frontend directory)
npm start
