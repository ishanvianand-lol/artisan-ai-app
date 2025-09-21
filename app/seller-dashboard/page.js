'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import Image from 'next/image';
// Profile Menu Component
const ProfileMenu = ({ userData, products, setUserData }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const fileInputRef = useRef(null)
  const router = useRouter()

  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setUploadingPhoto(true)
      const reader = new FileReader()
      reader.onload = (e) => {
        const newUserData = { ...userData, photo: e.target.result }
        setUserData(newUserData)
        localStorage.setItem('userData', JSON.stringify(newUserData))
        setUploadingPhoto(false)
        setShowMenu(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLogout = () => {
    auth.signOut().then(() => {
      localStorage.removeItem('userRole')
      localStorage.removeItem('userData')
      localStorage.removeItem('userProducts')
      localStorage.removeItem('userStory')
      router.push('/')
    })
  }

  const handleDeleteAccount = () => {
    const user = auth.currentUser
    if (user) {
      user.delete().then(() => {
        // Clear all data
        localStorage.removeItem('userRole')
        localStorage.removeItem('userData')
        localStorage.removeItem('userProducts')
        localStorage.removeItem('userStory')
        router.push('/')
      }).catch((error) => {
        console.error('Delete account error:', error)
        if (error.code === 'auth/requires-recent-login') {
          alert('Please log out and log back in, then try deleting your account again.')
        } else {
          alert('Error deleting account. Please try again.')
        }
      })
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center space-x-3 hover:bg-white/50 rounded-2xl p-2 transition-all"
      >
        <div className="text-right">
          <p className="font-semibold text-gray-800">{userData.name}</p>
          <p className="text-sm text-gray-600">{userData.email}</p>
        </div>
        <div className="relative">
          <Image 
  src={userData.photo} 
  alt={userData.name}
  width={48}
  height={48}
  className="w-12 h-12 rounded-2xl border-3 border-orange-200 shadow-lg"
/>
          {uploadingPhoto && (
            <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </button>

      {showMenu && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <Image 
  src={userData.photo} 
  alt={userData.name}
  width={40}
  height={40}
  className="w-10 h-10 rounded-xl"
/>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{userData.name}</p>
                <p className="text-xs text-gray-600">{userData.email}</p>
              </div>
            </div>
          </div>

          <div className="py-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-left"
            >
              <span className="text-blue-600">📸</span>
              <div>
                <p className="font-medium text-sm">Change Photo</p>
                <p className="text-xs text-gray-500">Upload new profile picture</p>
              </div>
            </button>

            <button
              onClick={() => setShowLogoutDialog(true)}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-left"
            >
              <span className="text-orange-600">🚪</span>
              <div>
                <p className="font-medium text-sm">Logout</p>
                <p className="text-xs text-gray-500">Sign out of your account</p>
              </div>
            </button>

            <button
              onClick={() => setShowDeleteDialog(true)}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-700 hover:bg-red-50 transition-colors text-left border-t border-gray-100"
            >
              <span className="text-red-600">🗑</span>
              <div>
                <p className="font-medium text-sm">Delete Account</p>
                <p className="text-xs text-gray-500">Permanently delete your account</p>
              </div>
            </button>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        className="hidden"
      />

      {showLogoutDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👋</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Logout Confirmation</h3>
              <p className="text-gray-600">Are you sure you want to logout?</p>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowLogoutDialog(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚠</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Delete Account</h3>
              <p className="text-gray-600">This action cannot be undone. Your account and all data will be permanently deleted.</p>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Delete Forever
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Smart Product Photography Component
const SmartProductPhotography = () => {
  const [isActive, setIsActive] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)
  const [aiAnalysis, setAiAnalysis] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [enhancedImage, setEnhancedImage] = useState(null)
  const [processingEnhancement, setProcessingEnhancement] = useState(false)
  
  const fileInputRef = useRef(null)

  const detectProductType = () => {
    const productTypes = ['pottery', 'jewelry', 'textiles', 'wood', 'painting', 'sculpture']
    return productTypes[Math.floor(Math.random() * productTypes.length)]
  }

  const analyzePhoto = async (imageData) => {
    setIsAnalyzing(true)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const productType = detectProductType()
    
    const qualityMetrics = {
      lighting: {
        score: Math.floor(Math.random() * 40) + 60,
        quality: '',
        recommendation: ''
      },
      composition: {
        score: Math.floor(Math.random() * 35) + 65,
        quality: '',
        recommendation: ''
      },
      background: {
        score: Math.floor(Math.random() * 30) + 70,
        quality: '',
        recommendation: ''
      },
      focus: {
        score: Math.floor(Math.random() * 25) + 75,
        quality: '',
        recommendation: ''
      },
      colors: {
        score: Math.floor(Math.random() * 30) + 70,
        quality: '',
        recommendation: ''
      }
    }

    Object.keys(qualityMetrics).forEach(key => {
      const score = qualityMetrics[key].score
      if (score >= 90) {
        qualityMetrics[key].quality = 'Excellent'
        qualityMetrics[key].recommendation = `${key} is outstanding! Perfect for professional use.`
      } else if (score >= 80) {
        qualityMetrics[key].quality = 'Good'
        qualityMetrics[key].recommendation = `${key} looks good with minor room for improvement.`
      } else if (score >= 70) {
        qualityMetrics[key].quality = 'Fair'
        qualityMetrics[key].recommendation = `${key} could be enhanced for better results.`
      } else {
        qualityMetrics[key].quality = 'Poor'
        qualityMetrics[key].recommendation = `${key} needs significant improvement.`
      }
    })

    const weights = { lighting: 0.25, composition: 0.2, background: 0.2, focus: 0.2, colors: 0.15 }
    const overallScore = Math.round(
      Object.keys(qualityMetrics).reduce((sum, key) => {
        return sum + (qualityMetrics[key].score * weights[key])
      }, 0)
    )

    const generateSuggestions = () => {
      const suggestions = []
      suggestions.push(`AI detected: ${productType.charAt(0).toUpperCase() + productType.slice(1)}`)
      
      if (qualityMetrics.lighting.score < 80) {
        suggestions.push('Use natural light from a window for better illumination')
      }
      if (qualityMetrics.composition.score < 80) {
        suggestions.push('Try the rule of thirds for better composition')
      }
      if (qualityMetrics.background.score < 85) {
        suggestions.push('Consider AI background generation for professional look')
      }
      
      switch(productType) {
        case 'pottery':
          suggestions.push('Highlight the texture and craftsmanship details')
          break
        case 'jewelry':
          suggestions.push('Capture the sparkle and fine details clearly')
          break
        case 'textiles':
          suggestions.push('Show the fabric pattern and weave quality')
          break
        case 'wood':
          suggestions.push('Emphasize the grain and carving details')
          break
        default:
          suggestions.push('Focus on unique features that make it special')
      }
      
      return suggestions
    }

    const mockAnalysis = {
      score: overallScore,
      productType: productType,
      confidence: Math.floor(Math.random() * 15) + 85,
      metrics: qualityMetrics,
      suggestions: generateSuggestions(),
      marketability: overallScore >= 85 ? 'High' : overallScore >= 75 ? 'Medium' : 'Needs Work'
    }
    
    setAiAnalysis(mockAnalysis)
    setIsAnalyzing(false)
  }

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCapturedImage(e.target.result)
        setIsActive(true)
        analyzePhoto(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const enhancePhoto = async () => {
    setProcessingEnhancement(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.filter = 'brightness(1.1) contrast(1.2) saturate(1.1)'
      ctx.drawImage(img, 0, 0)
      
      const enhancedDataUrl = canvas.toDataURL('image/jpeg', 0.9)
      setEnhancedImage(enhancedDataUrl)
      
      if (aiAnalysis) {
        setAiAnalysis(prev => ({
          ...prev,
          score: Math.min(100, prev.score + 15),
          enhanced: true
        }))
      }
      
      setProcessingEnhancement(false)
    }
    
    img.src = capturedImage
  }

  const getQualityColor = (quality) => {
    switch(quality?.toLowerCase()) {
      case 'excellent': return 'text-green-600 bg-green-100 border-green-200'
      case 'good': return 'text-blue-600 bg-blue-100 border-blue-200'
      case 'fair': return 'text-yellow-600 bg-yellow-100 border-yellow-200'
      case 'poor': return 'text-red-600 bg-red-100 border-red-200'
      default: return 'text-gray-600 bg-gray-100 border-gray-200'
    }
  }

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (!isActive) {
    return (
      <div className="glass-card rounded-3xl p-8 shadow-lg border border-orange-100">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-4xl">📸</span>
          </div>
          
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Smart Product Photography
          </h2>
          
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Let AI analyze your product photos and provide professional feedback with detailed scoring.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4">
              <div className="text-3xl mb-2">🤖</div>
              <h3 className="font-semibold text-gray-800 mb-2">AI Analysis</h3>
              <p className="text-sm text-gray-600">Get detailed scoring out of 100</p>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold text-gray-800 mb-2">Product Detection</h3>
              <p className="text-sm text-gray-600">AI identifies your product type</p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4">
              <div className="text-3xl mb-2">✨</div>
              <h3 className="font-semibold text-gray-800 mb-2">Enhancement</h3>
              <p className="text-sm text-gray-600">AI-powered photo improvement</p>
            </div>
          </div>
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg transition-all flex items-center space-x-3 mx-auto"
          >
            <span>📷</span>
            <span>Analyze Product Photo</span>
          </button>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    )
  }

  return (
    <div className="glass-card rounded-3xl p-6 shadow-lg border border-orange-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          📸 AI Photo Analysis
        </h2>
        <button
          onClick={() => {
            setIsActive(false)
            setCapturedImage(null)
            setAiAnalysis(null)
            setEnhancedImage(null)
          }}
          className="text-gray-600 hover:text-red-500 transition-colors"
        >
          <span className="text-2xl">×</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden bg-black aspect-video">
            <Image 
  src={enhancedImage || capturedImage} 
  alt="Product for analysis"
  width={800}
  height={450}
  className="w-full h-full object-cover"
/>
            
            {enhancedImage && (
              <div className="absolute top-4 right-4">
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                  <span>✨</span>
                  <span>AI Enhanced</span>
                </div>
              </div>
            )}

            {processingEnhancement && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="bg-white rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mx-auto mb-3"></div>
                  <p className="text-gray-800 font-semibold">Enhancing Photo...</p>
                  <p className="text-gray-600 text-sm">AI is improving your image</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => {
                setCapturedImage(null)
                setAiAnalysis(null)
                setEnhancedImage(null)
              }}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              🔄 Retake
            </button>
            
            {!enhancedImage && aiAnalysis && (
              <button
                onClick={enhancePhoto}
                disabled={processingEnhancement}
                className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
              >
                ✨ Enhance
              </button>
            )}
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              📁 New Photo
            </button>
            
            <button
              onClick={() => {
                const imageToSave = enhancedImage || capturedImage
                if (imageToSave) {
                  const link = document.createElement('a')
                  link.download = `product-photo-${Date.now()}.jpg`
                  link.href = imageToSave
                  document.body.appendChild(link)
                  link.click()
                  document.body.removeChild(link)
                }
              }}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              💾 Save
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
              <span>🤖</span>
              <span>AI Analysis</span>
            </h3>
            
            {isAnalyzing ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3"></div>
                <p className="font-semibold text-gray-800 mb-1">Analyzing your photo...</p>
                <p className="text-sm text-gray-600">AI is evaluating quality metrics</p>
              </div>
            ) : aiAnalysis ? (
              <div className="space-y-4">
                <div className="text-center mb-4 bg-white rounded-xl p-4 border-2 border-orange-200">
                  <div className={`text-4xl font-bold mb-1 ${getScoreColor(aiAnalysis.score)}`}>
                    {aiAnalysis.score}/100
                  </div>
                  <div className="text-sm text-gray-600">Overall Quality Score</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Marketability: <span className="font-semibold">{aiAnalysis.marketability}</span>
                  </div>
                  {aiAnalysis.enhanced && (
                    <div className="text-xs text-green-600 mt-2 font-semibold">✨ Enhanced by AI!</div>
                  )}
                </div>

                {aiAnalysis.productType && (
                  <div className="bg-white rounded-xl p-3 border-l-4 border-purple-500">
                    <div className="flex items-center space-x-2">
                      <span className="text-purple-500">🎯</span>
                      <div>
                        <div className="text-sm font-medium text-gray-800">Product Detection</div>
                        <div className="text-xs text-gray-600 capitalize">
                          {aiAnalysis.productType} ({aiAnalysis.confidence}% confidence)
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 text-sm">Quality Breakdown</h4>
                  {Object.entries(aiAnalysis.metrics).map(([metric, data]) => (
                    <div key={metric} className="bg-white rounded-xl p-3 border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium capitalize text-gray-700">{metric}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">{data.score}/100</span>
                          <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getQualityColor(data.quality)}`}>
                            {data.quality}
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className={`h-2 rounded-full ${
                            data.score >= 90 ? 'bg-green-500' :
                            data.score >= 80 ? 'bg-blue-500' :
                            data.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${data.score}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600">{data.recommendation}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-xl p-4">
                  <h4 className="font-medium text-gray-800 mb-3">💡 AI Recommendations</h4>
                  <div className="space-y-2">
                    {aiAnalysis.suggestions.map((suggestion, index) => (
                      <div key={index} className="text-xs text-gray-600 flex items-start space-x-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span>{suggestion}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  )
}

// Product Catalog Component
const ProductCatalog = ({ products, setProducts }) => {
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', image: '' })
  const fileInputRef = useRef(null)

  useEffect(() => {
    localStorage.setItem('userProducts', JSON.stringify(products))
  }, [products])

  const addProduct = () => {
    if (newProduct.name && newProduct.price) {
      const product = {
        id: Date.now(),
        ...newProduct,
        image: newProduct.image || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect width="200" height="200" fill="%23f3f4f6"/%3E%3Ctext x="100" y="100" text-anchor="middle" dy="0.3em" font-family="Arial" font-size="16" fill="%236b7280"%3EProduct Image%3C/text%3E%3C/svg%3E'
      }
      setProducts([...products, product])
      setNewProduct({ name: '', price: '', description: '', image: '' })
      setShowAddProduct(false)
    }
  }

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setNewProduct({ ...newProduct, image: e.target.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const removeProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display' }}>
          Product Catalog
        </h3>
        <button
          onClick={() => setShowAddProduct(true)}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          + Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <div className="text-6xl mb-4">📦</div>
          <p className="text-lg font-medium">No products yet</p>
          <p className="text-sm">Add your first product to get started</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
              <Image
  src={product.image}
  alt={product.name}
  width={400}
  height={192}
  className="w-full h-48 object-cover rounded-xl mb-4"
/>
              <h4 className="font-semibold text-gray-800 mb-2">{product.name}</h4>
              <p className="text-gray-600 text-sm mb-3">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-orange-600">{product.price}</span>
                <button 
                  onClick={() => removeProduct(product.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Add New Product</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Price</label>
                <input
                  type="text"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  placeholder="₹1,000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  placeholder="Product description"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Image</label>
                <div className="flex items-center space-x-3">
                  {newProduct.image && (
                    <Image
  src={newProduct.image}
  alt="Preview"
  width={64}
  height={64}
  className="w-16 h-16 object-cover rounded-xl"
/>
                  )}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Choose Image
                  </button>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddProduct(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addProduct}
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Add Product
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>
      )}
    </div>
  )
}

// Social Integration Component
const SocialIntegration = () => {
  const [whatsappNumber, setWhatsappNumber] = useState('+91 9876543210')
  const [isConnected, setIsConnected] = useState(false)

  return (
    <div>
      <h3 className="font-bold text-gray-800 mb-4 flex items-center space-x-2">
        <span>🔗</span>
        <span>Social Integration</span>
      </h3>
      
      <div className="bg-green-50 rounded-2xl p-4 border border-green-200">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
            <span className="text-green-600 text-lg">📱</span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">WhatsApp Business</h4>
            <p className="text-sm text-gray-600">Connect with customers directly</p>
          </div>
        </div>
        
        <input
          type="tel"
          value={whatsappNumber}
          onChange={(e) => setWhatsappNumber(e.target.value)}
          className="w-full px-3 py-2 border border-green-200 rounded-xl mb-3 focus:border-green-500 focus:ring-2 focus:ring-green-200"
          placeholder="+91 9876543210"
        />
        
        <button
          onClick={() => setIsConnected(!isConnected)}
          className={`w-full py-3 rounded-xl font-semibold transition-all ${
            isConnected 
              ? 'bg-green-500 text-white hover:bg-green-600' 
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          {isConnected ? 'Connected ✓' : 'Connect WhatsApp'}
        </button>
      </div>
    </div>
  )
}

// Main Dashboard Component
export default function SellerDashboard() {
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [aiStory, setAiStory] = useState('')
  const [products, setProducts] = useState([])
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        
        // Load stored data
        const storedProducts = localStorage.getItem('userProducts')
        const storedStory = localStorage.getItem('userStory')
        const storedUserData = localStorage.getItem('userData')
        
        if (storedProducts) {
          setProducts(JSON.parse(storedProducts))
        }
        
        if (storedStory) {
          setAiStory(storedStory)
        }

        let newUserData
        if (storedUserData) {
          newUserData = JSON.parse(storedUserData)
        } else {
          newUserData = {
            name: currentUser.displayName || "Artisan User",
            email: currentUser.email,
            photo: currentUser.photoURL || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23f97316'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='0.3em' font-family='Arial' font-size='40' fill='white'%3EA%3C/text%3E%3C/svg%3E",
            uid: currentUser.uid,
            joinDate: new Date().toISOString(),
            verified: true
          }
          localStorage.setItem('userData', JSON.stringify(newUserData))
        }
        
        setUserData(newUserData)
        setLoading(false)
      } else {
        router.push('/')
      }
    })

    return () => unsubscribe()
  }, [router])

  const generateAIStory = () => {
    const sampleStories = [
      "I am a third-generation potter from Khurja, where clay transforms into art through generations of wisdom. My grandfather taught me that each piece carries the soul of our ancestors, and every curve tells a story of tradition meeting innovation.",
      "Growing up in the vibrant lanes of Jaipur, I learned the ancient art of block printing from my mother. Each stamp I create is a bridge between centuries-old techniques and contemporary designs that speak to modern hearts.",
      "From the serene backwaters of Kerala, I craft wooden sculptures that echo the rhythms of nature. My hands have learned to listen to the wood, understanding its grain and spirit to create pieces that bring tranquility to any space."
    ]
    const randomStory = sampleStories[Math.floor(Math.random() * sampleStories.length)]
    setAiStory(randomStory)
    localStorage.setItem('userStory', randomStory)
  }

  if (loading || !userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 border-4 border-orange-200 rounded-full animate-spin border-t-orange-600"></div>
          </div>
          <p className="text-gray-600 mt-4 text-lg font-medium">Loading your artisan dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <header className="glass-card shadow-sm border-b border-orange-100">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">K</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display' }}>
                    <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      Kalakari
                    </span>
                  </h1>
                  <p className="text-gray-600 text-sm">Craft your legacy, one story at a time</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="hidden md:flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Online</span>
                  </div>
                </div>
                <ProfileMenu userData={userData} products={products} setUserData={setUserData} />
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <div className="glass-card rounded-3xl p-6 shadow-lg border border-orange-100">
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <Image
  src={userData.photo}
  alt={userData.name}
  width={80}
  height={80}
  className="w-20 h-20 rounded-2xl mx-auto mb-4 shadow-lg"
/>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Playfair Display' }}>
                    {userData.name}
                  </h2>
                  <p className="text-gray-600 text-sm">{userData.email}</p>
                  <div className="mt-3 inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-medium">
                    🎨 Master Artisan
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-3">
                    <div className="text-2xl font-bold text-gray-800">{products.length}</div>
                    <div className="text-xs text-gray-600">Products</div>
                  </div>
                  <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-3">
                    <div className="text-2xl font-bold text-gray-800">4.9</div>
                    <div className="text-xs text-gray-600">Rating</div>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-800" style={{ fontFamily: 'Playfair Display' }}>
                      My Heritage Story
                    </h3>
                    <button onClick={generateAIStory} className="text-sm bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full hover:shadow-lg transition-all flex items-center space-x-1">
                      <span>✨</span>
                      <span>Generate</span>
                    </button>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-4 min-h-[140px] border border-orange-100">
                    {aiStory ? (
                      <p className="text-gray-700 text-sm leading-relaxed font-medium">
                        {aiStory}
                      </p>
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <div className="text-center">
                          <div className="text-3xl mb-2">📖</div>
                          <p className="text-sm font-medium">Let AI craft your story</p>
                          <p className="text-xs">Share your heritage with the world</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <SocialIntegration />
              </div>
            </div>
            <div className="lg:col-span-3 space-y-8">
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { icon: "📦", label: "Products Listed", value: products.length, change: "+12%", color: "from-blue-500 to-blue-600" },
                  { icon: "💰", label: "Total Earnings", value: "₹12,450", change: "+8.2%", color: "from-green-500 to-green-600" },
                  { icon: "👥", label: "Profile Views", value: "86", change: "+24%", color: "from-purple-500 to-purple-600" },
                  { icon: "⭐", label: "New Reviews", value: "7", change: "+3", color: "from-orange-500 to-red-500" }
                ].map((stat, index) => (
                  <div key={index} className="glass-card rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}>
                        <span className="text-xl">{stat.icon}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-green-600 font-semibold">{stat.change}</div>
                        <div className="text-xs text-gray-500">this month</div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
              <SmartProductPhotography />
              <div className="glass-card rounded-3xl p-8 shadow-lg border border-orange-100">
                <ProductCatalog products={products} setProducts={setProducts} />
              </div>
              <div className="glass-card rounded-3xl p-8 shadow-lg border border-orange-100">
                <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Playfair Display' }}>Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { action: "New order received", item: "Hand-painted Madhubani Art", time: "2 hours ago", type: "order" },
                    { action: "Product view", item: "Traditional Brass Diya", time: "5 hours ago", type: "view" },
                    { action: "Review received", item: "Wooden Elephant Sculpture", time: "1 day ago", type: "review" },
                    { action: "Profile updated", item: "Added new social links", time: "2 days ago", type: "update" }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-white to-orange-50 rounded-2xl border border-orange-100">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        activity.type === 'order' ? 'bg-green-100 text-green-600' :
                        activity.type === 'view' ? 'bg-blue-100 text-blue-600' :
                        activity.type === 'review' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        <span className="text-lg">
                          {activity.type === 'order' ? '🛒' :
                           activity.type === 'view' ? '👁' :
                           activity.type === 'review' ? '⭐' : '✏'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.item}</p>
                      </div>
                      <div className="text-sm text-gray-500">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}