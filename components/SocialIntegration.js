'use client'

import { useState } from 'react'

export default function SocialIntegration() {
  const [whatsappNumber, setWhatsappNumber] = useState('')
  const [instagramHandle, setInstagramHandle] = useState('')
  const [isConnected, setIsConnected] = useState({
    whatsapp: false,
    instagram: false
  })

  const handleWhatsAppConnect = () => {
    if (whatsappNumber) {
      setIsConnected(prev => ({ ...prev, whatsapp: true }))
      // Save to localStorage
      localStorage.setItem('whatsappNumber', whatsappNumber)
    }
  }

  const handleInstagramConnect = () => {
    if (instagramHandle) {
      setIsConnected(prev => ({ ...prev, instagram: true }))
      // Save to localStorage
      localStorage.setItem('instagramHandle', instagramHandle)
    }
  }

  const generateWhatsAppLink = () => {
    if (whatsappNumber) {
      return `https://wa.me/${whatsappNumber.replace(/\D/g, '')}`
    }
    return '#'
  }

  const generateInstagramLink = () => {
    if (instagramHandle) {
      return `https://instagram.com/${instagramHandle.replace('@', '')}`
    }
    return '#'
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-800 flex items-center gap-2">
        <span className="text-lg">🔗</span>
        Social Integration
      </h3>

      {/* WhatsApp Integration */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">📱</span>
          <span className="font-medium text-green-800">WhatsApp Business</span>
        </div>
        
        {!isConnected.whatsapp ? (
          <div className="space-y-3">
            <input
              type="tel"
              placeholder="+91 9876543210"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              className="w-full px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            />
            <button
              onClick={handleWhatsAppConnect}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
            >
              Connect WhatsApp
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-green-700 text-sm">✅ Connected: {whatsappNumber}</p>
            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white py-1 px-3 rounded-lg text-xs hover:bg-green-700 transition-colors"
            >
              Open WhatsApp
            </a>
          </div>
        )}
      </div>

      {/* Instagram Integration */}
      <div className="bg-pink-50 border border-pink-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">📸</span>
          <span className="font-medium text-pink-800">Instagram</span>
        </div>
        
        {!isConnected.instagram ? (
          <div className="space-y-3">
            <input
              type="text"
              placeholder="@your_instagram_handle"
              value={instagramHandle}
              onChange={(e) => setInstagramHandle(e.target.value)}
              className="w-full px-3 py-2 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
            />
            <button
              onClick={handleInstagramConnect}
              className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-pink-700 transition-colors"
            >
              Connect Instagram
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-pink-700 text-sm">✅ Connected: {instagramHandle}</p>
            <a
              href={generateInstagramLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-pink-600 text-white py-1 px-3 rounded-lg text-xs hover:bg-pink-700 transition-colors"
            >
              Open Instagram
            </a>
          </div>
        )}
      </div>

      {/* Quick Share Options */}
      {(isConnected.whatsapp || isConnected.instagram) && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h4 className="font-medium text-blue-800 mb-3 flex items-center gap-2">
            <span className="text-lg">🚀</span>
            Quick Share
          </h4>
          <div className="space-y-2">
            {isConnected.whatsapp && (
              <button 
                onClick={() => {
                  const message = "Check out my handcrafted products on Kalakari! 🎨✨"
                  window.open(`${generateWhatsAppLink()}?text=${encodeURIComponent(message)}`, '_blank')
                }}
                className="w-full bg-green-100 hover:bg-green-200 text-green-800 py-2 px-4 rounded-lg text-sm transition-colors"
              >
                📱 Share via WhatsApp Status
              </button>
            )}
            {isConnected.instagram && (
              <button 
                onClick={() => {
                  window.open(generateInstagramLink(), '_blank')
                }}
                className="w-full bg-pink-100 hover:bg-pink-200 text-pink-800 py-2 px-4 rounded-lg text-sm transition-colors"
              >
                📸 Post on Instagram Story
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}