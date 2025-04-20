import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Pages/Home";
import About from "./components/Pages/About";
import Contact from "./components/Pages/Contact";
import Products from "./components/Pages/Products";
// import Cart from "./components/Cart/Cart";
import Login from "./components/Pages/Login";
import PlaceOrder from "./components/Pages/PlaceOrder";
import Orders from "./components/Pages/Orders";
import Navbar from "./components/Pages/Navbar";
// import Policy from "./components/Pages/Policies";
// import { CartProvider } from "./components/Cart/Cart";
import Footer from './components/Pages/Footer';
import Collection from "./components/Pages/Collection";
import Register from "./components/Pages/Register";
import SearchBar from "./components/Pages/SearchBar";
// import { AuthProvider } from "./components/Context/AuthContext";
// import AuthProtected from "./components/AuthProtected";
// import { ShopContextProvider } from "./components/Context/ShopContext";
function App() {
	return (
		<>

			{/* <AuthProvider> */}
			{/* <CartProvider> */}

			<Navbar/>
			<SearchBar/>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/collection" element={<Collection />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/product/:productId" element={<Products />} />
					{/* <Route path="/cart" element={<Cart />} /> */}
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/place-order" element={<PlaceOrder />} />
					<Route path="/orders" element={<Orders />} />
				</Routes>

				{/* <Policy/> */}
		<Footer/>
		{/* </CartProvider> */}

				{/* </AuthProvider> */}
		</>
	);
}

export default App;

// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Home from "./components/Pages/Home";
// import About from "./components/Pages/About";
// import Contact from "./components/Pages/Contact";
// // import Products from "./components/Pages/Products";
// import Cart from "./components/Cart/Cart";
// import Login from "./components/Pages/Login";
// import Register from "./components/Pages/Register";
// import PlaceOrder from "./components/Pages/PlaceOrder";
// import Orders from "./components/Pages/Orders";
// import Navbar from "./components/Pages/Navbar";
// import Policy from "./components/Pages/Policies";
// import Footer from './components/Pages/Footer';
// import Collection from "./components/Pages/Collection";


// // function App() {
// //     return (
// //         <ShopContextProvider>
// //             <Navbar/>
// //                 <Routes>
// //                     <Route path="/" element={<Home />} />
// //                     <Route path="/collection" element={<Collection />} />
// //                     <Route path="/about" element={<About />} />
// //                     <Route path="/contact" element={<Contact />} />
// //                     {/* <Route path="/product/:productId" element={<Products />} /> */}
// //                     <Route path="/cart" element={
// //                         <AuthProtected>
// //                             <Cart />
// //                         </AuthProtected>
// //                     } />
// //                     <Route path="/login" element={<Login />} />
// //                     <Route path="/register" element={<Register />} />
// //                     <Route path="/place-order" element={
// //                         <AuthProtected>
// //                             <PlaceOrder />
// //                         </AuthProtected>
// //                     } />
// //                     <Route path="/orders" element={
// //                         <AuthProtected>
// //                             <Orders />
// //                         </AuthProtected>
// //                     } />
// //                 </Routes>
// //                 <Policy/>
// //             <Footer/>
// //         </ShopContextProvider>
// //     );
// // }
// // export default App;