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

const CHUNK_RELOAD_KEY = 'onchain-korea:chunk-reload-attempted'

function shouldRecoverFromAssetError(message = '') {
  const text = String(message || '')
  return (
    text.includes('Failed to fetch dynamically imported module') ||
    text.includes('Importing a module script failed') ||
    text.includes('Failed to load resource')
  )
}

function reloadOnceForAssetFailure(reason = '') {
  try {
    if (sessionStorage.getItem(CHUNK_RELOAD_KEY) === '1') return
    if (!shouldRecoverFromAssetError(reason)) return
    sessionStorage.setItem(CHUNK_RELOAD_KEY, '1')
    window.location.reload()
  } catch {}
}

window.addEventListener('error', (event) => {
  const target = event?.target
  if (target && (target.tagName === 'SCRIPT' || target.tagName === 'LINK')) {
    reloadOnceForAssetFailure('Failed to load resource')
    return
  }

  reloadOnceForAssetFailure(event?.message || '')
})

window.addEventListener('unhandledrejection', (event) => {
  const reason = event?.reason?.message || event?.reason || ''
  reloadOnceForAssetFailure(reason)
})

window.setTimeout(() => {
  try {
    sessionStorage.removeItem(CHUNK_RELOAD_KEY)
  } catch {}
}, 4000)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <LangProvider>
          <AuthProvider>
            <QuizProvider>
              <ProgressProvider>
                <App />
              </ProgressProvider>
            </QuizProvider>
          </AuthProvider>
        </LangProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
)
