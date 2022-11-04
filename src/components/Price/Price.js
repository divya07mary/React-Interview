import React, { useEffect, useState } from 'react';

import { slowTransformation } from '../../helpers';
import { slowApi } from '../../api';

import './Price.scss';

export const Price = ({ product, showSpecialPrice = false }) => {
  const [specialPrice, setSpecialPrice] = useState(product?.price);
  const [error, setError] = useState({ error: false, status: "" });
  const wasPrice = slowTransformation(product?.price);
  const nowPrice = showSpecialPrice ? slowTransformation(specialPrice) : slowTransformation(product?.price);

  useEffect(() => {
    // to prevent memory leak error in console
    let isSubscribed = true;

    if (product) {
      async function fetchSpecialPrice() {
        try {
          // TODO: get data from slowApi (argument product.price)
          const data = await slowApi(product.price);
          if (isSubscribed) {
            setSpecialPrice(data);
          }
        }
        catch (e) {
          if (isSubscribed) {
            setError({ error: e.message, status: e.status });
          }
        }
      }

      fetchSpecialPrice();
    }
    return () => (isSubscribed = false)
  }, [product]);

  const hasDiscount = specialPrice !== product.price;

  return (
    <article className="product-price">
      <section className="price-wrapper">
        <span className="price">
          <span className="price--superscript">$</span>
          <span>{nowPrice.dollars}</span>
          <span className="price--superscript">{nowPrice.cents}</span>
        </span>
        {(showSpecialPrice && hasDiscount) &&
          <>
            &nbsp;
            <span className="price--strikethrough">
              {"$" + wasPrice.dollars + "." + wasPrice.cents}
            </span>
          </>
        }
      </section>
    </article>
  );
};