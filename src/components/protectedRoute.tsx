import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRole: 'user' | 'hrd'
}

export default function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  console.log('=== ProtectedRoute Check ===')
  console.log('Token:', token)
  console.log('Role:', role)
  console.log('Allowed Role:', allowedRole)
  console.log('===========================')

  // Kalau belum login (gak ada token)
  if (!token) {
    console.log('❌ No token found, redirecting to landing')
    return <Navigate to="/" replace />
  }

  // Kalau role gak sesuai
  if (role !== allowedRole) {
    console.log(`❌ Wrong role: ${role}, expected: ${allowedRole}`)
    return <Navigate to="/" replace />
  }

  // Kalau aman
  console.log('✅ Access granted!')
  return <>{children}</>
}