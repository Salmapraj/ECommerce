

<<<<<<< HEAD
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
=======
import React, { createContext, useState, useEffect, useMemo, useCallback } from "react";
>>>>>>> demo

export const ShopContext = createContext();

function ShopContextProvider(props) {
  const [state, setState] = useState({
    products: [],
    loading: true,
<<<<<<< HEAD
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
=======
    error: null,
  });
  const [cartItems, setCartItems] = useState({});
  const [cartLoading, setCartLoading] = useState(false);
  const [cartError, setCartError] = useState(null);
  const currency = "Rs.";
  const delivery_fee = 100;
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [user, setUser] = useState(null);

  // Store pending cart operations to handle network issues
  const [pendingOperations, setPendingOperations] = useState([]);

  // Memoized API base URL7
  const apiBaseUrl = useMemo(() => 'http://localhost:8000', []);
  const logout = async () => {
    try {
      await axios.post('http://localhost:8000/api/session_logout/', {}, {
        withCredentials: true,
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
        }
      });
      
      localStorage.removeItem('token');
      setUser(null);
      setCartItems({}); // Clear cart on logout
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  // Unified API request handler
  const makeApiRequest = useCallback(async (endpoint, method = 'GET', body = null) => {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${apiBaseUrl}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Request failed');
    }
    
    return response.json();
  }, [apiBaseUrl]);

  // Process pending cart operations
  const processPendingOperations = useCallback(async () => {
    if (pendingOperations.length === 0) return;
    
    try {
      const operations = [...pendingOperations];
      setPendingOperations([]);
      
      for (const op of operations) {
        try {
          await makeApiRequest(op.endpoint, op.method, op.body);
        } catch (error) {
          console.error('Failed to sync operation:', op, error);
          // Requeue failed operations
          setPendingOperations(prev => [...prev, op]);
        }
      }
      
      // In your ShopContext.js




      // Refresh cart after processing pending operations
      await fetchCartFromBackend();
    } catch (error) {
      console.error('Error processing pending operations:', error);
    }
  }, [pendingOperations, makeApiRequest]);

  // Optimized cart update function
  const updateLocalCart = useCallback((itemId, quantity) => {
    const itemIdStr = String(itemId);
    
    setCartItems(prevCart => {
      if (quantity <= 0) {
        const { [itemIdStr]: _, ...rest } = prevCart;
        return rest;
      }
      
      return {
        ...prevCart,
        [itemIdStr]: quantity,
      };
    });
  }, []);

  const addToCart = useCallback(async (itemId, quantity = 1) => {
    const itemIdStr = String(itemId);
    const currentQty = cartItems[itemIdStr] || 0;
    const newQty = currentQty + quantity;
    
    // Optimistic UI update
    updateLocalCart(itemId, newQty);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Queue operation for when user logs in
        setPendingOperations(prev => [...prev, {
          endpoint: '/add-to-cart/',
          method: 'POST',
          body: { product_id: itemId, quantity }
        }]);
        return;
      }
      
      await makeApiRequest('/add-to-cart/', 'POST', {
        product_id: itemId,
        quantity: quantity
      });
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      setCartError(error.message);
      
      // Revert local state and queue operation for retry
      updateLocalCart(itemId, currentQty);
      setPendingOperations(prev => [...prev, {
        endpoint: '/add-to-cart/',
        method: 'POST',
        body: { product_id: itemId, quantity }
      }]);
    }
  }, [cartItems, makeApiRequest, updateLocalCart]);

  const removeFromCart = useCallback(async (itemId, quantity = 1) => {
    const itemIdStr = String(itemId);
    const currentQty = cartItems[itemIdStr] || 0;
    const newQty = Math.max(0, currentQty - quantity);
    
    // Optimistic UI update
    updateLocalCart(itemId, newQty);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Queue operation for when user logs in
        const endpoint = quantity >= currentQty ? '/remove-cart/' : '/minus-cart/';
        setPendingOperations(prev => [...prev, {
          endpoint,
          method: 'POST',
          body: { product_id: itemId }
        }]);
        return;
      }
      
      const endpoint = quantity >= currentQty ? '/remove-cart/' : '/minus-cart/';
      await makeApiRequest(endpoint, 'POST', { product_id: itemId });
      
    } catch (error) {
      console.error('Error removing from cart:', error);
      setCartError(error.message);
      
      // Revert local state and queue operation for retry
      updateLocalCart(itemId, currentQty);
      const endpoint = quantity >= currentQty ? '/remove-cart/' : '/minus-cart/';
      setPendingOperations(prev => [...prev, {
        endpoint,
        method: 'POST',
        body: { product_id: itemId }
      }]);
    }
  }, [cartItems, makeApiRequest, updateLocalCart]);

  const clearCart = useCallback(async () => {
    // Optimistic UI update
    setCartItems({});
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        // Queue operation for when user logs in
        setPendingOperations(prev => [...prev, {
          endpoint: '/clear-cart/',
          method: 'POST'
        }]);
        return;
      }
      
      await makeApiRequest('/clear-cart/', 'POST');
    } catch (error) {
      console.error('Error clearing cart:', error);
      setCartError(error.message);
      
      // Revert local state and queue operation for retry
      await fetchCartFromBackend();
      setPendingOperations(prev => [...prev, {
        endpoint: '/clear-cart/',
        method: 'POST'
      }]);
    }
  }, [makeApiRequest]);

  const getCartCount = useCallback(() => {
    return Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
  }, [cartItems]);

  const getTotalCartAmount = useCallback(() => {
    let total = 0;
    for (const itemId in cartItems) {
      const item = state.products.find(product => String(product.id) === itemId);
      if (item) {
        total += item.price * cartItems[itemId];
      }
    }
    return total;
  }, [cartItems, state.products]);
  
  const fetchCartFromBackend = useCallback(async () => {
    setCartLoading(true);
    setCartError(null);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setCartLoading(false);
        return;
      }
      
      const data = await makeApiRequest('/show-cart/');
      
      // Convert backend cart format to frontend format
      const cartState = {};
      data.cart_items.forEach(item => {
        cartState[item.product.id] = item.quantity;
      });
      
      setCartItems(cartState);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartError(error.message);
      
      if (error.message.includes('session') || error.message.includes('token')) {
        localStorage.removeItem('token');
      }
    } finally {
      setCartLoading(false);
    }
  }, [makeApiRequest]);

  const fetchProducts = useCallback(async () => {
    const controller = new AbortController();
    
    try {
      const response = await fetch(`${apiBaseUrl}/products/`, {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setState({
        products: data,
        loading: false,
        error: null,
      });
    } catch (err) {
      if (err.name !== "AbortError") {
        setState(prev => ({
          ...prev,
          loading: false,
          error: err.message,
        }));
      }
    }
    
    return () => controller.abort();
  }, [apiBaseUrl]);

  // Initial data loading
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Cart synchronization
  useEffect(() => {
    const handleCartSync = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        await fetchCartFromBackend();
        await processPendingOperations();
      }
    };
    
    handleCartSync();
    
    const handleStorageChange = (e) => {
      if (e.key === 'token') {
        handleCartSync();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [fetchCartFromBackend, processPendingOperations]);

  // Memoized filtered products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery) return state.products;

    const searchLower = searchQuery.toLowerCase();
    return state.products.filter((product) => {
>>>>>>> demo
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
<<<<<<< HEAD
    showSearch, 
    setShowSearch
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
=======
    showSearch,
    setShowSearch,
    user,
  setUser,
  logout,
    cartItems,
    cartLoading,
    cartError,
    addToCart,
    removeFromCart,
    clearCart,
    getCartCount,
    getTotalCartAmount,
    refreshCart: fetchCartFromBackend,
    clearCartError: () => setCartError(null)
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
>>>>>>> demo
  );
}

export default ShopContextProvider;