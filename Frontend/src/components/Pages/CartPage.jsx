// // pages/CartPage.js
// import { useCart } from '../contexts/CartContext';

// const CartPage = () => {
//   const {
//     cart,
//     totalAmount,
//     loading,
//     error,
//     removeFromCart,
//     updateQuantity
//   } = useCart();

//   if (loading && cart.length === 0) return <div>Loading cart...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="cart-page">
//       <h1>Your Cart</h1>
      
//       {cart.length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         <>
//           <div className="cart-items">
//             {cart.map(item => (
//               <div key={item.id} className="cart-item">
//                 <img src={item.product.image} alt={item.product.name} />
//                 <div>
//                   <h3>{item.product.name}</h3>
//                   <p>${item.product.price} each</p>
                  
//                   <div className="quantity-controls">
//                     <button 
//                       onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                       disabled={loading}
//                     >
//                       -
//                     </button>
//                     <span>{item.quantity}</span>
//                     <button 
//                       onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                       disabled={loading}
//                     >
//                       +
//                     </button>
//                   </div>
                  
//                   <button 
//                     onClick={() => removeFromCart(item.id)}
//                     disabled={loading}
//                     className="remove-btn"
//                   >
//                     Remove
//                   </button>
//                 </div>
//                 <div className="item-total">
//                   ${(item.quantity * item.product.price).toFixed(2)}
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           <div className="cart-summary">
//             <h3>Order Summary</h3>
//             <div className="summary-row">
//               <span>Subtotal</span>
//               <span>${totalAmount.toFixed(2)}</span>
//             </div>
//             <div className="summary-row">
//               <span>Shipping</span>
//               <span>Free</span>
//             </div>
//             <div className="summary-row total">
//               <span>Total</span>
//               <span>${totalAmount.toFixed(2)}</span>
//             </div>
            
//             <button className="checkout-btn">
//               Proceed to Checkout
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };