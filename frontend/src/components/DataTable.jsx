import { Link } from 'react-router-dom'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function DataTable({ records, page, pageSize, onDeleteRequest }) {
  if (records.length === 0) {
    return (
      <div className="bg-paper rounded-card shadow-card p-10 text-center">
        <p className="font-display text-lg text-ink-800 mb-1">No entries yet</p>
        <p className="text-sm text-ink-600 mb-5">
          Records you add will be listed here, newest first.
        </p>
        <Link
          to="/records/new"
          className="inline-block bg-ochre hover:bg-ochre-dark text-ink-900 font-medium px-4 py-2 rounded-card text-sm transition-colors"
        >
          Add your first record
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {records.map((r, i) => (
        <div
          key={r.id}
          className="card-corner bg-paper rounded-card shadow-card p-5 flex flex-col sm:flex-row sm:items-center gap-4"
        >
          <div className="font-mono text-xs text-ink-100 shrink-0 w-14">
            No. {String((page - 1) * pageSize + i + 1).padStart(3, '0')}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display text-base text-ink-800 truncate">{r.full_name}</p>
            <p className="text-sm text-ink-600 truncate">{r.email}</p>
          </div>
          <div className="flex-1 min-w-0 hidden sm:block">
            <p className="text-sm text-ink-800">{r.department}</p>
            <p className="text-xs text-ink-600 font-mono">{r.mobile_number}</p>
          </div>
          <div className="hidden md:block text-xs text-ink-600 font-mono w-24 shrink-0">
            {formatDate(r.created_at)}
          </div>
          <div className="flex gap-2 shrink-0">
            <Link
              to={`/records/${r.id}/edit`}
              className="text-sm font-medium text-ink-700 hover:text-ochre-dark border border-ink-100 rounded-card px-3 py-1.5 transition-colors"
            >
              Edit
            </Link>
            <button
              onClick={() => onDeleteRequest(r)}
              className="text-sm font-medium text-rust hover:text-white hover:bg-rust border border-rust/40 rounded-card px-3 py-1.5 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
