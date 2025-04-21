

import React, { createContext, useState, useEffect, useMemo, useCallback } from "react";

export const ShopContext = createContext();

function ShopContextProvider(props) {
  const [state, setState] = useState({
    products: [],
    loading: true,
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
  );
}

export default ShopContextProvider;