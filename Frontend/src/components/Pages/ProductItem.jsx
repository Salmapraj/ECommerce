import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { Link } from 'react-router-dom'

function ProductItem({id, img, name, price,category}) {
    const { currency } = useContext(ShopContext); // Corrected to destructure just the currency
    
    return (
      <>
      <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
      <div className="overflow-hidden">
      {/* Change this line to handle img as a string, not an array */}
      <img 
  src={`http://localhost:8000${img}`} 
  alt={name} 
  className='hover:scale-110 transition ease-in-out'
/>      </div>
      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className='capitalize text-sm font-medium'>{category}</p>
      <p className='text-sm font-medium '>{currency} {price}</p>
      </Link>
      </>
    )
  }

export default ProductItem