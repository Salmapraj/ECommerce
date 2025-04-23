
import React from "react";
import glazep from "/public/images/glazep.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
	
	  <footer className="w-full bg-[#e5f1f4] py-10 px-8 mt-50">
		<hr  className="text-gray-300"/>
      <div className="flex flex-col sm:grid grid-cols-4 gap-10 text-sm max-w-screen-xl mx-auto py-5">
        <div>
          <Link to="/">
            <img src={glazep} className="mr-3 h-14" alt="Logo" />
          </Link>
        </div>

        <div>
          <p className="text-xl font-semi-bold mb-5">COMPANY</p>
          <ul className="text-[14px] flex flex-col gap-1 text-gray-600">
            <li className="mb-[8px]">Home</li>
            <li className="mb-[8px]">About Us</li>
            <li className="mb-[8px]">Contact</li>
            <li className="mb-[8px]">Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-semi-bold mb-5">GET IN TOUCH</p>
          <ul className="text-[14px] flex flex-col gap-1 text-gray-600">
            <li className="mb-[8px]">+66 0133942</li>
            <li className="mb-[8px]">coontact@glaze.com</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-semi-bold mb-5">PRODUCTS</p>
          <ul className="text-[14px] flex flex-col gap-1 text-gray-600">
            <li className="mb-[8px]">Cleanser</li>
            <li className="mb-[8px]">Toner</li>
            <li className="mb-[8px]">Moisturizer</li>
            <li className="mb-[8px]">Sunscreen</li>
            <li className="mb-[8px]">Lip care</li>
            <li className="mb-[8px]">Exfoliator</li>
            <li className="mb-[8px]">Eye Cream</li>
            <li className="mb-[8px]">Face Masks</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-screen-xl mx-auto mt-5 pt-4 border-t border-gray-300">
        <span className="text-sm text-gray-500">
          © 2023
          <a href="https://google.com/" className="hover:underline"> glaze</a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;