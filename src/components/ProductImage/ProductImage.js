import React from 'react';
import './ProductImage.scss';

export const ProductImage = ({ image }) => {
    return (
        <article className="product-image">
            <img
                src={image}
                alt="Home Depot logo"
                className="image"
            />
        </article>
    )
};