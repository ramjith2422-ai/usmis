import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

export default function Navbar({ title }) {
  const { user, signOut } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const handleLogout = async () => {
    const { error } = await signOut()
    if (error) {
      showToast('Could not sign you out. Try again.', 'error')
      return
    }
    showToast('Signed out.', 'success')
    navigate('/login', { replace: true })
  }

  const initials = (user?.user_metadata?.full_name || user?.email || '?')
    .trim()
    .charAt(0)
    .toUpperCase()

  return (
    <header className="flex items-center justify-between border-b border-ink-600 bg-ink-700 px-6 py-4">
      <div>
        <h1 className="font-display text-lg text-paper">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm text-paper font-medium leading-tight">
            {user?.user_metadata?.full_name || 'Account'}
          </p>
          <p className="text-xs text-ink-100 font-mono leading-tight">{user?.email}</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-ochre text-ink-900 font-display flex items-center justify-center">
          {initials}
        </div>
        <button
          onClick={handleLogout}
          className="text-sm font-medium text-ink-100 hover:text-ochre border border-ink-600 hover:border-ochre rounded-card px-3 py-1.5 transition-colors"
        >
          Log out
        </button>
      </div>
    </header>
  )
}
