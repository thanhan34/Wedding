'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, Sparkles, Camera, Download, Share2, Grid3X3, LayoutGrid, Maximize2, Star, Layers, Circle, Palette, BookOpen } from 'lucide-react';
import WeddingRingsLayout from './gallery/layouts/WeddingRingsLayout';
import ButterflyWingsLayout from './gallery/layouts/ButterflyWingsLayout';
import BookAlbumLayout from './gallery/layouts/BookAlbumLayout';
import SmartLayout from './gallery/layouts/SmartLayout';


// Ảnh ngang (landscape)
const landscapePhotos = [
  '/Wedding/Ngang/KTIU0185.jpg',
  '/Wedding/Ngang/KTIU0188.jpg',
  '/Wedding/Ngang/KTIU0191.jpg',
  '/Wedding/Ngang/KTIU0197.jpg',
  '/Wedding/Ngang/KTIU9005.JPG',
  '/Wedding/Ngang/KTIU9125.JPG',
  '/Wedding/Ngang/z6735567871021_9e4913b6410c10f10977be2780d2f3f7.jpg'
];

// Ảnh dọc (portrait)
const portraitPhotos = [
  '/Wedding/Doc/KTIU0010.JPG',
  '/Wedding/Doc/KTIU0070.JPG',
  '/Wedding/Doc/KTIU0157.jpg',
  '/Wedding/Doc/KTIU0180.jpg',
  '/Wedding/Doc/KTIU0256.jpg',
  '/Wedding/Doc/KTIU0370.jpg',
  '/Wedding/Doc/KTIU8198.JPG',
  '/Wedding/Doc/KTIU8285.JPG',
  '/Wedding/Doc/KTIU9054.JPG',
  '/Wedding/Doc/KTIU9199.JPG',
  '/Wedding/Doc/z6735567858616_2114169ea6c7948b4122776ba07606c0.jpg',
  '/Wedding/Doc/z6735567882402_9def3cf5b873424e21da131c35e3aae9.jpg',
  '/Wedding/Doc/z6735567894036_260ccd39a6a62711ab29b072eb173369.jpg',
  '/Wedding/Doc/z6735567906204_6be847502f4b9d7e3f2a695bdc41a4bd.jpg',
  '/Wedding/Doc/z6735567987748_d7077417fb671d31654fd0bf9ae6ed0b.jpg',
  '/Wedding/Doc/z6735568048498_05b7b7a4be9b803d3a635bddaa5d9e2a.jpg',
  '/Wedding/Doc/z6838080836018_72b464351e24c07b52202c909a90eb71.jpg',
  '/Wedding/Doc/z6838080842550_b1c2724a39a3abede4973de82bef6a0c.jpg',
  '/Wedding/Doc/z6838080884627_0e0d5b9ebc1a8416b102ab67545b7518.jpg',
  '/Wedding/Doc/z6838080886696_22458f83ecd91368360f984489fad70b.jpg'
];

// Kết hợp tất cả ảnh với thông tin về orientation
const weddingPhotos = [
  ...landscapePhotos.map(photo => ({ src: photo, orientation: 'landscape' as const })),
  ...portraitPhotos.map(photo => ({ src: photo, orientation: 'portrait' as const }))
];

// Tạo danh sách đường dẫn ảnh để tương thích với code hiện tại
const weddingPhotoSrcs = weddingPhotos.map(photo => photo.src);

interface WeddingGalleryProps {
  showAll?: boolean;
}

// Heart Photo Component for random rotation
interface HeartPosition {
  left: string;
  top: string;
  width: string;
  height: string;
  rotate: string;
}

