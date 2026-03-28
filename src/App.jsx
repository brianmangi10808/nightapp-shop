import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";

import Navbar from './nav/Navbar';
import About from './nav/About';
import Cart from './cart/Cart';
import Checkout from './checkout/Checkout';
import Product from './Products/Product';
import Hero from './Hero/Hero';
import ProductDetail from './Products/ProductDetail';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        {/* Home Page - Shows Hero + Products */}
        <Route path="/" element={
          <>
            <Hero />
            <Product />
          </>
        } />

        {/* Shop Page */}
        <Route path="/product" element={<Product />} />

        {/* Product Detail */}
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* Cart Page - No Hero */}
        <Route path="/cart" element={<Cart />} />

        {/* Checkout Page - No Hero */}
        <Route path="/checkout" element={<Checkout />} />

        {/* About */}
        <Route path="/about" element={<About />} />

        <Route path="*" element={<div style={{padding: '100px 20px', textAlign: 'center'}}>Coming Soon</div>} />
      </Routes>
    </div>
  );
}

export default App;