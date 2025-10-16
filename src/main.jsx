import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Header from './app/layouts/Header'
import Footer from './app/layouts/Footer'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <header>
      <Header />
    </header>
    <App />
    <footer>
      <Footer />
    </footer>
  </StrictMode>,
)
