import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  // ⏳ wait for auth to load
  if (loading) {
    return <p style={{ textAlign: 'center' }}>Loading...</p>;
  }

  // 🔒 not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🔑 role restriction
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ allowed
  return children;
}

export default ProtectedRoute;
