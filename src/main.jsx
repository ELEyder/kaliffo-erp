import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NotificationProvider } from './provider/NotificationProvider.jsx'
import { AuthProvider } from "./context/AuthProvider.jsx";
createRoot(document.getElementById('root')).render(
  <NotificationProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
  </NotificationProvider>
)
