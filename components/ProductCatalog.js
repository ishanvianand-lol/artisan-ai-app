'use client'

import { useState } from 'react'

export default function ProductCatalog({ products, setProducts }) {
  const [showAddModal, setShowAddModal] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null,
    imagePreview: null
  })
  const [uploading, setUploading] = useState(false)
  const [aiPriceAnalysis, setAiPriceAnalysis] = useState(null)
  const [analyzingPrice, setAnalyzingPrice] = useState(false)

  // AI Price Analysis
  const analyzePrice = async (product) => {
    setAnalyzingPrice(true)
    
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const price = parseFloat(product.price)
    const category = product.category
    
    // Mock price analysis based on category and price ranges
    const categoryRanges = {
      'Paintings': { min: 1500, max: 15000, ideal: 5000 },
      'Pottery': { min: 800, max: 8000, ideal: 3000 },
      'Textiles': { min: 1200, max: 12000, ideal: 4500 },
      'Jewelry': { min: 2000, max: 25000, ideal: 8000 },
      'Wood Craft': { min: 1000, max: 10000, ideal: 3500 },
      'Metal Craft': { min: 1500, max: 18000, ideal: 6000 },
      'Other': { min: 1000, max: 10000, ideal: 3500 }
    }
    
    const range = categoryRanges[category] || categoryRanges['Other']
    const idealPrice = range.ideal
    const minPrice = range.min
    const maxPrice = range.max
    
    let status = 'optimal'
    let recommendation = ''
    let score = 85
    
    if (price < minPrice) {
      status = 'too_low'
      recommendation = `Consider increasing price to ₹${minPrice}-₹${idealPrice} for better market positioning`
      score = 45
    } else if (price > maxPrice) {
      status = 'too_high'
      recommendation = `Consider reducing price to ₹${idealPrice}-₹${maxPrice} for better sales`
      score = 55
    } else if (price >= minPrice && price <= idealPrice) {
      status = 'good'
      recommendation = `Great pricing! This falls within the ideal range for ${category}`
      score = 80
    } else {
      status = 'optimal'
      recommendation = `Excellent pricing! This is perfect for premium ${category} products`
      score = 95
    }
    
    const analysis = {
      score,
      status,
      recommendation,
      marketRange: `₹${minPrice.toLocaleString()} - ₹${maxPrice.toLocaleString()}`,
      suggestedPrice: idealPrice,
      competitorAverage: idealPrice + Math.floor(Math.random() * 1000) - 500,
      demandLevel: ['Low', 'Medium', 'High', 'Very High'][Math.floor(Math.random() * 4)],
      seasonalTrend: ['Stable', 'Growing', 'Peak Season', 'Off Season'][Math.floor(Math.random() * 4)]
    }
    
    setAiPriceAnalysis(analysis)
    setAnalyzingPrice(false)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setNewProduct({
        ...newProduct, 
        image: file,
        imagePreview: URL.createObjectURL(file)
      })
    }
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()
    setUploading(true)

    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create new product with ID
      const productWithId = {
        id: Date.now().toString(),
        name: newProduct.name,
        description: newProduct.description,
        price: parseFloat(newProduct.price),
        category: newProduct.category,
        imageUrl: newProduct.imagePreview, // Using preview URL for demo
        createdAt: new Date().toISOString(),
        aiAnalysis: aiPriceAnalysis
      }
      
      // Update products array
      const updatedProducts = [...products, productWithId]
      setProducts(updatedProducts)
      
      // Save to localStorage
      localStorage.setItem('userProducts', JSON.stringify(updatedProducts))

      // Reset form
      setNewProduct({
        name: '',
        description: '',
        price: '',
        category: '',
        image: null,
        imagePreview: null
      })
      setAiPriceAnalysis(null)
      setShowAddModal(false)
      
      alert('Product added successfully! 🎉')
    } catch (error) {
      console.error('Error adding product:', error)
      alert('Failed to add product. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteProduct = async (productId) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const updatedProducts = products.filter(product => product.id !== productId)
        setProducts(updatedProducts)
        localStorage.setItem('userProducts', JSON.stringify(updatedProducts))
        alert('Product deleted successfully!')
      } catch (error) {
        console.error('Error deleting product:', error)
        alert('Failed to delete product. Please try again.')
      }
    }
  }

  const uploadToProfile = (product) => {
    // Add to profile products (this would typically sync with your profile/public listing)
    const profileProducts = JSON.parse(localStorage.getItem('profileProducts') || '[]')
    const productForProfile = {
      ...product,
      isLive: true,
      uploadedAt: new Date().toISOString()
    }
    profileProducts.push(productForProfile)
    localStorage.setItem('profileProducts', JSON.stringify(profileProducts))
    alert('Product uploaded to your profile! 🌟 Customers can now see and purchase it.')
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'optimal': return 'text-green-600 bg-green-100'
      case 'good': return 'text-blue-600 bg-blue-100'
      case 'too_low': return 'text-orange-600 bg-orange-100'
      case 'too_high': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <span className="text-2xl">🛍️</span>
          Product Catalog
        </h3>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-md transition-all flex items-center gap-2"
        >
          <span className="text-lg">+</span>
          Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎨</div>
          <h4 className="text-lg font-medium text-gray-600 mb-2">No products yet</h4>
          <p className="text-gray-500 mb-4">Start showcasing your beautiful crafts to the world!</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Add Your First Product
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all">
              <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                {product.imageUrl ? (
                  <Image 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">
                    🎨
                  </div>
                )}
              </div>
              
              <h4 className="font-semibold text-gray-800 mb-2">{product.name}</h4>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
              
              {/* AI Price Analysis Badge */}
              {product.aiAnalysis && (
                <div className="mb-3">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.aiAnalysis.status)}`}>
                    <span>🤖</span>
                    <span>AI Score: {product.aiAnalysis.score}/100</span>
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-bold text-orange-600">₹{product.price?.toLocaleString()}</p>
                  <p className="text-gray-500 text-xs">{product.category}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => uploadToProfile(product)}
                    className="text-green-600 hover:bg-green-50 p-2 rounded-lg transition-colors text-xs"
                    title="Upload to Profile"
                  >
                    📤
                  </button>
                  <button className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors">
                    ✏️
                  </button>
                  <button 
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Add New Product</h3>
            
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column - Product Details */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                    <input
                      type="text"
                      required
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="e.g., Hand-painted Madhubani Art"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      required
                      rows={3}
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                      placeholder="Describe your beautiful craft..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="2500"
                      />
                      {newProduct.price && newProduct.category && (
                        <button
                          type="button"
                          onClick={() => analyzePrice(newProduct)}
                          className="mt-2 text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
                        >
                          🤖 Analyze Price
                        </button>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        required
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="">Select Category</option>
                        <option value="Paintings">Paintings</option>
                        <option value="Pottery">Pottery</option>
                        <option value="Textiles">Textiles</option>
                        <option value="Jewelry">Jewelry</option>
                        <option value="Wood Craft">Wood Craft</option>
                        <option value="Metal Craft">Metal Craft</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Right Column - Image Preview & AI Analysis */}
                <div className="space-y-4">
                  {/* Image Preview */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      {newProduct.imagePreview ? (
                        <Image 
                          src={newProduct.imagePreview} 
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl text-gray-400">
                          🖼️
                        </div>
                      )}
                    </div>
                  </div>

                  {/* AI Price Analysis */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <span>🤖</span>
                      <span>AI Price Analysis</span>
                    </h4>
                    
                    {analyzingPrice ? (
                      <div className="text-center py-4">
                        <div className="w-6 h-6 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-2"></div>
                        <p className="text-sm text-gray-600">Analyzing market price...</p>
                      </div>
                    ) : aiPriceAnalysis ? (
                      <div className="space-y-3">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-800 mb-1">{aiPriceAnalysis.score}/100</div>
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(aiPriceAnalysis.status)}`}>
                            Price Rating
                          </div>
                        </div>
                        
                        <div className="text-xs text-gray-600 space-y-1">
                          <p><strong>Market Range:</strong> {aiPriceAnalysis.marketRange}</p>
                          <p><strong>Demand:</strong> {aiPriceAnalysis.demandLevel}</p>
                          <p><strong>Trend:</strong> {aiPriceAnalysis.seasonalTrend}</p>
                        </div>
                        
                        <div className="bg-white rounded-lg p-3">
                          <p className="text-xs text-gray-700">
                            <strong>💡 Recommendation:</strong> {aiPriceAnalysis.recommendation}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        <div className="text-2xl mb-2">💰</div>
                        <p className="text-xs">Enter price & category to get AI analysis</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false)
                    setNewProduct({
                      name: '',
                      description: '',
                      price: '',
                      category: '',
                      image: null,
                      imagePreview: null
                    })
                    setAiPriceAnalysis(null)
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-2 px-4 rounded-lg font-medium hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Adding Product...</span>
                    </div>
                  ) : (
                    'Add Product'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}