function HeartPhoto({ 
  index, 
  position, 
  displayPhotos, 
  openLightbox,
  weddingPhotos
}: { 
  photo: string; 
  index: number; 
  position: HeartPosition; 
  displayPhotos: string[]; 
  openLightbox: (index: number) => void; 
  weddingPhotos: Array<{src: string; orientation: 'landscape' | 'portrait'}>;
}) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(index);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex(prev => {
        // Tìm ảnh mới khác với ảnh hiện tại, đảm bảo index không vượt quá weddingPhotos
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * Math.min(displayPhotos.length, weddingPhotos.length));
        } while (newIndex === prev && Math.min(displayPhotos.length, weddingPhotos.length) > 1);
        return newIndex;
      });
    }, 5000 + Math.random() * 3000); // Random interval between 5-8 seconds
    
    return () => clearInterval(interval);
  }, [displayPhotos.length, weddingPhotos.length]);

  // Đảm bảo currentPhotoIndex không vượt quá bounds
  const safePhotoIndex = Math.min(currentPhotoIndex, weddingPhotos.length - 1, displayPhotos.length - 1);
  
  // Improved orientation detection
  const currentPhoto = weddingPhotos[safePhotoIndex];
  const isPortrait = currentPhoto && currentPhoto.orientation === 'portrait';

  // Điều chỉnh kích thước frame dựa trên orientation
  const baseWidth = parseInt(position.width);
  const baseHeight = parseInt(position.height);
  
  const frameStyle = isPortrait ? {
    // Ảnh dọc: khung cao hơn rộng (3:4) - tăng kích thước 40%
    width: `${Math.min(baseWidth, baseHeight * 0.75) * 1.4}px`,
    height: `${Math.max(baseHeight, baseWidth * 1.33) * 1.4}px`,
    aspectRatio: '3/4'
  } : {
    // Ảnh ngang: khung rộng hơn cao (4:3) - tăng kích thước 40%
    width: `${Math.max(baseWidth, baseHeight * 1.33) * 1.4}px`,
    height: `${Math.min(baseHeight, baseWidth * 0.75) * 1.4}px`,
    aspectRatio: '4/3'
  };

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        type: "spring",
        bounce: 0.4
      }}
      className="absolute group cursor-pointer"
      style={{
        left: position.left,
        top: position.top,
        width: frameStyle.width,
        height: frameStyle.height,
        transform: `translate(-50%, -50%) rotate(${position.rotate})`,
        zIndex: 20 - index
      }}
      onClick={() => openLightbox(currentPhotoIndex)}
      whileHover={{ 
        scale: 1.1, 
        zIndex: 999,
        rotate: `${parseFloat(position.rotate) + (Math.random() - 0.5) * 10}deg`,
        transition: { duration: 0.3 }
      }}
    >
      <div 
        className="relative w-full h-full overflow-hidden rounded-2xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm border-2 border-white/30 shadow-xl hover:shadow-2xl hover:shadow-[#fc5d01]/30 transition-all duration-500"
        style={{ aspectRatio: frameStyle.aspectRatio }}
      >
        <motion.div
          key={currentPhotoIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          <Image
            src={displayPhotos[safePhotoIndex]}
            alt={`Wedding photo ${safePhotoIndex + 1}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="120px"
          />
        </motion.div>
        
        {/* Heart Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#fc5d01]/20 via-pink-500/10 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Floating Hearts */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 text-[#fc5d01]"
              initial={{ scale: 0, x: '50%', y: '50%' }}
              animate={{
                scale: [0, 1, 0],
                x: [0, Math.random() * 60 - 30],
                y: [0, -30 - Math.random() * 20],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
                repeatDelay: 1
              }}
              style={{
                left: '50%',
                top: '50%'
              }}
            >
              <Heart className="w-full h-full fill-current" />
            </motion.div>
          ))}
        </div>

        {/* Subtle Border Glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl border border-[#fc5d01]/50 opacity-0 group-hover:opacity-100"
          animate={{
            boxShadow: [
              '0 0 0px rgba(252, 93, 1, 0)',
              '0 0 20px rgba(252, 93, 1, 0.3)',
              '0 0 0px rgba(252, 93, 1, 0)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  );
}


export default function WeddingGallery({ showAll = false }: WeddingGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showAllPhotos, setShowAllPhotos] = useState(showAll);
  const [viewMode, setViewMode] = useState<'heart'|'rings'|'butterfly'|'bookalbum'|'smart'|'masonry' | 'grid' | 'magazine'>('heart');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  const displayPhotos = showAllPhotos ? weddingPhotoSrcs : weddingPhotoSrcs.slice(0, 24);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % weddingPhotoSrcs.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? weddingPhotoSrcs.length - 1 : selectedImage - 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-amber-50 text-gray-800 overflow-hidden">
      {/* Futuristic Header */}
      <motion.div
        ref={containerRef}
        style={{ y, opacity }}
        className="relative py-24 px-4 text-center overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#fc5d01]/10 via-transparent to-[#fd7f33]/10" />
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#fc5d01] rounded-full"
              animate={{
                x: [Math.random() * 1200, Math.random() * 1200],
                y: [Math.random() * 800, Math.random() * 800],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
         

          {/* Advanced Control Panel */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center space-y-6"
          >
           

            {/* View Mode Selector */}
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { mode: 'heart', icon: Heart, label: 'Heart' },
                { mode: 'smart', icon: Camera, label: 'Smart' },
                { mode: 'rings', icon: Sparkles, label: 'Rings' },
                { mode: 'butterfly', icon: Star, label: 'Butterfly' },
                { mode: 'bookalbum', icon: BookOpen, label: 'Book Album' },               
                { mode: 'masonry', icon: LayoutGrid, label: 'Masonry' },
                { mode: 'grid', icon: Grid3X3, label: 'Grid' },
                { mode: 'magazine', icon: Layers, label: 'Magazine' },                
              ].map(({ mode, icon: Icon, label }) => (
                <motion.button
                  key={mode}
                  onClick={() => setViewMode(mode as 'heart'|'rings'|'butterfly'|'bookalbum'|'smart'|'masonry' | 'grid' | 'magazine' )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group relative px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                    viewMode === mode
                      ? 'bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] text-white shadow-xl'
                      : 'bg-white/60 backdrop-blur-xl text-gray-600 hover:bg-white/80 border border-orange-200 shadow-lg'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{label}</span>
                  </div>
                  {viewMode === mode && (
                    <motion.div
                      layoutId="activeMode"
                      className="absolute inset-0 bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] rounded-2xl -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Dynamic Gallery Layout */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <AnimatePresence mode="wait">
          {viewMode === 'masonry' && (
            <motion.div
              key="masonry"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-6 space-y-6"
            >
              {(showAllPhotos ? weddingPhotos : weddingPhotos.slice(0, 24)).map((photoData, index) => {
                const photo = typeof photoData === 'string' ? photoData : photoData.src;
                const orientation = typeof photoData === 'string' ? 'landscape' : photoData.orientation;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.03 }}
                    className="break-inside-avoid mb-6 group cursor-pointer"
                    onClick={() => openLightbox(index)}
                  >
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-[#fc5d01]/25 transition-all duration-700 transform hover:-translate-y-4 hover:rotate-1">
                      <div 
                        className={`relative w-full ${
                          orientation === 'portrait' 
                            ? 'aspect-[3/4]' 
                            : 'aspect-[4/3]'
                        }`}
                        style={{ 
                          height: orientation === 'portrait' 
                            ? `${350 + (index % 3) * 80}px` 
                            : `${280 + (index % 3) * 60}px` 
                        }}
                      >
                        <Image
                          src={photo}
                          alt={`Wedding photo ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                        />
                        
                        {/* Holographic Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#fc5d01]/20 via-transparent to-[#fd7f33]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        
                        {/* Futuristic HUD */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                          {/* Corner Brackets */}
                          <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-[#fc5d01]" />
                          <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-[#fc5d01]" />
                          <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-[#fc5d01]" />
                          <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-[#fc5d01]" />
                          
                          {/* Center Actions */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 180 }}
                              className="p-4 bg-[#fc5d01]/90 backdrop-blur-xl rounded-full"
                            >
                              <Maximize2 className="w-6 h-6 text-white" />
                            </motion.div>
                          </div>

                          {/* Info Panel */}
                          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                            <div className="flex items-center justify-between text-white">
                              <div>
                                <p className="font-bold">IMG_{String(index + 1).padStart(3, '0')}</p>
                                <p className="text-xs opacity-80">Wedding Collection</p>
                              </div>
                              <div className="flex space-x-2">
                                <motion.button
                                  whileHover={{ scale: 1.2 }}
                                  whileTap={{ scale: 0.8 }}
                                  className="p-2 bg-white/20 rounded-full"
                                >
                                  <Heart className="w-4 h-4" />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.2 }}
                                  whileTap={{ scale: 0.8 }}
                                  className="p-2 bg-white/20 rounded-full"
                                >
                                  <Star className="w-4 h-4" />
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Scan Line Effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fc5d01]/30 to-transparent h-1 opacity-0 group-hover:opacity-100"
                          animate={{
                            y: ['-100%', '100%']
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {viewMode === 'grid' && (
            <motion.div
              key="grid"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
            >
              {(showAllPhotos ? weddingPhotos : weddingPhotos.slice(0, 24)).map((photoData, index) => {
                const photo = typeof photoData === 'string' ? photoData : photoData.src;
                const orientation = typeof photoData === 'string' ? 'landscape' : photoData.orientation;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, rotateY: -90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.05 }}
                    className={`group cursor-pointer ${
                      orientation === 'portrait' ? 'aspect-[3/4]' : 'aspect-square'
                    }`}
                    onClick={() => openLightbox(index)}
                  >
                    <div className="relative w-full h-full overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:rotate-2">
                      <Image
                        src={photo}
                        alt={`Wedding photo ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      
                      {/* Neon Border */}
                      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#fc5d01] transition-colors duration-500 rounded-2xl" />
                      
                      {/* Glitch Effect */}
                      <motion.div
                        className="absolute inset-0 bg-[#fc5d01] opacity-0 group-hover:opacity-20"
                        animate={{
                          x: [0, 2, -2, 0],
                          opacity: [0, 0.2, 0, 0.1, 0]
                        }}
                        transition={{
                          duration: 0.3,
                          repeat: Infinity,
                          repeatDelay: 2
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {viewMode === 'magazine' && (
            <motion.div
              key="magazine"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="space-y-12"
            >
              {Array.from({ length: Math.ceil((showAllPhotos ? weddingPhotos : weddingPhotos.slice(0, 24)).length / 3) }).map((_, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-12 gap-6 h-96">
                  {(showAllPhotos ? weddingPhotos : weddingPhotos.slice(0, 24)).slice(rowIndex * 3, (rowIndex + 1) * 3).map((photoData, index) => {
                    const actualIndex = rowIndex * 3 + index;
                    const photo = typeof photoData === 'string' ? photoData : photoData.src;
                    const orientation = typeof photoData === 'string' ? 'landscape' : photoData.orientation;
                    const spans = ['col-span-5', 'col-span-4', 'col-span-3'];
                    return (
                      <motion.div
                        key={actualIndex}
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: actualIndex * 0.1 }}
                        className={`${spans[index]} group cursor-pointer`}
                        onClick={() => openLightbox(actualIndex)}
                      >
                        <div className="relative w-full h-full overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-[#fc5d01]/30 transition-all duration-700 transform hover:-translate-y-2">
                          <Image
                            src={photo}
                            alt={`Wedding photo ${actualIndex + 1}`}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          
                          {/* Magazine Style Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          {/* Typography */}
                          <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <h3 className="text-2xl font-bold mb-2">Chapter {actualIndex + 1}</h3>
                            <p className="text-sm opacity-80">Our Beautiful Journey</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ))}
            </motion.div>
          )}

          {viewMode === 'heart' && (
            <motion.div
              key="heart"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative w-full max-w-5xl mx-auto"
            >
              {/* Heart Shape Collage Container */}
              <div className="relative w-full h-[600px] md:h-[700px] lg:h-[800px]">
                {/* Heart Shape Layout - Fixed positions like in the image */}
                {displayPhotos.slice(0, 20).map((photo, index) => {
                  // Predefined positions to create heart shape collage
                  const heartPositions = [
                    // Top left curve
                    { left: '15%', top: '20%', width: '80px', height: '80px', rotate: '-5deg' },
                    { left: '25%', top: '15%', width: '100px', height: '100px', rotate: '3deg' },
                    { left: '35%', top: '25%', width: '90px', height: '90px', rotate: '-2deg' },
                    
                    // Top right curve  
                    { left: '65%', top: '25%', width: '90px', height: '90px', rotate: '4deg' },
                    { left: '75%', top: '15%', width: '100px', height: '100px', rotate: '-3deg' },
                    { left: '85%', top: '20%', width: '80px', height: '80px', rotate: '5deg' },
                    
                    // Left side
                    { left: '10%', top: '35%', width: '70px', height: '70px', rotate: '2deg' },
                    { left: '20%', top: '45%', width: '110px', height: '110px', rotate: '-4deg' },
                    { left: '15%', top: '60%', width: '85px', height: '85px', rotate: '3deg' },
                    
                    // Right side
                    { left: '90%', top: '35%', width: '70px', height: '70px', rotate: '-2deg' },
                    { left: '80%', top: '45%', width: '110px', height: '110px', rotate: '4deg' },
                    { left: '85%', top: '60%', width: '85px', height: '85px', rotate: '-3deg' },
                    
                    // Center area
                    { left: '45%', top: '40%', width: '120px', height: '120px', rotate: '0deg' },
                    { left: '55%', top: '50%', width: '95px', height: '95px', rotate: '2deg' },
                    
                    // Bottom part forming the point
                    { left: '30%', top: '70%', width: '75px', height: '75px', rotate: '-3deg' },
                    { left: '45%', top: '75%', width: '90px', height: '90px', rotate: '1deg' },
                    { left: '60%', top: '70%', width: '75px', height: '75px', rotate: '3deg' },
                    { left: '50%', top: '85%', width: '80px', height: '80px', rotate: '-1deg' },
                    
                    // Additional photos to fill gaps
                    { left: '40%', top: '55%', width: '65px', height: '65px', rotate: '4deg' },
                    { left: '65%', top: '40%', width: '75px', height: '75px', rotate: '-2deg' }
                  ];

                  const position = heartPositions[index] || heartPositions[index % heartPositions.length];

                  return (
                    <HeartPhoto
                      key={index}
                      photo={photo}
                      index={index}
                      position={position}
                      displayPhotos={displayPhotos}
                      openLightbox={openLightbox}
                      weddingPhotos={showAllPhotos ? weddingPhotos : weddingPhotos.slice(0, 24)}
                    />
                  );
                })}

                {/* Background Hearts */}
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-[#fc5d01]/5"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 0.2, 0],
                      scale: [0, 1, 0],
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: Math.random() * 6 + 4,
                      repeat: Infinity,
                      delay: Math.random() * 3,
                      repeatDelay: Math.random() * 4
                    }}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      fontSize: `${Math.random() * 15 + 8}px`
                    }}
                  >
                    <Heart className="fill-current" />
                  </motion.div>
                ))}
              </div>

              {/* Heart Layout Info */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
                className="text-center mt-12"
              >
                <h3 className="text-2xl font-bold text-[#fc5d01] mb-4">
                  💕 Trái Tim Kỷ Niệm 💕
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Mỗi bức ảnh là một khoảnh khắc đáng nhớ trong hành trình tình yêu của chúng tôi, 
                  được sắp xếp thành hình trái tim và tự động thay đổi theo thời gian để mang đến những bất ngờ thú vị.
                </p>
              </motion.div>
            </motion.div>
          )}

        

          

          {viewMode === 'rings' && (
            <motion.div
              key="rings"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <WeddingRingsLayout
                photos={displayPhotos}
                onImageClick={openLightbox}
              />
            </motion.div>
          )}

          {viewMode === 'butterfly' && (
            <motion.div
              key="butterfly"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
            <ButterflyWingsLayout
              photos={showAllPhotos ? weddingPhotos : weddingPhotos.slice(0, 24)}
              onImageClick={openLightbox}
            />
            </motion.div>
          )}

          {viewMode === 'bookalbum' && (
            <motion.div
              key="bookalbum"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
            <BookAlbumLayout
              photos={showAllPhotos ? weddingPhotos : weddingPhotos.slice(0, 24)}
              onImageClick={openLightbox}
            />
            </motion.div>
          )}

          {viewMode === 'smart' && (
            <motion.div
              key="smart"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <SmartLayout
                photos={showAllPhotos ? weddingPhotos : weddingPhotos.slice(0, 24)}
                onImageClick={openLightbox}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Load More Button */}
      {!showAllPhotos && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center pb-20"
        >
          <button
            onClick={() => setShowAllPhotos(true)}
            className="group relative px-10 py-5 bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden"
          >
            <div className="flex items-center space-x-4 relative z-10">
              <Camera className="w-6 h-6" />
              <span>Discover {weddingPhotos.length - 24} more memories</span>
              <Sparkles className="w-6 h-6" />
            </div>
            
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#fd7f33] to-[#ffac7b]"
              initial={{ x: '-100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.5 }}
            />
          </button>
        </motion.div>
      )}

      {/* Ultra-Modern Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Enhanced Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
              onClick={closeLightbox}
              className="absolute top-8 right-8 z-60 bg-white/10 backdrop-blur-xl rounded-full p-4 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:rotate-90"
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Enhanced Navigation */}
            <motion.button
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-8 top-1/2 -translate-y-1/2 z-60 bg-white/10 backdrop-blur-xl rounded-full p-4 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:-translate-x-2"
            >
              <ChevronLeft className="w-8 h-8" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-8 top-1/2 -translate-y-1/2 z-60 bg-white/10 backdrop-blur-xl rounded-full p-4 text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:translate-x-2"
            >
              <ChevronRight className="w-8 h-8" />
            </motion.button>

            {/* Image Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative max-w-6xl max-h-[90vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                  transition={{ duration: 0.4 }}
                  className="relative max-w-full max-h-full rounded-3xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src={weddingPhotoSrcs[selectedImage]}
                    alt={`Wedding photo ${selectedImage + 1}`}
                    width={1200}
                    height={800}
                    className="object-contain max-w-full max-h-[90vh] rounded-3xl"
                    priority
                  />
                  
                  {/* Futuristic Border */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl border-2 border-[#fc5d01]"
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(252, 93, 1, 0.3)',
                        '0 0 40px rgba(253, 127, 51, 0.5)',
                        '0 0 20px rgba(252, 93, 1, 0.3)'
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Enhanced Counter & Actions */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-6"
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-full px-8 py-4 text-white font-medium border border-white/20">
                {selectedImage + 1} / {weddingPhotos.length}
              </div>
              
              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white/10 backdrop-blur-xl rounded-full text-white hover:bg-white/20 transition-colors border border-white/20"
                >
                  <Heart className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white/10 backdrop-blur-xl rounded-full text-white hover:bg-white/20 transition-colors border border-white/20"
                >
                  <Download className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white/10 backdrop-blur-xl rounded-full text-white hover:bg-white/20 transition-colors border border-white/20"
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>

            {/* Floating Particles */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] rounded-full opacity-60"
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                  scale: 0
                }}
                animate={{
                  y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)],
                  x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200)],
                  scale: [0, 1, 0],
                  opacity: [0, 0.8, 0]
                }}
                transition={{
                  duration: Math.random() * 4 + 3,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
