// import React, { useContext, useEffect } from 'react'
// import { ShopContext } from '../Context/ShopContext'
// import searchh from "./images/searchh.png"
// import cross from "./images/cross.png"
// import { useLocation } from 'react-router-dom'
// import { useState } from 'react'

// const SearchBar=()=>{
// const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext)
// const[visible, setVisible] = useState(false)

// const location = useLocation()
// useEffect(()=>{
// if(location.pathname.includes('collection')&& showSearch){
// setVisible(true)
// }
// else{
//     setVisible(false)
// }
// },[location])

// return showSearch && visible ? (
//     <div className='border border-gray-300 bg-gray-100 text-center py-5'>
// <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-4 mx-3 rounded-full w-3/4 sm:w-1/2">

//   <input type="text" placeholder='search' className='flex-1 outline-none bg-inherit text-lg ' value={search} onChange={(e)=>{setSearch(e.target.value)}} />
//    <img src={searchh} alt="" className='w-6'/>
// </div>
//    <img src={cross} alt="" className='inline w-8 cursor-pointer' onClick={()=>setShowSearch(false)}/>
//     </div>
//   ):null
// }

// export default SearchBar
import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../Context/ShopContext';
import searchh from "/public/images/searchh.png";
import cross from "/public/images/cross.png";
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    showSearch, 
    setShowSearch 
  } = useContext(ShopContext);
  
  const location = useLocation();

  // Only show in collection pages when search is active
  const shouldShow = showSearch && location.pathname.includes('collection');

  const handleClearSearch = () => {
    setSearchQuery('');
    setShowSearch(false);
  };

  if (!shouldShow) return null;

  return (
    <div className='border border-gray-300 bg-gray-100 text-center py-5'>
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-4 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input 
          type="text" 
          placeholder='Search products...' 
          className='flex-1 outline-none bg-inherit text-lg' 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus
        />
        <img src={searchh} alt="Search" className='w-6'/>
      </div>
      <img 
        src={cross} 
        alt="Close" 
        className='inline w-8 cursor-pointer' 
        onClick={handleClearSearch}
      />
    </div>
  );
};

export default SearchBar;