import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/AuthLayout'
import FormInput from '../../components/FormInput'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'

export default function ResetPassword() {
  const { updatePassword } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [values, setValues] = useState({ password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (values.password.length < 8) {
      setError('Use at least 8 characters.')
      return
    }
    if (values.password !== values.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    setError('')
    setSubmitting(true)
    const { error: updateError } = await updatePassword(values.password)
    setSubmitting(false)
    if (updateError) {
      setError(updateError.message)
      return
    }
    showToast('Password updated. Log in with your new password.', 'success')
    navigate('/login', { replace: true })
  }

  return (
    <AuthLayout
      eyebrow="RECORDS REGISTRY"
      title="Set a new password"
      subtitle="You've followed a valid reset link. Choose a new password below."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormInput
          label="New password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          autoComplete="new-password"
          required
        />
        <FormInput
          label="Confirm new password"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={handleChange}
          autoComplete="new-password"
          required
        />
        {error && (
          <p className="text-sm text-rust font-medium bg-rust/10 border border-rust/30 rounded-card px-3 py-2">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="mt-2 bg-ochre hover:bg-ochre-dark disabled:opacity-60 text-ink-900 font-medium py-2.5 rounded-card transition-colors"
        >
          {submitting ? 'Updating…' : 'Update password'}
        </button>
      </form>
    </AuthLayout>
  )
}
