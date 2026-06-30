import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import i18n from './i18n';
import type { Lang } from './i18n';
import { AppLoaderGate } from './components/brand/PremiumLoader';
import App from './App';
import './index.css';

// Synchronously redirect root path to detected language before React renders.
// i18n.language is set by getInitialLang() (browser detection + localStorage)
// so we just need to update the URL to match.
if (typeof window !== 'undefined' && window.location.pathname === '/') {
  const lang = i18n.language as Lang;
  if (lang !== 'pt') {
    window.history.replaceState(null, '', `/${lang}`);
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppLoaderGate>
        <App />
      </AppLoaderGate>
    </BrowserRouter>
  </React.StrictMode>,
);
