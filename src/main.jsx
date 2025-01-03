import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NotificationProvider } from './provider/NotificationContext.jsx'
import { AuthProvider } from "./context/AuthProvider.jsx";
createRoot(document.getElementById('root')).render(
  <NotificationProvider>
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>
  </NotificationProvider>
)
