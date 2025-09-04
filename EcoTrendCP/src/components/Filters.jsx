import React from 'react';

export default function Filters({ categories, selectedCategory, setSelectedCategory, priceMax, setPriceMax, query, setQuery, onReset }){
  return (
    <div className="card">
      <h3 style={{marginTop:0}}>Filtros</h3>
      <div className="controls">
        <select className="select" value={selectedCategory} onChange={e=>setSelectedCategory(e.target.value)}>
          <option value="">Todas as categorias</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input className="input" type="range" min="0" max="1000" step="10" value={priceMax} onChange={e=>setPriceMax(Number(e.target.value))} />
        <div className="badge">Até R$ {priceMax.toFixed(2)}</div>
        <input className="input" placeholder="Buscar por nome..." value={query} onChange={e=>setQuery(e.target.value)} />
        <button className="btn ghost" onClick={onReset}><i className="fa-solid fa-rotate-right"></i> Limpar filtros</button>
      </div>
    </div>
  )
}
