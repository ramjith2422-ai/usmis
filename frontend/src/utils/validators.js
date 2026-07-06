export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export function isValidMobile(mobile) {
  return /^\d{10}$/.test(mobile.trim())
}

export function validateRecordForm(values) {
  const errors = {}
  if (!values.full_name.trim()) errors.full_name = 'Full name is required.'
  if (!values.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Enter a valid email address.'
  }
  if (!values.mobile_number.trim()) {
    errors.mobile_number = 'Mobile number is required.'
  } else if (!isValidMobile(values.mobile_number)) {
    errors.mobile_number = 'Enter a 10-digit mobile number.'
  }
  if (!values.department.trim()) errors.department = 'Department is required.'
  if (!values.address.trim()) errors.address = 'Address is required.'
  return errors
}

export function validateSignupForm(values) {
  const errors = {}
  if (!values.fullName.trim()) errors.fullName = 'Full name is required.'
  if (!values.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Enter a valid email address.'
  }
  if (!values.password) {
    errors.password = 'Password is required.'
  } else if (values.password.length < 8) {
    errors.password = 'Use at least 8 characters.'
  }
  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords do not match.'
  }
  return errors
}
