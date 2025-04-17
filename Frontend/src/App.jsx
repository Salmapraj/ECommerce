import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Pages/Home";
import Collection from "./components/Pages/Collection";
import About from "./components/Pages/About";
import Contact from "./components/Pages/Contact";
// import Products from "./components/Pages/Products";
import Cart from "./components/Cart/Cart";
import Login from "./components/Pages/Login";
import PlaceOrder from "./components/Pages/PlaceOrder";
import Orders from "./components/Pages/Orders";
import Navbar from "./components/Pages/Navbar";
import Footer from './components/Pages/Footer';

function App() {
	return (
		<>
			<Navbar/>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/collection" element={<Collection />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
					{/* <Route path="/product/:productId" element={<Products />} /> */}
					<Route path="/cart" element={<Cart />} />
					<Route path="/login" element={<Login />} />
					<Route path="/place-order" element={<PlaceOrder />} />
					<Route path="/orders" element={<Orders />} />
				</Routes>
		<Footer/>
		</>
	);
}

export default App;
