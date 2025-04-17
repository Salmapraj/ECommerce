
import React from "react";
import models from "./images/models.jpeg";

function Hero() {
  return (
    <div className="flex flex-col-reverse mt-0 sm:flex-row border border-gray-200 max-w-[1850px] mx-auto my-2 bg-[#f0f4f5] min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
      {/* Hero content - takes full width on mobile, half on desktop */}
      <div className="w-full sm:w-1/2 flex flex-col items-start justify-center p-6 sm:p-8 md:p-12 space-y-4 sm:space-y-6">
        {/* Top line */}
        <div className="flex items-center gap-3">
          <div className="w-8 md:w-11 h-[2px] bg-[#414141]"></div>
          <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
        </div>
        
        {/* Main heading - responsive font sizes */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-gray-700 font-normal">Latest Products</h1>
        
        {/* Bottom line */}
        <div className="flex items-center gap-3">
          <p className="font-medium text-sm md:text-base">SHOP NOW</p>
          <div className="w-8 md:w-11 h-[2px] bg-[#414141]"></div>
        </div>
      </div>

      {/* Hero image container - full width on mobile, half on desktop */}
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