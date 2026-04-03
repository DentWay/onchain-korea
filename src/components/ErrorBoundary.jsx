import { Component } from 'react'
import { Link } from 'react-router-dom'

function ErrorFallback() {
  return (
    <div className="min-h-screen bg-[var(--surface-0)] flex items-center justify-center p-6">
      <div className="ok-card p-8 max-w-md text-center">
        <p className="text-4xl mb-4">⚠️</p>
        <h1 className="text-lg font-semibold text-[var(--text-high)] mb-2">Something went wrong</h1>
        <p className="text-sm text-[var(--text-mid)] mb-6">Refresh the page or go back home.</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="ok-btn ok-btn-primary text-sm px-4 py-2"
          >
            Refresh
          </button>
          <Link to="/" className="ok-btn ok-btn-ghost text-sm px-4 py-2">
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
