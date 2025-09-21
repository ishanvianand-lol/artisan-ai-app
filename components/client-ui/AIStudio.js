import { useState } from 'react'
import { Sparkles, Camera, Wand2, Palette, Download, Share2, Heart, X } from 'lucide-react'
import Image from 'next/image';

export default function AIStudio({ 
  generatedImages, 
  setGeneratedImages, 
  showNotification,
  selectedImage,
  setSelectedImage,
  favorites,
  toggleFavorite
}) {
  const [aiPrompt, setAiPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState('realistic')

  const styles = [
    { id: 'realistic', name: 'Realistic', emoji: '📸' },
    { id: 'artistic', name: 'Artistic', emoji: '🎨' },
    { id: 'vintage', name: 'Vintage', emoji: '📜' },
    { id: 'modern', name: 'Modern', emoji: '✨' }
  ]

  const quickPrompts = [
    "Exquisite red Banarasi saree with golden zari work",
    "Traditional Madhubani painting with vibrant colors",
    "Elegant silver jewelry with turquoise stones",
    "Hand-carved wooden elephant sculpture",
    "Blue pottery vase with floral patterns",
    "Chanderi silk kurti with block printing"
  ]

  const generateAIImages = async () => {
    if (!aiPrompt.trim()) {
      showNotification('Please enter a prompt to generate images!', 'error')
      return
    }
    
    setIsGenerating(true)
    
    const getRelevantImages = (prompt) => {
      const lowerPrompt = prompt.toLowerCase()
      
      if (lowerPrompt.includes('saree') || lowerPrompt.includes('sari') || lowerPrompt.includes('banarasi')) {
        return [
          "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&h=600&fit=crop", 
          "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=600&h=600&fit=crop"
        ]
      } else if (lowerPrompt.includes('kurti') || lowerPrompt.includes('dress') || lowerPrompt.includes('clothing')) {
        return [
          "https://images.unsplash.com/photo-1564257577-b9e8d6cf1d99?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1583846588171-7ed5be73b26b?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1566479179817-c1c0bac61e2b?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1562137369-1a1a0bc66744?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&h=600&fit=crop"
        ]
      } else if (lowerPrompt.includes('jewelry') || lowerPrompt.includes('necklace') || lowerPrompt.includes('earring')) {
        return [
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1608042314453-ae338d80c427?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1603216485588-bc39055ff3b3?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=600&h=600&fit=crop"
        ]
      } else if (lowerPrompt.includes('painting') || lowerPrompt.includes('art') || lowerPrompt.includes('canvas')) {
        return [
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1536924430914-91f9e2041d83?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=600&h=600&fit=crop"
        ]
      } else if (lowerPrompt.includes('pottery') || lowerPrompt.includes('ceramic') || lowerPrompt.includes('vase')) {
        return [
          "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1493106819251-66d7a24c2e8c?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1615842974426-55c372fd8d8b?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop"
        ]
      } else {
        return [
          "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1564257577-b9e8d6cf1d99?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=600&fit=crop"
        ]
      }
    }
    
    try {
      showNotification('Generating your AI images...', 'info')
      
      setTimeout(() => {
        const relevantImages = getRelevantImages(aiPrompt)
        const generated = relevantImages.slice(0, 6).map((img, index) => ({
          id: `gen-${Date.now()}-${index}`,
          image: img,
          prompt: aiPrompt,
          style: selectedStyle,
          timestamp: new Date().toLocaleString()
        }))
        
        setGeneratedImages([...generated, ...generatedImages])
        setIsGenerating(false)
        setAiPrompt('')
        showNotification(`Generated ${generated.length} images successfully!`, 'success')
      }, 3000)
      
    } catch (error) {
      console.error('Generation error:', error)
      setIsGenerating(false)
      showNotification('Failed to generate images. Please try again.', 'error')
    }
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
      showNotification('Download failed. Please try again.', 'error')
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
      navigator.clipboard.writeText(image.image)
      showNotification('Image URL copied to clipboard!', 'success')
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* AI Design Studio */}
      <div className="glass-card rounded-3xl p-12 shadow-2xl border border-pink-100 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="flex items-center space-x-6 mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center shadow-xl floating-animation">
            <Sparkles className="h-10 w-10 text-white" />
          </div>
          <div>
            <h2 className="text-4xl font-bold gradient-text mb-2" style={{ fontFamily: 'Playfair Display' }}>
              AI Design Studio
            </h2>
            <p className="text-gray-600 text-xl">Create stunning artisan designs with AI magic</p>
          </div>
        </div>

        {/* Style Selection */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Choose Your Style</h3>
          <div className="grid grid-cols-4 gap-4">
            {styles.map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`p-6 rounded-2xl border-3 transition-all text-center ${
                  selectedStyle === style.id
                    ? 'border-purple-500 bg-purple-50 shadow-xl transform scale-105'
                    : 'border-gray-200 hover:border-purple-300 bg-white hover:shadow-lg'
                }`}
              >
                <div className="text-4xl mb-3">{style.emoji}</div>
                <div className="text-lg font-medium">{style.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Prompt Input */}
        <div className="mb-8">
          <label className="block text-2xl font-semibold mb-4 text-gray-800">
            Describe Your Dream Design
          </label>
          <textarea
            placeholder="Describe your dream design in detail... 

Examples:
• Exquisite red Banarasi saree with intricate golden zari work and traditional motifs
• Vibrant Madhubani painting featuring peacocks and lotus flowers  
• Elegant silver necklace with turquoise stones and filigree work
• Hand-carved wooden elephant with intricate patterns
• Blue pottery dinner set with floral designs"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            className="w-full h-48 p-8 bg-white border-3 border-purple-200 rounded-3xl resize-none focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 text-xl leading-relaxed shadow-inner"
            style={{ fontSize: '18px', lineHeight: '1.8', fontWeight: '500' }}
          />
          <div className="flex items-center justify-between mt-4">
            <span className="text-lg text-gray-500">{aiPrompt.length}/1000 characters</span>
            <div className="flex items-center space-x-3">
              <Palette className="h-6 w-6 text-purple-500" />
              <span className="text-lg text-gray-600 font-medium">Be creative and detailed!</span>
            </div>
          </div>
        </div>

        {/* Quick Prompts */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Quick Ideas</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {quickPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => setAiPrompt(prompt)}
                className="p-4 text-left bg-white hover:bg-purple-50 rounded-2xl border-2 border-purple-200 hover:border-purple-300 transition-all text-lg hover:shadow-lg"
              >
                <span className="text-purple-600 mr-3 text-xl">💡</span>
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateAIImages}
          disabled={isGenerating || !aiPrompt.trim()}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-8 rounded-3xl font-bold text-2xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-4 relative overflow-hidden group"
        >
          {isGenerating ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-700 animate-pulse"></div>
              <div className="relative flex items-center space-x-4">
                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                <Wand2 className="h-8 w-8 animate-pulse" />
                <span>Creating Magic...</span>
              </div>
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center space-x-4">
                <Camera className="h-8 w-8" />
                <Sparkles className="h-8 w-8" />
                <span>🎨 Generate AI Images</span>
                <div className="text-3xl">✨</div>
              </div>
            </>
          )}
        </button>
        
        {/* Status Message */}
        <div className="mt-4 text-center">
          {isGenerating ? (
            <p className="text-purple-600 font-semibold text-lg animate-pulse">
              🎨 AI is crafting your design... This may take a few seconds
            </p>
          ) : (
            <p className="text-gray-600 text-lg">
              {aiPrompt.trim() ? '✨ Ready to generate your masterpiece!' : '📝 Enter a description to get started'}
            </p>
          )}
        </div>
      </div>

      {/* Generated Images Gallery */}
      {generatedImages.length > 0 && (
        <div className="glass-card rounded-3xl p-8 shadow-xl border border-pink-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-3xl font-bold gradient-text mb-2" style={{ fontFamily: 'Playfair Display' }}>
                Your AI Creations
              </h3>
              <p className="text-gray-600 text-lg">
                Browse and manage your AI-generated designs
              </p>
            </div>
            <span className="bg-purple-100 text-purple-800 px-6 py-3 rounded-full text-lg font-bold">
              {generatedImages.length} Images Created
            </span>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {generatedImages.slice(0, 9).map((item) => (
              <div key={item.id} className="group relative">
                <div className="aspect-square rounded-3xl overflow-hidden border-3 border-purple-200 group-hover:border-purple-400 transition-all shadow-xl group-hover:shadow-2xl">
                <div className="relative w-full h-full">
  <Image
    src={item.image}
    alt="AI Generated"
    className="object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
    onClick={() => setSelectedImage(item)}
    fill
  />
</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-white text-sm font-semibold mb-3 line-clamp-2">
                        {item.prompt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-white/90 text-xs bg-black/40 px-3 py-2 rounded-full backdrop-blur-sm">
                          {item.style}
                        </span>
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleFavorite(item.id)
                            }}
                            className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all"
                          >
                            <Heart className={`h-5 w-5 ${favorites.includes(item.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              shareImage(item)
                            }}
                            className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all"
                          >
                            <Share2 className="h-5 w-5 text-white" />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              downloadImage(item.image, `artisan-${item.id}.jpg`)
                            }}
                            className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all"
                          >
                            <Download className="h-5 w-5 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl">
                  ✨ AI Generated
                </div>
                {favorites.includes(item.id) && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-xl">
                    <Heart className="h-5 w-5 fill-current" />
                  </div>
                )}
                
                {/* Image Info */}
                <div className="mt-4 p-4 bg-white rounded-2xl shadow-md">
                  <p className="text-gray-800 font-medium line-clamp-2 mb-2">
                    {item.prompt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{item.timestamp}</span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-medium">
                      {item.style}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {generatedImages.length > 9 && (
            <div className="text-center mt-8">
              <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all">
                View All {generatedImages.length} Images
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}