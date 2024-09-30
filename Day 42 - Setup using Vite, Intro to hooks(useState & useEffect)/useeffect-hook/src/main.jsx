import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import MouseMovement from './mouseMovement.jsx'
import Root from './root.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <Root /> */}
  </StrictMode>,
)
