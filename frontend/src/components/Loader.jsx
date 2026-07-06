export default function Loader({ label = 'Loading…', full = false }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 text-ink-100 font-mono text-sm ${
        full ? 'h-full min-h-[240px]' : 'py-6'
      }`}
    >
      <span className="relative flex h-4 w-4">
        <span className="absolute inline-flex h-full w-full rounded-full bg-ochre opacity-60 animate-ping" />
        <span className="relative inline-flex h-4 w-4 rounded-full bg-ochre" />
      </span>
      {label}
    </div>
  )
}
