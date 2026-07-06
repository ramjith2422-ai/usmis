import { NavLink } from 'react-router-dom'

const links = [
  { to: '/dashboard', label: 'Overview', mark: '§1' },
  { to: '/records', label: 'Records', mark: '§2' },
  { to: '/records/new', label: 'New entry', mark: '§3' },
]

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-56 flex-col bg-ink-700 border-r border-ink-600 py-8 pl-6">
      <div className="mb-10 pr-6">
        <p className="font-display text-xl text-paper leading-none">Ledger</p>
        <p className="font-mono text-[11px] text-ink-100 tracking-wide mt-1">
          RECORDS REGISTRY
        </p>
      </div>
      <nav className="flex flex-col gap-1 pr-6">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to !== '/records'}
            className={({ isActive }) =>
              `ledger-tab ${isActive ? 'active' : ''} flex items-baseline gap-3 py-2.5 px-3 rounded-card text-sm transition-colors ${
                isActive
                  ? 'bg-ink-800 text-paper font-medium'
                  : 'text-ink-100 hover:text-paper hover:bg-ink-800/50'
              }`
            }
          >
            <span className="font-mono text-[11px] text-ochre">{link.mark}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
