import { createContext, useCallback, useContext, useState } from 'react'

const ToastContext = createContext(undefined)

let idCounter = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback(
    (message, variant = 'info', duration = 4000) => {
      const id = ++idCounter
      setToasts((prev) => [...prev, { id, message, variant }])
      if (duration) {
        setTimeout(() => dismiss(id), duration)
      }
      return id
    },
    [dismiss]
  )

  return (
    <ToastContext.Provider value={{ showToast, dismiss }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-80">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={`rounded-card shadow-card px-4 py-3 text-sm font-body border-l-4 bg-paper text-ink-800 animate-[fadein_0.2s_ease-out] ${
              t.variant === 'success'
                ? 'border-moss'
                : t.variant === 'error'
                ? 'border-rust'
                : 'border-ochre'
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (ctx === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return ctx
}
