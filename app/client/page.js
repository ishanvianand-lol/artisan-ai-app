'use client';

import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, User, Sparkles, Download, Share2, Filter, Grid, List, Star, Zap, Menu, X } from 'lucide-react';
import Header from '@/components/ui/Header';
import AIPromptGenerator from '@/components/clients/AIPromptGenerator';
import ImageGallery from '@/components/clients/ImageGallery';

const ClientDashboard = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImages, setGeneratedImages] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Mock data for demonstration
  const mockImages = [
    { id: 1, url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=400&fit=crop', prompt: 'Abstract digital art with neon colors', rating: 4.8, downloads: 234, category: 'abstract' },
    { id: 2, url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop', prompt: 'Futuristic cyberpunk landscape', rating: 4.9, downloads: 456, category: 'landscape' },
    { id: 3, url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=400&fit=crop', prompt: 'Neon cityscape at night', rating: 4.7, downloads: 189, category: 'cityscape' },
    { id: 4, url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop', prompt: 'Ocean waves digital art', rating: 4.6, downloads: 321, category: 'nature' },
    { id: 5, url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=400&fit=crop', prompt: 'Space nebula artwork', rating: 4.8, downloads: 278, category: 'space' },
    { id: 6, url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop', prompt: 'Mountain landscape painting', rating: 4.5, downloads: 167, category: 'landscape' }
  ];

  const categories = ['all', 'abstract', 'landscape', 'portrait', 'nature', 'cityscape', 'space'];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/images/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      
      if (response.ok) {
        const newImage = await response.json();
        setGeneratedImages(prev => [newImage, ...prev]);
      }
    } catch (error) {
      console.error('Generation failed:', error);
      // Fallback to mock data for demo
      const mockNewImage = {
        id: Date.now(),
        url: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000000)}?w=400&h=400&fit=crop`,
        prompt: prompt,
        rating: (4.0 + Math.random()).toFixed(1),
        downloads: Math.floor(Math.random() * 500),
        category: 'generated',
        isNew: true
      };
      setGeneratedImages(prev => [mockNewImage, ...prev]);
    } finally {
      setIsGenerating(false);
      setPrompt('');
    }
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const allImages = [...generatedImages, ...mockImages];
  const filteredImages = selectedCategory === 'all' ? allImages : 
    allImages.filter(img => img.category === selectedCategory || img.prompt.toLowerCase().includes(selectedCategory));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        favorites={favorites}
      />

      {/* AI Generation Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Create Stunning Art with AI</h1>
          <p className="text-xl mb-8 text-purple-100">Transform your imagination into beautiful artwork in seconds</p>
          
          <AIPromptGenerator 
            prompt={prompt}
            setPrompt={setPrompt}
            handleGenerate={handleGenerate}
            isGenerating={isGenerating}
          />
        </div>
      </section>

      {/* Gallery Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
            
            <div className="hidden sm:block text-sm text-gray-500">
              {filteredImages.length} artworks
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isGenerating && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8 mb-8 text-center">
            <div className="animate-pulse">
              <Sparkles className="h-16 w-16 mx-auto text-purple-400 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Creating Your Masterpiece</h3>
              <p className="text-gray-600">Our AI is painting your vision into reality...</p>
              <div className="mt-4 w-64 mx-auto bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full animate-pulse" style={{width: '70%'}}></div>
              </div>
            </div>
          </div>
        )}

        {/* Image Gallery */}
        <ImageGallery 
          images={filteredImages}
          viewMode={viewMode}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />

        {/* Empty State */}
        {filteredImages.length === 0 && !isGenerating && (
          <div className="text-center py-16">
            <Sparkles className="h-20 w-20 mx-auto text-gray-300 mb-6" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-4">No artworks yet</h3>
            <p className="text-gray-500 text-lg">Start creating by entering a prompt above!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;