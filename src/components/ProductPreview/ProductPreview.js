import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ProductImage } from '../ProductImage/ProductImage';
import { Price } from '../Price/Price';

import { CartContext } from '../../context/CartContext';
import './ProductPreview.scss';

export const ProductPreview = ({ product }) => {
  const addToCart = useContext(CartContext);
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/cart">Cart</Link>
      {product &&
        <article className="product-preview">
          {/* TODO: make DRY with a ProductImage component */}
          {product.image &&
            <article className="product-image-wrapper">
              <ProductImage
                image={product.image}
              />
            </article>
          }
          <aside className="product-preview-details">
            {product.brand &&
              <p>
                <b>
                  {product.brand}
                </b>
              </p>
            }
            {product.description &&
              <p>
                {product.description}
              </p>
            }
            <article className="product-price-wrapper">
              <Price product={product} showSpecialPrice />
            </article>
            <button
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  addToCart(product.id);
                  e.target.blur();
                }
              }}
              onClick={() => addToCart(product.id)}
            >
              Add to Cart
            </button>
          </aside>
        </article>
      }
    </>
  )
};