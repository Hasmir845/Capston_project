import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import FarmerDashboard from './pages/FarmerDashboard'
import Home from './pages/Home'
import ConsumerDashboard from './pages/ConsumerDashboard'
import AdminDashboard from './pages/AdminDashboard'
import { AuthProvider } from './context/AuthContext'
import { ProductProvider } from './context/ProductContext'
import ProtectedRoute from './components/ProtectedRoute'
import Unauthorized from './pages/Unauthorized'
import { CartProvider } from './context/CartContext'
import { OrdersProvider } from './context/OrdersContext'
import CartPage from './pages/CartPage'
import ConsumerOrders from './pages/ConsumerOrders'

function AppContent() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        <Route 
          path="/farmer" 
          element={
            <ProtectedRoute allowedRoles={['farmer']}>
              <FarmerDashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/consumer" 
          element={
            <ProtectedRoute allowedRoles={['consumer']}>
              <ConsumerDashboard />
            </ProtectedRoute>
          } 
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute allowedRoles={['consumer']}>
              <CartPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/consumer/orders"
          element={
            <ProtectedRoute allowedRoles={['consumer']}>
              <ConsumerOrders />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Backwards-compatible redirects */}
        <Route path="/consumer-home" element={<Navigate to="/consumer" replace />} />
        <Route path="/farmer-dashboard" element={<Navigate to="/farmer" replace />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <OrdersProvider>
            <CartProvider>
              <AppContent />
            </CartProvider>
          </OrdersProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
