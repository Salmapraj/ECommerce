

// 
// // import React, { createContext, useState, useEffect } from 'react';

// // export const ShopContext = createContext(null);

// // export const ShopContextProvider = (props) => {
// //   const [products, setProducts] = useState([]);
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const [user, setUser] = useState(null);
// //   const [cart, setCart] = useState([]);
// //   const [loading, setLoading] = useState(false);
  
// //   // Helper function to create fetch options with authentication
// //   const createAuthHeaders = () => {
// //     const token = localStorage.getItem('access_token');
// //     return {
// //       'Content-Type': 'application/json',
// //       'Authorization': token ? `Bearer ${token}` : ''
// //     };
// //   };
  
// //   // Check if user is logged in on component mount
// //   useEffect(() => {
// //     const checkAuthStatus = async () => {
// //       const token = localStorage.getItem('access_token');
// //       if (token) {
// //         try {
// //           const response = await fetch('http://localhost:8000/api/user/', {
// //             headers: {
// //               'Authorization': `Bearer ${token}`
// //             }
// //           });
          
// //           if (!response.ok) {
// //             throw new Error('Token invalid');
// //           }
// //           const userData = await response.json();
// //           setUser(userData);
          
// //           setIsLoggedIn(true);
// //         } catch (error) {
// //           console.error("Auth token validation failed:", error);
// //           logout(); // Clear invalid tokens
// //         }
// //       }
// //     };
    
// //     checkAuthStatus();
// //   }, []);
  
// //   // Fetch products
// //   useEffect(() => {
// //     const fetchProducts = async () => {
// //       try {
// //         setLoading(true);
// //         const response = await fetch('http://localhost:8000/api/products/');
// //         if (!response.ok) {
// //           throw new Error('Failed to fetch products');
// //         }
// //         const data = await response.json();
// //         setProducts(data);
// //         setLoading(false);
// //       } catch (error) {
// //         console.error("Error fetching products:", error);
// //         setLoading(false);
// //       }
// //     };
    
// //     fetchProducts();
// //   }, []);
  
// //   // Fetch cart if user is logged in
// //   useEffect(() => {
// //     if (isLoggedIn) {
// //       fetchCart();
// //     }
// //   }, [isLoggedIn]);
  
// //   const fetchCart = async () => {
// //     try {
// //       const response = await fetch('http://localhost:8000/api/show-cart/', {
// //         headers: createAuthHeaders()
// //       });
      
// //       if (!response.ok) {
// //         throw new Error('Failed to fetch cart');
// //       }
      
// //       const data = await response.json();
// //       setCart(data);
// //     } catch (error) {
// //       console.error("Error fetching cart:", error);
// //     }
// //   };
  
// //   const addToCart = async (productId) => {
// //     if (!isLoggedIn) {
// //       // Redirect to login or show login modal
// //       return false;
// //     }
    
// //     try {
// //       const response = await fetch('http://localhost:8000/api/add-to-cart/', {
// //         method: 'POST',
// //         headers: createAuthHeaders(),
// //         body: JSON.stringify({
// //           product: productId
// //         })
// //       });
      
// //       if (!response.ok) {
// //         throw new Error('Failed to add item to cart');
// //       }
      
// //       await fetchCart(); // Refresh cart after adding item
// //       return true;
// //     } catch (error) {
// //       console.error("Error adding to cart:", error);
// //       return false;
// //     }
// //   };
  
// //   const updateCartQuantity = async (productId, action) => {
// //     try {
// //       const endpoint = action === 'increase' 
// //         ? 'http://localhost:8000/api/plus-cart/' 
// //         : 'http://localhost:8000/api/minus-cart/';
      
// //       const response = await fetch(endpoint, {
// //         method: 'POST',
// //         headers: createAuthHeaders(),
// //         body: JSON.stringify({
// //           product: productId
// //         })
// //       });
      
// //       if (!response.ok) {
// //         throw new Error(`Failed to ${action} cart quantity`);
// //       }
      
// //       await fetchCart(); // Refresh cart
// //     } catch (error) {
// //       console.error(`Error ${action} cart quantity:`, error);
// //     }
// //   };
  
// //   const removeFromCart = async (productId) => {
// //     try {
// //       const response = await fetch('http://localhost:8000/api/remove-cart/', {
// //         method: 'POST',
// //         headers: createAuthHeaders(),
// //         body: JSON.stringify({
// //           product: productId
// //         })
// //       });
      
// //       if (!response.ok) {
// //         throw new Error('Failed to remove item from cart');
// //       }
      
// //       await fetchCart(); // Refresh cart
// //     } catch (error) {
// //       console.error("Error removing from cart:", error);
// //     }
// //   };
  
// //   const logout = async () => {
// //     const refreshToken = localStorage.getItem('refresh_token');
    
// //     // Try to blacklist the token on the server
// //     if (refreshToken) {
// //       try {
// //         await fetch('http://localhost:8000/api/logout/', {
// //           method: 'POST',
// //           headers: createAuthHeaders(),
// //           body: JSON.stringify({
// //             refresh: refreshToken
// //           })
// //         });
// //       } catch (error) {
// //         console.error("Error during logout:", error);
// //       }
// //     }
    
// //     // Clear local storage and state regardless of server response
// //     localStorage.removeItem('access_token');
// //     localStorage.removeItem('refresh_token');
// //     setIsLoggedIn(false);
// //     setUser(null);
// //     setCart([]);
// //   };

// //   const contextValue = {
// //     products,
// //     isLoggedIn,
// //     setIsLoggedIn,
// //     user,
// //     setUser,
// //     cart,
// //     loading,
// //     addToCart,
// //     updateCartQuantity,
// //     removeFromCart,
// //     logout,
// //     fetchCart
// //   };

// //   return (
// //     <ShopContext.Provider value={contextValue}>
// //       {props.children}
// //     </ShopContext.Provider>
// //   );
// // };
import React, { createContext, useState, useEffect, useMemo } from "react";

export const ShopContext = createContext();

function ShopContextProvider(props) {
  const [state, setState] = useState({
    products: [],
    loading: true,
    error: null
  });
  const currency = 'Rs.';
  const delivery_fee = 100;
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  // Fetch products
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/products/', { signal });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        setState({
          products: data,
          loading: false,
          error: null
        });
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          setState(prev => ({
            ...prev,
            loading: false,
            error: err.message
          }));
        }
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, []);

  // Memoized filtered products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery) return state.products;
    
    return state.products.filter(product => {
      const searchLower = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(searchLower) ||
        (product.description && product.description.toLowerCase().includes(searchLower)) ||
        (product.category && product.category.toLowerCase().includes(searchLower))
      );
    });
  }, [state.products, searchQuery]);

  const value = {
    products: state.products,
    filteredProducts,
    loading: state.loading,
    error: state.error,
    currency,
    delivery_fee,
    searchQuery,
    setSearchQuery,
    showSearch, 
    setShowSearch
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
}

export default ShopContextProvider;