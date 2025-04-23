import React from 'react'
import exchange from "./images/exchange.png";
import returnn from "./images/returnn.png"
import customer from "./images/customer.png"
function Policy() {
  return (
    <>
    <hr className='text-gray-200'/>
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700 bg-[#e5f1f4] mb-0'>

        <div>
            <img src={exchange} alt="" className=' mt-5 w-18 m-auto mb-6' />
        <p className='font-semi-bold text-[18px]'>Easy Exchange Policy</p>
        </div>

        <div>
            <img src={returnn} alt="" className='w-19 m-auto mb-5 mt-3 ' />
        <p className='font-semi-bold text-[18px]'>7 Days Return Policy.</p>
        </div>

        <div>
            <img src={customer} alt="" className='w-25  m-auto' />
        <p className='font-semi-bold text-[18px] pb-5'>We provide 24/7 customer support</p>
        </div>
    </div>
    </>
  )
}

export default Policy