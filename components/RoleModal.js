'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import Image from 'next/image';

export default function RoleModal({ user, onClose }) {
  const router = useRouter()
  const { saveUserRole } = useAuth()

  const handleRoleSelection = async (role) => {
    try {
      const userData = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        uid: user.uid
      }

      await saveUserRole(user.uid, role, userData)

      if (role === 'seller') {
        router.push('/seller-dashboard')
      } else {
        router.push('/client-dashboard')
      }
      onClose()
    } catch (error) {
      console.error('Error saving user role:', error)
      alert('Failed to save user role. Please try again.')
    }
  }

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&display=swap');
        
        .modal-backdrop {
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(20px);
        }
        
        .modal-content {
          background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,248,240,0.95) 100%);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,165,0,0.2);
        }
        
        .role-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,248,240,0.8) 100%);
          border: 2px solid transparent;
          background-clip: padding-box;
          position: relative;
        }
        
        .role-card::before {
          content: '';
          position: absolute;
          inset: 0;
          padding: 2px;
          background: linear-gradient(135deg, #f97316, #ea580c, #dc2626);
          border-radius: inherit;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s;
        }
        
        .role-card:hover::before {
          opacity: 1;
        }
        
        .seller-gradient {
          background: linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%);
        }
        
        .buyer-gradient {
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #a855f7 100%);
        }
      `}</style>
      
      <div className="fixed inset-0 modal-backdrop z-50 flex items-center justify-center p-4">
        <div className="modal-content rounded-3xl p-10 max-w-lg w-full shadow-2xl transform animate-scale-up">
          <div className="text-center mb-10">
            <div className="relative mb-6">
              <Image 
                src={user?.photoURL} 
                alt={user?.displayName}
                className="w-24 h-24 rounded-full mx-auto border-4 border-orange-200 shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-3" style={{ fontFamily: 'Playfair Display' }}>
              Welcome, {user?.displayName?.split(' ')[0]}!
            </h2>
            <p className="text-gray-600 text-lg">
              How would you like to experience <span className="font-semibold text-orange-600">ArtisanAI</span>?
            </p>
          </div>

          <div className="space-y-6">
            <div
              onClick={() => handleRoleSelection('seller')}
              className="role-card p-6 rounded-2xl cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-orange-100"
            >
              <div className="flex items-center space-x-5">
                <div className="seller-gradient w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl">🎨</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-1" style={{ fontFamily: 'Playfair Display' }}>
                    I'm an Artisan
                  </h3>
                  <p className="text-gray-600">
                    Showcase my crafts, tell my story, and reach global customers
                  </p>
                  <div className="mt-2 flex items-center space-x-2 text-sm text-orange-600">
                    <span>✓ AI Story Generation</span>
                    <span>•</span>
                    <span>✓ Social Integration</span>
                  </div>
                </div>
                <div className="text-orange-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>

            <div
              onClick={() => handleRoleSelection('buyer')}
              className="role-card p-6 rounded-2xl cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-blue-100"
            >
              <div className="flex items-center space-x-5">
                <div className="buyer-gradient w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl">🛍️</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-1" style={{ fontFamily: 'Playfair Display' }}>
                    I'm a Buyer
                  </h3>
                  <p className="text-gray-600">
                    Discover authentic handmade treasures and support artisans
                  </p>
                  <div className="mt-2 flex items-center space-x-2 text-sm text-blue-600">
                    <span>✓ AI Recommendations</span>
                    <span>•</span>
                    <span>✓ Authentic Products</span>
                  </div>
                </div>
                <div className="text-blue-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors font-medium"
            >
              I'll decide later
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

// Add this CSS to your globals.css
/*
@keyframes scale-up {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-up {
  animation: scale-up 0.3s ease-out;
}
*/