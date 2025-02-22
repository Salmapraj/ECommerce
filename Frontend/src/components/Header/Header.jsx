import React from "react";
import { Link, NavLink } from "react-router-dom";
import glazep from "../../assets/glazep.png";
import search from "../../assets/search.png";
import cart from "../../assets/cart.png";
import pp from "../../assets/pp.png";
import { useState, useEffect } from "react";
function Header() {
	const [isHeaderVisible, setIsHeaderVisible] = useState(true);

	useEffect(() => {
	  const handleScroll = () => {
		// Set a threshold for when the header should disappear
		const threshold = 100; // Adjust this value as needed
		const currentScrollPos = window.pageYOffset;
  
		if (currentScrollPos > threshold) {
		  setIsHeaderVisible(false); // Hide the header
		} else {
		  setIsHeaderVisible(true); // Show the header
		}
	  };
  
	  // Add scroll event listener
	  window.addEventListener('scroll', handleScroll);
  
	  // Clean up the event listener on component unmount
	  return () => {
		window.removeEventListener('scroll', handleScroll);
	  };
	}, []);


	return (
		
 <header
      className={`bg-[#abe54e]  sticky top-0 z-50 transition-transform duration-300 ${
        isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
			<nav className="flex justify-between align-center  pt-5 flex-wrap ">

				<Link to="/" className="pl-8 ">
					<img src={glazep} alt=""  className="w-[100px] " />
				</Link>

				<div className="flex flex-grow justify-center gap-8 font-medium font-[Lato] text-[18px]">
				<Link to="/">
						<div>Home</div>
									
									</Link>

						<div>Shop</div>
						<div>About</div>
						<div>Contact</div>
									</div>

				<div className="flex h-12 gap-3 pr-8">
					<Link><div>
						<img src={search} alt="search" className="mr-2 h-6" />
					</div></Link>

					<Link>
					<div>
						<img src={cart} alt="cart" className="mr-2 h-6" />
					</div></Link>

					<NavLink to ="/Login">
					<div>
						<img src={pp} alt="profile" className="mr-2 h-6" />
					</div>
					</NavLink>
		
					
				</div>
			</nav>
		</header>
	);
}

export default Header;
