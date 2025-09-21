import { Search, Heart, ShoppingBag, User, Filter } from 'lucide-react'

export default function HeaderClient({ 
  activeTab, 
  setActiveTab, 
  searchQuery, 
  setSearchQuery, 
  showFilters, 
  setShowFilters, 
  wishlist, 
  cart, 
  setShowWishlistModal, 
  setShowCartModal 
}) {
  return (
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
                  ArtisanAI
                </h1>
                <p className="text-gray-600 text-sm">Discover & Create Authentic Crafts</p>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="hidden md:flex bg-white/70 rounded-2xl p-1 border border-pink-200">
              <button
                onClick={() => setActiveTab('discover')}
                className={`px-6 py-2 rounded-xl font-medium transition-all ${
                  activeTab === 'discover'
                    ? 'bg-pink-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                🛍 Discover
              </button>
              <button
                onClick={() => setActiveTab('create')}
                className={`px-6 py-2 rounded-xl font-medium transition-all ${
                  activeTab === 'create'
                    ? 'bg-pink-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                ✨ Create with AI
              </button>
            </div>

            {/* Search Bar */}
            {activeTab === 'discover' && (
              <div className="hidden lg:flex relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search for authentic crafts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-80 pl-12 pr-4 py-3 bg-white/70 border border-pink-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent backdrop-blur-sm"
                />
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {activeTab === 'discover' && (
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="p-3 bg-white/70 hover:bg-white/90 rounded-2xl transition-all border border-pink-200"
              >
                <Filter className="h-5 w-5 text-gray-700" />
              </button>
            )}
            
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

        {/* Mobile Tab Navigation */}
        <div className="md:hidden mt-4">
          <div className="flex bg-white/70 rounded-2xl p-1 border border-pink-200">
            <button
              onClick={() => setActiveTab('discover')}
              className={`flex-1 py-2 rounded-xl font-medium transition-all text-center ${
                activeTab === 'discover'
                  ? 'bg-pink-500 text-white shadow-md'
                  : 'text-gray-600'
              }`}
            >
              🛍 Discover
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`flex-1 py-2 rounded-xl font-medium transition-all text-center ${
                activeTab === 'create'
                  ? 'bg-pink-500 text-white shadow-md'
                  : 'text-gray-600'
              }`}
            >
              ✨ Create
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}