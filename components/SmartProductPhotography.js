import { useState, useRef, useEffect } from 'react'
import Image from 'next/image';

const SmartProductPhotography = () => {
  const [isActive, setIsActive] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)
  const [aiAnalysis, setAiAnalysis] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [cameraStream, setCameraStream] = useState(null)
  const [photoTips, setPhotoTips] = useState([])
  const [currentTip, setCurrentTip] = useState(0)
  const [showOptions, setShowOptions] = useState(false)
  const [generatingBackground, setGeneratingBackground] = useState(false)
  const [enhancedImage, setEnhancedImage] = useState(null)
  const [backgroundOptions, setBackgroundOptions] = useState([])
  const [showBackgroundGenerator, setShowBackgroundGenerator] = useState(false)
  const [detectedProductType, setDetectedProductType] = useState('general')
  const [processingEnhancement, setProcessingEnhancement] = useState(false)
  
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)

  // AI Background generation themes
  const backgroundThemes = {
    pottery: [
      { 
        name: 'Clay Workshop', 
        description: 'Rustic pottery wheel with earthy tones',
        gradient: 'from-amber-100 to-orange-200',
        accent: '#8B4513'
      },
      { 
        name: 'Natural Stone', 
        description: 'Smooth river stones and bamboo mat',
        gradient: 'from-stone-100 to-gray-200',
        accent: '#6B7280'
      },
      { 
        name: 'Garden Setting', 
        description: 'Terracotta pots with green plants',
        gradient: 'from-green-100 to-emerald-200',
        accent: '#059669'
      },
      { 
        name: 'Minimalist Shelf', 
        description: 'Clean wooden shelf with soft lighting',
        gradient: 'from-neutral-100 to-stone-200',
        accent: '#A78BFA'
      }
    ],
    jewelry: [
      { 
        name: 'Velvet Cushion', 
        description: 'Luxurious purple velvet jewelry display',
        gradient: 'from-purple-100 to-indigo-200',
        accent: '#7C3AED'
      },
      { 
        name: 'Marble Surface', 
        description: 'Elegant white marble with gold accents',
        gradient: 'from-slate-50 to-gray-100',
        accent: '#F59E0B'
      },
      { 
        name: 'Jewelry Box', 
        description: 'Vintage wooden jewelry box interior',
        gradient: 'from-amber-100 to-yellow-200',
        accent: '#92400E'
      },
      { 
        name: 'Silk Fabric', 
        description: 'Flowing silk fabric in complementary colors',
        gradient: 'from-pink-100 to-rose-200',
        accent: '#EC4899'
      }
    ],
    textiles: [
      { 
        name: 'Handloom Setup', 
        description: 'Traditional wooden loom with cotton threads',
        gradient: 'from-orange-100 to-red-200',
        accent: '#DC2626'
      },
      { 
        name: 'Fabric Drape', 
        description: 'Elegant fabric draping with natural folds',
        gradient: 'from-blue-100 to-indigo-200',
        accent: '#2563EB'
      },
      { 
        name: 'Cultural Context', 
        description: 'Traditional Indian textile patterns',
        gradient: 'from-yellow-100 to-orange-200',
        accent: '#F97316'
      },
      { 
        name: 'Weaver Backdrop', 
        description: 'Colorful yarn skeins and weaving tools',
        gradient: 'from-green-100 to-teal-200',
        accent: '#0D9488'
      }
    ],
    wood: [
      { 
        name: 'Workshop Bench', 
        description: 'Rustic wooden workbench with tools',
        gradient: 'from-amber-100 to-orange-200',
        accent: '#92400E'
      },
      { 
        name: 'Forest Setting', 
        description: 'Natural wood grain and forest elements',
        gradient: 'from-green-100 to-emerald-200',
        accent: '#059669'
      },
      { 
        name: 'Wood Texture', 
        description: 'Beautiful wood grain patterns backdrop',
        gradient: 'from-yellow-100 to-amber-200',
        accent: '#D97706'
      },
      { 
        name: 'Artisan Hands', 
        description: 'Skilled craftsman hands working wood',
        gradient: 'from-stone-100 to-gray-200',
        accent: '#6B7280'
      }
    ],
    general: [
      { 
        name: 'Clean Minimal', 
        description: 'Pure white background with soft shadows',
        gradient: 'from-white to-gray-50',
        accent: '#F3F4F6'
      },
      { 
        name: 'Studio Light', 
        description: 'Professional studio lighting setup',
        gradient: 'from-blue-50 to-indigo-100',
        accent: '#6366F1'
      },
      { 
        name: 'Natural Wood', 
        description: 'Warm wooden surface background',
        gradient: 'from-amber-50 to-orange-100',
        accent: '#F59E0B'
      },
      { 
        name: 'Modern Gradient', 
        description: 'Trendy gradient background',
        gradient: 'from-purple-50 to-pink-100',
        accent: '#EC4899'
      }
    ]
  }

  const craftTips = {
    pottery: [
      "📐 Hold pottery at 45° angle to show depth and form",
      "💡 Use soft, diffused lighting from the side",
      "🌈 Place on neutral background to highlight colors",
      "📏 Include size reference like coins or hands"
    ],
    jewelry: [
      "✨ Use macro mode for intricate details",
      "🔍 Focus on unique patterns and textures",
      "💎 Capture sparkle with angled lighting",
      "👤 Show scale with model wearing the piece"
    ],
    textiles: [
      "🧵 Capture texture by shooting at slight angles",
      "🌞 Use natural daylight for true colors",
      "📐 Show both flat lay and draped versions",
      "🔍 Include close-ups of weaving patterns"
    ],
    wood: [
      "🌳 Highlight wood grain with side lighting",
      "🖐️ Show size with hands for reference",
      "🎨 Capture natural wood colors accurately",
      "⚡ Use multiple angles to show craftsmanship"
    ]
  }

  // AI Product Detection (mock)
  const detectProductType = (imageData) => {
    const types = ['pottery', 'jewelry', 'textiles', 'wood', 'general']
    return types[Math.floor(Math.random() * types.length)]
  }

  // AI Background Generation
  const generateBackground = async (productCategory) => {
    setGeneratingBackground(true)
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const themes = backgroundThemes[productCategory] || backgroundThemes['general']
    
    const backgroundVariations = themes.map((theme, index) => ({
      id: index + 1,
      name: theme.name,
      description: theme.description,
      gradient: theme.gradient,
      accent: theme.accent,
      imageUrl: `data:image/svg+xml,${encodeURIComponent(`
        <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:${theme.accent}20;stop-opacity:1" />
              <stop offset="50%" style="stop-color:${theme.accent}10;stop-opacity:1" />
              <stop offset="100%" style="stop-color:${theme.accent}05;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grad${index})" />
          <circle cx="320" cy="80" r="30" fill="${theme.accent}15" />
          <circle cx="100" cy="200" r="20" fill="${theme.accent}20" />
          <rect x="150" y="120" width="100" height="60" rx="10" fill="white" opacity="0.8"/>
          <text x="200" y="155" text-anchor="middle" dy="0.3em" font-family="Arial" font-size="12" fill="#374151">${theme.name}</text>
        </svg>
      `)}`
    }))
    
    setBackgroundOptions(backgroundVariations)
    setGeneratingBackground(false)
  }

  // Apply AI generated background to image
  const applyBackground = async (backgroundOption) => {
    if (!capturedImage) return
    
    setProcessingEnhancement(true)
    await new Promise(resolve => setTimeout(resolve, 2500))
    
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = 800
    canvas.height = 600
    
    const img = new Image()
    img.onload = () => {
      const bgImg = new Image()
      bgImg.onload = () => {
        ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height)
        
        ctx.save()
        ctx.shadowColor = 'rgba(0, 0, 0, 0.2)'
        ctx.shadowBlur = 20
        ctx.shadowOffsetX = 5
        ctx.shadowOffsetY = 10
        
        const productX = canvas.width * 0.25
        const productY = canvas.height * 0.15
        const productW = canvas.width * 0.5
        const productH = canvas.height * 0.7
        
        ctx.drawImage(img, productX, productY, productW, productH)
        ctx.restore()
        
        const enhancedImageUrl = canvas.toDataURL('image/jpeg', 0.92)
        setEnhancedImage(enhancedImageUrl)
        
        setAiAnalysis(prev => ({
          ...prev,
          score: Math.min(98, prev.score + 25),
          background: {
            quality: 'Excellent',
            recommendation: '✨ AI-enhanced background looks professional!'
          },
          suggestions: [
            '🎯 Perfect! AI background enhancement applied successfully',
            '📸 Your product now has a professional studio look',
            '🚀 This enhanced image is ready for your online store',
            '💡 Consider using this AI enhancement style for all product photos'
          ]
        }))
        
        setProcessingEnhancement(false)
        setShowBackgroundGenerator(false)
      }
      bgImg.src = backgroundOption.imageUrl
    }
    Image.src = capturedImage
  }

  const analyzePhoto = async (imageData) => {
    setIsAnalyzing(true)
    
    const productType = detectProductType(imageData)
    setDetectedProductType(productType)
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const backgroundQuality = ['Poor', 'Fair', 'Good', 'Excellent'][Math.floor(Math.random() * 4)]
    const shouldSuggestBgGeneration = ['Poor', 'Fair'].includes(backgroundQuality)
    
    const mockAnalysis = {
      score: Math.floor(Math.random() * 30) + 65,
      productType: productType,
      lighting: {
        quality: ['Poor', 'Fair', 'Good', 'Excellent'][Math.floor(Math.random() * 4)],
        recommendation: 'Move closer to a window for better natural light'
      },
      composition: {
        quality: ['Poor', 'Fair', 'Good', 'Excellent'][Math.floor(Math.random() * 4)],
        recommendation: 'Try centering the product with more negative space around it'
      },
      background: {
        quality: backgroundQuality,
        recommendation: shouldSuggestBgGeneration 
          ? '🤖 AI can generate a better background for you!' 
          : 'Background looks good, but AI can make it even better'
      },
      focus: {
        quality: ['Poor', 'Fair', 'Good', 'Excellent'][Math.floor(Math.random() * 4)],
        recommendation: 'Tap on your product to ensure sharp focus'
      },
      suggestions: shouldSuggestBgGeneration ? [
        '🎨 Try AI background generation for professional look',
        'AI detected your product as: ' + productType,
        'Current background could be improved',
        'AI can create studio-quality backgrounds instantly'
      ] : [
        'Try shooting from a 45-degree angle',
        'Add a simple prop for scale reference',
        'Consider AI background enhancement',
        'Include a close-up detail shot'
      ],
      needsBackgroundImprovement: shouldSuggestBgGeneration
    }
    
    setAiAnalysis(mockAnalysis)
    setIsAnalyzing(false)
    
    if (shouldSuggestBgGeneration) {
      setTimeout(() => {
        if (window.confirm('🤖 AI detected that your background could be improved. Would you like to generate a professional background automatically?')) {
          setShowBackgroundGenerator(true)
          generateBackground(productType)
        }
      }, 1000)
    }
  }

  const importFromAlbum = () => {
    fileInputRef.current?.click()
  }

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageData = e.target?.result
        setCapturedImage(imageData)
        setIsActive(true)
        analyzePhoto(imageData)
      }
      reader.readAsDataURL(file)
    }
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        } 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setCameraStream(stream)
      setIsActive(true)
      
      const allTips = Object.values(craftTips).flat()
      const shuffled = allTips.sort(() => 0.5 - Math.random())
      setPhotoTips(shuffled.slice(0, 4))
      
    } catch (error) {
      console.error('Error accessing camera:', error)
      alert('Could not access camera. Please check permissions.')
    }
  }

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop())
    }
    setIsActive(false)
    setCameraStream(null)
    setCapturedImage(null)
    setAiAnalysis(null)
    setShowOptions(false)
    setShowBackgroundGenerator(false)
    setEnhancedImage(null)
  }

  const capturePhoto = () => {
    const canvas = canvasRef.current
    const video = videoRef.current
    
    if (canvas && video) {
      const context = canvas.getContext('2d')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      
      context.drawImage(video, 0, 0, canvas.width, canvas.height)
      const imageData = canvas.toDataURL('image/jpeg', 0.8)
      
      setCapturedImage(imageData)
      analyzePhoto(imageData)
    }
  }

  const retakePhoto = () => {
    setCapturedImage(null)
    setAiAnalysis(null)
    setEnhancedImage(null)
    setShowBackgroundGenerator(false)
  }

  const savePhoto = () => {
    const imageToSave = enhancedImage || capturedImage
    if (imageToSave) {
      const link = document.createElement('a')
      link.download = `product-photo-${Date.now()}.jpg`
      link.href = imageToSave
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      alert('📸 Photo saved successfully!')
      stopCamera()
    }
  }

  useEffect(() => {
    if (photoTips.length > 0) {
      const interval = setInterval(() => {
        setCurrentTip((prev) => (prev + 1) % photoTips.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [photoTips])

  const getQualityColor = (quality) => {
    switch(quality?.toLowerCase()) {
      case 'excellent': return 'text-green-600 bg-green-100'
      case 'good': return 'text-blue-600 bg-blue-100'
      case 'fair': return 'text-yellow-600 bg-yellow-100'
      case 'poor': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const BackgroundGeneratorModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">🎨 AI Background Generator</h3>
          <button
            onClick={() => setShowBackgroundGenerator(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="mb-6 p-4 bg-blue-50 rounded-2xl">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-2xl">🤖</span>
            <div>
              <h4 className="font-semibold text-gray-800">AI Detection Result</h4>
              <p className="text-sm text-gray-600">Product type: <span className="font-medium capitalize">{detectedProductType}</span></p>
            </div>
          </div>
        </div>

        {generatingBackground ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">🎨 Generating AI Backgrounds...</h4>
            <p className="text-gray-600">Creating professional backgrounds tailored for your {detectedProductType}</p>
          </div>
        ) : backgroundOptions.length > 0 ? (
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Choose Your AI Background:</h4>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {backgroundOptions.map((option) => (
                <div
                  key={option.id}
                  className="border-2 border-gray-200 rounded-2xl p-4 hover:border-purple-500 cursor-pointer transition-all group"
                  onClick={() => applyBackground(option)}
                >
                  <div className={`bg-gradient-to-br ${option.gradient} rounded-xl p-6 mb-3 group-hover:scale-105 transition-transform`}>
                    <div className="h-24 bg-white/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🎨</span>
                    </div>
                  </div>
                  <h5 className="font-semibold text-gray-800 mb-1">{option.name}</h5>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <button
              onClick={() => generateBackground(detectedProductType)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg transition-all"
            >
              🚀 Generate AI Backgrounds
            </button>
          </div>
        )}

        {processingEnhancement && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">✨ Enhancing Your Photo...</h4>
              <p className="text-gray-600">AI is applying the new background</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  if (!isActive && !showOptions) {
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
            Let AI guide you to take perfect product photos. Get real-time feedback and AI-generated backgrounds for professional results.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4">
              <div className="text-3xl mb-2">🤖</div>
              <h3 className="font-semibold text-gray-800 mb-2">AI Analysis</h3>
              <p className="text-sm text-gray-600">Get instant feedback on photo quality</p>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4">
              <div className="text-3xl mb-2">🎨</div>
              <h3 className="font-semibold text-gray-800 mb-2">AI Backgrounds</h3>
              <p className="text-sm text-gray-600">Generate professional backgrounds instantly</p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4">
              <div className="text-3xl mb-2">💡</div>
              <h3 className="font-semibold text-gray-800 mb-2">Smart Tips</h3>
              <p className="text-sm text-gray-600">Real-time photography guidance</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => setShowOptions(true)}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg transition-all flex items-center space-x-3 mx-auto"
            >
              <span>📷</span>
              <span>Start Photography Assistant</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (showOptions && !isActive) {
    return (
      <div className="glass-card rounded-3xl p-8 shadow-lg border border-orange-100">
        <div className="text-center">
          <button
            onClick={() => setShowOptions(false)}
            className="absolute top-6 left-6 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <span className="text-2xl">←</span>
          </button>
          
          <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-3xl">📸</span>
          </div>
          
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Choose Photo Source
          </h2>
          
          <p className="text-gray-600 mb-8">
            Take a new photo or import from your gallery
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-md mx-auto">
            <button
              onClick={startCamera}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl hover:shadow-lg transition-all group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📷</div>
              <h3 className="font-semibold mb-2">Take New Photo</h3>
              <p className="text-sm opacity-90">Use camera with live AI guidance</p>
            </button>
            
            <button
              onClick={importFromAlbum}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl hover:shadow-lg transition-all group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🖼️</div>
              <h3 className="font-semibold mb-2">Import from Album</h3>
              <p className="text-sm opacity-90">Choose existing photo for analysis</p>
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
      </div>
    )
  }

  return (
    <div className="glass-card rounded-3xl p-6 shadow-lg border border-orange-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          📸 Smart Photography
        </h2>
        <button
          onClick={stopCamera}
          className="text-gray-600 hover:text-red-500 transition-colors"
        >
          <span className="text-2xl">×</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="relative rounded-2xl overflow-hidden bg-black aspect-video">
            {!capturedImage ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 pointer-events-none">
                  <div className="w-full h-full border-2 border-white/30 relative">
                    <div className="absolute top-1/3 left-0 right-0 border-t border-white/20"></div>
                    <div className="absolute bottom-1/3 left-0 right-0 border-t border-white/20"></div>
                    <div className="absolute left-1/3 top-0 bottom-0 border-l border-white/20"></div>
                    <div className="absolute right-1/3 top-0 bottom-0 border-l border-white/20"></div>
                  </div>
                </div>

                {photoTips.length > 0 && (
                  <div className="absolute top-4 left-4 right-4">
                    <div className="bg-black/70 text-white px-4 py-2 rounded-xl text-sm backdrop-blur-sm">
                      <div className="flex items-center space-x-2">
                        <span>💡</span>
                        <span>{photoTips[currentTip]}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                  <button
                    onClick={capturePhoto}
                    className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Image 
                  src={enhancedImage || capturedImage} 
                  alt="Captured product"
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
                
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                  <button
                    onClick={retakePhoto}
                    className="bg-gray-600 text-white px-4 py-2 rounded-xl hover:bg-gray-700 transition-colors text-sm"
                  >
                    🔄 Retake
                  </button>
                  
                  {aiAnalysis?.needsBackgroundImprovement && !enhancedImage && (
                    <button
                      onClick={() => {
                        setShowBackgroundGenerator(true)
                        generateBackground(detectedProductType)
                      }}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all text-sm"
                    >
                      🎨 AI Background
                    </button>
                  )}
                  
                  <button
                    onClick={savePhoto}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all text-sm"
                  >
                    ✓ Save
                  </button>
                </div>
              </>
            )}
            
            <canvas ref={canvasRef} className="hidden" />
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
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-sm text-gray-600">Analyzing your photo...</p>
              </div>
            ) : aiAnalysis ? (
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-gray-800 mb-1">{aiAnalysis.score}/100</div>
                  <div className="text-sm text-gray-600">Photo Quality Score</div>
                  {enhancedImage && (
                    <div className="text-xs text-green-600 mt-1">✨ +25 points from AI enhancement!</div>
                  )}
                </div>

                {aiAnalysis.productType && (
                  <div className="bg-white rounded-xl p-3 border-l-4 border-purple-500">
                    <div className="flex items-center space-x-2">
                      <span className="text-purple-500">🎯</span>
                      <div>
                        <div className="text-sm font-medium text-gray-800">AI Detection</div>
                        <div className="text-xs text-gray-600 capitalize">
                          Product type: {aiAnalysis.productType}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {['lighting', 'composition', 'background', 'focus'].map((metric) => (
                    <div key={metric} className="bg-white rounded-xl p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium capitalize text-gray-700">{metric}</span>
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getQualityColor(aiAnalysis[metric]?.quality)}`}>
                          {aiAnalysis[metric]?.quality}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">{aiAnalysis[metric]?.recommendation}</p>
                      
                      {metric === 'background' && aiAnalysis.needsBackgroundImprovement && !enhancedImage && (
                        <button
                          onClick={() => {
                            setShowBackgroundGenerator(true)
                            generateBackground(detectedProductType)
                          }}
                          className="mt-2 text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-lg hover:shadow-md transition-all"
                        >
                          🎨 Generate AI Background
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-xl p-4">
                  <h4 className="font-medium text-gray-800 mb-3">💡 AI Suggestions</h4>
                  <div className="space-y-2">
                    {aiAnalysis.suggestions.map((suggestion, index) => (
                      <div key={index} className="text-xs text-gray-600 flex items-start space-x-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span>{suggestion}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {!showBackgroundGenerator && (
                  <button
                    onClick={() => {
                      setShowBackgroundGenerator(true)
                      generateBackground(detectedProductType)
                    }}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                  >
                    <span>🎨</span>
                    <span>Try AI Backgrounds</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <div className="text-3xl mb-2">📸</div>
                <p className="text-sm">Capture a photo to get AI analysis</p>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
              <span>📚</span>
              <span>Quick Tips</span>
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div>• Clean your lens before shooting</div>
              <div>• Use natural light when possible</div>
              <div>• Keep backgrounds simple or use AI</div>
              <div>• Show your product's scale</div>
              <div>• Try AI background generation</div>
            </div>
          </div>

          {enhancedImage && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                <span>✨</span>
                <span>AI Enhancement</span>
              </h3>
              <div className="space-y-2 text-sm text-green-700">
                <div>✓ Professional background applied</div>
                <div>✓ Lighting enhanced</div>
                <div>✓ Shadows optimized</div>
                <div>✓ Ready for online store</div>
              </div>
              
              <div className="mt-3 flex space-x-2">
                <button
                  onClick={() => setEnhancedImage(null)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-xs hover:bg-gray-200 transition-colors"
                >
                  View Original
                </button>
                <button
                  onClick={() => setEnhancedImage(enhancedImage)}
                  className="flex-1 bg-green-100 text-green-700 py-2 px-3 rounded-lg text-xs hover:bg-green-200 transition-colors"
                >
                  View Enhanced
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showBackgroundGenerator && <BackgroundGeneratorModal />}
    </div>
  )
}

export default SmartProductPhotography