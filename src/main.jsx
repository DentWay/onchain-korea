import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ProgressProvider } from './hooks/useProgress'
import { LangProvider } from './hooks/useLang'
import { FomoToastProvider } from './components/FomoToast'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LangProvider>
        <ProgressProvider>
          <FomoToastProvider>
            <App />
          </FomoToastProvider>
        </ProgressProvider>
      </LangProvider>
    </BrowserRouter>
  </React.StrictMode>
)
