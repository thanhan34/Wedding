'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Heart, Sparkles, Star } from 'lucide-react';

interface ButterflyWingsLayoutProps {
  photos: { src: string; orientation: 'landscape' | 'portrait' }[] | string[];
  onImageClick: (index: number) => void;
}

interface ButterflyPhoto {
  photo: string;
  originalIndex: number;
  position: {
    left: string;
    top: string;
    width: string;
    height: string;
    rotate: string;
  };
  wing: 'left' | 'right';
}

export default function ButterflyWingsLayout({ photos, onImageClick }: ButterflyWingsLayoutProps) {
  const [butterflyPhotos, setButterflyPhotos] = useState<ButterflyPhoto[]>([]);

  useEffect(() => {
    // Tạo layout hình cánh bướm đối xứng
    const leftWingPositions = [
      // Cánh trái - phần trên
      { left: '25%', top: '15%', width: '100px', height: '80px', rotate: '-15deg' },
      { left: '20%', top: '25%', width: '90px', height: '90px', rotate: '-10deg' },
      { left: '15%', top: '35%', width: '110px', height: '85px', rotate: '-20deg' },
      { left: '12%', top: '45%', width: '95px', height: '95px', rotate: '-5deg' },
      { left: '18%', top: '55%', width: '85px', height: '100px', rotate: '-25deg' },
      
      // Cánh trái - phần giữa
      { left: '30%', top: '20%', width: '80px', height: '80px', rotate: '-8deg' },
      { left: '35%', top: '30%', width: '105px', height: '75px', rotate: '-12deg' },
      { left: '32%', top: '40%', width: '90px', height: '90px', rotate: '-18deg' },
      { left: '28%', top: '50%', width: '95px', height: '85px', rotate: '-6deg' },
      
      // Cánh trái - phần trong
      { left: '40%', top: '25%', width: '75px', height: '85px', rotate: '-3deg' },
      { left: '42%', top: '35%', width: '85px', height: '80px', rotate: '-15deg' },
      { left: '38%', top: '45%', width: '80px', height: '90px', rotate: '-8deg' },
      
      // Cánh trái - phần dưới
      { left: '22%', top: '65%', width: '90px', height: '75px', rotate: '-30deg' },
      { left: '30%', top: '70%', width: '85px', height: '85px', rotate: '-12deg' },
      { left: '35%', top: '75%', width: '75px', height: '80px', rotate: '-20deg' },
    ];

    const rightWingPositions = [
      // Cánh phải - đối xứng với cánh trái
      { left: '75%', top: '15%', width: '100px', height: '80px', rotate: '15deg' },
      { left: '80%', top: '25%', width: '90px', height: '90px', rotate: '10deg' },
      { left: '85%', top: '35%', width: '110px', height: '85px', rotate: '20deg' },
      { left: '88%', top: '45%', width: '95px', height: '95px', rotate: '5deg' },
      { left: '82%', top: '55%', width: '85px', height: '100px', rotate: '25deg' },
      
      // Cánh phải - phần giữa
      { left: '70%', top: '20%', width: '80px', height: '80px', rotate: '8deg' },
      { left: '65%', top: '30%', width: '105px', height: '75px', rotate: '12deg' },
      { left: '68%', top: '40%', width: '90px', height: '90px', rotate: '18deg' },
      { left: '72%', top: '50%', width: '95px', height: '85px', rotate: '6deg' },
      
      // Cánh phải - phần trong
      { left: '60%', top: '25%', width: '75px', height: '85px', rotate: '3deg' },
      { left: '58%', top: '35%', width: '85px', height: '80px', rotate: '15deg' },
      { left: '62%', top: '45%', width: '80px', height: '90px', rotate: '8deg' },
      
      // Cánh phải - phần dưới
      { left: '78%', top: '65%', width: '90px', height: '75px', rotate: '30deg' },
      { left: '70%', top: '70%', width: '85px', height: '85px', rotate: '12deg' },
      { left: '65%', top: '75%', width: '75px', height: '80px', rotate: '20deg' },
    ];

    // Kết hợp các vị trí và gán wing type
    const allPositions: (typeof leftWingPositions[0] & { wing: 'left' | 'right' })[] = [
      ...leftWingPositions.map(pos => ({ ...pos, wing: 'left' as const })),
      ...rightWingPositions.map(pos => ({ ...pos, wing: 'right' as const }))
    ];
    
    const newButterflyPhotos: ButterflyPhoto[] = photos.slice(0, Math.min(30, allPositions.length)).map((photo, index) => ({
      photo: typeof photo === 'string' ? photo : photo.src,
      originalIndex: index,
      position: allPositions[index],
      wing: allPositions[index].wing
    }));

    setButterflyPhotos(newButterflyPhotos);
  }, [photos]);

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Container cho cánh bướm */}
      <div className="relative w-full h-[700px] md:h-[800px] lg:h-[900px]">
        
        {/* Hiệu ứng bụi kim tuyến bay */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] rounded-full"
              animate={{
                x: [Math.random() * 1200, Math.random() * 1200],
                y: [Math.random() * 800, Math.random() * 800],
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
                rotate: [0, 360]
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                repeatDelay: Math.random() * 3
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Vẽ đường viền cánh bướm bằng SVG */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          viewBox="0 0 800 600"
        >
          {/* Cánh trái */}
          <motion.path
            d="M 400 300 Q 300 200 200 150 Q 150 200 180 280 Q 200 350 250 380 Q 300 400 350 380 Q 380 350 400 300"
            fill="none"
            stroke="url(#butterflyGradient1)"
            strokeWidth="2"
            strokeDasharray="8,4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 3, delay: 0.5 }}
          />
          
          {/* Cánh phải */}
          <motion.path
            d="M 400 300 Q 500 200 600 150 Q 650 200 620 280 Q 600 350 550 380 Q 500 400 450 380 Q 420 350 400 300"
            fill="none"
            stroke="url(#butterflyGradient2)"
            strokeWidth="2"
            strokeDasharray="8,4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 3, delay: 1 }}
          />

          {/* Thân bướm */}
          <motion.line
            x1="400"
            y1="200"
            x2="400"
            y2="450"
            stroke="url(#butterflyBody)"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 2, delay: 1.5 }}
          />

          {/* Râu bướm */}
          <motion.path
            d="M 395 200 Q 390 180 385 170"
            stroke="url(#butterflyBody)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 1, delay: 2 }}
          />
          <motion.path
            d="M 405 200 Q 410 180 415 170"
            stroke="url(#butterflyBody)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.7 }}
            transition={{ duration: 1, delay: 2 }}
          />

          {/* Gradient definitions */}
          <defs>
            <linearGradient id="butterflyGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fc5d01" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#fd7f33" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ffac7b" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="butterflyGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffac7b" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#fd7f33" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#fc5d01" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="butterflyBody" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fc5d01" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#fd7f33" stopOpacity="0.6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Render ảnh theo layout cánh bướm */}
        {butterflyPhotos.map((item, index) => {
          // Improved orientation detection
          const currentPhoto = typeof photos[item.originalIndex] === 'string' 
            ? { src: photos[item.originalIndex] as string, orientation: 'landscape' as const } 
            : photos[item.originalIndex] as { src: string; orientation: 'landscape' | 'portrait' };
          const isPortrait = currentPhoto.orientation === 'portrait';

          // Điều chỉnh kích thước frame dựa trên orientation
          const baseWidth = parseInt(item.position.width);
          const baseHeight = parseInt(item.position.height);
          
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
              initial={{ opacity: 0, scale: 0, rotate: item.wing === 'left' ? -90 : 90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ 
                duration: 1, 
                delay: index * 0.08,
                type: "spring",
                bounce: 0.3
              }}
              className="absolute group cursor-pointer"
              style={{
                left: item.position.left,
                top: item.position.top,
                width: frameStyle.width,
                height: frameStyle.height,
                transform: `translate(-50%, -50%) rotate(${item.position.rotate})`,
                zIndex: 40 - index
              }}
              onClick={() => onImageClick(item.originalIndex)}
              whileHover={{ 
                scale: 1.2, 
                zIndex: 999,
                rotate: `${parseFloat(item.position.rotate) + (Math.random() - 0.5) * 20}deg`,
                transition: { duration: 0.3 }
              }}
            >
              <div 
                className="relative w-full h-full overflow-hidden rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm border-2 border-[#fc5d01]/30 shadow-xl hover:shadow-2xl hover:shadow-[#fc5d01]/40 transition-all duration-500"
                style={{ aspectRatio: frameStyle.aspectRatio }}
              >
                <Image
                  src={item.photo}
                  alt={`Butterfly wing photo ${index + 1}`}
                  fill
                  className="object-contain transition-transform duration-700 group-hover:scale-110"
                  sizes="120px"
                />
              
              {/* Hiệu ứng cánh bướm lấp lánh */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#fc5d01]/20 via-transparent to-[#fd7f33]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Bụi kim tuyến khi hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 text-[#fc5d01]"
                    initial={{ scale: 0, x: '50%', y: '50%' }}
                    animate={{
                      scale: [0, 1, 0],
                      x: [0, (Math.random() - 0.5) * 100],
                      y: [0, -50 - Math.random() * 40],
                      opacity: [0, 1, 0],
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      repeatDelay: 1.2
                    }}
                    style={{
                      left: '50%',
                      top: '50%'
                    }}
                  >
                    <Star className="w-full h-full fill-current" />
                  </motion.div>
                ))}
              </div>

              {/* Viền cánh bướm phát sáng */}
              <motion.div
                className="absolute inset-0 rounded-2xl border border-[#fc5d01]/50 opacity-0 group-hover:opacity-100"
                animate={{
                  boxShadow: [
                    '0 0 0px rgba(252, 93, 1, 0)',
                    '0 0 20px rgba(252, 93, 1, 0.4)',
                    '0 0 0px rgba(252, 93, 1, 0)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Hiệu ứng bay lượn cho từng cánh */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  y: item.wing === 'left' ? [0, -2, 0] : [0, 2, 0],
                  x: item.wing === 'left' ? [-1, 1, -1] : [1, -1, 1]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2
                }}
              />
              </div>
            </motion.div>
          );
        })}

        {/* Hiệu ứng bướm bay xung quanh */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-6 h-6 text-[#fc5d01]/60"
              animate={{
                x: [
                  Math.random() * 200 + 100,
                  Math.random() * 200 + 400,
                  Math.random() * 200 + 100
                ],
                y: [
                  Math.random() * 150 + 100,
                  Math.random() * 150 + 300,
                  Math.random() * 150 + 100
                ],
                rotate: [0, 360],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: i * 2,
                ease: "easeInOut"
              }}
            >
              <div className="relative">
                {/* Cánh bướm mini */}
                <div className="absolute w-3 h-2 bg-[#fc5d01] rounded-full transform -rotate-45 -translate-x-1" />
                <div className="absolute w-3 h-2 bg-[#fd7f33] rounded-full transform rotate-45 translate-x-1" />
                <div className="absolute w-1 h-4 bg-[#fc5d01] rounded-full left-1/2 transform -translate-x-1/2" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Thông tin layout */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3 }}
        className="text-center mt-12"
      >
        <h3 className="text-2xl font-bold text-[#fc5d01] mb-4">
          🦋 Cánh Bướm Tình Yêu 🦋
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Như đôi cánh bướm bay lượn trong gió, tình yêu của chúng tôi nhẹ nhàng và tự do. 
          Mỗi bức ảnh là một khoảnh khắc bay bổng, đầy màu sắc và sự kỳ diệu trong hành trình chung.
        </p>
      </motion.div>
    </div>
  );
}
