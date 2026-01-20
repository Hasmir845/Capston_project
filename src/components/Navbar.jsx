import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useCart } from '../hooks/useCart'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { totals } = useCart()
  const isLoggedIn = !!user
  const role = user?.role

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const getNavbarColor = () => {
    switch(role) {
      case 'farmer':
        return 'bg-green-700'
      case 'consumer':
        return 'bg-blue-700'
      case 'admin':
        return 'bg-purple-700'
      default:
        return 'bg-indigo-600'
    }
  }

  const getRoleLinks = () => {
    switch(role) {
      case 'farmer':
        return [{ name: 'Dashboard', href: '/farmer' }]
      case 'consumer':
        return [
          { name: 'Home', href: '/' },
          { name: 'My Dashboard', href: '/consumer' },
          { name: 'My Orders', href: '/consumer/orders' },
          { name: 'Cart', href: '/cart' }
        ]
      case 'admin':
        return [{ name: 'Dashboard', href: '/admin' }]
      default:
        return []
    }
  }

  const publicLinks = [
    { name: 'Home', href: '/' },
    { name: 'Login', href: '/login' },
    { name: 'Register', href: '/register' }
  ]

  return (
    <nav className={`${getNavbarColor()} text-white shadow-lg`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Brand Name */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold">FarmerFresh</span>
            <span className="hidden sm:inline text-sm opacity-90">Farmer to Consumer Platform</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {isLoggedIn ? (
              <>
                {/* Role-based links */}
                {getRoleLinks().map((link) => (
                  <Link 
                    key={link.href}
                    to={link.href} 
                    className="hover:text-gray-200 transition font-medium"
                  >
                    {link.name}
                  </Link>
                ))}

                {role === 'consumer' && (
                  <Link
                    to="/cart"
                    className="relative bg-white/15 hover:bg-white/25 transition px-3 py-2 rounded font-semibold"
                    title="Cart"
                  >
                    Cart
                    {totals.count > 0 && (
                      <span className="ml-2 inline-flex items-center justify-center text-xs bg-red-500 text-white rounded-full px-2 py-0.5">
                        {totals.count}
                      </span>
                    )}
                  </Link>
                )}
                
                {/* User Info */}
                <div className="flex items-center gap-4 pl-4 border-l border-white border-opacity-30">
                  <span className="text-sm">
                    {user?.name || user?.email || 'User'}
                  </span>
                  <button 
                    onClick={handleLogout}
                    className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition font-semibold"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Public links */}
                {publicLinks.map((link) => (
                  <Link 
                    key={link.href}
                    to={link.href} 
                    className="hover:text-gray-200 transition font-medium"
                  >
                    {link.name}
                  </Link>
                ))}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col gap-1.5"
          >
            <span className={`w-6 h-0.5 bg-white transition ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white border-opacity-30 flex flex-col gap-3">
            {isLoggedIn ? (
              <>
                {getRoleLinks().map((link) => (
                  <Link 
                    key={link.href}
                    to={link.href} 
                    className="hover:text-gray-200 transition py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                {role === 'consumer' && (
                  <Link
                    to="/cart"
                    className="hover:text-gray-200 transition py-2 font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Cart {totals.count > 0 ? `(${totals.count})` : ''}
                  </Link>
                )}
                <div className="pt-3 border-t border-white border-opacity-30 flex flex-col gap-3">
                  <span className="text-sm">
                    {user?.name || user?.email || 'User'}
                  </span>
                  <button 
                    onClick={handleLogout}
                    className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition font-semibold text-left"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                {publicLinks.map((link) => (
                  <Link 
                    key={link.href}
                    to={link.href} 
                    className="hover:text-gray-200 transition py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
