import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import Dashboard from './pages/Dashboard/Dashboard'
import AddRecord from './pages/AddRecord/AddRecord'
import ViewRecords from './pages/ViewRecords/ViewRecords'
import EditRecord from './pages/EditRecord/EditRecord'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/records"
        element={
          <ProtectedRoute>
            <ViewRecords />
          </ProtectedRoute>
        }
      />
      <Route
        path="/records/new"
        element={
          <ProtectedRoute>
            <AddRecord />
          </ProtectedRoute>
        }
      />
      <Route
        path="/records/:id/edit"
        element={
          <ProtectedRoute>
            <EditRecord />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
