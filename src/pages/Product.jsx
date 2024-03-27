import React from 'react';
import { useProduct } from '../contextApi/ProductContext';
import './product.scss'; // Make sure this SCSS file is created



function Product() {
  const { product } = useProduct();

  if (!product) {
    return <div><p>No product found</p>;</div>
  }

  return (
    <div className='product'>
    <h1>Product preview</h1>
    <div className="product-card">
      <div className="product-image">
        <img src="https://via.placeholder.com/300" alt={product.title} />
      </div>
      <div className="product-details">
        <h1 className="product-title">{product.title}</h1>
        <p className="product-description">{product.description}</p>
        {product.options.map((option, index) => (
          <div key={index} className="product-option">
            <strong>{option.name}:</strong> {option.values.join(', ')}
          </div>
        ))}
        <div className="product-variants">
          {product.variants.map((variant, index) => (
            <div key={index} className="product-variant">
              <span>{variant.optionName}: {variant.optionValue}</span>
              <span>Price: ${variant.price}</span>
              <span>Quantity: {variant.quantity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
     </div>
  );
}

export default Product;   