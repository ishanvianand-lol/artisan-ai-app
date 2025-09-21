'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase'; // Corrected import path
import AIPromptGenerator from '@/components/clients/AIPromptGenerator';
import ProductCatalog from '../../components/ProductCatalog';
import SocialIntegration from '../../components/SocialIntegration';
import SmartProductPhotography from '../../components/SmartProductPhotography';
import ProfileMenu from '@/components/ProfileMenu';

export default function SellerDashboard() {
  const [userData, setUserData] = useState(null);
  const [aiStory, setAiStory] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        // No authenticated user, redirect to login page
        router.push('/');
        return;
      }

      // User is authenticated, now check localStorage for user data
      const storedUserData = localStorage.getItem('userData');
      const storedProducts = localStorage.getItem('userProducts');
      const storedStory = localStorage.getItem('userStory');

      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      } else {
        // User is logged in via Firebase but localStorage is empty, create new data
        const newUserData = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          uid: user.uid,
          joinDate: new Date().toISOString(),
          verified: true
        };
        setUserData(newUserData);
        localStorage.setItem('userData', JSON.stringify(newUserData));
      }

      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      }

      if (storedStory) {
        setAiStory(storedStory);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const generateAIStory = async () => {
    const sampleStories = [
      "I am a third-generation potter from Khurja, where clay transforms into art through generations of wisdom. My grandfather taught me that each piece carries the soul of our ancestors, and every curve tells a story of tradition meeting innovation.",
      "Growing up in the vibrant lanes of Jaipur, I learned the ancient art of block printing from my mother. Each stamp I create is a bridge between centuries-old techniques and contemporary designs that speak to modern hearts.",
      "From the serene backwaters of Kerala, I craft wooden sculptures that echo the rhythms of nature. My hands have learned to listen to the wood, understanding its grain and spirit to create pieces that bring tranquility to any space."
    ];
    const randomStory = sampleStories[Math.floor(Math.random() * sampleStories.length)];
    setAiStory(randomStory);
    localStorage.setItem('userStory', randomStory);
  };

  if (loading || !userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 border-4 border-orange-200 rounded-full animate-spin border-t-orange-600"></div>
          </div>
          <p className="text-gray-600 mt-4 text-lg font-medium">Loading your artisan dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <header className="glass-card shadow-sm border-b border-orange-100">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display' }}>
                    <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      Artisan Studio
                    </span>
                  </h1>
                  <p className="text-gray-600 text-sm">Craft your legacy, one story at a time</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="hidden md:flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Online</span>
                  </div>
                </div>
                <ProfileMenu userData={userData} products={products} setUserData={setUserData} />
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <div className="glass-card rounded-3xl p-6 shadow-lg border border-orange-100">
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <Image
                      src={userData.photo}
                      alt={userData.name}
                      className="w-20 h-20 rounded-2xl mx-auto mb-4 shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Playfair Display' }}>
                    {userData.name}
                  </h2>
                  <p className="text-gray-600 text-sm">{userData.email}</p>
                  <div className="mt-3 inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-medium">
                    🎨 Master Artisan
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-3">
                    <div className="text-2xl font-bold text-gray-800">{products.length}</div>
                    <div className="text-xs text-gray-600">Products</div>
                  </div>
                  <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-3">
                    <div className="text-2xl font-bold text-gray-800">4.9</div>
                    <div className="text-xs text-gray-600">Rating</div>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-800" style={{ fontFamily: 'Playfair Display' }}>
                      My Heritage Story
                    </h3>
                    <button onClick={generateAIStory} className="text-sm bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full hover:shadow-lg transition-all flex items-center space-x-1">
                      <span>✨</span>
                      <span>Generate</span>
                    </button>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-4 min-h-[140px] border border-orange-100">
                    {aiStory ? (
                      <p className="text-gray-700 text-sm leading-relaxed font-medium">
                        {aiStory}
                      </p>
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <div className="text-center">
                          <div className="text-3xl mb-2">📖</div>
                          <p className="text-sm font-medium">Let AI craft your story</p>
                          <p className="text-xs">Share your heritage with the world</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <SocialIntegration />
              </div>
            </div>
            <div className="lg:col-span-3 space-y-8">
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { icon: "📦", label: "Products Listed", value: products.length, change: "+12%", color: "from-blue-500 to-blue-600" },
                  { icon: "💰", label: "Total Earnings", value: "₹12,450", change: "+8.2%", color: "from-green-500 to-green-600" },
                  { icon: "👥", label: "Profile Views", value: "86", change: "+24%", color: "from-purple-500 to-purple-600" },
                  { icon: "⭐", label: "New Reviews", value: "7", change: "+3", color: "from-orange-500 to-red-500" }
                ].map((stat, index) => (
                  <div key={index} className="glass-card rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}>
                        <span className="text-xl">{stat.icon}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-green-600 font-semibold">{stat.change}</div>
                        <div className="text-xs text-gray-500">this month</div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
              <SmartProductPhotography />
              <div className="glass-card rounded-3xl p-8 shadow-lg border border-orange-100">
                <ProductCatalog products={products} setProducts={setProducts} />
              </div>
              <div className="glass-card rounded-3xl p-8 shadow-lg border border-orange-100">
                <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Playfair Display' }}>Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { action: "New order received", item: "Hand-painted Madhubani Art", time: "2 hours ago", type: "order" },
                    { action: "Product view", item: "Traditional Brass Diya", time: "5 hours ago", type: "view" },
                    { action: "Review received", item: "Wooden Elephant Sculpture", time: "1 day ago", type: "review" },
                    { action: "Profile updated", item: "Added new social links", time: "2 days ago", type: "update" }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gradient-to-r from-white to-orange-50 rounded-2xl border border-orange-100">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        activity.type === 'order' ? 'bg-green-100 text-green-600' :
                        activity.type === 'view' ? 'bg-blue-100 text-blue-600' :
                        activity.type === 'review' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        <span className="text-lg">
                          {activity.type === 'order' ? '🛒' :
                           activity.type === 'view' ? '👁️' :
                           activity.type === 'review' ? '⭐' : '✏️'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.item}</p>
                      </div>
                      <div className="text-sm text-gray-500">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}