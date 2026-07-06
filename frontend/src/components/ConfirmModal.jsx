export default function ConfirmModal({
  open,
  title = 'Are you sure?',
  message,
  confirmLabel = 'Confirm',
  danger = false,
  onConfirm,
  onCancel,
}) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-ink-900/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      <div className="bg-paper rounded-card shadow-card max-w-sm w-full p-6">
        <h2 id="confirm-modal-title" className="font-display text-lg text-ink-800 mb-2">
          {title}
        </h2>
        <p className="text-sm text-ink-600 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-ink-600 hover:text-ink-800 rounded-card border border-ink-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-medium rounded-card transition-colors ${
              danger
                ? 'bg-rust text-paper hover:bg-rust/90'
                : 'bg-ochre text-ink-900 hover:bg-ochre-dark'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
