export default function Sidebar({ 
  categories, 
  selectedCategory, 
  setSelectedCategory, 
  showFilters, 
  priceRange, 
  setPriceRange 
}) {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="glass-card rounded-3xl p-6 shadow-xl border border-pink-100">
        <h3 className="text-lg font-bold mb-4 gradient-text" style={{ fontFamily: 'Playfair Display' }}>
          Categories
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all text-left ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                  : 'hover:bg-pink-50 text-gray-700'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="glass-card rounded-3xl p-6 shadow-xl border border-pink-100">
          <h3 className="text-lg font-bold mb-4 gradient-text">Filters</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
              </label>
              <input
                type="range"
                min="0"
                max="20000"
                step="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-pink-300" />
                <span className="text-sm">Fast Delivery</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-pink-300" />
                <span className="text-sm">Certified Artisan</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-pink-300" />
                <span className="text-sm">On Sale</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}