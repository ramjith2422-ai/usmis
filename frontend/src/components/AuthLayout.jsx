export default function AuthLayout({ eyebrow, title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen bg-ink-800 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="font-mono text-xs text-ochre tracking-widest mb-2">{eyebrow}</p>
          <h1 className="font-display text-3xl text-paper mb-2">{title}</h1>
          {subtitle && <p className="text-ink-100 text-sm">{subtitle}</p>}
        </div>
        <div className="bg-paper rounded-card shadow-card p-8">{children}</div>
        {footer && <div className="text-center mt-6 text-sm text-ink-100">{footer}</div>}
      </div>
    </div>
  )
}
