import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AppLayout from '../../components/AppLayout'
import Loader from '../../components/Loader'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../services/supabase'

export default function Dashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({ total: 0, latest: null })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function loadStats() {
      setLoading(true)
      const { count } = await supabase
        .from('submissions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)

      const { data: latestRows } = await supabase
        .from('submissions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)

      if (active) {
        setStats({ total: count ?? 0, latest: latestRows?.[0] ?? null })
        setLoading(false)
      }
    }

    loadStats()
    return () => {
      active = false
    }
  }, [user.id])

  return (
    <AppLayout title="Overview">
      <p className="font-mono text-xs text-ink-100 tracking-wide mb-1">
        {new Date().toLocaleDateString(undefined, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      <h2 className="font-display text-2xl text-paper mb-8">
        Welcome back, {user.user_metadata?.full_name?.split(' ')[0] || 'there'}.
      </h2>

      {loading ? (
        <Loader label="Reading your ledger…" />
      ) : (
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-paper rounded-card shadow-card p-6">
            <p className="font-mono text-xs text-ink-100 mb-2">TOTAL ENTRIES</p>
            <p className="font-display text-4xl text-ink-800">{stats.total}</p>
          </div>
          <div className="bg-paper rounded-card shadow-card p-6">
            <p className="font-mono text-xs text-ink-100 mb-2">MOST RECENT ENTRY</p>
            {stats.latest ? (
              <>
                <p className="font-display text-lg text-ink-800">{stats.latest.full_name}</p>
                <p className="text-sm text-ink-600">{stats.latest.department}</p>
              </>
            ) : (
              <p className="text-sm text-ink-600">No entries yet.</p>
            )}
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <Link
          to="/records/new"
          className="bg-ochre hover:bg-ochre-dark text-ink-900 font-medium px-4 py-2.5 rounded-card text-sm transition-colors"
        >
          Add a record
        </Link>
        <Link
          to="/records"
          className="bg-transparent border border-ink-600 hover:border-ochre text-paper font-medium px-4 py-2.5 rounded-card text-sm transition-colors"
        >
          View all records
        </Link>
      </div>
    </AppLayout>
  )
}
