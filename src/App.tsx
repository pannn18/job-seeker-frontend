import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/landing'
import UserDashboard from './pages/userDashboard'
import HRDDashboard from './pages/HRDDashboard'
import ProtectedRoute from './components/protectedRoute'

function App() {
  console.log('App component rendered')
  
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Landing />} />
        
        {/* Protected Route - User Dashboard */}
        <Route 
          path="/user/dashboard" 
          element={
            <ProtectedRoute allowedRole="user">
              <UserDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Protected Route - HRD Dashboard */}
        <Route 
          path="/hrd/dashboard" 
          element={
            <ProtectedRoute allowedRole="hrd">
              <HRDDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App