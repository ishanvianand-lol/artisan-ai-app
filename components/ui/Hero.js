'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Image from 'next/image';

export default function Hero({ user, onLogin }) {
  const containerRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden bg-gradient-to-br from-stone-900 via-zinc-800 to-slate-900">
      
      {/* Industrial Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E")`
        }}
      />
      
      {/* Organic Floating Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          style={{ 
            x: mousePos.x * 0.02,
            y: mousePos.y * 0.02,
            borderRadius: '40% 60% 30% 70%'
          }}
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-orange-600/30 to-red-800/20 blur-3xl animate-pulse"
        />
        <motion.div 
          style={{ 
            x: mousePos.x * -0.015,
            y: mousePos.y * -0.015,
            borderRadius: ['60% 40% 80% 20%', '40% 60% 20% 80%', '60% 40% 80% 20%']
          }}
          className="absolute bottom-32 left-16 w-80 h-80 bg-gradient-to-br from-emerald-700/25 to-teal-600/15 blur-2xl animate-pulse"
          animate={{
            borderRadius: ["60% 40% 80% 20%", "40% 60% 20% 80%", "60% 40% 80% 20%"]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Abstract Geometric Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ rotate }}
          className="absolute top-40 left-20 w-32 h-32 border-2 border-orange-500/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-40 right-32 w-24 h-24 bg-gradient-to-r from-amber-600/40 to-amber-700/30"
          style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
          animate={{ rotate: [0, 180, 360] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      {/* Industrial Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-0 left-0 right-0 z-50 p-8"
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-700 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-black text-lg tracking-wider">A</span>
              </div>
            </div>
            <div className="text-2xl font-black tracking-tight text-stone-100 relative">
              ARTISAN
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-red-600" />
            </div>
          </div>
          
          <div className="flex items-center space-x-8">
            <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-stone-300 uppercase tracking-wider">
              <button className="hover:text-orange-400 transition-colors duration-300 relative group">
                CRAFT
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300" />
              </button>
              <button className="hover:text-orange-400 transition-colors duration-300 relative group">
                FORGE
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300" />
              </button>
            </div>
            
            {!user ? (
              <motion.button 
                onClick={onLogin}
                whileHover={{ scale: 1.05, rotateX: 5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-orange-600 to-red-700 text-white px-6 py-3 font-bold text-sm tracking-wider uppercase relative overflow-hidden group shadow-2xl"
              >
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative flex items-center space-x-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>ENTER</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </motion.button>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-stone-300 font-semibold tracking-wide">
                  {user.displayName?.split(' ')[0].toUpperCase()}
                </span>
                <div className="w-10 h-10 relative">
                  <Image 
                    src={user.photoURL} 
                    alt={user.displayName}
                    className="w-full h-full object-cover grayscale"
                  />
                  <div className="absolute inset-0 bg-orange-500/20" />
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="flex items-center min-h-screen relative z-10">
        <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center w-full">
          
          {/* Left: Brutal Typography */}
          <motion.div
            style={{ y: y1 }}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="space-y-8 relative"
          >
            {/* Vintage Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="inline-block"
            >
              <div className="bg-gradient-to-r from-orange-600 to-red-700 text-white px-6 py-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative text-xs font-black tracking-widest uppercase">
                  EST. 2024 • HANDCRAFTED HERITAGE
                </div>
              </div>
            </motion.div>

            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.8] tracking-tighter text-stone-100 relative"
              >
                FORGE
                <div className="absolute -right-4 -top-4 w-16 h-16 bg-gradient-to-br from-orange-600 to-red-700 opacity-80" 
                     style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
              </motion.h1>
              
              <motion.h1 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.8] tracking-tighter bg-gradient-to-r from-orange-400 via-red-500 to-amber-600 bg-clip-text text-transparent relative"
              >
                LEGACY
                <div className="absolute -left-6 top-1/2 w-2 h-20 bg-gradient-to-b from-orange-500 to-red-600" />
              </motion.h1>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="relative"
            >
              <div className="max-w-lg space-y-4">
                <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-600" />
                <p className="text-xl leading-relaxed text-stone-300 font-medium">
                  Where ancient craftsmanship meets modern innovation. 
                  <span className="text-orange-400 font-bold"> Raw materials</span> transformed into 
                  <span className="text-red-400 font-bold"> timeless artifacts</span> by master artisans.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="flex items-center space-x-6 pt-6"
            >
              {!user ? (
                <motion.button
                  onClick={onLogin}
                  whileHover={{ scale: 1.05, rotateX: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-orange-600 to-red-700 text-white px-10 py-4 font-black text-lg tracking-wider uppercase relative overflow-hidden group shadow-2xl"
                  style={{ 
                    clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 100%, 20px 100%)" 
                  }}
                >
                  <div className="absolute inset-0 bg-black/30" />
                  <span className="relative">BEGIN FORGING</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05, rotateX: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-orange-600 to-red-700 text-white px-10 py-4 font-black text-lg tracking-wider uppercase relative overflow-hidden group shadow-2xl"
                  style={{ 
                    clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 100%, 20px 100%)" 
                  }}
                >
                  <div className="absolute inset-0 bg-black/30" />
                  <span className="relative">EXPLORE FORGE</span>
                </motion.button>
              )}
              
              {/* Live Workshop Indicator */}
              <div className="flex items-center space-x-3">
                <motion.div 
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/50"
                />
                <span className="text-stone-400 font-bold text-sm tracking-wide uppercase">
                  LIVE FORGE
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: 3D Card with Vintage Effects */}
          <motion.div
            style={{ y: y2, perspective: '1000px'}}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="relative"
          >
            {/* Main 3D Card */}
            <motion.div
              whileHover={{ rotateY: 5, rotateX: 5 }}
              className="relative aspect-[3/4] bg-gradient-to-br from-stone-800 to-zinc-900 shadow-2xl overflow-hidden group"
              style={{ 
                transformStyle: 'preserve-3d',
                clipPath: "polygon(0 0, calc(100% - 40px) 0, 100% 100%, 0 calc(100% - 40px))"
              }}
            >
              {/* Vintage Film Grain */}
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`
                }}
              />
              
              <Image 
                src="https://images.unsplash.com/photo-1565717112365-fd2d29c5c9b3?w=800&h=1000&fit=crop&crop=center"
                alt="Master artisan forging"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              
              {/* Industrial Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/60 via-transparent to-black/40" />
              
              {/* Vintage Corner Elements */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-orange-500" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-orange-500" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-orange-500" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-orange-500" />
              
              {/* Content Overlay */}
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <div className="text-sm font-black tracking-widest text-orange-400 mb-2 uppercase">
                  MASTER FORGE
                </div>
                <div className="text-lg font-bold mb-1">Ancient Techniques</div>
                <div className="text-xs opacity-75">Varanasi Workshop</div>
              </div>
            </motion.div>

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: -20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 1.8 }}
              whileHover={{ rotateX: 10, y: -10 }}
              className="absolute -bottom-8 -left-8 bg-gradient-to-br from-stone-800 to-zinc-900 p-6 shadow-2xl relative overflow-hidden"
              style={{ 
                transformStyle: 'preserve-3d',
                clipPath: "polygon(20px 0, 100% 0, calc(100% - 20px) 100%, 0 100%)"
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-red-700/20" />
              <div className="relative grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-2xl font-black text-orange-400">2.8K</div>
                  <div className="text-xs font-bold text-stone-300 tracking-wider uppercase">Masters</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-red-400">15K</div>
                  <div className="text-xs font-bold text-stone-300 tracking-wider uppercase">Forged</div>
                </div>
              </div>
            </motion.div>

            {/* Abstract Floating Element */}
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity }
              }}
              className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 opacity-60"
              style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
            />
          </motion.div>
        </div>
      </div>

      {/* Industrial Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="text-xs font-black text-stone-400 tracking-widest uppercase">
            DESCEND
          </div>
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-16 bg-gradient-to-b from-orange-500 to-red-600"
          />
          <div className="w-3 h-3 bg-orange-500 rotate-45" />
        </div>
      </motion.div>
    </div>
  )
}