import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('Unhandled UI error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-ink-800 flex items-center justify-center p-6">
          <div className="bg-paper rounded-card shadow-card p-8 max-w-md text-center">
            <h1 className="font-display text-2xl text-ink-800 mb-2">Something went wrong</h1>
            <p className="text-ink-600 text-sm mb-4">
              The page hit an unexpected error. Reload to try again — your saved records are
              unaffected.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-ochre hover:bg-ochre-dark text-ink-900 font-medium px-4 py-2 rounded-card transition-colors"
            >
              Reload page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
