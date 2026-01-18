import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import FarmerDashboard from './pages/FarmerDashboard'
import ConsumerHome from './pages/ConsumerHome'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  // Get user role from localStorage
  const userRole = localStorage.getItem('userRole') || null

  return (
    <BrowserRouter>
      <Navbar userRole={userRole} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/farmer" element={<FarmerDashboard />} />
        <Route path="/consumer" element={<ConsumerHome />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
