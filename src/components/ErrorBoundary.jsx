import { Component } from 'react'
import { Link } from 'react-router-dom'

function ErrorFallback() {
  return (
    <div className="ok-theme-workbench min-h-screen flex items-center justify-center p-6">
      <div className="ok-app-card max-w-md rounded-[1.5rem] p-8 text-center">
        <p className="text-4xl mb-4">⚠️</p>
        <h1 className="text-lg font-semibold text-[var(--app-ink-high)] mb-2">Something went wrong</h1>
        <p className="text-sm text-[var(--app-ink-mid)] mb-6">Refresh the page or go back home.</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 rounded-[56px] bg-[#5741d8] px-6 py-3 text-[14px] font-semibold text-white hover:bg-[#828fff] transition-colors"
          >
            Refresh
          </button>
          <Link to="/" className="ok-app-secondary-button inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[14px] font-semibold">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />
    }
    return this.props.children
  }
}
