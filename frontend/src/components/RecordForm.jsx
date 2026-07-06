import { useState } from 'react'
import FormInput from './FormInput'
import { validateRecordForm } from '../utils/validators'

const emptyValues = {
  full_name: '',
  email: '',
  mobile_number: '',
  department: '',
  address: '',
}

export default function RecordForm({ initialValues = emptyValues, onSubmit, submitLabel }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateRecordForm(values)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setSubmitting(true)
    await onSubmit(values)
    setSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl">
      <FormInput
        label="Full name"
        name="full_name"
        value={values.full_name}
        onChange={handleChange}
        error={errors.full_name}
        required
      />
      <FormInput
        label="Email"
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
        required
      />
      <FormInput
        label="Mobile number"
        name="mobile_number"
        value={values.mobile_number}
        onChange={handleChange}
        error={errors.mobile_number}
        placeholder="10-digit number"
        required
      />
      <FormInput
        label="Department"
        name="department"
        value={values.department}
        onChange={handleChange}
        error={errors.department}
        required
      />
      <FormInput
        label="Address"
        name="address"
        as="textarea"
        value={values.address}
        onChange={handleChange}
        error={errors.address}
        required
      />
      <button
        type="submit"
        disabled={submitting}
        className="mt-2 bg-ochre hover:bg-ochre-dark disabled:opacity-60 text-ink-900 font-medium py-2.5 rounded-card transition-colors w-fit px-6"
      >
        {submitting ? 'Saving…' : submitLabel}
      </button>
    </form>
  )
}
