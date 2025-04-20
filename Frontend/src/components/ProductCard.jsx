// // components/ProductCard.js
// import { useCart } from '../contexts/CartContext';

// const ProductCard = ({ product }) => {
//   const { addToCart, loading } = useCart();
//   const [quantity, setQuantity] = useState(1);

//   const handleAddToCart = () => {
//     addToCart(product.id, quantity);
//   };

//   return (
//     <div className="product-card">
//       <img src={product.image} alt={product.name} />
//       <h3>{product.name}</h3>
//       <p>${product.price}</p>
      
//       <div className="quantity-selector">
//         <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
//         <span>{quantity}</span>
//         <button onClick={() => setQuantity(q => q + 1)}>+</button>
//       </div>
      
//       <button 
//         onClick={handleAddToCart}
//         disabled={loading}
//       >
//         {loading ? 'Adding...' : 'Add to Cart'}
//       </button>
//     </div>
//   );
// };