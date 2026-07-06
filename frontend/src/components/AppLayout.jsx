import Sidebar from './Sidebar'
import Navbar from './Navbar'

export default function AppLayout({ title, children }) {
  return (
    <div className="min-h-screen flex bg-ink-800">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar title={title} />
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
