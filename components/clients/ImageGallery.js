'use client';

import React, { useState } from 'react';
import { Heart, Download, Share2, Star, Eye, ZoomIn } from 'lucide-react';
import ImageModal from './ImageModal';

const ImageGallery = ({ images, viewMode, favorites, toggleFavorite }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleDownload = async (image) => {
    try {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `artisan-ai-${image.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleShare = async (image) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this AI artwork!',
          text: `Amazing AI art: "${image.prompt}"`,
          url: window.location.href
        });
      } catch (error) {
        console.error('Share failed:', error);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <>
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
          : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      }`}>
        {images.map((image) => (
          <div
            key={image.id}
            className={`group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
              image.isNew ? 'ring-2 ring-purple-400 ring-opacity-60' : ''
            }`}
          >
            <div className="relative overflow-hidden">
              <img
                src={image.url}
                alt={image.prompt}
                className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer ${
                  viewMode === 'grid' ? 'h-64' : 'h-48'
                }`}
                onClick={() => setSelectedImage(image)}
              />
              
              {/* New Badge */}
              {image.isNew && (
                <span className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium px-2 py-1 rounded-full animate-pulse">
                  ✨ New
                </span>
              )}
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex space-x-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(image);
                    }}
                    className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    title="View Full Size"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(image);
                    }}
                    className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    title="Download"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(image);
                    }}
                    className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    title="Share"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {/* Favorite Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(image.id);
                }}
                className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                title={favorites.has(image.id) ? 'Remove from Favorites' : 'Add to Favorites'}
              >
                <Heart
                  className={`h-4 w-4 transition-colors ${
                    favorites.has(image.id) ? 'text-red-500 fill-red-500' : 'text-gray-600'
                  }`}
                />
              </button>

              {/* View Count */}
              <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                <Eye className="h-3 w-3" />
                <span>{Math.floor(Math.random() * 1000) + 100}</span>
              </div>
            </div>
            
            {/* Card Content */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2" title={image.prompt}>
                {image.prompt}
              </h3>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span>{image.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Download className="h-3 w-3" />
                  <span>{image.downloads}</span>
                </div>
              </div>
              
              {/* Tags */}
              {image.category && (
                <div className="mt-2">
                  <span className="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">
                    {image.category}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal 
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onDownload={() => handleDownload(selectedImage)}
          onShare={() => handleShare(selectedImage)}
          isFavorite={favorites.has(selectedImage.id)}
          onToggleFavorite={() => toggleFavorite(selectedImage.id)}
        />
      )}
    </>
  );
};

export default ImageGallery;