import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css'
import './index.css';
import App from './App';
import { StoreProvider } from './Store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StoreProvider>
    
      <App />
    
  </StoreProvider>
);

