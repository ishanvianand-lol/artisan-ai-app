'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'

export default function HomePage() {
  const [showRoleModal, setShowRoleModal] = useState(false)
  const { user, userRole, signInWithGoogle, loading } = useAuth()
  const router = useRouter()

  // Check if user is already logged in and has a role
  useEffect(() => {
    if (user && userRole) {
      // Redirect to appropriate dashboard
      if (userRole === 'seller') {
        router.push('/seller-dashboard')
      } else if (userRole === 'buyer') {
        router.push('/client-dashboard')
      }
    } else if (user && !userRole) {
      // User is logged in but hasn't selected role yet
      setShowRoleModal(true)
    }
  }, [user, userRole, router])

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle()
      if (result) {
        setShowRoleModal(true)
      }
    } catch (error) {
      console.error('Login failed:', error)
      alert('Login failed. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-500 via-yellow-500 to-green-500 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Loading ArtisanAI...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-yellow-500 to-green-500 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-1/3 w-12 h-12 bg-white rounded-full animate-ping"></div>
        <div className="absolute top-1/2 left-20 w-8 h-8 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 right-1/4 w-14 h-14 bg-white rounded-full animate-bounce delay-500"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full bg-black/20 backdrop-blur-lg z-50 border-b border-white/10">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
            ArtisanAI
          </h1>
          
          {!user ? (
            <button 
              onClick={handleGoogleLogin}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Login with Google
            </button>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-white/90">Welcome, {user.displayName}!</span>
              <img 
                src={user.photoURL} 
                alt={user.displayName}
                className="w-10 h-10 rounded-full border-2 border-white/20"
              />
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
        <div className="container mx-auto px-6 text-center text-white">
          <h2 className="text-6xl font-bold mb-6 leading-tight">
            Empowering Indian
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Craftspeople
            </span>
          </h2>
          
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Connect traditional artisans with digital audiences using AI-powered storytelling, 
            marketing tools, and seamless marketplace integration.
          </p>

          {!user && (
            <div className="mb-12">
              <button 
                onClick={handleGoogleLogin}
                className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Get Started - It's Free! 🚀
              </button>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold mb-2">AI Story Generation</h3>
              <p className="opacity-80">Transform your craft into compelling stories that resonate with modern buyers</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">Social Integration</h3>
              <p className="opacity-80">Connect WhatsApp & Instagram for seamless customer communication</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2">Digital Marketplace</h3>
              <p className="opacity-80">Expand your reach beyond local markets to global audiences</p>
            </div>
          </div>

          {/* Features Preview */}
          <div className="mt-20 bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-semibold mb-8">Why Choose ArtisanAI?</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-3">🤖</div>
                <h4 className="font-semibold mb-2">AI-Powered Marketing</h4>
                <p className="text-sm opacity-80">Generate compelling product descriptions and stories</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">🌍</div>
                <h4 className="font-semibold mb-2">Global Reach</h4>
                <p className="text-sm opacity-80">Connect with customers worldwide</p>
              </div>
              <div className="text-3xl mb-3">💰</div>
                <h4 className="font-semibold mb-2">Fair Pricing</h4>
                <p className="text-sm opacity-80">Keep more of what you earn</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">📊</div>
                <h4 className="font-semibold mb-2">Analytics</h4>
                <p className="text-sm opacity-80">Track your performance and growth</p>
              </div>
            </div>
          </div>
        </div>
  )
}