'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Shuffle } from 'lucide-react';

interface RandomHeroImageProps {
  className?: string;
}

const RandomHeroImage: React.FC<RandomHeroImageProps> = ({ className = "" }) => {
  // Danh sách tất cả ảnh trong thư mục Wedding với cấu trúc mới
  const weddingImages = [
    // Ảnh dọc (Doc)
    "/Wedding/Doc/KTIU0010.JPG",
    "/Wedding/Doc/KTIU0070.JPG",
    "/Wedding/Doc/KTIU0157.jpg",
    "/Wedding/Doc/KTIU0180.jpg",
    "/Wedding/Doc/KTIU0256.jpg",
    "/Wedding/Doc/KTIU0370.jpg",
    "/Wedding/Doc/KTIU8198.JPG",
    "/Wedding/Doc/KTIU8285.JPG",
    "/Wedding/Doc/KTIU9054.JPG",
    "/Wedding/Doc/KTIU9199.JPG",
    "/Wedding/Doc/z6735567858616_2114169ea6c7948b4122776ba07606c0.jpg",
    "/Wedding/Doc/z6735567882402_9def3cf5b873424e21da131c35e3aae9.jpg",
    "/Wedding/Doc/z6735567894036_260ccd39a6a62711ab29b072eb173369.jpg",
    "/Wedding/Doc/z6735567906204_6be847502f4b9d7e3f2a695bdc41a4bd.jpg",
    "/Wedding/Doc/z6735567987748_d7077417fb671d31654fd0bf9ae6ed0b.jpg",
    "/Wedding/Doc/z6735568048498_05b7b7a4be9b803d3a635bddaa5d9e2a.jpg",
    "/Wedding/Doc/z6838080836018_72b464351e24c07b52202c909a90eb71.jpg",
    "/Wedding/Doc/z6838080842550_b1c2724a39a3abede4973de82bef6a0c.jpg",
    "/Wedding/Doc/z6838080884627_0e0d5b9ebc1a8416b102ab67545b7518.jpg",
    "/Wedding/Doc/z6838080886696_22458f83ecd91368360f984489fad70b.jpg",
    // Ảnh ngang (Ngang)
    "/Wedding/Ngang/KTIU0185.jpg",
    "/Wedding/Ngang/KTIU0188.jpg",
    "/Wedding/Ngang/KTIU0191.jpg",
    "/Wedding/Ngang/KTIU0197.jpg",
    "/Wedding/Ngang/KTIU9005.JPG",
    "/Wedding/Ngang/KTIU9125.JPG",
    "/Wedding/Ngang/z6735567871021_9e4913b6410c10f10977be2780d2f3f7.jpg"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [autoChange] = useState(true);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  // Function để load ảnh và lấy kích thước dựa trên orientation
  const loadImageDimensions = (imageSrc: string) => {
    const img = new window.Image();
    img.onload = () => {
      const { width: originalWidth, height: originalHeight } = img;
      const aspectRatio = originalWidth / originalHeight;
      const isLandscape = aspectRatio > 1;
      
      let targetWidth, targetHeight;
      
      if (isLandscape) {
        // Ảnh ngang: ưu tiên chiều rộng, giới hạn chiều cao
        const maxWidth = 480; // Tăng chiều rộng cho ảnh ngang
        const maxHeight = 360; // Giảm chiều cao cho ảnh ngang
        
        if (originalWidth > maxWidth) {
          targetWidth = maxWidth;
          targetHeight = maxWidth / aspectRatio;
        } else {
          targetWidth = originalWidth;
          targetHeight = originalHeight;
        }
        
        // Đảm bảo không vượt quá chiều cao tối đa
        if (targetHeight > maxHeight) {
          targetHeight = maxHeight;
          targetWidth = maxHeight * aspectRatio;
        }
      } else {
        // Ảnh dọc: ưu tiên chiều cao, giới hạn chiều rộng
        const maxWidth = 320; // Giảm chiều rộng cho ảnh dọc
        const maxHeight = 480; // Tăng chiều cao cho ảnh dọc
        
        if (originalHeight > maxHeight) {
          targetHeight = maxHeight;
          targetWidth = maxHeight * aspectRatio;
        } else {
          targetWidth = originalWidth;
          targetHeight = originalHeight;
        }
        
        // Đảm bảo không vượt quá chiều rộng tối đa
        if (targetWidth > maxWidth) {
          targetWidth = maxWidth;
          targetHeight = maxWidth / aspectRatio;
        }
      }
      
      setImageDimensions({ 
        width: Math.round(targetWidth), 
        height: Math.round(targetHeight) 
      });
    };
    img.src = imageSrc;
  };

  const changeToRandomImage = () => {
    if (isChanging) return;
    
    setIsChanging(true);
    
    // Chọn ảnh tiếp theo theo thứ tự
    const newIndex = (currentImageIndex + 1) % weddingImages.length;
    
    // Load kích thước ảnh mới
    loadImageDimensions(weddingImages[newIndex]);
    
    setTimeout(() => {
      setCurrentImageIndex(newIndex);
      setIsChanging(false);
    }, 300);
  };

  // Random ảnh ban đầu
  useEffect(() => {
    const randomIndex = 0; // Bắt đầu từ ảnh đầu tiên để tránh random
    setCurrentImageIndex(randomIndex);
    // Load kích thước ảnh đầu tiên
    loadImageDimensions(weddingImages[randomIndex]);
  }, []);

  // Auto change ảnh mỗi 5 giây
  useEffect(() => {
    if (!autoChange) return;

    const interval = setInterval(() => {
      changeToRandomImage();
    }, 5000);

    return () => clearInterval(interval);
  }, [autoChange, currentImageIndex]);

  const handleImageClick = () => {
    changeToRandomImage();
  };


  return (
    <div className={`relative ${className}`}>
      {/* Simplified Decorative Background */}
      <div className="absolute -inset-6 bg-gradient-to-br from-[#fc5d01]/10 via-[#fd7f33]/5 to-[#ffac7b]/10 rounded-3xl blur-xl"></div>
      
      {/* Reduced Floating Hearts - Only 3 subtle ones */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-[#fc5d01]/20"
          style={{
            left: `${10 + (i * 40)}%`,
            top: `${20 + (i * 20)}%`,
          }}
          animate={{
            y: [-5, -15, -5],
            opacity: [0.2, 0.4, 0.2],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 5 + (i * 1),
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut"
          }}
          suppressHydrationWarning
        >
          <Heart className="w-5 h-5 fill-current" />
        </motion.div>
      ))}

      {/* Main Hero Image Container */}
      <motion.div 
        className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80 backdrop-blur-sm cursor-pointer group"
        style={{
          width: imageDimensions.width > 0 ? `${imageDimensions.width}px` : '400px',
          height: imageDimensions.height > 0 ? `${imageDimensions.height}px` : '500px',
          minWidth: '320px',
          minHeight: '400px',
          maxWidth: '500px',
          maxHeight: '600px'
        }}
        animate={{
          width: imageDimensions.width > 0 ? `${imageDimensions.width}px` : '400px',
          height: imageDimensions.height > 0 ? `${imageDimensions.height}px` : '500px'
        }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        onClick={handleImageClick}
        whileHover={{ scale: 1.02 }}
      >
        
        {/* Smooth Image Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.8,
              ease: "easeInOut"
            }}
            className="absolute inset-0"
          >
            <Image
              src={weddingImages[currentImageIndex]}
              alt={`Thanh An & Thanh Ngân - Wedding Photo ${currentImageIndex + 1}`}
              fill
              className="object-cover"
              priority={currentImageIndex === 0}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Subtle Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#fc5d01]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Minimal Click Hint */}
        <motion.div 
          className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ scale: 1.1 }}
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-full p-2 shadow-lg">
            <Shuffle className="w-4 h-4 text-[#fc5d01]" />
          </div>
        </motion.div>
        
        {/* Simplified Corner Elements */}
        <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-white/70"></div>
        <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-white/70"></div>
        <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-white/70"></div>
        <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-white/70"></div>
      </motion.div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isChanging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-[#fc5d01]/30 border-t-[#fc5d01] rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RandomHeroImage;
