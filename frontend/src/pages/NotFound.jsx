import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ink-800 flex items-center justify-center p-6">
      <div className="bg-paper rounded-card shadow-card p-8 max-w-sm text-center">
        <p className="font-mono text-xs text-ochre-dark mb-2">404</p>
        <h1 className="font-display text-2xl text-ink-800 mb-2">Page not found</h1>
        <p className="text-sm text-ink-600 mb-6">
          That page doesn't exist in this ledger.
        </p>
        <Link
          to="/dashboard"
          className="inline-block bg-ochre hover:bg-ochre-dark text-ink-900 font-medium px-4 py-2 rounded-card transition-colors"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  )
}
