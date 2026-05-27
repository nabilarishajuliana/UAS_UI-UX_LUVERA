import { Navigate } from 'react-router-dom'
import { isLoggedIn, isAdmin } from '../utils/authHelper'

// Untuk halaman yang butuh login (customer)
export const RequireAuth = ({ children }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />
  }
  return children
}

// Untuk halaman admin
export const RequireAdmin = ({ children }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />
  }
  if (!isAdmin()) {
    return <Navigate to="/" replace />
  }
  return children
}