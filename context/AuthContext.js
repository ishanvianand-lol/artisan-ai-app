'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut 
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '../lib/firebase'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState(null)

  // Google Sign In
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      return result
    } catch (error) {
      console.error('Error signing in with Google:', error)
      throw error
    }
  }

  // Sign Out
  const logout = async () => {
    try {
      await signOut(auth)
      setUser(null)
      setUserRole(null)
      localStorage.removeItem('userData')
      localStorage.removeItem('userRole')
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  // Save user role to Firestore
  const saveUserRole = async (userId, role, userData) => {
    try {
      await setDoc(doc(db, 'users', userId), {
        ...userData,
        role: role,
        createdAt: new Date(),
        lastLogin: new Date()
      }, { merge: true })
      
      setUserRole(role)
      localStorage.setItem('userRole', role)
      localStorage.setItem('userData', JSON.stringify(userData))
    } catch (error) {
      console.error('Error saving user role:', error)
      throw error
    }
  }

  // Get user role from Firestore
  const getUserRole = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId))
      if (userDoc.exists()) {
        const userData = userDoc.data()
        setUserRole(userData.role)
        localStorage.setItem('userRole', userData.role)
        return userData.role
      }
      return null
    } catch (error) {
      console.error('Error getting user role:', error)
      return null
    }
  }

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user)
        
        // Check if user role exists in Firestore
        const role = await getUserRole(user.uid)
        if (!role) {
          // New user, role not set yet
          setUserRole(null)
        }
      } else {
        setUser(null)
        setUserRole(null)
        localStorage.removeItem('userData')
        localStorage.removeItem('userRole')
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const value = {
    user,
    userRole,
    loading,
    signInWithGoogle,
    logout,
    saveUserRole,
    getUserRole
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}