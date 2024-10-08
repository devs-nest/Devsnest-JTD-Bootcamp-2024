import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootElem: HTMLElement = document.getElementById('root') as HTMLElement;

createRoot(rootElem).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
