'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface WeddingRingsLayoutProps {
  photos: { src: string; orientation: 'landscape' | 'portrait' }[] | string[];
  onImageClick: (index: number) => void;
}

interface RingPhoto {
  photo: string;
  originalIndex: number;
  position: {
    left: string;
    top: string;
    width: string;
    height: string;
    rotate: string;
  };
}

export default function WeddingRingsLayout({ photos, onImageClick }: WeddingRingsLayoutProps) {
  const [ringPhotos, setRingPhotos] = useState<RingPhoto[]>([]);

  useEffect(() => {
    // Tạo layout hình 2 chiếc nhẫn cưới đan xen nhau
    const leftRingPositions = [
      // Nhẫn trái - vòng tròn bên trái
      { left: '20%', top: '25%', width: '90px', height: '90px', rotate: '-5deg' },
      { left: '15%', top: '35%', width: '80px', height: '80px', rotate: '10deg' },
      { left: '12%', top: '50%', width: '100px', height: '100px', rotate: '-3deg' },
      { left: '15%', top: '65%', width: '85px', height: '85px', rotate: '7deg' },
      { left: '20%', top: '75%', width: '95px', height: '95px', rotate: '-8deg' },
      { left: '30%', top: '80%', width: '75px', height: '75px', rotate: '4deg' },
      { left: '40%', top: '78%', width: '90px', height: '90px', rotate: '-2deg' },
      { left: '48%', top: '70%', width: '80px', height: '80px', rotate: '6deg' },
      { left: '52%', top: '60%', width: '85px', height: '85px', rotate: '-4deg' },
      { left: '50%', top: '45%', width: '95px', height: '95px', rotate: '3deg' },
      { left: '45%', top: '30%', width: '75px', height: '75px', rotate: '-6deg' },
      { left: '35%', top: '20%', width: '85px', height: '85px', rotate: '5deg' },
    ];

    const rightRingPositions = [
      // Nhẫn phải - vòng tròn bên phải, đan xen với nhẫn trái
      { left: '65%', top: '20%', width: '85px', height: '85px', rotate: '8deg' },
      { left: '75%', top: '25%', width: '90px', height: '90px', rotate: '-4deg' },
      { left: '82%', top: '35%', width: '80px', height: '80px', rotate: '6deg' },
      { left: '85%', top: '50%', width: '100px', height: '100px', rotate: '-7deg' },
      { left: '82%', top: '65%', width: '85px', height: '85px', rotate: '3deg' },
      { left: '75%', top: '75%', width: '95px', height: '95px', rotate: '-5deg' },
      { left: '65%', top: '80%', width: '75px', height: '75px', rotate: '9deg' },
      { left: '55%', top: '78%', width: '90px', height: '90px', rotate: '-2deg' },
      { left: '48%', top: '70%', width: '80px', height: '80px', rotate: '4deg' },
      { left: '45%', top: '55%', width: '85px', height: '85px', rotate: '-6deg' },
      { left: '50%', top: '40%', width: '95px', height: '95px', rotate: '7deg' },
      { left: '58%', top: '25%', width: '75px', height: '75px', rotate: '-3deg' },
    ];

    // Kết hợp và trộn các vị trí
    const allPositions = [...leftRingPositions, ...rightRingPositions];
    
    const newRingPhotos: RingPhoto[] = photos.slice(0, Math.min(24, allPositions.length)).map((photo, index) => ({
      photo: typeof photo === 'string' ? photo : photo.src,
      originalIndex: index,
      position: allPositions[index]
    }));

    setRingPhotos(newRingPhotos);
  }, [photos]);

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Container cho 2 chiếc nhẫn */}
      <div className="relative w-full h-[700px] md:h-[800px] lg:h-[900px]">
        
        {/* Hiệu ứng ánh sáng kim cương */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-[#fc5d01] to-[#ffffff] rounded-full"
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                rotate: [0, 360]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
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

        {/* Vẽ đường viền nhẫn bằng SVG */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          viewBox="0 0 800 600"
        >
          {/* Nhẫn trái */}
          <motion.circle
            cx="280"
            cy="300"
            r="120"
            fill="none"
            stroke="url(#ringGradient1)"
            strokeWidth="3"
            strokeDasharray="10,5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
          
          {/* Nhẫn phải */}
          <motion.circle
            cx="520"
            cy="300"
            r="120"
            fill="none"
            stroke="url(#ringGradient2)"
            strokeWidth="3"
            strokeDasharray="10,5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 2, delay: 1 }}
          />

          {/* Gradient definitions */}
          <defs>
            <linearGradient id="ringGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fc5d01" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#fd7f33" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ffac7b" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="ringGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffac7b" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#fd7f33" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#fc5d01" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>

        {/* Render ảnh theo layout nhẫn */}
        {ringPhotos.map((item, index) => (
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
              left: item.position.left,
              top: item.position.top,
              width: item.position.width,
              height: item.position.height,
              transform: `translate(-50%, -50%) rotate(${item.position.rotate})`,
              zIndex: 30 - index
            }}
            onClick={() => onImageClick(item.originalIndex)}
            whileHover={{ 
              scale: 1.15, 
              zIndex: 999,
              rotate: `${parseFloat(item.position.rotate) + (Math.random() - 0.5) * 15}deg`,
              transition: { duration: 0.3 }
            }}
          >
            <div className="relative w-full h-full overflow-hidden rounded-full bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm border-3 border-[#fc5d01]/40 shadow-xl hover:shadow-2xl hover:shadow-[#fc5d01]/50 transition-all duration-500">
              <Image
                src={item.photo}
                alt={`Wedding ring photo ${index + 1}`}
                fill
                className="object-contain transition-transform duration-700 group-hover:scale-110"
                sizes="120px"
              />
              
              {/* Kim cương hiệu ứng */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#fc5d01]/30 via-transparent to-[#ffffff]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Sparkles khi hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 text-[#fc5d01]"
                    initial={{ scale: 0, x: '50%', y: '50%' }}
                    animate={{
                      scale: [0, 1, 0],
                      x: [0, Math.random() * 80 - 40],
                      y: [0, -40 - Math.random() * 30],
                      opacity: [0, 1, 0],
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      delay: i * 0.4,
                      repeatDelay: 1.5
                    }}
                    style={{
                      left: '50%',
                      top: '50%'
                    }}
                  >
                    <Sparkles className="w-full h-full fill-current" />
                  </motion.div>
                ))}
              </div>

              {/* Viền kim cương lấp lánh */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[#fc5d01]/60 opacity-0 group-hover:opacity-100"
                animate={{
                  boxShadow: [
                    '0 0 0px rgba(252, 93, 1, 0)',
                    '0 0 25px rgba(252, 93, 1, 0.4)',
                    '0 0 0px rgba(252, 93, 1, 0)'
                  ]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        ))}

        {/* Hiệu ứng trái tim bay lên từ giữa 2 nhẫn */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 text-[#fc5d01]"
              animate={{
                y: [0, -100 - Math.random() * 50],
                x: [0, (Math.random() - 0.5) * 60],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                rotate: [0, 360]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.6,
                repeatDelay: 2
              }}
            >
              <Heart className="w-full h-full fill-current" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Thông tin layout */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5 }}
        className="text-center mt-12"
      >
        <h3 className="text-2xl font-bold text-[#fc5d01] mb-4">
          💍 Nhẫn Cưới Đôi 💍
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Hai chiếc nhẫn cưới đan xen nhau, tượng trưng cho tình yêu vĩnh cửu và sự gắn kết không thể tách rời. 
          Mỗi bức ảnh là một viên kim cương quý giá trong hành trình tình yêu của chúng mình.
        </p>
      </motion.div>
    </div>
  );
}
