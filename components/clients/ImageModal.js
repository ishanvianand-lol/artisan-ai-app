'use client';

import React, { useEffect } from 'react';
import { X, Download, Share2, Heart, Star, Eye, Calendar } from 'lucide-react';

const ImageModal = ({ image, onClose, onDownload, onShare, isFavorite, onToggleFavorite }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={handleBackdropClick}>
      <div className="bg-white rounded-2xl max-w-6xl max-h-[90vh] w-full overflow-hidden flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="flex-1 relative bg-gray-100 flex items-center justify-center min-h-[300px] md:min-h-[500px]">
          <img
            src={image.url}
            alt={image.prompt}
            className="max-w-full max-h-full object-contain"
          />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Details Section */}
        <div className="w-full md:w-80 p-6 flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-3">
                {image.prompt}
              </h2>
              {image.isNew && (
                <span className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                  ✨ New Creation
                </span>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <div>
                <p className="text-sm text-gray-500">Rating</p>
                <p className="font-semibold">{image.rating}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Download className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Downloads</p>
                <p className="font-semibold">{image.downloads}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm text-gray-500">Views</p>
                <p className="font-semibold">{Math.floor(Math.random() * 5000) + 1000}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-sm text-gray-500">Created</p>
                <p className="font-semibold text-xs">Today</p>
              </div>
            </div>
          </div>

          {/* Image Details */}
          <div className="space-y-4 mb-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Image Details</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p><span className="font-medium">Dimensions:</span> 1024 x 1024</p>
                <p><span className="font-medium">Format:</span> PNG</p>
                <p><span className="font-medium">Size:</span> 2.3 MB</p>
                <p><span className="font-medium">AI Model:</span> ArtisanAI v2.0</p>
              </div>
            </div>

            {image.category && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Category</h3>
                <span className="inline-block bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                  {image.category}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 mt-auto">
            <button
              onClick={onDownload}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Download className="h-5 w-5" />
              <span>Download High Quality</span>
            </button>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onToggleFavorite}
                className={`py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                  isFavorite
                    ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                    : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500' : ''}`} />
                <span>{isFavorite ? 'Saved' : 'Save'}</span>
              </button>
              
              <button
                onClick={onShare}
                className="py-2 px-4 rounded-lg bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Usage Rights */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-800 text-sm mb-1">Usage Rights</h4>
            <p className="text-xs text-blue-600">
              Free for personal and commercial use. Attribution not required but appreciated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;