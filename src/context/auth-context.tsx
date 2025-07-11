// src/context/auth-context.tsx
import React, { createContext, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

type User = { name: string, email: string, token: string}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const cookieUser = Cookies.get('user')
    if (cookieUser) {
      setUser(JSON.parse(cookieUser))
    }
  }, [])

  const login = (user: User) => {
    setUser(user)
    Cookies.set('user', JSON.stringify(user), { expires: 1 }) // 1 day expiry
  }

  const logout = () => {
    setUser(null)
    Cookies.remove('user')
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
