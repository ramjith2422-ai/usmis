import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AppLayout from '../../components/AppLayout'
import ConfirmModal from '../../components/ConfirmModal'
import DataTable from '../../components/DataTable'
import Loader from '../../components/Loader'
import SearchBar from '../../components/SearchBar'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { deleteSubmission, fetchSubmissions } from '../../services/supabase'

const PAGE_SIZE = 8

export default function ViewRecords() {
  const { user } = useAuth()
  const { showToast } = useToast()

  const [records, setRecords] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [pendingDelete, setPendingDelete] = useState(null)

  const loadRecords = useCallback(async () => {
    setLoading(true)
    const { data, error, count: total } = await fetchSubmissions({
      userId: user.id,
      search,
      page,
      pageSize: PAGE_SIZE,
    })
    if (error) {
      showToast('Could not load records.', 'error')
    } else {
      setRecords(data || [])
      setCount(total || 0)
    }
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id, search, page])

  useEffect(() => {
    loadRecords()
  }, [loadRecords])

  useEffect(() => {
    setPage(1)
  }, [search])

  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE))

  const handleConfirmDelete = async () => {
    const { error } = await deleteSubmission(pendingDelete.id)
    setPendingDelete(null)
    if (error) {
      showToast('Could not delete the record.', 'error')
      return
    }
    showToast('Record deleted.', 'success')
    loadRecords()
  }

  return (
    <AppLayout title="Records">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <SearchBar value={search} onChange={setSearch} />
        <Link
          to="/records/new"
          className="bg-ochre hover:bg-ochre-dark text-ink-900 font-medium px-4 py-2.5 rounded-card text-sm text-center transition-colors"
        >
          Add a record
        </Link>
      </div>

      {loading ? (
        <Loader label="Fetching your records…" />
      ) : (
        <>
          <DataTable
            records={records}
            page={page}
            pageSize={PAGE_SIZE}
            onDeleteRequest={setPendingDelete}
          />

          {count > 0 && (
            <div className="flex items-center justify-between mt-6 font-mono text-xs text-ink-100">
              <span>
                Page {page} of {totalPages} · {count} total
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 rounded-card border border-ink-600 disabled:opacity-40 hover:border-ochre"
                >
                  Prev
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1.5 rounded-card border border-ink-600 disabled:opacity-40 hover:border-ochre"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <ConfirmModal
        open={!!pendingDelete}
        title="Delete this record?"
        message={`This permanently removes ${pendingDelete?.full_name || 'this record'} from your ledger. This cannot be undone.`}
        confirmLabel="Delete"
        danger
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </AppLayout>
  )
}
