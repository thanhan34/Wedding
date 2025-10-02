'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Heart, Star, Play, Pause } from 'lucide-react';

interface BookAlbumLayoutProps {
  photos: { src: string; orientation: 'landscape' | 'portrait' }[] | string[];
  onImageClick: (index: number) => void;
}

export default function BookAlbumLayout({ photos, onImageClick }: BookAlbumLayoutProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [autoPlayProgress, setAutoPlayProgress] = useState(0);

  // Organize photos into pages (2 photos per page spread)
  const photosPerPage = 2;
  const totalPages = Math.ceil(photos.length / photosPerPage);

  const getCurrentPagePhotos = (pageIndex: number) => {
    const startIndex = pageIndex * photosPerPage;
    return photos.slice(startIndex, startIndex + photosPerPage);
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1 && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection('next');
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setTimeout(() => setIsFlipping(false), 800);
      }, 400);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection('prev');
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
        setTimeout(() => setIsFlipping(false), 800);
      }, 400);
    }
  };

  const goToPage = (pageIndex: number) => {
    if (pageIndex !== currentPage && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection(pageIndex > currentPage ? 'next' : 'prev');
      setTimeout(() => {
        setCurrentPage(pageIndex);
        setTimeout(() => setIsFlipping(false), 800);
      }, 400);
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isFlipping) return;
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || isFlipping) return;
    const currentX = e.clientX;
    const offset = currentX - dragStartX;
    setDragOffset(offset);
  };

  const handleMouseUp = () => {
    if (!isDragging || isFlipping) return;
    
    const threshold = 100; // Minimum drag distance to trigger page flip
    
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset < -threshold && currentPage < totalPages - 1) {
        // Dragged left - go to next page
        nextPage();
      } else if (dragOffset > threshold && currentPage > 0) {
        // Dragged right - go to previous page
        prevPage();
      }
    }
    
    setIsDragging(false);
    setDragOffset(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragOffset(0);
    }
  };

  // Auto-play functionality
  const AUTO_PLAY_INTERVAL = 5000; // 5 seconds per page

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;

    if (isAutoPlaying && !isFlipping && !isDragging) {
      // Progress bar update
      progressInterval = setInterval(() => {
        setAutoPlayProgress(prev => {
          if (prev >= 100) {
            return 0;
          }
          return prev + (100 / (AUTO_PLAY_INTERVAL / 100));
        });
      }, 100);

      // Auto page turn
      interval = setInterval(() => {
        if (currentPage < totalPages - 1) {
          nextPage();
          setAutoPlayProgress(0);
        } else {
          // Loop back to first page
          setCurrentPage(0);
          setAutoPlayProgress(0);
        }
      }, AUTO_PLAY_INTERVAL);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [isAutoPlaying, currentPage, totalPages, isFlipping, isDragging]);

  // Reset progress when manually changing pages
  useEffect(() => {
    setAutoPlayProgress(0);
  }, [currentPage]);

  // Pause auto-play on user interaction
  const handleUserInteraction = () => {
    setIsAutoPlaying(false);
    setAutoPlayProgress(0);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
    setAutoPlayProgress(0);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto py-12">
      {/* Book Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center space-x-3 mb-4">
          <BookOpen className="w-8 h-8 text-[#fc5d01]" />
          <h2 className="text-4xl font-serif text-[#fc5d01] font-bold">
            Album Kỷ Niệm Cưới
          </h2>
          <BookOpen className="w-8 h-8 text-[#fc5d01]" />
        </div>
        <p className="text-gray-600 font-serif italic">
          Những khoảnh khắc đẹp nhất trong ngày trọng đại
        </p>
      </motion.div>

      {/* 3D Book Container */}
      <div className="relative perspective-[2000px]">
        <motion.div
          initial={{ opacity: 0, rotateX: -15 }}
          animate={{ opacity: 1, rotateX: 0 }}
          transition={{ duration: 1 }}
          className="relative w-full h-[700px] mx-auto"
          style={{
            transformStyle: 'preserve-3d',
            transform: isHovering ? 'rotateX(2deg) rotateY(-2deg)' : 'rotateX(5deg)'
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Book Base/Spine with enhanced depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 rounded-lg shadow-2xl transform-gpu"
               style={{ transform: 'translateZ(-30px)' }}>
            <div className="absolute inset-2 bg-gradient-to-br from-amber-100 to-amber-50 rounded border-4 border-amber-700">
              {/* Enhanced decorative corners */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#fc5d01] opacity-60"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[#fc5d01] opacity-60"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[#fc5d01] opacity-60"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#fc5d01] opacity-60"></div>
              
              {/* Book spine shadow */}
              <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-amber-900/50 to-transparent"></div>
            </div>
          </div>

          {/* Page Stack Effect - Multiple layers for depth */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-4 bg-white rounded shadow-sm"
              style={{
                transform: `translateZ(${-25 + i * 2}px)`,
                opacity: 0.3 - i * 0.05
              }}
            />
          ))}

          {/* Current Page Spread with enhanced 3D flipping and drag interaction */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ 
                opacity: 0,
                rotateY: flipDirection === 'next' ? -180 : 180,
                scale: 0.7,
                z: -50
              }}
              animate={{ 
                opacity: 1,
                rotateY: isDragging ? dragOffset * 0.3 : 0,
                scale: 1,
                z: 0,
                x: isDragging ? dragOffset * 0.1 : 0
              }}
              exit={{ 
                opacity: 0,
                rotateY: flipDirection === 'next' ? 180 : -180,
                scale: 0.7,
                z: -50
              }}
              transition={{ 
                duration: isDragging ? 0 : 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
                opacity: { duration: 0.4 },
                scale: { duration: 0.6 }
              }}
              className={`absolute inset-4 bg-gradient-to-br from-cream to-white rounded shadow-2xl ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              style={{
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                transformOrigin: dragOffset < 0 ? 'right center' : 'left center'
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            >
              {/* Page curl shadow effect - enhanced for drag interaction */}
              <div className={`absolute inset-0 rounded pointer-events-none transition-opacity duration-300 ${
                isFlipping || isDragging ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className={`absolute top-0 bottom-0 w-8 bg-gradient-to-r ${
                  (flipDirection === 'next' || dragOffset < 0)
                    ? 'right-0 from-transparent to-gray-400/30' 
                    : 'left-0 from-gray-400/30 to-transparent'
                }`}></div>
              </div>

              {/* Drag indicator overlay */}
              {isDragging && (
                <div className="absolute inset-0 rounded pointer-events-none">
                  {/* Drag direction indicator */}
                  <div className={`absolute top-1/2 transform -translate-y-1/2 transition-all duration-200 ${
                    dragOffset < -50 ? 'right-4 opacity-100' : 'right-8 opacity-50'
                  }`}>
                    <div className="flex items-center space-x-2 bg-[#fc5d01]/90 text-white px-3 py-2 rounded-full text-sm font-serif">
                      <span>Trang sau</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        →
                      </motion.div>
                    </div>
                  </div>
                  
                  <div className={`absolute top-1/2 transform -translate-y-1/2 transition-all duration-200 ${
                    dragOffset > 50 ? 'left-4 opacity-100' : 'left-8 opacity-50'
                  }`}>
                    <div className="flex items-center space-x-2 bg-[#fc5d01]/90 text-white px-3 py-2 rounded-full text-sm font-serif">
                      <motion.div
                        animate={{ x: [0, -5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        ←
                      </motion.div>
                      <span>Trang trước</span>
                    </div>
                  </div>

                  {/* Drag progress indicator */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-white/90 rounded-full px-4 py-2 shadow-lg">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full transition-colors ${
                          dragOffset > 50 ? 'bg-[#fc5d01]' : 'bg-gray-300'
                        }`}></div>
                        <div className="w-8 h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#fc5d01] transition-all duration-200"
                            style={{ 
                              width: `${Math.min(100, Math.abs(dragOffset))}%`,
                              marginLeft: dragOffset < 0 ? 'auto' : '0'
                            }}
                          ></div>
                        </div>
                        <div className={`w-2 h-2 rounded-full transition-colors ${
                          dragOffset < -50 ? 'bg-[#fc5d01]' : 'bg-gray-300'
                        }`}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Page Content */}
              <div className="relative w-full h-full p-6 flex justify-center items-stretch gap-4">
              {getCurrentPagePhotos(currentPage).map((photo, index) => {
                const photoIndex = currentPage * photosPerPage + index;
                // Improved orientation detection
                const photoData = typeof photo === 'string' ? { src: photo, orientation: 'landscape' as const } : photo;
                const isPortrait = photoData.orientation === 'portrait';
                
                return (
                  <motion.div
                    key={photoIndex}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.2 }}
                    className="relative group cursor-pointer flex-1"
                    onClick={() => onImageClick(photoIndex)}
                    style={{
                      maxWidth: isPortrait ? '320px' : '450px',
                      minWidth: isPortrait ? '240px' : '350px'
                    }}
                  >
                    {/* Photo Frame with adaptive sizing for aspect ratio preservation */}
                    <div className="relative w-full h-full bg-white p-3 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 flex flex-col">
                      {/* Vintage corners */}
                      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-[#fc5d01] opacity-40"></div>
                      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-[#fc5d01] opacity-40"></div>
                      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-[#fc5d01] opacity-40"></div>
                      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-[#fc5d01] opacity-40"></div>

                      {/* Photo with orientation-based container - maintains aspect ratio */}
                      <div 
                        className={`relative w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 ${
                          isPortrait 
                            ? 'h-[85%]' // Portrait: taller frame
                            : 'h-[85%]' // Landscape: wider frame
                        }`}
                      >
                        <div className="relative w-full h-full flex items-center justify-center">
                          <Image
                            src={photoData.src}
                            alt={`Wedding photo ${photoIndex + 1} - ${isPortrait ? 'Portrait' : 'Landscape'}`}
                            fill
                            className="object-contain transition-transform duration-700 group-hover:scale-105 sepia-[0.1]"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        </div>
                          
                          {/* Vintage overlay */}
                          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/20 via-transparent to-amber-100/20 group-hover:opacity-0 transition-opacity duration-500"></div>
                        </div>

                        {/* Photo caption with orientation info */}
                        <div className="absolute bottom-4 left-4 right-4 text-center">
                          <p className="text-xs font-serif text-gray-600 italic">
                            Kỷ niệm {photoIndex + 1} • {isPortrait ? 'Dọc' : 'Ngang'}
                          </p>
                        </div>

                        {/* Hover effects */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          {/* Golden sparkles */}
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-1 h-1 bg-[#fc5d01] rounded-full"
                              animate={{
                                scale: [0, 1, 0],
                                opacity: [0, 1, 0],
                                rotate: [0, 180, 360]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.5
                              }}
                              style={{
                                left: `${20 + i * 30}%`,
                                top: `${10 + i * 20}%`
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Fill empty slots with decorative elements */}
                {getCurrentPagePhotos(currentPage).length === 1 && (
                  <div className="relative flex items-center justify-center">
                    <motion.div
                      animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-center text-[#fc5d01]/30"
                    >
                      <Heart className="w-16 h-16 mx-auto mb-4 fill-current" />
                      <p className="font-serif italic text-lg">
                        Tình yêu vĩnh cửu
                      </p>
                    </motion.div>
                  </div>
                )}
              </div>

              {/* Page number */}
              <div className="absolute bottom-2 right-6 text-xs font-serif text-gray-500">
                {currentPage + 1} / {totalPages}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Enhanced page turning effect with realistic curl */}
          {isFlipping && (
            <>
              {/* Main page curl effect */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0, scaleX: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-4 pointer-events-none overflow-hidden rounded"
                style={{
                  transformOrigin: flipDirection === 'next' ? 'right center' : 'left center'
                }}
              >
                {/* Curling page effect */}
                <div 
                  className={`absolute top-0 bottom-0 w-full bg-gradient-to-r ${
                    flipDirection === 'next'
                      ? 'from-transparent via-white/60 to-white/90'
                      : 'from-white/90 via-white/60 to-transparent'
                  }`}
                  style={{
                    background: flipDirection === 'next'
                      ? 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 20%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.95) 80%, white 100%)'
                      : 'linear-gradient(-90deg, transparent 0%, rgba(255,255,255,0.3) 20%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.95) 80%, white 100%)',
                    transform: `skewY(${flipDirection === 'next' ? '2deg' : '-2deg'})`
                  }}
                />
                
                {/* Page curl shadow */}
                <div 
                  className={`absolute top-0 bottom-0 w-16 ${
                    flipDirection === 'next' ? 'right-0' : 'left-0'
                  }`}
                  style={{
                    background: flipDirection === 'next'
                      ? 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.2) 100%)'
                      : 'linear-gradient(-90deg, transparent 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.2) 100%)',
                    transform: `perspective(100px) rotateY(${flipDirection === 'next' ? '15deg' : '-15deg'})`
                  }}
                />
              </motion.div>

              {/* Animated page flip highlight */}
              <motion.div
                initial={{ x: flipDirection === 'next' ? '-100%' : '100%', opacity: 0 }}
                animate={{ x: flipDirection === 'next' ? '100%' : '-100%', opacity: [0, 1, 0] }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-4 pointer-events-none"
              >
                <div className="w-8 h-full bg-gradient-to-r from-transparent via-white/80 to-transparent transform skew-x-12" />
              </motion.div>

              {/* Page flip sound effect indicator */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.2, 1], opacity: [0, 0.8, 0] }}
                transition={{ duration: 0.5 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              >
                <div className="w-16 h-16 rounded-full bg-[#fc5d01]/20 flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-[#fc5d01]" />
                </div>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>

      {/* Auto-play Progress Indicator */}
      {isAutoPlaying && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-[#fc5d01]/20">
            <div className="flex items-center space-x-3">
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] rounded-full"
                  style={{ width: `${autoPlayProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <span className="text-xs font-serif text-gray-600">
                Tự động chuyển trang
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Auto-play Control Button */}
      <motion.button
        onClick={toggleAutoPlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-[#fc5d01]/20 hover:bg-[#fc5d01] hover:text-white transition-all duration-300"
        title={isAutoPlaying ? 'Tạm dừng tự động chuyển trang' : 'Bật tự động chuyển trang'}
      >
        {isAutoPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5" />
        )}
      </motion.button>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center space-x-8 mt-8">
        {/* Enhanced Previous Page Button */}
        <motion.button
          onClick={() => {
            handleUserInteraction();
            prevPage();
          }}
          disabled={currentPage === 0 || isFlipping}
          whileHover={{ scale: 1.1, rotateY: -5 }}
          whileTap={{ scale: 0.9 }}
          className={`flex items-center space-x-2 px-8 py-4 rounded-full font-serif transition-all duration-300 transform-gpu ${
            currentPage === 0 || isFlipping
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] text-white shadow-lg hover:shadow-xl hover:-translate-y-1'
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.div
            animate={isFlipping && flipDirection === 'prev' ? { x: [-5, 5, -5] } : {}}
            transition={{ duration: 0.3, repeat: 2 }}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.div>
          <span>Trang trước</span>
          {isFlipping && flipDirection === 'prev' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 0] }}
              transition={{ duration: 0.6 }}
              className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full"
            />
          )}
        </motion.button>

        {/* Enhanced Page Indicators */}
        <div className="flex space-x-3">
          {Array.from({ length: totalPages }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                handleUserInteraction();
                goToPage(index);
              }}
              whileHover={{ scale: 1.3, y: -2 }}
              whileTap={{ scale: 0.8 }}
              className={`relative w-4 h-4 rounded-full transition-all duration-300 transform-gpu ${
                index === currentPage
                  ? 'bg-[#fc5d01] shadow-lg'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            >
              {index === currentPage && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-[#fc5d01]"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              {isFlipping && (
                <motion.div
                  className="absolute -inset-1 rounded-full border-2 border-[#fc5d01]"
                  animate={{ rotate: 360, scale: [1, 1.5, 1] }}
                  transition={{ duration: 0.8 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Enhanced Next Page Button */}
        <motion.button
          onClick={() => {
            handleUserInteraction();
            nextPage();
          }}
          disabled={currentPage === totalPages - 1 || isFlipping}
          whileHover={{ scale: 1.1, rotateY: 5 }}
          whileTap={{ scale: 0.9 }}
          className={`flex items-center space-x-2 px-8 py-4 rounded-full font-serif transition-all duration-300 transform-gpu ${
            currentPage === totalPages - 1 || isFlipping
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] text-white shadow-lg hover:shadow-xl hover:-translate-y-1'
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <span>Trang sau</span>
          <motion.div
            animate={isFlipping && flipDirection === 'next' ? { x: [-5, 5, -5] } : {}}
            transition={{ duration: 0.3, repeat: 2 }}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.div>
          {isFlipping && flipDirection === 'next' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 0] }}
              transition={{ duration: 0.6 }}
              className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full"
            />
          )}
        </motion.button>
      </div>

      {/* Book Info */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="text-center mt-8 space-y-2"
      >
        <p className="text-sm font-serif text-gray-600">
          Album cưới với {photos.length} kỷ niệm đẹp
        </p>
        <div className="flex items-center justify-center space-x-2 text-[#fc5d01]">
          <Star className="w-4 h-4 fill-current" />
          <span className="text-xs font-serif italic">Phong cách cổ điển & trang trọng</span>
          <Star className="w-4 h-4 fill-current" />
        </div>
        
        {/* Drag instruction */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-4 text-xs text-gray-500 font-serif italic"
        >
          💡 Kéo trang sang trái để chuyển trang tiếp theo, kéo sang phải để quay lại trang trước
        </motion.div>
      </motion.div>

      {/* Floating decorative elements */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#fc5d01]/20 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`
          }}
        />
      ))}
    </div>
  );
}
