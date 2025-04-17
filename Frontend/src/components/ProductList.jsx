// import { useState, useEffect } from 'react';

// function ProductList() {
//   const [state, setState] = useState({
//     products: [],
//     loading: true,
//     error: null
//   });

//   useEffect(() => {
//     const controller = new AbortController();
//     const { signal } = controller;

//     const fetchProducts = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/products/', { signal });
        
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         const data = await response.json();
        
//         setState({
//           products: data,
//           loading: false,
//           error: null
//         });
//       } catch (err) {
//         if (err.name === 'AbortError') {
//           console.log('Fetch aborted');
//         } else {
//           setState(prev => ({
//             ...prev,
//             loading: false,
//             error: err.message
//           }));
//         }
//       }
//     };

//     fetchProducts();

//     return () => controller.abort();
//   }, []);

//   const { products, loading, error } = state;

//   if (loading) return <div className="loading">Loading products...</div>;
//   if (error) return <div className="error">Error: {error}</div>;
//   if (products.length === 0) return <div>No products available</div>;

//   return (
//     <div className="product-list">
//       <h2>Our Products</h2>
//       <div className="products-grid">
//         {products.map(product => (
//           <div key={product.id} className="product-card">
//             <h3>{product.name}</h3>
//             <p className="price">
//   ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
// </p>            {product.description && <p>{product.description}</p>}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ProductList;