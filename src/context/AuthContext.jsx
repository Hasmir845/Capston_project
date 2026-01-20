import { useEffect, useMemo, useState } from 'react';
import { AuthContext } from './authContextDefinition';

const STORAGE_KEY = 'user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = (userInput) => {
    // userInput: { email, role, name? }
    const normalized = {
      email: userInput?.email || '',
      role: userInput?.role || '',
      name: userInput?.name || 'User'
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    setUser(normalized);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
