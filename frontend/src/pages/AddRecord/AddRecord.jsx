import { useNavigate } from 'react-router-dom'
import AppLayout from '../../components/AppLayout'
import RecordForm from '../../components/RecordForm'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { createSubmission } from '../../services/supabase'

export default function AddRecord() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (values) => {
    const { error } = await createSubmission({ ...values, user_id: user.id })
    if (error) {
      showToast('Could not save the record. Try again.', 'error')
      return
    }
    showToast('Record saved.', 'success')
    navigate('/records')
  }

  return (
    <AppLayout title="New entry">
      <p className="text-sm text-ink-100 mb-6 max-w-xl">
        Fields marked with <span className="text-rust">*</span> are required.
      </p>
      <RecordForm onSubmit={handleSubmit} submitLabel="Save record" />
    </AppLayout>
  )
}
