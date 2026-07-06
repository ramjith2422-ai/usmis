import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/AuthLayout'
import FormInput from '../../components/FormInput'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { validateSignupForm } from '../../utils/validators'

const initialValues = { fullName: '', email: '', password: '', confirmPassword: '' }

export default function Signup() {
  const { signUp } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [confirmSent, setConfirmSent] = useState(false)

  const handleChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateSignupForm(values)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setSubmitError('')
    setSubmitting(true)
    const { data, error } = await signUp(values)
    setSubmitting(false)

    if (error) {
      setSubmitError(error.message)
      return
    }

    if (data.user && !data.session) {
      setConfirmSent(true)
      showToast('Check your inbox to verify your email.', 'success')
    } else {
      showToast('Account created.', 'success')
      navigate('/dashboard', { replace: true })
    }
  }

  if (confirmSent) {
    return (
      <AuthLayout eyebrow="RECORDS REGISTRY" title="Check your email">
        <p className="text-sm text-ink-600 mb-6">
          We sent a verification link to <strong>{values.email}</strong>. Confirm your email,
          then log in to continue.
        </p>
        <Link
          to="/login"
          className="block text-center bg-ochre hover:bg-ochre-dark text-ink-900 font-medium py-2.5 rounded-card transition-colors"
        >
          Go to login
        </Link>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      eyebrow="RECORDS REGISTRY"
      title="Create an account"
      subtitle="Start your own record book in under a minute."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="text-ochre-dark font-medium hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormInput
          label="Full name"
          name="fullName"
          value={values.fullName}
          onChange={handleChange}
          error={errors.fullName}
          autoComplete="name"
          required
        />
        <FormInput
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          autoComplete="email"
          required
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="new-password"
          required
        />
        <FormInput
          label="Confirm password"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          autoComplete="new-password"
          required
        />
        {submitError && (
          <p className="text-sm text-rust font-medium bg-rust/10 border border-rust/30 rounded-card px-3 py-2">
            {submitError}
          </p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="mt-2 bg-ochre hover:bg-ochre-dark disabled:opacity-60 text-ink-900 font-medium py-2.5 rounded-card transition-colors"
        >
          {submitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>
    </AuthLayout>
  )
}
