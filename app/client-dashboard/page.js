'use client'

import { useState } from 'react'
import { Search, Heart, ShoppingBag, User, Filter, Grid, List, Star, MapPin, Truck, ShieldCheck, Sparkles, Camera, TrendingUp, Award, Users, Zap } from 'lucide-react'

// Import components
import ProductGrid from '@/components/client-ui/ProductGrid'
import Sidebar from '@/components/client-ui/SideBar'
import { WishlistModal, CartModal, NotificationToast } from '@/components/client-ui/Models'

export default function ClientDashboard() {
  // State management
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [wishlist, setWishlist] = useState([])
  const [cart, setCart] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [showWishlistModal, setShowWishlistModal] = useState(false)
  const [showCartModal, setShowCartModal] = useState(false)
  const [notification, setNotification] = useState({ show: false, message: '', type: '' })
  const [activeTab, setActiveTab] = useState('discover')

  // Sample products data - more realistic and diverse
  const [products] = useState([
    {
      id: 1,
      name: "Handwoven Banarasi Silk Saree",
      price: 12500,
      originalPrice: 15000,
      rating: 4.8,
      reviews: 156,
      seller: "Meera Textiles",
      location: "Varanasi, Uttar Pradesh",
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=400&fit=crop",
      category: "sarees",
      discount: 17,
      fastDelivery: true,
      certified: true,
      story: "Woven by 3rd generation artisan family using traditional pit looms"
    },
    {
      id: 2,
      name: "Madhubani Hand Painted Canvas",
      price: 2800,
      originalPrice: 3500,
      rating: 4.9,
      reviews: 89,
      seller: "Priya Art Studio",
      location: "Madhubani, Bihar",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      category: "paintings",
      discount: 20,
      fastDelivery: false,
      certified: true,
      story: "Traditional Mithila art passed down through 5 generations"
    },
    {
      id: 3,
      name: "Pashmina Shawl - Hand Embroidered",
      price: 8900,
      originalPrice: 12000,
      rating: 4.7,
      reviews: 234,
      seller: "Kashmir Handicrafts Co.",
      location: "Srinagar, Kashmir",
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop",
      category: "textiles",
      discount: 26,
      fastDelivery: true,
      certified: true,
      story: "Made from finest Changthangi goat wool, hand-spun and woven"
    },
    {
      id: 4,
      name: "Blue Pottery Tea Set (6 pieces)",
      price: 4200,
      originalPrice: 5000,
      rating: 4.6,
      reviews: 67,
      seller: "Rajasthani Ceramics",
      location: "Jaipur, Rajasthan",
      image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=400&fit=crop",
      category: "pottery",
      discount: 16,
      fastDelivery: true,
      certified: false,
      story: "Lead-free pottery using traditional Jaipur blue glazing technique"
    },
    {
      id: 5,
      name: "Chanderi Cotton Block Print Kurti",
      price: 1800,
      originalPrice: 2200,
      rating: 4.5,
      reviews: 123,
      seller: "Madhya Crafts Collective",
      location: "Chanderi, Madhya Pradesh",
      image: "https://images.unsplash.com/photo-1564257577-b9e8d6cf1d99?w=400&h=400&fit=crop",
      category: "clothing",
      discount: 18,
      fastDelivery: true,
      certified: true,
      story: "Hand-block printed using natural dyes and traditional motifs"
    },
    {
      id: 6,
      name: "Tanjore Gold Leaf Painting - Ganesha",
      price: 15000,
      originalPrice: 18000,
      rating: 4.9,
      reviews: 45,
      seller: "Tamil Heritage Arts",
      location: "Thanjavur, Tamil Nadu",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop",
      category: "paintings",
      discount: 17,
      fastDelivery: false,
      certified: true,
      story: "Classical Tanjore style with 22k gold foil and precious stones"
    },
    {
      id: 7,
      name: "Kanchipuram Silk Saree - Wedding Collection",
      price: 18500,
      originalPrice: 22000,
      rating: 4.8,
      reviews: 92,
      seller: "Kanchi Silk Weavers",
      location: "Kanchipuram, Tamil Nadu",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop",
      category: "sarees",
      discount: 16,
      fastDelivery: true,
      certified: true,
      story: "Pure mulberry silk with silver zari work, temple motifs"
    },
    {
      id: 8,
      name: "Warli Art Wooden Wall Panel",
      price: 3200,
      originalPrice: 4000,
      rating: 4.6,
      reviews: 78,
      seller: "Tribal Arts Collective",
      location: "Dahanu, Maharashtra",
      image: "https://images.unsplash.com/photo-1536924430914-91f9e2041d83?w=400&h=400&fit=crop",
      category: "paintings",
      discount: 20,
      fastDelivery: true,
      certified: true,
      story: "Traditional Warli tribal art on reclaimed teak wood"
    }
  ])

  const categories = [
    { id: 'all', name: 'All Crafts', icon: '🎨' },
    { id: 'sarees', name: 'Sarees', icon: '🥻' },
    { id: 'paintings', name: 'Art & Paintings', icon: '🖼️' },
    { id: 'textiles', name: 'Textiles', icon: '🧵' },
    { id: 'pottery', name: 'Pottery & Ceramics', icon: '🏺' },
    { id: 'clothing', name: 'Clothing', icon: '👗' },
    { id: 'jewelry', name: 'Jewelry', icon: '💎' }
  ]

  // Utility functions
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const newWishlist = prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
      
      const product = products.find(p => p.id === productId)
      if (newWishlist.includes(productId)) {
        showNotification(`Added ${product.name} to wishlist!`, 'success')
      } else {
        showNotification(`Removed ${product.name} from wishlist`, 'info')
      }
      
      return newWishlist
    })
  }

  const addToCart = (product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id)
      let newCart
      
      if (existingItem) {
        newCart = prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        newCart = [...prev, { ...product, quantity: 1 }]
      }
      
      showNotification(`Added ${product.name} to cart!`, 'success')
      return newCart
    })
  }

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type })
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' })
    }, 3000)
  }

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId)
      return
    }
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ))
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    return matchesCategory && matchesSearch && matchesPrice
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
        
        .glass-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #ec4899, #be185d, #7c2d12);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .floating-animation {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      {/* Simplified Header - No fake AI tab */}
      <header className="glass-card sticky top-0 z-50 border-b border-pink-100 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl floating-animation">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold gradient-text" style={{ fontFamily: 'Playfair Display' }}>
                    ArtisanHub
                  </h1>
                  <p className="text-gray-600 text-sm">Authentic Indian Handicrafts</p>
                </div>
              </div>

              {/* Enhanced Search Bar */}
              <div className="hidden lg:flex relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search crafts, artisans, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-80 pl-12 pr-4 py-3 bg-white/70 border border-pink-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent backdrop-blur-sm"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="p-3 bg-white/70 hover:bg-white/90 rounded-2xl transition-all border border-pink-200"
              >
                <Filter className="h-5 w-5 text-gray-700" />
              </button>
              
              <div className="relative">
                <button 
                  onClick={() => setShowWishlistModal(true)}
                  className="p-3 bg-white/70 hover:bg-white/90 rounded-2xl transition-all border border-pink-200 relative"
                >
                  <Heart className="h-5 w-5 text-gray-700" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {wishlist.length}
                    </span>
                  )}
                </button>
              </div>
              
              <div className="relative">
                <button 
                  onClick={() => setShowCartModal(true)}
                  className="p-3 bg-white/70 hover:bg-white/90 rounded-2xl transition-all border border-pink-200 relative"
                >
                  <ShoppingBag className="h-5 w-5 text-gray-700" />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {cart.length}
                    </span>
                  )}
                </button>
              </div>
              
              <button className="p-3 bg-white/70 hover:bg-white/90 rounded-2xl transition-all border border-pink-200">
                <User className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Smart Recommendations Section */}
        <div className="mb-8">
          <div className="glass-card rounded-3xl p-8 shadow-xl border border-pink-100 bg-gradient-to-r from-pink-50 to-purple-50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold gradient-text mb-2" style={{ fontFamily: 'Playfair Display' }}>
                  Trending Crafts This Week
                </h2>
                <p className="text-gray-600">Popular picks from our artisan community</p>
              </div>
              <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span>15% more interest</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span>2.3K+ views today</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">2,847</div>
                <div className="text-xs text-gray-600 uppercase tracking-wide">Active Artisans</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">18,432</div>
                <div className="text-xs text-gray-600 uppercase tracking-wide">Authentic Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">28</div>
                <div className="text-xs text-gray-600 uppercase tracking-wide">States Covered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">4.8★</div>
                <div className="text-xs text-gray-600 uppercase tracking-wide">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar 
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              showFilters={showFilters}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Enhanced Hero Section */}
            <div className="glass-card rounded-3xl p-8 mb-8 shadow-xl border border-pink-100 bg-gradient-to-r from-pink-50 to-purple-50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold gradient-text mb-2" style={{ fontFamily: 'Playfair Display' }}>
                    Discover Authentic Indian Crafts
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Direct from master artisans across India - every piece tells a story
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <ShieldCheck className="h-4 w-4 text-green-600" />
                      <span>Authenticity Guaranteed</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Truck className="h-4 w-4 text-blue-600" />
                      <span>Direct from Artisans</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award className="h-4 w-4 text-purple-600" />
                      <span>Fair Trade Certified</span>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="text-6xl floating-animation">🏺</div>
                </div>
              </div>
            </div>

            {/* Enhanced Product Grid */}
            <ProductGrid 
              products={products}
              filteredProducts={filteredProducts}
              viewMode={viewMode}
              setViewMode={setViewMode}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              addToCart={addToCart}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <WishlistModal 
        showWishlistModal={showWishlistModal}
        setShowWishlistModal={setShowWishlistModal}
        wishlist={wishlist}
        products={products}
        addToCart={addToCart}
        toggleWishlist={toggleWishlist}
      />

      <CartModal 
        showCartModal={showCartModal}
        setShowCartModal={setShowCartModal}
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        getTotalPrice={getTotalPrice}
      />

      <NotificationToast notification={notification} />
    </div>
  )
}