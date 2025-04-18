import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/Auth.jsx';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
 <BrowserRouter>
  <StrictMode>
    <App />
    <ToastContainer theme='dark'/>
  </StrictMode>
  </BrowserRouter>
  </AuthProvider>
  
)
