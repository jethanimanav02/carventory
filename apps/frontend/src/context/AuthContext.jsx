import { createContext, useContext, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const AuthContext = createContext(null)
export const DEMO_ADMIN_EMAIL = 'admin@carventory.local'
export const DEMO_ADMIN_PASSWORD = 'carventory-demo'

export function AuthProvider({ children }) {
  const [session, setSession] = useLocalStorage('carventory-admin-session', null)
  const isAuthenticated = session === true || Boolean(session?.authenticated)
  const user = isAuthenticated ? (session?.user || { email: DEMO_ADMIN_EMAIL, role: 'ADMIN', name: 'Arjun' }) : null

  const value = useMemo(() => ({
    isAuthenticated,
    user,
    login: (email, password) => {
      if (email.trim().toLowerCase() !== DEMO_ADMIN_EMAIL || password !== DEMO_ADMIN_PASSWORD) return false
      setSession({ authenticated: true, user: { email: DEMO_ADMIN_EMAIL, role: 'ADMIN', name: 'Arjun' } })
      return true
    },
    logout: () => setSession(null),
  }), [isAuthenticated, user, setSession])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside an AuthProvider.')
  return context
}
