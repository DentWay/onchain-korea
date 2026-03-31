import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import { ProgressProvider } from './hooks/useProgress'
import { QuizProvider } from './hooks/useQuiz'
import { LangProvider } from './hooks/useLang'
import ErrorBoundary from './components/ErrorBoundary'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <LangProvider>
          <AuthProvider>
            <ProgressProvider>
              <QuizProvider>
                <App />
              </QuizProvider>
            </ProgressProvider>
          </AuthProvider>
        </LangProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
)
