import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext(null);

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const defaultProduct = {
    title: 'Default Product Title',
    description: 'Default product description goes here.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    options: [],
    variants: []
  };

  // Initialize the product state with the defaultProduct
  const [product, setProducts] = useState(defaultProduct);

  return (
    <ProductContext.Provider value={{ product, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};