'use client';

import { useState, useEffect, useRef } from 'react';
import { useLogout } from '@/components/logout';

const ProfileMenu = ({ userData, products, setUserData }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  const fileInputRef = useRef(null);
  const profileMenuRef = useRef(null);

  const { handleLogout, handleDeleteAccount } = useLogout();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setUploadingPhoto(true);
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newPhotoUrl = e.target.result;
          const updatedUserData = { ...userData, photo: newPhotoUrl };
          setUserData(updatedUserData);
          localStorage.setItem('userData', JSON.stringify(updatedUserData));
          setUploadingPhoto(false);
          setShowProfileMenu(false);
        };
        reader.readAsDataURL(file);
      }, 1500);
    }
  };

  const LogoutDialog = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">👋</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Logout Confirmation</h3>
          <p className="text-gray-600">Are you sure you want to logout from your artisan account?</p>
        </div>
        <div className="flex space-x-3">
          <button onClick={() => setShowLogoutDialog(false)} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors">Cancel</button>
          <button onClick={() => { setShowLogoutDialog(false); handleLogout(); }} className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">Yes, Logout</button>
        </div>
      </div>
    </div>
  );

  const DeleteAccountDialog = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h3 className="text-xl font-bold text-red-600 mb-2">Delete Account</h3>
          <p className="text-gray-600 mb-4">This action is permanent and cannot be undone.</p>
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-left">
            <h4 className="font-semibold text-red-800 mb-2">This will permanently delete:</h4>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• Your profile and account data</li>
              <li>• All your products ({products.length} items)</li>
              <li>• Your heritage story</li>
              <li>• Order history and reviews</li>
              <li>• Social media connections</li>
            </ul>
          </div>
        </div>
        <div className="flex space-x-3">
          <button onClick={() => setShowDeleteDialog(false)} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors">Keep Account</button>
          <button onClick={() => { setShowDeleteDialog(false); handleDeleteAccount(products); }} className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">Delete Forever</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative z-50" ref={profileMenuRef}>
      <button
        onClick={() => setShowProfileMenu(!showProfileMenu)}
        className="flex items-center space-x-3 hover:bg-white/50 rounded-2xl p-2 transition-all"
      >
        <div className="text-right">
          <p className="font-semibold text-gray-800">{userData.name}</p>
          <p className="text-sm text-gray-600">{userData.email}</p>
        </div>
        <div className="relative">
          <img src={userData.photo} alt={userData.name} className="w-12 h-12 rounded-2xl border-3 border-orange-200 shadow-lg" />
          {uploadingPhoto && (
            <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        <div className="text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {showProfileMenu && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <img src={userData.photo} alt={userData.name} className="w-10 h-10 rounded-xl" />
              <div>
                <p className="font-semibold text-gray-800 text-sm">{userData.name}</p>
                <p className="text-xs text-gray-600">{userData.email}</p>
              </div>
            </div>
          </div>
          <div className="py-2">
            <button onClick={() => fileInputRef.current?.click()} className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-left">
              <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center"><span className="text-blue-600 text-sm">📸</span></div>
              <div><p className="font-medium text-sm">Change Photo</p><p className="text-xs text-gray-500">Upload new profile picture</p></div>
            </button>
            <input type="file" ref={fileInputRef} onChange={handlePhotoUpload} accept="image/*" className="hidden" />
            <button onClick={() => setShowLogoutDialog(true)} className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors text-left">
              <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center"><span className="text-orange-600 text-sm">🚪</span></div>
              <div><p className="font-medium text-sm">Logout</p><p className="text-xs text-gray-500">Sign out of your account</p></div>
            </button>
            <div className="border-t border-gray-100 my-2"></div>
            <button onClick={() => setShowDeleteDialog(true)} className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors text-left">
              <div className="w-8 h-8 bg-red-100 rounded-xl flex items-center justify-center"><span className="text-red-600 text-sm">🗑️</span></div>
              <div><p className="font-medium text-sm">Delete Account</p><p className="text-xs text-red-400">Permanently remove your account</p></div>
            </button>
          </div>
        </div>
      )}
      {showLogoutDialog && <LogoutDialog />}
      {showDeleteDialog && <DeleteAccountDialog />}
    </div>
  );
};

export default ProfileMenu;