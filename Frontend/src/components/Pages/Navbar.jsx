import React, { useContext, useState } from "react";
import glazep from "/public/images/glazep.png";
import profile from "/public/images/profile.png";
import cart from "/public/images/cart.png";
import menu from "/public/images/menu.png";
import searchh from "/public/images/searchh.png";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
// import Login from "./Login"

function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const {setShowSearch} = useContext(ShopContext)
	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<div className="flex justify-between items-center px-12 -mt-4 pt-4 pb-0 relative bg-[#e5f1f4]">
		<Link to="/">
			<img src={glazep} alt="logo" className="w-26 -mt-4" />
		</Link>

			{/* Desktop Navigation */}
			<ul className="hidden md:flex text-medium text-gray-700 gap-7">
				<NavLink
					to="/"
					className="flex flex-col items-center font-[Lato] text-[15px] leading-none gap-1"
				>
					<p>HOME</p>
					<hr className="w-6 h-[1.5px] bg-gray-700 hidden border-none mt-1" />
				</NavLink>
				<NavLink
					to="/collection"
					className="flex flex-col items-center font-[Lato] text-[15px] leading-none gap-1"
				>
					<p>COLLECTION</p>
					<hr className="w-6 h-[1.5px] bg-gray-700 hidden border-none mt-1" />
				</NavLink>
				<NavLink
					to="/about"
					className="flex flex-col items-center font-[Lato] text-[15px] leading-none gap-1"
				>
					<p>ABOUT</p>
					<hr className="w-6 h-[1.5px] bg-gray-700 hidden border-none mt-1" />
				</NavLink>
				<NavLink
					to="/contact"
					className="flex flex-col items-center font-[Lato] text-[15px] leading-none gap-1"
				>
					<p>CONTACT</p>
					<hr className="w-6 h-[1.5px] bg-gray-700 hidden border-none mt-1" />
				</NavLink>
			</ul>

			<div className="flex items-center gap-5">
				<img
					src={searchh}
					alt="search-log"
					className="w-[22px] -mt-3 cursor-pointer" onClick={()=>setShowSearch(true)}
				/>
				{/* Wrap both profile icon and dropdown in `group relative` */}
				<div className="group relative">
					<Link to="/login">
					<img
						src={profile}
						alt="profile-icon"
						className="w-[25px] -mt-3 cursor-pointer"
						/>
						</Link>
					{/* Dropdown menu (initially hidden, appears on group hover) */}
					<div className="hidden group-hover:block absolute right-0 pt-4 z-30">
						<div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
							<p className="cursor-pointer hover:text-black">My Profile</p>
							<p className="cursor-pointer hover:text-black">Orders</p>
							<p className="cursor-pointer hover:text-black">Logout</p>
						</div>
					</div>
				</div>
				<Link to="/cart" className="relative">
					<img
						src={cart}
						alt="cart"
						className="w-7 min-w-5 -mt-3 cursor-pointer"
					/>
					<p className="absolute right-[2px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
						10
					</p>
				</Link>

				{/* Mobile Menu Toggle Button */}
				<button onClick={toggleMenu} className="md:hidden cursor-pointer">
					<img src={menu} alt="menu" className="w-7 -mt-1" />
				</button>
			</div>

			{/* Mobile Navigation Menu */}
			{isMenuOpen && (
				<div className="absolute top-full left-0 right-0 bg-white shadow-md z-20 md:hidden">
					<ul className="flex flex-col text-gray-700 py-4">
						<NavLink
							to="/"
							className="font-[Lato] text-[15px] py-3 px-8 hover:bg-gray-100"
							onClick={() => setIsMenuOpen(false)}
						>
							HOME
						</NavLink>
						<NavLink
							to="/collection"
							className="font-[Lato] text-[15px] py-3 px-8 hover:bg-gray-100"
							onClick={() => setIsMenuOpen(false)}
						>
							COLLECTION
						</NavLink>
						<NavLink
							to="/about"
							className="font-[Lato] text-[15px] py-3 px-8 hover:bg-gray-100"
							onClick={() => setIsMenuOpen(false)}
						>
							ABOUT
						</NavLink>
						<NavLink
							to="/contact"
							className="font-[Lato] text-[15px] py-3 px-8 hover:bg-gray-100"
							onClick={() => setIsMenuOpen(false)}
						>
							CONTACT
						</NavLink>
					</ul>
				</div>
			)}
		</div>
	);
}

export default Navbar;
