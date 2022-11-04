import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { Cart } from './components/Cart/Cart';
import { Header } from './components/Header/Header';
import { ProductGrid } from './components/ProductGrid/ProductGrid';
import { ProductPreview } from './components/ProductPreview/ProductPreview';

import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { ProductContext } from './context/ProductContext';
import { getProducts } from './api';

import './App.css';
import { CartContext } from './context/CartContext';

function App() {
  const [data, setData] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState({ error: false, status: "" });

  const addToCart = (id) => {
    if (cartItems?.indexOf(id) === -1) {
      setCartItems([...cartItems, id]);
    }
  }

  useEffect(() => {
    // Fn To Fetch Product Data From API
    async function fetchProductData() {
      try {
        const result = await getProducts();
        setData(result);
      }
      catch (e) {
        setError({ error: e.message, status: e.status });
      }
    }

    fetchProductData();
  }, []);

  return (
    <ErrorBoundary>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={
              <>
                <Header text={data?.headerText} />
                <ProductContext.Provider value={setSelectedProduct}>
                  <ProductGrid products={data?.products} />
                </ProductContext.Provider>
              </>
            } />
            <Route path="/product/:productId" element={
              <CartContext.Provider value={addToCart}>
                <ProductPreview key={selectedProduct?.id} product={selectedProduct} />
              </CartContext.Provider>
            } />
            <Route path="/cart" element={
              <Cart cartItems={cartItems} products={data?.products} />
            } />
            <Route path="*" element={
              <Navigate to="/" />
            } />
          </Routes>
        </Router>
      </div>
    </ErrorBoundary >
  );
}

export default App; 
