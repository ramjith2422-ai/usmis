export default function SearchBar({ value, onChange, placeholder = 'Search records…' }) {
  return (
    <div className="relative w-full sm:w-72">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-card border border-ink-100 bg-white pl-9 pr-3 py-2.5 text-sm text-ink-800 placeholder:text-ink-100 focus:outline-none focus:ring-2 focus:ring-ochre"
      />
    </div>
  )
}
