import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';   // ← Must be imported
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>                    {/* ← This must wrap <App /> */}
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);