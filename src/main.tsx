import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppLoaderGate } from './components/brand/PremiumLoader';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppLoaderGate>
        <App />
      </AppLoaderGate>
    </BrowserRouter>
  </React.StrictMode>,
);
