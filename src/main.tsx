import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthContext } from './contexts/authContext'
import { useAuth } from './hooks/useAuth'
import { ToastProvider } from './contexts/toastContext'


function Root() {
  const auth = useAuth();
  return (
    <AuthContext.Provider value={auth}>
      <App />
    </AuthContext.Provider>
  );
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <Root />
    </ToastProvider>
  </StrictMode>,
)
