// import React, { useContext, useEffect } from 'react'
// import { ShopContext } from '../Context/ShopContext'

// function Cart() {
//   const {products,currency, cartItems} =useContext(ShopContext)

//   const [cartData, setCartData] = useState([])

//   useEffect(()=>{

//     const tempData =[]
//     for(const items in cartItems){
//       for(const item in cartItems[items])
//         {

//         }
    
//       }
//   })
//   return (
//     <div>Cart</div>
//   )
// }

// export default Cart
// contexts/CartContext.js
// import { createContext, useContext, useEffect, useState } from 'react';
// import axios from 'axios';

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch cart on initial load
//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const fetchCart = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get('/api/show-cart/', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('access_token')}`
//         }
//       });
//       setCart(response.data.cart_items);
//       setTotalAmount(response.data.total_amount);
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to fetch cart');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addToCart = async (productId, quantity = 1) => {
//     try {
//       setLoading(true);
//       await axios.post('/api/add-to-cart/', {
//         product_id: productId,
//         quantity: quantity
//       }, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('access_token')}`
//         }
//       });
//       await fetchCart(); // Refresh cart
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to add to cart');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const removeFromCart = async (cartItemId) => {
//     try {
//       setLoading(true);
//       await axios.post('/api/remove-cart/', {
//         cart_item_id: cartItemId
//       }, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('access_token')}`
//         }
//       });
//       await fetchCart(); // Refresh cart
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to remove item');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateQuantity = async (cartItemId, newQuantity) => {
//     try {
//       setLoading(true);
//       if (newQuantity > 0) {
//         await axios.post('/api/plus-cart/', {
//           cart_item_id: cartItemId,
//           quantity: newQuantity
//         }, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('access_token')}`
//           }
//         });
//       } else {
//         await removeFromCart(cartItemId);
//       }
//       await fetchCart(); // Refresh cart
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to update quantity');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         totalAmount,
//         loading,
//         error,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         fetchCart
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);\
import React from 'react'

function Cart() {
  return (
    <div>Cart</div>
  )
}

export default Cart