// 
//     };

//     if (!productData) {
//         return <div className="flex justify-center items-center h-64">
//             <p>Loading product details...</p>
//         </div>;
//     }
//     // ... rest of your component remains the same ...
    
//     return productData ? (
//         <div className='border-t-1 border-gray-200 pt-10 transition-opacity ease-in duration-500 opacity-100'>
//             <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
//                 {/* Product image section */}
//                 <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row mt-8">
//                     {/* Main image display */}
//                     <div className="flex-1">
//                         <img
//                             src={productData.img}
//                             alt={productData.name}
//                             className="w-full h-auto max-h-[500px] object-contain"
//                             onError={(e) => {
//                                 e.target.onerror = null;
//                                 e.target.src = '/images/fallback-product.jpg';
//                                 console.error('Failed to load image:', e.target.src);
//                             }}
//                         />
//                     </div>
//                 </div>

//                 {/* Product information section */}
//                 <div className="flex-1 p-4 mt-5">
//                     <h1 className="text-3xl font-bold mb-4 text-gray-700">
//                         {productData.name}
//                     </h1>
//                     <p className="text-lg mt-5 font-bold mb-4 text-[30px] text-gray-700">
//                         Rs. {productData.price}
//                     </p>
// 					<p className="text-lg mt-5 font-bold mb-4 text-[20px] text-gray-700">
// 						Category:
// 				</p>
// 						<p className="text-gray-700 mb-4 text-[16px] uppercase">
// 							 {productData.category}
// 							</p>
// 					<h2 className="font-bold mb-2 text-[18px] text-gray-700">
// 						Description:
// 					</h2>

// 					<p className="text-gray-700 mb-4 text-[16px]">
//  						{productData.description}
//  					</p>
//  					<div className="mb-4">
//  						<h2 className="font-bold mb-2 text-[18px] text-gray-700">Brand:</h2>
// 					<p className="text-[16px]">{productData.brand}</p>
// 					</div>
//  					<div className="mb-4">
// 						<h2 className="font-bold mb-2 text-[18px] text-gray-700">
// 							Ingredients:
// 					</h2>
// 					<p className="text-gray-700 text-[16px]">
// 							{productData.ingredients}
// 						</p>
//                     </div>
            
//             <div className="mt-6">
//                 <p className="text-[18px] mb-2 font-semibold">Select quantity</p>
//                 <div className="flex items-center bg-gray-100 rounded-full w-fit px-4 py-2">
//                     <button 
//                         onClick={decreaseQuantity}
//                         className="text-xl px-3 font-bold text-gray-700"
//                     >−</button>
//                     <span className="mx-3 text-base font-medium">{selectedQuantity}</span>
//                     <button 
//                         onClick={increaseQuantity}
//                         className="text-xl px-3 font-bold text-gray-700"
//                     >+</button>
//                 </div>
//             </div>
//             <button 
//                 className='bg-gray-800 text-white px-8 py-3 mt-6 hover:bg-gray-600' 
//                 onClick={handleAddToCart}
//             >
//                 Add to Cart
//             </button>
//         </div>
//     ) : <div className='opacity-0'></div>
// }

// export default Products;

import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';

function Products() {
    const { productId } = useParams();
    const { products, addToCart } = useContext(ShopContext);
    const [productData, setProductData] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState(1);

   
    const handleAddToCart = () => {
        if (productData) {
            addToCart(productData.id, selectedQuantity);
            // setSelectedQuantity(1); // Reset quantity after adding
        }
    };

    useEffect(() => {
        if (products && products.length > 0) {
            const foundProduct = products.find(item => item.id.toString() === productId);
            if (foundProduct) {
                setProductData({
                    ...foundProduct,
                    img: getImageUrl(foundProduct.img),
                });
            }
        }
    }, [productId, products]);

    const getImageUrl = (imagePath) => {
        if (!imagePath) return '';
        if (imagePath.startsWith('http')) return imagePath;
        if (process.env.NODE_ENV === 'development') {
            return `http://localhost:8000${imagePath}`;
        }
        return imagePath;
    };

    if (!productData) {
        return (
            <div className="flex justify-center items-center h-64">
                <p>Loading product details...</p>
            </div>
        );
    }

    return (
        <div className="border-t-1 border-gray-200 pt-10 transition-opacity ease-in duration-500 opacity-100">
            <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
                {/* Product image section */}
                <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row mt-8">
                    <div className="flex-1">
                        <img
                            src={productData.img}
                            alt={productData.name}
                            className="w-full h-auto max-h-[500px] object-contain"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/images/fallback-product.jpg';
                                console.error('Failed to load image:', e.target.src);
                            }}
                        />
                    </div>
                </div>

                {/* Product information section */}
                <div className="flex-1 p-4 mt-5">
                    <h1 className="text-3xl font-bold mb-4 text-gray-700">
                        {productData.name}
                    </h1>

                    <p className="text-lg mt-5 font-bold mb-4 text-[30px] text-gray-700">
                        Rs. {productData.price}
                    </p>

                    <p className="text-lg mt-5 font-bold mb-2 text-[20px] text-gray-700">
                        Category:
                    </p>
                    <p className="text-gray-700 mb-4 text-[16px] uppercase">
                        {productData.category}
                    </p>

                    <h2 className="font-bold mb-2 text-[18px] text-gray-700">Description:</h2>
                    <p className="text-gray-700 mb-4 text-[16px]">
                        {productData.description}
                    </p>

                    <div className="mb-4">
                        <h2 className="font-bold mb-2 text-[18px] text-gray-700">Brand:</h2>
                        <p className="text-[16px]">{productData.brand}</p>
                    </div>

                    <div className="mb-4">
                        <h2 className="font-bold mb-2 text-[18px] text-gray-700">Ingredients:</h2>
                        <p className="text-gray-700 text-[16px]">{productData.ingredients}</p>
                    </div>

                    <div className="mt-6">
                        
                    </div>

                    <button
                        className="bg-gray-800 text-white px-8 py-3 mt-6 hover:bg-gray-600"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Products;
