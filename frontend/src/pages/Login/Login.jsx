import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/AuthLayout'
import FormInput from '../../components/FormInput'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'

export default function Login() {
  const { signIn } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const [values, setValues] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    const { error: signInError } = await signIn(values)
    setSubmitting(false)

    if (signInError) {
      if (signInError.message.toLowerCase().includes('email not confirmed')) {
        setError('Please verify your email before logging in. Check your inbox for the link.')
      } else {
        setError('Incorrect email or password.')
      }
      return
    }

    showToast('Welcome back.', 'success')
    navigate(location.state?.from?.pathname || '/dashboard', { replace: true })
  }

  return (
    <AuthLayout
      eyebrow="RECORDS REGISTRY"
      title="Log in"
      subtitle="Access your personal record book."
      footer={
        <>
          New here?{' '}
          <Link to="/signup" className="text-ochre-dark font-medium hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FormInput
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          autoComplete="current-password"
          required
        />
        <div className="text-right -mt-1">
          <Link to="/forgot-password" className="text-xs text-ink-600 hover:text-ochre-dark">
            Forgot password?
          </Link>
        </div>
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
          {submitting ? 'Logging in…' : 'Log in'}
        </button>
      </form>
    </AuthLayout>
  )
}
