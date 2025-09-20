'use client';

import React from 'react';
import { Sparkles, Zap, Wand2 } from 'lucide-react';

const AIPromptGenerator = ({ prompt, setPrompt, handleGenerate, isGenerating }) => {
  const promptSuggestions = [
    'Digital art',
    'Portrait',
    'Landscape', 
    'Abstract',
    'Cyberpunk',
    'Fantasy',
    'Minimalist',
    'Watercolor',
    'Oil painting',
    'Anime style'
  ];

  const quickPrompts = [
    'A mystical forest with glowing mushrooms in cyberpunk style',
    'Portrait of a warrior princess in anime style',
    'Abstract geometric patterns with neon colors',
    'Sunset over mountains in watercolor style',
    'Futuristic city skyline at night'
  ];

  const addSuggestion = (suggestion) => {
    if (!prompt.includes(suggestion.toLowerCase())) {
      setPrompt(prev => prev + (prev ? ', ' : '') + suggestion.toLowerCase());
    }
  };

  const useQuickPrompt = (quickPrompt) => {
    setPrompt(quickPrompt);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 space-y-6">
      {/* Main Prompt Input */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <Sparkles className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 h-5 w-5" />
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your vision... (e.g., 'A mystical forest with glowing mushrooms in cyberpunk style')"
              className="w-full pl-12 pr-4 py-4 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-white/50 text-lg"
              onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
            />
          </div>
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 min-w-[140px] justify-center"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
                <span>Creating...</span>
              </>
            ) : (
              <>
                <Zap className="h-5 w-5" />
                <span>Generate</span>
              </>
            )}
          </button>
        </div>

        {/* Character Counter */}
        <div className="text-right">
          <span className={`text-sm ${prompt.length > 200 ? 'text-red-300' : 'text-purple-200'}`}>
            {prompt.length}/250
          </span>
        </div>
      </div>
      
      {/* Style Tags */}
      <div className="space-y-3">
        <h3 className="text-white font-medium flex items-center space-x-2">
          <Wand2 className="h-4 w-4" />
          <span>Add Style Tags</span>
        </h3>
        <div className="flex flex-wrap gap-2 justify-center">
          {promptSuggestions.map((tag) => (
            <button
              key={tag}
              onClick={() => addSuggestion(tag)}
              className="px-3 py-1 bg-white/20 rounded-full text-sm hover:bg-white/30 transition-colors text-purple-100 hover:text-white border border-white/20 hover:border-white/40"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Prompts */}
      <div className="space-y-3">
        <h3 className="text-white font-medium flex items-center space-x-2">
          <Sparkles className="h-4 w-4" />
          <span>Quick Prompts</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {quickPrompts.map((quickPrompt, index) => (
            <button
              key={index}
              onClick={() => useQuickPrompt(quickPrompt)}
              className="text-left px-3 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-colors text-purple-100 hover:text-white border border-white/10 hover:border-white/30"
            >
              {quickPrompt}
            </button>
          ))}
        </div>
      </div>

      {/* Generation Tips */}
      <div className="bg-white/5 rounded-lg p-4">
        <h4 className="text-white font-medium mb-2">💡 Pro Tips</h4>
        <ul className="text-purple-200 text-sm space-y-1">
          <li>• Be specific about style (watercolor, digital art, oil painting)</li>
          <li>• Include mood words (dramatic, peaceful, vibrant, dark)</li>
          <li>• Mention composition (close-up, wide shot, bird's eye view)</li>
          <li>• Add lighting details (golden hour, neon lights, soft lighting)</li>
        </ul>
      </div>
    </div>
  );
};

export default AIPromptGenerator;