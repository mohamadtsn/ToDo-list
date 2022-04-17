// Inject Styles
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/index.css';
import '@mohamadtsn/fontawesome-icon/dist/css/all.min.css';

// Inject Libs
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
