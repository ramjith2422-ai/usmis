import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../../components/AuthLayout'
import FormInput from '../../components/FormInput'
import { useAuth } from '../../context/AuthContext'
import { isValidEmail } from '../../utils/validators'

export default function ForgotPassword() {
  const { sendPasswordReset } = useAuth()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isValidEmail(email)) {
      setError('Enter a valid email address.')
      return
    }
    setError('')
    setSubmitting(true)
    const { error: resetError } = await sendPasswordReset(email)
    setSubmitting(false)
    if (resetError) {
      setError(resetError.message)
      return
    }
    setSent(true)
  }

  if (sent) {
    return (
      <AuthLayout eyebrow="RECORDS REGISTRY" title="Check your email">
        <p className="text-sm text-ink-600 mb-6">
          If an account exists for <strong>{email}</strong>, a password reset link is on its way.
        </p>
        <Link
          to="/login"
          className="block text-center bg-ochre hover:bg-ochre-dark text-ink-900 font-medium py-2.5 rounded-card transition-colors"
        >
          Back to login
        </Link>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      eyebrow="RECORDS REGISTRY"
      title="Forgot password"
      subtitle="We'll send a reset link to your email."
      footer={
        <Link to="/login" className="text-ochre-dark font-medium hover:underline">
          Back to login
        </Link>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormInput
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
          autoComplete="email"
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="mt-2 bg-ochre hover:bg-ochre-dark disabled:opacity-60 text-ink-900 font-medium py-2.5 rounded-card transition-colors"
        >
          {submitting ? 'Sending…' : 'Send reset link'}
        </button>
      </form>
    </AuthLayout>
  )
}
