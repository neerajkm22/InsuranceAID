import React from 'react'
import ReactDOM from 'react-dom/client'
import AppProvider from './stores/AppContext';
import App from './App.jsx'
import './assets/bootstrap.bundle.min.js';
import './assets/app.js';
import './index.css'
import './assets/bootstrap.min.css';
import './assets/app.min.css';
import './assets/custom.min.css';
import './assets/font.css';

const ENV_MODE  = import.meta.env.MODE;

ReactDOM.createRoot(document.getElementById('root')).render(
   (ENV_MODE === 'development' && <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>    
  </React.StrictMode>) || (<AppProvider>
      <App />
    </AppProvider>)
)
