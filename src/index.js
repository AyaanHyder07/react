import React from 'react';
import ReactDOM from 'react-dom/client';
// Import your App.css file here so the styles are global
import './App.css'; 
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();