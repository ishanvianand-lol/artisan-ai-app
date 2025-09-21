'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../lib/firebase'

export default function HomePage() {
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
      setLoading(false)
      if (user) {
        const userRole = localStorage.getItem('userRole')
        if (userRole) {
          if (userRole === 'seller') router.push('/seller-dashboard')
          else router.push('/client-dashboard')
        } else {
          setShowRoleModal(true)
        }
      }
    })
    return () => unsubscribe()
  }, [router])

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({ prompt: 'select_account' })
    try {
      const result = await signInWithPopup(auth, provider)
      setUser(result.user)
      setShowRoleModal(true)
    } catch (error) {
      let errorMessage = 'Login failed. Please try again.'
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Login was cancelled. Please try again.'; break
        case 'auth/popup-blocked':
          errorMessage = 'Please allow popups and try again.'; break
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Check your connection.'; break
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
    if (role === 'seller') router.push('/seller-dashboard')
    else router.push('/client-dashboard')
    setShowRoleModal(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9f5ed] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#d3c7a2] border-t-[#9e5b2a] rounded-full animate-spin mx-auto"></div>
          <p className="text-base text-[#7a6851] mt-4 font-semibold font-serif">Loading Kalakari...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f9f5ed] flex flex-col font-serif">
      {/* NAVBAR */}
      <nav className="px-10 py-6 flex justify-between items-center sticky top-0 z-30 bg-[#fdfaf4]/90 backdrop-blur-md shadow-sm border-b border-[#e6dcc9]">
        <span className="text-3xl font-extrabold tracking-wide text-[#5c4033]">Kalakari</span>
        {!user ? (
          <button
            onClick={handleGoogleLogin}
            className="px-6 py-2 bg-[#9e5b2a] hover:bg-[#7a4320] text-[#fdf7ef] rounded-full font-semibold transition transform hover:scale-105"
          >
            Login
          </button>
        ) : (
          <div className="flex items-center gap-3 text-[#6e593b]">
            <span className="font-medium">{user.displayName?.split(' ')[0]}</span>
            <Image src={user.photoURL} alt={user.displayName} className="rounded-full border-2 border-[#cbb48d]" width={40} height={40} />
          </div>
        )}
      </nav>

      {/* HERO */}
      <main className="relative flex-1 flex flex-col md:flex-row items-center px-10 md:px-20 py-20 gap-10 overflow-hidden bg-[#fdf8ef]">
        {/* Decorative background shapes */}
        <div className="absolute top-10 left-1/6 w-40 h-40 bg-[#f1e6d2] rounded-full opacity-40 -z-10 animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-[#e5d5b5] rounded-full opacity-30 -z-10 rotate-12 animate-fadeInSlow"></div>
        <div className="absolute top-1/3 right-0 w-32 h-32 bg-[#dcd1b5] rounded-full opacity-25 -z-10 translate-y-6 animate-bounce-slow"></div>
        <div className="absolute bottom-10 left-0 w-24 h-24 bg-[#f3e2c8] rounded-full opacity-20 -z-10 rotate-6 animate-fadeIn"></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-[#e8d8b0] rounded-full opacity-15 -z-10 animate-spin-slow"></div>

        {/* Left block */}
        <div className="flex-1 space-y-6 animate-fadeIn text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold leading-snug text-[#4a3a2c]">
            Discover <br /> <span className="italic text-[#9e5b2a]">Handmade Elegance</span>
          </h1>
          <p className="text-base md:text-lg text-[#6d5c47] max-w-md mx-auto md:mx-0 font-sans">
            Authentic artisan creations — minimal, warm and timeless. Curated for your unique space.
          </p>
          {!user && (
            <button
              onClick={handleGoogleLogin}
              className="px-10 py-3 bg-[#9e5b2a] hover:bg-[#7a4320] text-white rounded-full font-semibold shadow-md transition transform hover:scale-105 hover:-translate-y-1"
            >
              Continue with Google
            </button>
          )}
        </div>

        {/* Right visual */}
        <div className="flex-1 flex justify-center md:justify-end items-center animate-fadeInUp relative">
          <div className="w-64 h-64 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-[#f1e6d2] to-[#e5d5b5] shadow-inner flex items-center justify-center border border-[#d0c1a3]">
            <span className="text-6xl md:text-7xl">🏺</span>
          </div>
        </div>
      </main>

      {/* ROLE MODAL */}
      {showRoleModal && user && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-[#f9f5ed] rounded-3xl shadow-xl p-8 max-w-sm w-full border border-[#d0c1a3] flex flex-col items-center text-center animate-fadeInUp">
            <Image src={user.photoURL} alt={user.displayName} className="rounded-full border-4 border-[#cbb48d] mb-4" width={72} height={72} />
            <h3 className="text-2xl font-semibold text-[#4a3a2c] mb-2 select-text">Welcome, {user.displayName?.split(' ')[0]}!</h3>
            <p className="mb-6 text-[#6d5c47] font-sans">How will you use Kalakari?</p>
            <div className="flex flex-col gap-4 w-full">
              <button
                onClick={() => handleRoleSelection('seller')}
                className="bg-[#e8dcc6] border border-[#cbb48d] text-[#4a3a2c] rounded-2xl py-3 font-semibold hover:bg-[#d6c9ad] transition transform hover:scale-105"
              >
                🎨 I&apos;m an Artisan
              </button>
              <button
                onClick={() => handleRoleSelection('buyer')}
                className="bg-[#d3ceac] border border-[#bbac83] text-[#5a4f2c] rounded-2xl py-3 font-semibold hover:bg-[#bfb681] transition transform hover:scale-105"
              >
                🛍️ I&apos;m a Buyer
              </button>
            </div>
            <button onClick={() => setShowRoleModal(false)} className="mt-6 text-sm text-[#9c8b62] hover:underline font-sans">
              Skip For Now
            </button>
          </div>
        </div>
      )}

      {/* Tailwind animations */}
      <style jsx>{`
        @keyframes fadeInSlow { 0% { opacity: 0; } 100% { opacity: 1; } }
        .animate-fadeInSlow { animation: fadeInSlow 3s ease-in forwards; }

        @keyframes pulse-slow { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }

        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .animate-bounce-slow { animation: bounce-slow 5s ease-in-out infinite; }

        @keyframes spin-slow { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
      `}</style>
    </div>
  )
}
