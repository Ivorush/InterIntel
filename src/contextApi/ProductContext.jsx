import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext(null);

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [product, setProducts] = useState(null);

  return (
    <ProductContext.Provider value={{ product, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};