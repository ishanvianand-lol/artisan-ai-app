'use client'

import { useState } from 'react'
import { Sparkles, Camera, Wand2, Image, Palette, Download } from 'lucide-react'

export default function AIPromptGenerator({ generatedImages, setGeneratedImages }) {
  const [aiPrompt, setAiPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState('realistic')

  const styles = [
    { id: 'realistic', name: 'Realistic', emoji: '📸' },
    { id: 'artistic', name: 'Artistic', emoji: '🎨' },
    { id: 'vintage', name: 'Vintage', emoji: '📜' },
    { id: 'modern', name: 'Modern', emoji: '✨' }
  ]

  const generateAIImages = async () => {
    if (!aiPrompt.trim()) return
    
    setIsGenerating(true)
    
    // Smart image selection based on prompt keywords
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
        // Default craft items
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
    
    // Simulate loading time with progress
    let progress = 0
    const progressInterval = setInterval(() => {
      progress += 10
      if (progress >= 100) {
        clearInterval(progressInterval)
      }
    }, 300)
    
    setTimeout(() => {
      clearInterval(progressInterval)
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
    }, 4000)
  }

  const quickPrompts = [
    "Exquisite red Banarasi saree with golden zari work",
    "Traditional Madhubani painting with vibrant colors",
    "Elegant silver jewelry with turquoise stones",
    "Hand-carved wooden elephant sculpture",
    "Blue pottery vase with floral patterns",
    "Chanderi silk kurti with block printing"
  ]

  return (
    <div className="space-y-8">
      {/* AI Design Studio Header */}
      <div className="glass-card rounded-3xl p-8 shadow-xl border border-pink-100 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center shadow-xl">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold gradient-text" style={{ fontFamily: 'Playfair Display' }}>
              AI Design Studio
            </h2>
            <p className="text-gray-600 text-lg">Create stunning artisan designs with AI magic</p>
          </div>
        </div>

        {/* Style Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Choose Style</h3>
          <div className="grid grid-cols-4 gap-3">
            {styles.map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                className={`p-4 rounded-2xl border-2 transition-all text-center ${
                  selectedStyle === style.id
                    ? 'border-purple-500 bg-purple-50 shadow-lg'
                    : 'border-gray-200 hover:border-purple-300 bg-white'
                }`}
              >
                <div className="text-2xl mb-2">{style.emoji}</div>
                <div className="text-sm font-medium">{style.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Large Prompt Input */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-3 text-gray-800">
            Describe Your Vision
          </label>
          <textarea
            placeholder="Describe your dream design in detail... 
            
Examples:
• Exquisite red Banarasi saree with intricate golden zari work and traditional motifs
• Vibrant Madhubani painting featuring peacocks and lotus flowers
• Elegant silver necklace with turquoise stones and filigree work"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            className="w-full h-40 p-6 bg-white border-2 border-purple-200 rounded-2xl resize-none focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 text-lg leading-relaxed"
            style={{ fontSize: '16px', lineHeight: '1.6' }}
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-sm text-gray-500">{aiPrompt.length}/500 characters</span>
            <div className="flex items-center space-x-2">
              <Palette className="h-4 w-4 text-purple-500" />
              <span className="text-sm text-gray-600">Be creative and detailed!</span>
            </div>
          </div>
        </div>

        {/* Quick Prompts */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Quick Ideas</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {quickPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => setAiPrompt(prompt)}
                className="p-3 text-left bg-white hover:bg-purple-50 rounded-xl border border-purple-200 hover:border-purple-300 transition-all text-sm"
              >
                <span className="text-purple-600 mr-2">💡</span>
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateAIImages}
          disabled={isGenerating || !aiPrompt.trim()}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-6 rounded-2xl font-bold text-xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 relative overflow-hidden"
        >
          {isGenerating ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-700 animate-pulse"></div>
              <div className="relative flex items-center space-x-3">
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                <Wand2 className="h-6 w-6 animate-pulse" />
                <span>Creating Magic...</span>
              </div>
            </>
          ) : (
            <>
              <Camera className="h-6 w-6" />
              <Sparkles className="h-6 w-6" />
              <span>Generate AI Images</span>
            </>
          )}
        </button>
      </div>

      {/* Generated Images Gallery */}
      {generatedImages.length > 0 && (
        <div className="glass-card rounded-3xl p-8 shadow-xl border border-pink-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold gradient-text" style={{ fontFamily: 'Playfair Display' }}>
              Your AI Creations
            </h3>
            <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
              {generatedImages.length} Images
            </span>
          </div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-6">
            {generatedImages.slice(0, 9).map((item) => (
              <div key={item.id} className="group relative">
                <div className="aspect-square rounded-2xl overflow-hidden border-3 border-purple-200 group-hover:border-purple-400 transition-all shadow-lg group-hover:shadow-2xl">
                 <div className="relative w-full h-full">
  <Image
    src={item.image}
    alt="AI Generated"
    className="object-cover group-hover:scale-110 transition-transform duration-300"
    fill
  />
</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white text-sm font-medium mb-2 line-clamp-2">
                        {item.prompt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-white/80 text-xs bg-black/30 px-2 py-1 rounded-full">
                          {item.style}
                        </span>
                        <button className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all">
                          <Download className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  ✨ AI
                </div>
              </div>
            ))}
          </div>
          
          {generatedImages.length > 9 && (
            <div className="text-center mt-6">
              <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-3 rounded-2xl font-medium hover:shadow-lg transition-all">
                View All {generatedImages.length} Images
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}