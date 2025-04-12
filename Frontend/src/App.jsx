import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./components/Home"
import About from "./components/About"
import Contact from "./components/Contact"
import Login from "./components/Login"
import Header from './components/Header';



const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },

  {
    path: '/header',
    element: <Header />,
  },
]);
  function App() {
    return <RouterProvider router={router} />;
  }
  
  

export default App