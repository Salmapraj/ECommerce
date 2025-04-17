

import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext();

function ShopContextProvider(props) {
  
  const [state, setState] = useState({
    products: [],
    loading: true,
    error: null
  });
  const currency = 'Rs.';
  const delivery_fee = 100;

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

  const value = {
    products: state.products,
    loading: state.loading,
    error: state.error,
    currency,
    delivery_fee
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
}

export default ShopContextProvider;
