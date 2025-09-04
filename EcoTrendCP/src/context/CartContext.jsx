import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CartContext = createContext();

export function CartProvider({ children }){
  const [stored, setStored] = useLocalStorage('ecotrend:cart', []);
  const [items, setItems] = useState(stored);

  useEffect(()=> setStored(items), [items]);

  function add(product){
    setItems(prev => {
      const found = prev.find(p => p.id === product.id);
      if(found){
        return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function remove(id){
    setItems(prev => prev.filter(p => p.id !== id));
  }

  function decrease(id){
    setItems(prev => prev.map(p => p.id === id ? { ...p, qty: Math.max(0, p.qty - 1)} : p).filter(p => p.qty > 0));
  }

  function clear(){ setItems([]); }

  const total = useMemo(()=> items.reduce((acc, it)=> acc + it.price * it.qty, 0), [items]);

  return <CartContext.Provider value={{ items, add, remove, decrease, clear, total }}>
    {children}
  </CartContext.Provider>
}

export function useCart(){
  return useContext(CartContext);
}
