import React from 'react';
import ProductCard from './ProductCard';

export default function ProductList({ products, loading, error }){
  if(loading) return <div className="card spinner"><i className="fa-solid fa-circle-notch fa-spin fa-2x"></i></div>;
  if(error) return <div className="card">Erro: {error}</div>;
  if(!products?.length) return <div className="card">Nenhum produto encontrado.</div>;
  return (
    <div className="products">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  )
}
