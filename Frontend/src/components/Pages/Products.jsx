
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'

function Products() {
    const { productId } = useParams()
    const { products } = useContext(ShopContext)
    const [productData, setProductData] = useState(false)
    const [image, setImage] = useState('')
    const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    // const [add,setAdd] = useState()
    // const [subtract,setSubtract] = useState()
    // const [cart,setCart] =useState(1)
    const fetchProductData = async () => {
        products.map((item) => {
            if (item.id == productId) {
                setProductData(item)
                console.log(item.img)
               setImage(`http://localhost:8000${item.img}`
            ) 
                return null;
            }
            return null; // Added return for non-matching items to avoid warnings
        })
    }
    
    useEffect(() => {
        fetchProductData()
    }, [productId, products])
    
    return productData ? (
        <div className='border-t-1 border-gray-200 pt-10 transition-opacity ease-in duration-500 opacity-100'>
            {/* product data */}
            <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
                {/* product image */}
                <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
                    {/* Thumbnail section (currently showing just the single image) */}
                    <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                        <img 
                            src={image} 
                            alt={productData.name}
                            className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                            onClick={() => setImage(productData.img)}
                        />
                    </div>
                    
                    {/* Main image display */}
                    <div className='flex-1'>
                        <img 
                            src={image || productData.img} 
                            alt={productData.name}
                            className='w-full h-auto max-h-[500px] object-contain' 
                        />
                    </div>
                </div>
                
                {/* Product information section */}
                <div className='flex-1 p-4'>
                    <h1 className='text-3xl font-bold mb-2 text-gray-700'>{productData.name}</h1>
                    <p className='text-lg font-semibold mb-4 text-[22px] text-gray-700'>Rs. {productData.price}</p>
                    <p className='text-gray-700 mb-4 text-[18px]'>{productData.description}</p>
                    <div className='mb-4'>
                        <h2 className='font-bold mb-2 text-[20px] text-gray-700'>Brand:</h2>
                        <p className='text-[18px]'>{productData.brand}</p>
                    </div>
                    <div className='mb-4'>
                        <h2 className='font-bold mb-2 text-[20px] text-gray-700'>Ingredients:</h2>
                        <p className='text-gray-700 text-[18px]'>{productData.ingredients}</p>
                    </div>
                    <div>
                        <h2 className='font-bold mb-2 text-[20px] text-gray-700'>Category:</h2>
                        <p className='capitalize text-[18px]'>{productData.category}</p>
                    </div>
                   
                
                   <div className="mt-6">
      <p className="text-[18px] mb-2 font-semibold">Select quantity</p>
      <div className="flex items-center bg-gray-100 rounded-full w-fit px-4 py-2">
        <button 
          onClick={decreaseQuantity}
          className="text-xl px-3 font-bold text-gray-700"
        >−</button>
        <span className="mx-3 text-base font-medium">{quantity}</span>
        <button 
          onClick={increaseQuantity}
          className="text-xl px-3 font-bold text-gray-700"
        >+</button>
      </div>
    </div>
                    <button className='bg-gray-800 text-white px-8 py-3 mt-6 hover:bg-gray-600'>Add to Cart</button>
                <hr className="mt-8 sm:w-4/5 text-gray-300 w-6xl" />
                <div className="text-medium text-gray-600 mt-5 flex flex-col gap-1">
                    <p>100% original product</p>
                    <p>Cash on delivery is available.</p>
                    <p>Easy return and Exchange</p>
                </div>
                </div>
            </div>
        </div>
    ) : <div className='opacity-0'></div>
}

export default Products