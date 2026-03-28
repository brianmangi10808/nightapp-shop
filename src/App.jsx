import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";

import Navbar from './nav/Navbar';
import About from './nav/About';
import Cart from './cart/Cart';
import Checkout from './checkout/Checkout';
import Product from './Products/Product';
import Hero from './Hero/Hero';
import ProductDetail from './Products/ProductDetail';   // ← New


function App() {
  return (
    <div className="App">
      {/* Navbar outside Routes - it should appear on all pages */}
      <Navbar />
      <Hero/>
     
      <Routes>
        <Route path="/" element={Product}/>
        <Route path="/product" element={<Product />} />
                <Route path="/product/:id" element={<ProductDetail />} />   {/* ← Dynamic Route */}

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<div>COMMING SOON</div>} />
      </Routes>
    </div>
  );
}

export default App;