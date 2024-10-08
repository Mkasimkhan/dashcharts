import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ContextProvider } from './contexts/ContextProvider'; 
import { registerLicense } from '@syncfusion/ej2-base';
import App from './App.jsx'
import './index.css'

registerLicense(import.meta.env.REACT_APP_SECRET_KEY_SYNCFUSION)

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <ContextProvider>
      <App />
    </ContextProvider>
  </StrictMode>
)
