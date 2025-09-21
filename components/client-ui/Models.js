import { X, Heart, ShoppingBag, Download, Share2, Star, Maximize2 } from 'lucide-react'

// Wishlist Modal Component
export function WishlistModal({ 
  showWishlistModal, 
  setShowWishlistModal, 
  wishlist, 
  products, 
  addToCart, 
  toggleWishlist 
}) {
  if (!showWishlistModal) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold gradient-text">My Wishlist</h3>
          <button 
            onClick={() => setShowWishlistModal(false)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-all"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {wishlist.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Your wishlist is empty</p>
            <p className="text-gray-500 text-sm">Add items you love to see them here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {products.filter(p => wishlist.includes(p.id)).map(product => (
              <div key={product.id} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl border border-pink-200">
                <Image src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-xl" />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{product.name}</h4>
                  <p className="text-pink-600 font-bold">₹{product.price.toLocaleString()}</p>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-xl text-sm hover:shadow-lg transition-all"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="p-2 hover:bg-red-100 rounded-xl text-red-500 transition-all"
                >
                  <Heart className="h-5 w-5 fill-current" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Cart Modal Component
export function CartModal({ 
  showCartModal, 
  setShowCartModal, 
  cart, 
  removeFromCart, 
  updateQuantity, 
  getTotalPrice 
}) {
  if (!showCartModal) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold gradient-text">Shopping Cart</h3>
          <button 
            onClick={() => setShowCartModal(false)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-all"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Your cart is empty</p>
            <p className="text-gray-500 text-sm">Add some amazing crafts to get started</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl border border-pink-200">
                  <Image src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{item.name}</h4>
                    <p className="text-pink-600 font-bold">₹{item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 font-bold"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-pink-500 hover:bg-pink-600 flex items-center justify-center text-white font-bold"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 hover:bg-red-100 rounded-xl text-red-500 transition-all"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="border-t border-pink-200 pt-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-gray-800">Total:</span>
                <span className="text-2xl font-bold text-pink-600">₹{getTotalPrice().toLocaleString()}</span>
              </div>
              <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Full Screen Image Modal Component
export function ImageModal({ 
  selectedImage, 
  setSelectedImage, 
  favorites, 
  toggleFavorite, 
  shareImage, 
  downloadImage 
}) {
  if (!selectedImage) return null

  return (
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
          <Image
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
                <span className="text-sm text-gray-600">AI Generated</span>
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
  )
}

// Notification Component
export function NotificationToast({ notification }) {
  if (!notification.show) return null

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`glass-card p-4 rounded-2xl shadow-xl border-l-4 animate-slide-in ${
        notification.type === 'success' ? 'border-green-500 bg-green-50' : 
        notification.type === 'error' ? 'border-red-500 bg-red-50' : 
        'border-blue-500 bg-blue-50'
      } transform transition-all duration-300`}>
        <p className="text-sm font-medium text-gray-800">{notification.message}</p>
      </div>
    </div>
  )
}