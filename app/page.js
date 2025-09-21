'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../lib/firebase';

export default function HomePage() {
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Simple auth state listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
      setLoading(false)
      
      if (user) {
        // Check if user has selected role
        const userRole = localStorage.getItem('userRole')
        if (userRole) {
          if (userRole === 'seller') {
            router.push('/seller-dashboard')
          } else {
            router.push('/client-dashboard')
          }
        } else {
          setShowRoleModal(true)
        }
      }
    })

    return () => unsubscribe()
  }, [router])

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({
      prompt: 'select_account'
    })

    try {
      console.log('🚀 Attempting login...')
      const result = await signInWithPopup(auth, provider)
      console.log('✅ Login successful:', result.user.displayName)
      setUser(result.user)
      setShowRoleModal(true)
    } catch (error) {
      console.error('❌ Login error:', error.code, error.message)
      
      let errorMessage = 'Login failed. Please try again.'
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Login was cancelled. Please try again.'
          break
        case 'auth/popup-blocked':
          errorMessage = 'Please allow popups and try again.'
          break
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Check your connection.'
          break
      }
      alert(errorMessage)
    }
  }

  const handleRoleSelection = (role) => {
    localStorage.setItem('userRole', role)
    localStorage.setItem('userData', JSON.stringify({
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      uid: user.uid
    }))

    if (role === 'seller') {
      router.push('/seller-dashboard')
    } else {
      router.push('/client-dashboard')
    }
    setShowRoleModal(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
          <p className="text-lg text-gray-700 mt-4 font-medium">Loading ArtisanAI...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-orange-300 to-red-300 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg z-50 border-b border-orange-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                ArtisanAI
              </h1>
            </div>

            {!user ? (
              <button 
                onClick={handleGoogleLogin}
                className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Login with Google</span>
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">
                  Welcome, {user.displayName?.split(' ')[0]}!
                </span>
                <Image 
                  src={user.photoURL} 
                  alt={user.displayName}
                  className="w-10 h-10 rounded-full border-2 border-orange-200"
                />
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            🇮🇳 Celebrating Indian Heritage
          </div>
          
          <h1 className="text-6xl lg:text-7xl font-bold leading-tight mb-8 text-gray-900">
            Reviving
            <br />
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Traditional
            </span>
            <br />
            Craftsmanship
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto">
            Empowering local artisans with AI-driven storytelling and digital marketplace tools 
            to connect authentic Indian crafts with global audiences.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {!user && (
              <button 
                onClick={handleGoogleLogin}
                className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Start Your Journey 🚀
              </button>
            )}
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-2xl font-semibold text-lg hover:border-orange-600 hover:text-orange-600 transition-all duration-300">
              Watch Demo
            </button>
          </div>

          <div className="flex justify-center items-center space-x-12 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900">500+</div>
              <div className="text-gray-600">Active Artisans</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">2,000+</div>
              <div className="text-gray-600">Products Listed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">15+</div>
              <div className="text-gray-600">States Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Selection Modal */}
      {showRoleModal && user && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 max-w-lg w-full shadow-2xl border border-orange-100">
            <div className="text-center mb-10">
              <Image 
                src={user.photoURL} 
                alt={user.displayName}
                className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-orange-200 shadow-lg"
              />
              
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Welcome, {user.displayName?.split(' ')[0]}!
              </h2>
              <p className="text-gray-600 text-lg">
                How would you like to experience ArtisanAI?
              </p>
            </div>

            <div className="space-y-6">
              <button
                onClick={() => handleRoleSelection('seller')}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-2xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center space-x-5"
              >
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">🎨</span>
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold">I'm an Artisan</div>
                  <div className="text-sm opacity-90">Showcase my crafts and reach customers</div>
                </div>
              </button>

              <button
                onClick={() => handleRoleSelection('buyer')}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-2xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center space-x-5"
              >
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">🛍️</span>
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold">I'm a Buyer</div>
                  <div className="text-sm opacity-90">Discover authentic handmade treasures</div>
                </div>
              </button>
            </div>

            <button
              onClick={() => setShowRoleModal(false)}
              className="mt-8 w-full text-gray-500 hover:text-gray-700 transition-colors font-medium"
            >
              I'll decide later
            </button>
          </div>
        </div>
      )}
    </div>
  )
}