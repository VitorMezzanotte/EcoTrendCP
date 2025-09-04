import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { checkout } from '../services/api';

export default function Cart(){
  const { items, remove, decrease, add, clear, total } = useCart();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);

  async function handleCheckout(){
    setBusy(true); setMessage(null);
    try{
      const order = await checkout({ items, total });
      clear();
      setMessage({ type: 'success', text: `Pedido confirmado! Nº ${order.orderId}` });
    }catch(e){
      setMessage({ type: 'error', text: e.message });
    }finally{
      setBusy(false);
    }
  }

  return (
    <div className="card">
      <div className="sidebar-title">
        <h3 style={{margin:0}}>Carrinho</h3>
        <button className="btn ghost" onClick={clear} disabled={!items.length}>
          <i className="fa-solid fa-trash"></i> Limpar
        </button>
      </div>
      <hr className="line" />
      <div className="cart-list">
        {items.length === 0 && <div className="badge">Seu carrinho está vazio.</div>}
        {items.map(it => (
          <div className="cart-item" key={it.id}>
            <div style={{display:'flex',flexDirection:'column'}}>
              <strong style={{fontSize:14}}>{it.name}</strong>
              <span className="badge">R$ {(it.price * it.qty).toFixed(2)}</span>
            </div>
            <div style={{display:'flex', gap:8, alignItems:'center', justifyContent:'flex-end'}}>
              <button className="btn ghost" onClick={()=>decrease(it.id)} title="Diminuir"><i className="fa-solid fa-minus"></i></button>
              <div className="badge">{it.qty}</div>
              <button className="btn ghost" onClick={()=>add(it)} title="Aumentar"><i className="fa-solid fa-plus"></i></button>
            </div>
            <button className="btn ghost" onClick={()=>remove(it.id)} title="Remover">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        ))}
      </div>
      <div className="total">
        <strong>Total</strong>
        <strong>R$ {total.toFixed(2)}</strong>
      </div>
      <div style={{display:'flex', gap:8, marginTop:10}}>
        <button className="btn primary" onClick={handleCheckout} disabled={!items.length || busy}>
          {busy ? <i className="fa-solid fa-circle-notch fa-spin"></i> : <i className="fa-solid fa-credit-card"></i>}
          <span>{busy ? 'Processando...' : 'Finalizar compra'}</span>
        </button>
      </div>
      {message && (
        <div style={{marginTop:10, padding:10, borderRadius:12, background: message.type==='success' ? '#0e221a' : '#221010', border:'1px solid rgba(255,255,255,.06)'}}>
          <i className={message.type==='success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-triangle-exclamation'}></i>
          <span style={{marginLeft:8}}>{message.text}</span>
        </div>
      )}
    </div>
  )
}
