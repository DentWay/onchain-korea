import { Component } from 'react'
import { Link } from 'react-router-dom'

function ErrorFallback() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="rounded-xl border border-[#dedee5] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-8 max-w-md text-center">
        <p className="text-4xl mb-4">⚠️</p>
        <h1 className="text-lg font-semibold text-[#101114] mb-2">Something went wrong</h1>
        <p className="text-sm text-[#686b82] mb-6">Refresh the page or go back home.</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 rounded-[56px] bg-[#5741d8] px-6 py-3 text-[14px] font-semibold text-white hover:bg-[#828fff] transition-colors"
          >
            Refresh
          </button>
          <Link to="/" className="inline-flex items-center gap-2 rounded-xl bg-[#eef0f3] px-5 py-3 text-[14px] font-semibold text-[#101114] hover:bg-[#dedee5] transition-colors">
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
