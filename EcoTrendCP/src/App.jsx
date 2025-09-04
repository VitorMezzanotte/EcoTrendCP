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

function Header(){
  return (
    <header className="header">
      <div className="container" style={{display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:10, paddingBottom:10}}>
        <div className="brand"><span className="leaf"><i className="fa-solid fa-leaf"></i></span> EcoTrend</div>
        <div className="badge">E-commerce de produtos sustentáveis</div>
      </div>
    </header>
  )
}

function Shop(){
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceMax, setPriceMax] = useState(1000);
  const [query, setQuery] = useState('');

  useEffect(()=>{
    let alive = true;
    (async()=>{
      try{
        setLoading(true); setError('');
        const data = await fetchProducts();
        if(alive) setAll(data);
      }catch(e){
        setError(e.message);
      }finally{
        setLoading(false);
      }
    })();
    return ()=>{ alive = false; }
  }, []);

  const categories = useMemo(()=> Array.from(new Set(all.map(p=>p.category))), [all]);

  const filtered = useMemo(()=>{
    return all.filter(p => 
      (!selectedCategory || p.category === selectedCategory) &&
      p.price <= priceMax &&
      (!query || p.name.toLowerCase().includes(query.toLowerCase()))
    );
  }, [all, selectedCategory, priceMax, query]);

  function reset(){
    setSelectedCategory(''); setPriceMax(1000); setQuery('');
  }

  return (
    <div className="grid" style={{marginTop:16}}>
      <section>
        <Filters
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          priceMax={priceMax}
          setPriceMax={setPriceMax}
          query={query}
          setQuery={setQuery}
          onReset={reset}
        />
        <div className="card" style={{marginTop:12}}>
          <strong>Dicas de consumo sustentável</strong>
          <ul style={{marginTop:8, opacity:.85}}>
            <li>Prefira materiais reciclados ou orgânicos.</li>
            <li>Verifique certificações de origem responsável.</li>
            <li>Priorize durabilidade e reparabilidade.</li>
          </ul>
        </div>
      </section>
      <section>
        <ProductList products={filtered} loading={loading} error={error} />
        <div style={{marginTop:12}}>
          <Cart />
        </div>
      </section>
    </div>
  )
}
