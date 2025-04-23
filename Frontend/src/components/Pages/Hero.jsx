import { Link } from "react-router-dom";
import React from "react";
import models from "/public/images/models.jpeg";

function Hero() {
  return (
    <div className="flex flex-col-reverse mt-0 sm:flex-row border border-gray-200 max-w-[1850px] mx-auto my-2 bg-[#f0f4f5] min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
      <div className="w-full sm:w-1/2 flex flex-col items-start justify-center p-6 sm:p-8 md:p-12 space-y-4 sm:space-y-6">
  <div className="flex items-center gap-3">
    <div className="w-8 md:w-11 h-[2px] bg-[#827f7f]"></div>
    <p className=" text-base md:text-lg lg:text-5xl font-medium font-sans text-[#545353]">CARE FOR YOUR SKIN</p>
  </div>
  <div className="flex items-center gap-3">
    <p className="font-sans font-medium text-base md:text-lg lg:text-5xl  text-[#545353]">CARE FOR YOUR BEAUTY</p>
    <div className="w-8 md:w-11 h-[2px] bg-[#827f7f]"></div>
  </div>        
        
        <div className="flex items-center gap-3 mt-6">
          <Link to="/collection" >

          <button className="font-medium text-medium md:text-xl text-[#fbf9f9] cursor-pointer border-2 p-3 m-2 bg-[#202020] hover:bg-[#9b9c9c] text-[#202020]">SHOP NOW</button>
          </Link>
        </div>
      </div>

      <div className="w-full sm:w-1/2 h-[300px] sm:h-auto">
        <img 
          src={models} 
          alt="Latest products" 
          className="w-full h-full object-cover object-center"
          loading="lazy" // Optional: for better performance
        />
      </div>
    </div>
  );
}

export default Hero;