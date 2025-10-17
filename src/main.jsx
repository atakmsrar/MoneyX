import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// Обработка перенаправлений для GitHub Pages
const redirect = sessionStorage.redirect;
delete sessionStorage.redirect;
if (redirect && redirect !== location.href) {
  history.replaceState(null, null, redirect);
}

// Динамический basename для разных платформ
const getBasename = () => {
  if (typeof window !== 'undefined') {
    // Если это GitHub Pages
    if (window.location.hostname === 'atakmsrar.github.io') {
      return '/MoneyX'
    }
  }
  return '/'
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={getBasename()}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
