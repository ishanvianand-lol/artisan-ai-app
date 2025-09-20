'use client'

import { useRouter } from 'next/navigation'

export default function RoleModal({ user, onClose }) {
  const router = useRouter()

  const handleRoleSelection = (role) => {
    // Save user role to localStorage or database
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
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform animate-scale-up">
        <div className="text-center mb-8">
          <img 
            src={user?.photoURL} 
            alt={user?.displayName}
            className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-orange-200"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome, {user?.displayName}!
          </h2>
          <p className="text-gray-600">How would you like to use ArtisanAI?</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleRoleSelection('seller')}
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-6 rounded-2xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-4"
          >
            <div className="text-3xl">🛍️</div>
            <div className="text-left">
              <div className="text-lg">I'm a Seller</div>
              <div className="text-sm opacity-90">Showcase my crafts and reach customers</div>
            </div>
          </button>

          <button
            onClick={() => handleRoleSelection('buyer')}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-2xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-4"
          >
            <div className="text-3xl">🛒</div>
            <div className="text-left">
              <div className="text-lg">I'm a Buyer</div>
              <div className="text-sm opacity-90">Discover authentic handmade products</div>
            </div>
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full text-gray-500 hover:text-gray-700 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
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