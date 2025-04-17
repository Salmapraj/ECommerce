
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

function LatestCollection() {
  const { products } = useContext(ShopContext)
  
  console.log(products)  // Note: changed from Products to products to match the context value

const [latestProducts, setLatestProducts] = useState([])
useEffect(()=>{
    setLatestProducts(products.slice(0,10));
},[products])

  return (
    <div className="my-10">

        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={'COLLECTION'}/>
            {/* <p className="w-2/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, ipsa.</p> */}
        </div>

        {/* rendering products */}

        <div className="grid grid-cols-4 sm:grid-col-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-15 px-8 font-bold">

            {

                
latestProducts.map((product, index) => (
    <ProductItem 
        key={index} 
        id={product.id}  
        img={product.img} 
        name={product.name} 
        price={product.price}
    />
))
                
            }
        </div>
      
    </div>
  )
}

export default LatestCollection