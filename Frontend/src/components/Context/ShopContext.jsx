
import React, { createContext, useState, useEffect, useMemo } from "react";

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

  const addToCart = async (itemId, quantity = 1) => {
    try {
      // First update local state for immediate UI feedback
      setCartItems((prevCart) => {
        const itemIdStr = String(itemId);
        return {
          ...prevCart,
          [itemIdStr]: (prevCart[itemIdStr] || 0) + quantity,
        };
      });
      
      const token = localStorage.getItem('token');
      if (!token) {
        // If no token, just keep the local cart (guest mode)
        return;
      }
      
      // Then sync with backend
      const response = await fetch('http://localhost:8000/add-to-cart/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          product_id: itemId,
          quantity: quantity
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to sync with server');
      }
      
      // Optionally fetch the updated cart to ensure consistency
      await fetchCartFromBackend();
      
    } catch (error) {
      console.error('Error syncing cart with server:', error);
      setCartError('Failed to add item to cart. Please try again.');
      
      // Revert local state if server sync fails
      fetchCartFromBackend();
    }
  };

  const removeFromCart = async (itemId, quantity = 1) => {
    const itemIdStr = String(itemId);
    const currentQty = cartItems[itemIdStr] || 0;
    
    try {
      // Update local state first for immediate feedback
      setCartItems((prevCart) => {
        const newQty = Math.max(0, currentQty - quantity);
        
        if (newQty <= 0) {
          const { [itemIdStr]: _, ...rest } = prevCart;
          return rest;
        }
        
        return {
          ...prevCart,
          [itemIdStr]: newQty,
        };
      });
      
      const token = localStorage.getItem('token');
      if (!token) {
        // If no token, just keep the local cart (guest mode)
        return;
      }
      
      // Then sync with backend
      const endpoint = quantity >= currentQty ? 
        'http://localhost:8000/remove-cart/' : 
        'http://localhost:8000/minus-cart/';
        
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          product_id: itemId
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to sync with server');
      }
      
      // Optionally fetch the updated cart to ensure consistency
      await fetchCartFromBackend();
      
    } catch (error) {
      console.error('Error syncing cart with server:', error);
      setCartError('Failed to update cart. Please try again.');
      
      // Revert local state if server sync fails
      fetchCartFromBackend();
    }
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const item = state.products.find(product => String(product.id) === itemId);
      if (item) {
        total += item.price * cartItems[itemId];
      }
    }
    return total;
  };
  
  const fetchCartFromBackend = async () => {
    setCartLoading(true);
    setCartError(null);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setCartLoading(false);
        return;
      }
      
      const response = await fetch('http://localhost:8000/show-cart/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('token');
          setCartItems({});
          throw new Error('Your session has expired. Please log in again.');
        }
        throw new Error('Failed to fetch cart');
      }
      
      const data = await response.json();
      
      // Convert backend cart format to frontend format
      const cartState = {};
      data.cart_items.forEach(item => {
        cartState[item.product.id] = item.quantity;
      });
      
      setCartItems(cartState);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartError(error.message);
    } finally {
      setCartLoading(false);
    }
  };

  // Fetch products
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/products/", {
          signal,
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
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          setState((prev) => ({
            ...prev,
            loading: false,
            error: err.message,
          }));
        }
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, []);

  // Load cart on initial mount or when token changes
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchCartFromBackend();
    }
    
    const handleStorageChange = (e) => {
      if (e.key === 'token') {
        if (e.newValue) {
          fetchCartFromBackend();
        } else {
          setCartItems({});
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Memoized filtered products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery) return state.products;

    return state.products.filter((product) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(searchLower) ||
        (product.description &&
          product.description.toLowerCase().includes(searchLower)) ||
        (product.category &&
          product.category.toLowerCase().includes(searchLower))
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
    cartItems,
    cartLoading,
    cartError,
    addToCart,
    removeFromCart,
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