'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingBag, User, Sparkles, Menu, X, Bell, Settings } from 'lucide-react';

const Header = ({ mobileMenuOpen, setMobileMenuOpen, favorites }) => {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center">
              <Sparkles className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ArtisanAI
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/client" className="text-gray-900 hover:text-purple-600 transition-colors font-medium">
                Create
              </Link>
              <Link href="/gallery" className="text-gray-500 hover:text-purple-600 transition-colors">
                Gallery
              </Link>
              <Link href="/trending" className="text-gray-500 hover:text-purple-600 transition-colors">
                Trending
              </Link>
              <Link href="/collections" className="text-gray-500 hover:text-purple-600 transition-colors">
                Collections
              </Link>
            </nav>
          </div>
          
          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search artworks..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64 text-sm"
              />
            </div>
            
            {/* Action Buttons */}
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            
            <Link href="/favorites" className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Heart className="h-5 w-5" />
              {favorites && favorites.size > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favorites.size}
                </span>
              )}
            </Link>
            
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <ShoppingBag className="h-5 w-5" />
            </button>
            
            {/* User Menu */}
            <div className="relative">
              <button className="flex items-center space-x-2 p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <User className="h-5 w-5" />
                <span className="hidden md:block text-sm font-medium text-gray-700">Profile</span>
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-gray-600"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-3">
              <Link href="/client" className="text-gray-900 hover:text-purple-600 transition-colors font-medium px-2 py-1">
                Create
              </Link>
              <Link href="/gallery" className="text-gray-500 hover:text-purple-600 transition-colors px-2 py-1">
                Gallery
              </Link>
              <Link href="/trending" className="text-gray-500 hover:text-purple-600 transition-colors px-2 py-1">
                Trending
              </Link>
              <Link href="/collections" className="text-gray-500 hover:text-purple-600 transition-colors px-2 py-1">
                Collections
              </Link>
              
              {/* Mobile Search */}
              <div className="relative px-2 pt-2">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search artworks..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;