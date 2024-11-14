import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NotificationProvider } from './provider/NotificationContext.jsx'
createRoot(document.getElementById('root')).render(
  <NotificationProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </NotificationProvider>
)
