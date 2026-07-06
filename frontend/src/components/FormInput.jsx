export default function FormInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false,
  autoComplete,
  as = 'input',
}) {
  const Field = as === 'textarea' ? 'textarea' : 'input'

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-ink-800">
        {label}
        {required && <span className="text-rust"> *</span>}
      </label>
      <Field
        id={name}
        name={name}
        type={as === 'input' ? type : undefined}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        rows={as === 'textarea' ? 3 : undefined}
        className={`w-full rounded-card border bg-white px-3.5 py-2.5 text-sm text-ink-800 placeholder:text-ink-100 focus:outline-none focus:ring-2 focus:ring-ochre transition-shadow ${
          error ? 'border-rust' : 'border-ink-100'
        }`}
      />
      {error && (
        <p className="text-xs text-rust font-medium" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
