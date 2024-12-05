import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/style/main.css'
import { App } from './root-cmp.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <App />
  // </StrictMode>,
)