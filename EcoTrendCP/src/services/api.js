// Simula carregamento de produtos via Fetch + Atraso de Rede
export async function fetchProducts(){
  // spinner + Simulação de Atraso
  await new Promise(res => setTimeout(res, 800));
  const res = await fetch('/products.json');
  if(!res.ok) throw new Error('Falha ao carregar produtos');
  return res.json();
}

// Simula um checkout usando Promises (com chance de erro)
export function checkout(orderData){
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      const ok = Math.random() > 0.15; // 85% de sucesso
      if(ok){
        resolve({ orderId: String(Date.now()), status: 'confirmed', ...orderData });
      } else {
        reject(new Error('Pagamento recusado. Tente novamente.'));
      }
    }, 1200);
  });
}
