'use client';

import React, { useState } from 'react';
import { Search, Wand2, MessageCircle, Star, Heart, ShoppingCart, Camera, Palette, Send, Sparkles, ArrowRight, CheckCircle, Filter, Grid3X3, List, SortAsc, Eye, Plus, Zap, Gift, User, LogOut, Bell, MapPin, Phone, Mail, Clock, Truck } from 'lucide-react';

const KalakariComplete = () => {
  const [currentView, setCurrentView] = useState('products');
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showCustomizationModal, setShowCustomizationModal] = useState(false);
  const [customizationRequest, setCustomizationRequest] = useState('');
  const [selectedArtisan, setSelectedArtisan] = useState(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('All Crafts');
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [showArtisanModal, setShowArtisanModal] = useState(false);

  // RELEVANT INDIAN HANDICRAFT PRODUCTS
  const products = [
    {
      id: 1,
      name: "Handwoven Banarasi Silk Saree - Golden Zari",
      price: 8500,
      originalPrice: 12000,
      discount: 29,
      rating: 4.9,
      reviews: 189,
      category: "Sarees",
      artisan: "Meera Devi",
      location: "Varanasi, UP",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop",
      badge: "Premium",
      description: "Traditional handwoven Banarasi silk with intricate golden zari work"
    },
    {
      id: 2,
      name: "Madhubani Painting - Peacock Design",
      price: 2500,
      originalPrice: 3200,
      discount: 22,
      rating: 4.8,
      reviews: 324,
      category: "Art & Paintings",
      artisan: "Priya Sharma",
      location: "Madhubani, Bihar",
      image: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=400&fit=crop",
      badge: "Bestseller",
      description: "Authentic Madhubani art featuring traditional peacock motifs"
    },
    {
      id: 3,
      name: "Blue Pottery Vase Set",
      price: 1800,
      originalPrice: 2400,
      discount: 25,
      rating: 4.7,
      reviews: 256,
      category: "Pottery & Ceramics",
      artisan: "Ravi Kumar",
      location: "Jaipur, Rajasthan",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      badge: "Trending",
      description: "Traditional Jaipur blue pottery with floral designs"
    },
    {
      id: 4,
      name: "Kundan Meenakari Necklace",
      price: 5600,
      originalPrice: 7200,
      discount: 22,
      rating: 4.9,
      reviews: 145,
      category: "Jewelry",
      artisan: "Rajesh Soni",
      location: "Jaipur, Rajasthan",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
      badge: "Premium",
      description: "Handcrafted Kundan jewelry with traditional meenakari work"
    },
    {
      id: 5,
      name: "Pashmina Shawl - Hand Embroidered",
      price: 6800,
      originalPrice: 9000,
      discount: 24,
      rating: 4.9,
      reviews: 134,
      category: "Textiles",
      artisan: "Farida Begum",
      location: "Srinagar, Kashmir",
      image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=400&h=400&fit=crop",
      badge: "Premium",
      description: "Authentic Kashmiri pashmina with intricate hand embroidery"
    },
    {
      id: 6,
      name: "Warli Tribal Painting",
      price: 1800,
      originalPrice: 2300,
      discount: 22,
      rating: 4.6,
      reviews: 156,
      category: "Art & Paintings",
      artisan: "Ramesh Mashe",
      location: "Dahanu, Maharashtra",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop",
      description: "Traditional Warli tribal art depicting village life"
    }
  ];

  // Categories with proper Indian craft categories
  const categories = [
    { name: "All Crafts", icon: "🎨", count: 18432 },
    { name: "Sarees", icon: "🥻", count: 2847 },
    { name: "Art & Paintings", icon: "🖼️", count: 1653 },
    { name: "Textiles", icon: "🧵", count: 3241 },
    { name: "Pottery & Ceramics", icon: "🏺", count: 987 },
    { name: "Jewelry", icon: "💍", count: 1876 },
    { name: "Clothing", icon: "👗", count: 2134 }
  ];

  // Indian Artisans
  const artisans = [
    {
      id: 1,
      name: "Priya Sharma",
      specialty: "Madhubani Paintings",
      location: "Madhubani, Bihar",
      rating: 4.8,
      experience: "15 years",
      phone: "+91 98765 43210",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop",
      description: "Master artist in traditional Madhubani painting techniques"
    },
    {
      id: 2,
      name: "Ravi Kumar",
      specialty: "Blue Pottery",
      location: "Jaipur, Rajasthan",
      rating: 4.9,
      experience: "20 years",
      phone: "+91 98765 43211",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      description: "Expert craftsman in traditional Jaipur blue pottery"
    },
    {
      id: 3,
      name: "Meera Devi",
      specialty: "Handloom Weaving",
      location: "Varanasi, UP",
      rating: 4.7,
      experience: "25 years",
      phone: "+91 98765 43212",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      description: "Master weaver specializing in Banarasi silk sarees"
    }
  ];

  // Image Generation using Pollinations.ai
  const generateImage = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    try {
      const enhancedPrompt = `Beautiful authentic Indian handicraft: ${prompt}. Traditional, colorful, detailed, high quality, cultural art style, vibrant colors, heritage design, Indian craftsmanship`;
      const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(enhancedPrompt)}?width=512&height=512&model=flux&seed=${Date.now()}`;
      
      // Simulate loading time
      await new Promise(resolve => setTimeout(resolve, 3000));
      setGeneratedImage(pollinationsUrl);
      
    } catch (error) {
      console.error('Image generation failed:', error);
      // Fallback to a craft image
      const fallbackUrl = `https://picsum.photos/512/512?random=${Date.now()}`;
      setGeneratedImage(fallbackUrl);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setSelectedProduct(product);
    setShowCheckoutModal(true);
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All Crafts' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.artisan.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCustomOrder = () => {
    if (!generatedImage) return;
    
    // Find artisans who could potentially make this design
    const availableArtisans = artisans.filter(artisan => {
      // Logic to match artisan specialty with the generated design
      return true; // For now, show all artisans
    });
    
    setShowArtisanModal(true);
  };

  const submitCustomOrder = () => {
    if (!selectedArtisan || !customizationRequest.trim()) return;
    
    // Simulate order submission
    alert(`Custom order submitted to ${selectedArtisan.name}! They will contact you within 24 hours.`);
    setShowArtisanModal(false);
    setShowCustomizationModal(false);
    setCustomizationRequest('');
    setSelectedArtisan(null);
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative group">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        {product.badge && (
          <span className={`absolute top-3 left-3 px-3 py-1 text-white text-xs font-bold rounded-full ${
            product.badge === 'Premium' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
            product.badge === 'Bestseller' ? 'bg-gradient-to-r from-green-500 to-teal-500' :
            product.badge === 'Trending' ? 'bg-gradient-to-r from-orange-500 to-red-500' :
            'bg-gradient-to-r from-blue-500 to-indigo-500'
          }`}>
            {product.badge}
          </span>
        )}
        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all"
        >
          <Heart
            className={`w-5 h-5 ${wishlist.includes(product.id) ? 'text-red-500 fill-current' : 'text-gray-600'}`}
          />
        </button>
        <div className="absolute bottom-3 right-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
          {product.discount}% OFF
        </div>
        
        {/* Hover overlay with quick actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-2">
            <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
              <Eye className="w-4 h-4 text-gray-600" />
            </button>
            <button 
              onClick={() => addToCart(product)}
              className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-bold text-gray-900 text-lg line-clamp-2 hover:text-orange-600 cursor-pointer">
            {product.name}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
            <span>by {product.artisan}</span>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <MapPin className="w-3 h-3" />
              <span>{product.location}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
          <span className="text-lg text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => addToCart(product)}
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all flex items-center justify-center space-x-1"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
          <button 
            onClick={() => toggleWishlist(product.id)}
            className="px-4 py-2 border-2 border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
          >
            <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );

  const handleLogout = () => {
    // Handle logout logic
    setShowUserMenu(false);
    alert('Logged out successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">K</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                  Kalakari
                </h1>
                <p className="text-sm text-gray-600">Authentic Indian Handicrafts</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for sarees, paintings, pottery, jewelry..."
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all text-gray-700"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-orange-500 transition-colors" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  2
                </span>
              </div>
              
              <div className="relative">
                <Heart 
                  className={`w-6 h-6 cursor-pointer hover:text-red-500 transition-colors ${wishlist.length > 0 ? 'text-red-500' : 'text-gray-600'}`}
                />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </div>
              
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-600 cursor-pointer hover:text-orange-500 transition-colors" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </div>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-semibold text-gray-900">John Doe</p>
                      <p className="text-sm text-gray-600">john@example.com</p>
                    </div>
                    <button className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors">
                      <User className="w-4 h-4 text-gray-500" />
                      <span>Profile</span>
                    </button>
                    <button className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors">
                      <ShoppingCart className="w-4 h-4 text-gray-500" />
                      <span>My Orders</span>
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-red-50 text-red-600 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-4 flex space-x-6 border-b">
            <button
              onClick={() => setCurrentView('products')}
              className={`pb-3 px-1 font-semibold transition-colors relative ${
                currentView === 'products'
                  ? 'text-orange-600 border-b-2 border-orange-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Browse Products
            </button>
            <button
              onClick={() => setCurrentView('ai-generator')}
              className={`pb-3 px-1 font-semibold transition-colors relative flex items-center space-x-2 ${
                currentView === 'ai-generator'
                  ? 'text-orange-600 border-b-2 border-orange-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Design Studio</span>
              <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-1 rounded-full">NEW</span>
            </button>
          </div>
        </div>
      </div>

      {/* Products View */}
      {currentView === 'products' && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex gap-6">
            {/* Left Sidebar */}
            <div className="w-64 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full text-left p-3 rounded-lg transition-all flex items-center justify-between ${
                        selectedCategory === category.name
                          ? 'bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 font-semibold shadow-sm'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{category.icon}</span>
                        <span>{category.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {category.count.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white">
                <div className="flex items-center space-x-2 mb-3">
                  <Zap className="w-5 h-5" />
                  <h3 className="font-bold">Trending This Week</h3>
                </div>
                <p className="text-sm opacity-90 mb-3">15% more interest • 2.3K+ views today</p>
                <button className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors">
                  Explore Trends
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 space-y-6">
              <div className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    <span>Filters</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <SortAsc className="w-4 h-4" />
                    <span>Sort by: Popular</span>
                  </button>
                  <span className="text-sm text-gray-600 font-medium">
                    {filteredProducts.length} products found
                  </span>
                </div>

                <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-orange-600' : 'text-gray-600'}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-orange-600' : 'text-gray-600'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="text-center pt-8">
                <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                  Load More Products
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Generator View */}
      {currentView === 'ai-generator' && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-full px-6 py-2 mb-4">
              <Sparkles className="w-5 h-5 text-orange-600" />
              <span className="text-orange-700 font-semibold">AI-Powered Design Studio</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Create Your Dream Handicraft</h2>
            <p className="text-xl text-gray-600">Describe your vision and let our AI bring it to life, then get it custom made by master artisans</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg">
                    <Wand2 className="w-6 h-6 text-orange-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Create Your Vision</h2>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe your dream handicraft... (e.g., 'A beautiful hand-painted Madhubani art piece featuring peacocks and floral motifs in vibrant blues and greens')"
                      className="w-full p-4 border-2 border-gray-200 rounded-xl resize-none h-32 text-lg placeholder-gray-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
                    />
                    <div className="absolute bottom-3 right-3 text-sm text-gray-400">
                      {prompt.length}/500
                    </div>
                  </div>

                  <button
                    onClick={generateImage}
                    disabled={isGenerating || !prompt.trim()}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        <span>Generating Magic...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-6 h-6" />
                        <span>Generate Design</span>
                      </>
                    )}
                  </button>

                  {/* Quick Prompt Suggestions */}
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 font-medium">Quick Suggestions:</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Madhubani peacock painting",
                        "Blue pottery vase with flowers",
                        "Kundan jewelry set",
                        "Pashmina shawl design"
                      ].map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => setPrompt(suggestion)}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-orange-100 hover:text-orange-700 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Generated Image Display */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Your Generated Design</h3>
                
                {generatedImage ? (
                  <div className="space-y-4">
                    <div className="relative group">
                      <img
                        src={generatedImage}
                        alt="Generated craft design"
                        className="w-full rounded-xl shadow-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl flex items-center justify-center">
                        <div className="flex space-x-3">
                          <button className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors">
                            <Camera className="w-5 h-5 text-gray-700" />
                          </button>
                          <button className="p-3 bg-white rounded-full hover:bg-gray-100 transition-colors">
                            <Heart className="w-5 h-5 text-gray-700" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Design Actions */}
                    <div className="space-y-3">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <div className="p-1 bg-yellow-100 rounded-full">
                            <Zap className="w-4 h-4 text-yellow-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-yellow-800 mb-1">Design Ready!</h4>
                            <p className="text-sm text-yellow-700">
                              Love this design? Our master artisans can bring it to life for you.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={handleCustomOrder}
                          className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Order Custom</span>
                        </button>
                        
                        <button
                          onClick={() => setPrompt('')}
                          className="flex items-center justify-center space-x-2 border-2 border-orange-500 text-orange-600 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-all"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Try Again</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-64 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <Palette className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Your generated design will appear here</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Recent Generations */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Generations</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="relative group cursor-pointer">
                      <img
                        src={`https://picsum.photos/200/200?random=${item}`}
                        alt={`Recent design ${item}`}
                        className="w-full h-20 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                        <Eye className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Order Modal */}
      {showArtisanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Choose Your Artisan</h2>
                  <p className="text-gray-600">Select a master craftsman to bring your design to life</p>
                </div>
                <button
                  onClick={() => setShowArtisanModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {generatedImage && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Your Design</h3>
                    <img
                      src={generatedImage}
                      alt="Generated design"
                      className="w-full rounded-lg shadow-md"
                    />
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Available Artisans</h3>
                  <div className="space-y-4">
                    {artisans.map((artisan) => (
                      <div
                        key={artisan.id}
                        onClick={() => setSelectedArtisan(artisan)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedArtisan?.id === artisan.id
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={artisan.image}
                            alt={artisan.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{artisan.name}</h4>
                            <p className="text-sm text-gray-600">{artisan.specialty}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <MapPin className="w-3 h-3 text-gray-400" />
                              <span className="text-sm text-gray-500">{artisan.location}</span>
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600">{artisan.rating}</span>
                              <span className="text-sm text-gray-400">• {artisan.experience}</span>
                            </div>
                          </div>
                          {selectedArtisan?.id === artisan.id && (
                            <CheckCircle className="w-6 h-6 text-orange-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {selectedArtisan && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Describe your requirements in detail
                    </label>
                    <textarea
                      value={customizationRequest}
                      onChange={(e) => setCustomizationRequest(e.target.value)}
                      placeholder="Please provide details about size, materials, colors, delivery timeline, and any special requirements..."
                      className="w-full p-4 border-2 border-gray-200 rounded-lg resize-none h-32 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all"
                    />
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setShowArtisanModal(false)}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={submitCustomOrder}
                      disabled={!customizationRequest.trim()}
                      className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                    >
                      Submit Custom Order
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckoutModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Added to Cart</h2>
                <button
                  onClick={() => setShowCheckoutModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedProduct.name}</h3>
                  <p className="text-sm text-gray-600">by {selectedProduct.artisan}</p>
                  <p className="font-bold text-orange-600">₹{selectedProduct.price.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCheckoutModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={() => {
                    setShowCheckoutModal(false);
                    alert('Proceeding to checkout...');
                  }}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Checkout</span>
                </button>
              </div>

              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-700 font-medium">
                    Free delivery on orders above ₹2,000
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KalakariComplete;