import React, { useEffect, useMemo, useState } from 'react';
  import { CartProvider } from './context/CartContext';
  import Filters from './components/Filters';
  import ProductList from './components/ProductList';
  import Cart from './components/Cart';
  import { fetchProducts } from './services/api';

export default function App(){
  return (
    <CartProvider>
      <Header />
      <main className="container">
        <Shop />
      </main>
      <footer className="footer">EcoTrend © {new Date().getFullYear()} — Projeto acadêmico (React + Fetch + localStorage + Promises)</footer>
    </CartProvider>
  )
}