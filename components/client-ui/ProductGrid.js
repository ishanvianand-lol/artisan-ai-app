import { Heart, Star, MapPin, Truck, ShieldCheck, ShoppingBag, Grid, List } from 'lucide-react'
import Image from 'next/image';

export default function ProductGrid({ 
  products, 
  filteredProducts, 
  viewMode, 
  setViewMode, 
  wishlist, 
  toggleWishlist, 
  addToCart 
}) {
  return (
    <div>
      {/* View Toggle & Sort */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <span className="text-gray-600 font-medium">
            {filteredProducts.length} products found
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-white/70 rounded-2xl p-1 border border-pink-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl transition-all ${
                viewMode === 'grid' ? 'bg-pink-500 text-white shadow-md' : 'text-gray-600 hover:bg-pink-50'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-xl transition-all ${
                viewMode === 'list' ? 'bg-pink-500 text-white shadow-md' : 'text-gray-600 hover:bg-pink-50'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
          
          <select className="bg-white/70 border border-pink-200 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300">
            <option>Popular</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating</option>
            <option>Newest</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
      }`}>
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className={`glass-card rounded-3xl overflow-hidden shadow-xl border border-pink-100 hover:shadow-2xl transition-all group ${
              viewMode === 'list' ? 'flex' : ''
            }`}
          >
            <div className={`relative ${viewMode === 'list' ? 'w-48' : ''}`}>
              <div className={`relative w-full ${viewMode === 'list' ? 'h-48' : 'h-64'}`}>
  <Image
    src={product.image}
    alt={product.name}
    className="object-cover group-hover:scale-105 transition-transform"
    fill
  />
</div>
              
              {product.discount > 0 && (
                <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {product.discount}% OFF
                </div>
              )}
              
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all"
              >
                <Heart
                  className={`h-5 w-5 ${
                    wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                  }`}
                />
              </button>

              {product.fastDelivery && (
                <div className="absolute bottom-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                  <Truck className="h-3 w-3" />
                  <span>Fast</span>
                </div>
              )}
            </div>

            <div className="p-6 flex-1">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-gray-800 group-hover:text-pink-600 transition-colors" style={{ fontFamily: 'Playfair Display' }}>
                  {product.name}
                </h3>
                {product.certified && (
                  <ShieldCheck className="h-5 w-5 text-green-600 flex-shrink-0" />
                )}
              </div>
              
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{product.seller}</span>
                <span className="text-sm text-gray-400">• {product.location}</span>
              </div>

              <div className="flex items-center space-x-1 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-gray-500">({product.reviews})</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-gray-800">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                
                <button
                  onClick={() => addToCart(product)}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-2xl font-medium hover:shadow-lg transition-all flex items-center space-x-2"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <button className="bg-white/70 hover:bg-white/90 text-gray-700 px-8 py-3 rounded-2xl font-medium transition-all border border-pink-200">
          Load More Products
        </button>
      </div>
    </div>
  )
}