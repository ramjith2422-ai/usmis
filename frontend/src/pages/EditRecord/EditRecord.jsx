import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AppLayout from '../../components/AppLayout'
import Loader from '../../components/Loader'
import RecordForm from '../../components/RecordForm'
import { useToast } from '../../context/ToastContext'
import { fetchSubmissionById, updateSubmission } from '../../services/supabase'

export default function EditRecord() {
  const { id } = useParams()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [record, setRecord] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let active = true
    async function load() {
      const { data, error } = await fetchSubmissionById(id)
      if (!active) return
      if (error || !data) {
        setNotFound(true)
      } else {
        setRecord(data)
      }
      setLoading(false)
    }
    load()
    return () => {
      active = false
    }
  }, [id])

  const handleSubmit = async (values) => {
    const { error } = await updateSubmission(id, values)
    if (error) {
      showToast('Could not update the record. Try again.', 'error')
      return
    }
    showToast('Record updated.', 'success')
    navigate('/records')
  }

  return (
    <AppLayout title="Edit entry">
      {loading ? (
        <Loader label="Fetching record…" />
      ) : notFound ? (
        <p className="text-sm text-paper">
          This record doesn't exist, or it belongs to someone else.
        </p>
      ) : (
        <RecordForm
          initialValues={{
            full_name: record.full_name,
            email: record.email,
            mobile_number: record.mobile_number,
            department: record.department,
            address: record.address,
          }}
          onSubmit={handleSubmit}
          submitLabel="Save changes"
        />
      )}
    </AppLayout>
  )
}
