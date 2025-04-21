


// // import React, { useContext, useEffect, useState } from "react";
// // import { ShopContext } from "../Context/ShopContext";
// // import Title from "../Pages/Title";

// // function Cart() {
// //     const { products, currency, cartItems } = useContext(ShopContext);
// //     const [cartData, setCartData] = useState([]);

// //     useEffect(() => {
// //         const tempData = [];
// //         // Corrected: use Object.keys() and map instead of for...in with undefined variable
// //         Object.keys(cartItems).forEach(itemId => {
// //             if (cartItems[itemId] > 0) {
// //                 tempData.push({
// //                     id: itemId,
// //                     quantity: cartItems[itemId],
// //                 });
// //             }
// //         });
// //         setCartData(tempData);
// //     }, [cartItems]); // Add cartItems as dependency

// //     return (
// //         <div className="border-t pt-14">
// //             <div className="text-2xl mb-3">
// //                 <Title text1={'Your'} text2={'CART'}/>
// //             </div>
            
// //             <div>
// //                 {cartData.length > 0 ? (
// //                     cartData.map(item => (
// //                         <div key={item.id}>
// //                             {/* Render your cart items here */}
// //                             Product ID: {item.id} - Quantity: {item.quantity}
// //                         </div>
// //                     ))
// //                 ) : (
// //                     <p>Your cart is empty</p>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // }

// // export default Cart;
// import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../Context/ShopContext";
// import Title from "../Pages/Title";

// function Cart() {
//     const { products, currency, cartItems, getTotalCartAmount } = useContext(ShopContext);
//     const [cartData, setCartData] = useState([]);
//     const shippingFee = 10; // You can move this to context if needed

//     useEffect(() => {
//         const tempData = [];
//         Object.keys(cartItems).forEach(itemId => {
//             if (cartItems[itemId] > 0) {
//                 const product = products.find(p => p.id.toString() === itemId);
//                 if (product) {
//                     tempData.push({
//                         id: itemId,
//                         quantity: cartItems[itemId],
//                         product: product
//                     });
//                 }
//             }
//         });
//         setCartData(tempData);
//     }, [cartItems, products]);

//     return (
//         <div className="border-t pt-14 max-w-6xl mx-auto px-4">
//             <div className="text-2xl mb-8">
//                 <Title text1={'Your'} text2={'CART'}/>
//             </div>
            
//             <div className="flex flex-col lg:flex-row gap-8">
//                 {/* Cart Items */}
//                 <div className="flex-1">
//                     {cartData.length > 0 ? (
//                         cartData.map(item => (
//                             <div key={item.id} className="border-b border-gray-200 py-6 flex flex-col sm:flex-row gap-4">
//                                 <div className="flex-1">
//                                     <h3 className="text-lg font-medium">{item.product.name}</h3>
//                                     <p className="text-gray-600">{item.product.description}</p>
//                                     <p className="text-gray-800 mt-2">
//                                         {currency} {item.product.price} {item.product.size || ''}
//                                     </p>
//                                 </div>
//                                 <div className="flex items-center gap-4">
//                                     <span className="text-lg font-medium">{item.quantity}</span>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-gray-500">Your cart is empty</p>
//                     )}
//                 </div>

//                 {/* Cart Summary */}
//                 {cartData.length > 0 && (
//                     <div className="lg:w-80 bg-gray-50 p-6 h-fit">
//                         <h3 className="text-xl font-bold mb-4">CART TOTALS</h3>
//                         <div className="space-y-3">
//                             <div className="flex justify-between">
//                                 <span>Subtotal</span>
//                                 <span>{currency} {getTotalCartAmount().toFixed(2)}</span>
//                             </div>
//                             <div className="flex justify-between">
//                                 <span>Shipping Fee</span>
//                                 <span>{currency} {shippingFee.toFixed(2)}</span>
//                             </div>
//                             <div className="flex justify-between font-bold text-lg pt-3 border-t border-gray-200">
//                                 <span>Total</span>
//                                 <span>{currency} {(getTotalCartAmount() + shippingFee).toFixed(2)}</span>
//                             </div>
//                         </div>
//                         <button className="w-full bg-black text-white py-3 mt-6 hover:bg-gray-800 transition-colors">
//                             PROCEED TO CHECKOUT
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Cart;

import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Pages/Title";

function Cart() {
    const { products, currency, cartItems, getTotalCartAmount } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);
    const shippingFee = 10;

    useEffect(() => {
        const tempData = [];
        Object.keys(cartItems).forEach(itemId => {
            if (cartItems[itemId] > 0) {
                const product = products.find(p => p.id.toString() === itemId);
                if (product) {
                    tempData.push({
                        id: itemId,
                        quantity: cartItems[itemId],
                        product: {
                            ...product,
                            img: getImageUrl(product.img) // Add image URL processing
                        }
                    });
                }
            }
        });
        setCartData(tempData);
    }, [cartItems, products]);

    // Helper function to handle image URLs
    const getImageUrl = (imagePath) => {
        if (!imagePath) return '/default-product.jpg';
        if (imagePath.startsWith('http')) return imagePath;
        return `http://localhost:8000${imagePath}`; // Adjust based on your backend
    };

    return (
        <div className="border-t pt-14 max-w-6xl mx-auto px-4">
            <div className="text-2xl mb-8">
                <Title text1={'Your'} text2={'CART'}/>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <div className="flex-1">
                    {cartData.length > 0 ? (
                        cartData.map(item => (
                            <div key={item.id} className="border-b border-gray-200 py-6 flex flex-col sm:flex-row gap-6">
                                {/* Product Image */}
                                <div className="w-32 h-32 flex-shrink-0 bg-gray-100">
                                    <img 
                                        src={item.product.img} 
                                        alt={item.product.name}
                                        className="w-full h-full object-contain"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/default-product.jpg';
                                        }}
                                    />
                                </div>
                                
                                {/* Product Details */}
                                <div className="flex-1">
                                    <h3 className="text-lg font-medium uppercase">{item.product.name}</h3>
                                    <p className="text-gray-800 mt-2">
                                        {currency} {item.product.price} {item.product.size || ''}
                                    </p>
                                    <div className="flex items-center gap-4 mt-4">
                                        <span className="text-lg font-medium">Qty: {item.quantity}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">Your cart is empty</p>
                    )}
                </div>

                {/* Cart Summary */}
                {cartData.length > 0 && (
                    <div className="lg:w-80 bg-gray-50 p-6 h-fit">
                        <h3 className="text-xl font-bold mb-4">CART TOTALS</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>{currency} {getTotalCartAmount().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping Fee</span>
                                <span>{currency} {shippingFee.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg pt-3 border-t border-gray-200">
                                <span>Total</span>
                                <span>{currency} {(getTotalCartAmount() + shippingFee).toFixed(2)}</span>
                            </div>
                        </div>
                        <button className="w-full bg-black text-white py-3 mt-6 hover:bg-gray-800 transition-colors">
                            PROCEED TO CHECKOUT
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;