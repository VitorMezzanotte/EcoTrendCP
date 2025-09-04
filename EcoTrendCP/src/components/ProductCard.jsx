import React from 'react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }){
  const { add } = useCart();
  return (
    <div className="card product-card">
      <img src={product.image} alt={product.name} />
      <div className="badge">{product.category}</div>
      <strong>{product.name}</strong>
      <p style={{opacity:.8, fontSize:14, marginTop:-4}}>{product.description}</p>
      <div className="price">
        <span>R$ {product.price.toFixed(2)}</span>
        <button className="btn" onClick={()=>add(product)} title="Adicionar ao carrinho">
          <i className="fa-solid fa-cart-plus"></i> Adicionar
        </button>
      </div>
    </div>
  )
}
