import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// A landing (/lp-estantedoescritor) vem pré-renderizada no build: hidrata o HTML existente.
// As demais rotas seguem como SPA normal.
if (window.location.pathname === '/lp-estantedoescritor' && rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
