import React from 'react';
import { Link } from 'react-router-dom';

export const Header = ({ text }) => {
  return (
    <>
      <h1>
        {text}
      </h1>
      <Link to="/cart">Cart</Link>
    </>
  );
};
