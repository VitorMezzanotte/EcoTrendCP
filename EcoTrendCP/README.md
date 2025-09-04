# EcoTrend — E-commerce Sustentável (React + Vite)

Trabalho acadêmico (**Check Point 04**) com os requisitos:
- Manipulação do DOM (carrinho dinâmico + filtros);
- Storage e JSON (`localStorage` para carrinho; produtos via JSON);
- Requisições assíncronas com `fetch` (carregar produtos);
- Promises/async/await (checkout simulado + loading spinner).

## Tecnologias
- React + Vite
- Font Awesome (ícones) e Google Fonts
- localStorage, fetch e Promises

## Como rodar localmente
```bash
npm install
npm run dev
# abra o endereço indicado pelo Vite
```

## Build de produção
```bash
npm run build
npm run preview
```

## Deploy
### Vercel
- Importar o repositório na Vercel e selecionar framework **Vite**.
- A Vercel detecta automaticamente os comandos de build e output.

> A aplicação busca `public/products.json` via `fetch`, então não requer backend.

## Estrutura
```
public/products.json
src/
  components/ (ProductCard, ProductList, Filters, Cart)
  context/CartContext.jsx (estado global do carrinho + localStorage)
  hooks/useLocalStorage.js
  services/api.js (fetch + checkout com Promise)
  App.jsx, main.jsx, styles.css
index.html
```

## Grupo / Créditos
- **EcoTrend** — Projeto acadêmico
- Integrante: Vitor Mezzanotte Constante - RM: 562051 
- Professor: Lucas Sousa
