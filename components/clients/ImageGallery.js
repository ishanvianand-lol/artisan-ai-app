'use client'

import { useState } from 'react'
import { Download, Heart, Share2, Maximize2, X, Copy, Star } from 'lucide-react'

export default function ImageGallery({ images, onImageSelect }) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [favorites, setFavorites] = useState([])

  const toggleFavorite = (imageId) => {
    setFavorites(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    )
  }

  const downloadImage = async (imageUrl, fileName) => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = fileName || 'artisan-ai-image.jpg'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  const shareImage = async (image) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this AI generated design!',
          text: `Amazing ${image.style} design: ${image.prompt}`,
          url: image.image
        })
      } catch (error) {
        console.log('Share cancelled')
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(image.image)
      alert('Image URL copied to clipboard!')
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((image) => (
          <div key={image.id} className="group relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 shadow-lg group-hover:shadow-2xl transition-all duration-300">
              <img
                src={image.image}
                alt={image.prompt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => setSelectedImage(image)}
                loading="lazy"
              />
              
              {/* Overlay with actions */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 w-full">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                      {image.style}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(image.id)
                        }}
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            favorites.includes(image.id) 
                              ? 'fill-red-500 text-red-500' 
                              : 'text-white'
                          }`}
                        />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          shareImage(image)
                        }}
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
                      >
                        <Share2 className="h-4 w-4 text-white" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          downloadImage(image.image, `artisan-${image.id}.jpg`)
                        }}
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
                      >
                        <Download className="h-4 w-4 text-white" />
                      </button>
                    </div>
                  </div>
                  <p className="text-white text-sm line-clamp-2 font-medium">
                    {image.prompt}
                  </p>
                </div>
              </div>

              {/* AI Badge */}
              <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                ✨ AI
              </div>

              {/* Favorite badge */}
              {favorites.includes(image.id) && (
                <div className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full shadow-lg">
                  <Heart className="h-4 w-4 fill-current" />
                </div>
              )}
            </div>

            {/* Image info */}
            <div className="mt-3">
              <p className="text-sm text-gray-600 line-clamp-2 font-medium">
                {image.prompt}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500">{image.timestamp}</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span className="text-xs text-gray-600">4.8</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Screen Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-xl font-bold text-gray-800">AI Generated Design</h3>
                <p className="text-gray-600">{selectedImage.timestamp}</p>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-all"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            {/* Image */}
            <div className="relative">
              <img
                src={selectedImage.image}
                alt={selectedImage.prompt}
                className="w-full max-h-[60vh] object-contain"
              />
            </div>

            {/* Details */}
            <div className="p-6">
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">Prompt</h4>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-2xl">
                  {selectedImage.prompt}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    {selectedImage.style}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">4.8 Rating</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleFavorite(selectedImage.id)}
                    className={`p-3 rounded-full border-2 transition-all ${
                      favorites.includes(selectedImage.id)
                        ? 'border-red-500 bg-red-50 text-red-500'
                        : 'border-gray-200 hover:border-red-300 text-gray-600'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${favorites.includes(selectedImage.id) ? 'fill-current' : ''}`} />
                  </button>
                  
                  <button
                    onClick={() => shareImage(selectedImage)}
                    className="p-3 border-2 border-gray-200 hover:border-blue-300 text-gray-600 hover:text-blue-600 rounded-full transition-all"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                  
                  <button
                    onClick={() => downloadImage(selectedImage.image, `artisan-${selectedImage.id}.jpg`)}
                    className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all flex items-center space-x-2"
                  >
                    <Download className="h-5 w-5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}