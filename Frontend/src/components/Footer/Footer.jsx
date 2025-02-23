import React from 'react'
import glazep from "../../assets/glazep.png";
import { Link } from 'react-router-dom'
function Footer() {
  return (
    // <footer className='bg-[#abe54e]'>
    // <div className='flex'>
    //   <div className='grid'>

    //   </div>
    // </div>
    //  
    <footer className="bg-[#a3e635] bottom-0 left-0 w-full z-50 font-[lato]">
            <div className="mx-auto w-full max-w-screen-xl p-3 py-4 ">
                <div className="flex justify-between items-center">

                  <div>
                    <Link to="/">
                    <img
                                src={glazep}
                                className="mr-3 h-14"
                                alt="Logo"
                            />                    </Link>
                  </div>
<div className='grid grid-cols-3 gap-16'>
 
  <div>
    <h2 className='font-semibold mb-2' >Products</h2>
    <ul className='text-[14px]'>
      <li className='mb-[8px]' hover:underline>Toner</li>
      <li className='mb-[8px]'>Moisturizer</li>
      <li className='mb-[8px]'>Sunscreen</li>
      <li className='mb-[8px]'>Lips</li>
      <li className='mb-[8px]'>Facial Masks</li>
    </ul>
  </div>
  <div> 
    <h2 className='font-semibold mb-2'>About</h2>
    <ul>
      <li className='text-[14px]'>About us</li>
      </ul>
  </div>
  <div>
    <h2 className='font-semibold mb-2'>Customer Care</h2>
    <ul className='text-[14px]'>
    <li className='mb-[8px]'>Contact us</li>
      <li className='mb-[8px]'>Shipping &amp; Return</li>
      <li className='mb-[8px]'>Privacy notice</li>
      
    </ul>
  </div>
</div>

                    
                        </div>
                        </div>
                        <hr className="my-6 border-gray-400 " />
                        <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center">
                        © 2023
                        <a href="https://google.com/" className="hover:underline">
                            glaze 
                        </a>
                        . All Rights Reserved.
                    </span>
                    </div>
                        </footer>
  )
}

export default Footer