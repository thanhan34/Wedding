'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface SmartLayoutProps {
  photos: { src: string; orientation: 'landscape' | 'portrait' }[];
  onImageClick: (index: number) => void;
}

export default function SmartLayout({ photos, onImageClick }: SmartLayoutProps) {
  return (
    <div className="space-y-8">
      {/* Tiêu đề */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h3 className="text-3xl font-bold text-[#fc5d01] mb-4">
          📸 Smart Gallery Layout 📸
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Layout thông minh tự động điều chỉnh hiển thị dựa trên tỉ lệ ảnh ngang và dọc, 
          giữ nguyên tỉ lệ gốc của từng bức ảnh.
        </p>
      </motion.div>

      {/* Grid Layout với tỉ lệ thông minh */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            className="group cursor-pointer"
            onClick={() => onImageClick(index)}
          >
            <div 
              className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-[#fc5d01]/25 transition-all duration-700 transform hover:-translate-y-2 hover:scale-105 ${
                photo.orientation === 'landscape' 
                  ? 'aspect-[4/3]' // Tỉ lệ ngang 4:3
                  : 'aspect-[3/4]' // Tỉ lệ dọc 3:4
              }`}
            >
              <Image
                src={photo.src}
                alt={`Wedding photo ${index + 1}`}
                fill
                className="object-contain transition-transform duration-1000 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />
              
              {/* Overlay hiệu ứng */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#fc5d01]/20 via-transparent to-[#fd7f33]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Badge hiển thị orientation */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className={`px-3 py-1 rounded-full text-xs font-medium text-white backdrop-blur-xl ${
                  photo.orientation === 'landscape' 
                    ? 'bg-blue-500/80' 
                    : 'bg-green-500/80'
                }`}>
                  {photo.orientation === 'landscape' ? '📐 Ngang' : '📏 Dọc'}
                </div>
              </div>

              {/* Corner Brackets */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-[#fc5d01]" />
                <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-[#fc5d01]" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-[#fc5d01]" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-[#fc5d01]" />
              </div>

              {/* Info Panel */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="text-white">
                  <p className="font-bold text-sm">IMG_{String(index + 1).padStart(3, '0')}</p>
                  <p className="text-xs opacity-80">
                    {photo.orientation === 'landscape' ? 'Landscape Photo' : 'Portrait Photo'}
                  </p>
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
          </motion.div>
        ))}
      </div>

      {/* Thống kê */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-12 text-center"
      >
        <div className="flex justify-center space-x-8">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <div className="text-2xl font-bold text-blue-500 mb-2">
              {photos.filter(p => p.orientation === 'landscape').length}
            </div>
            <div className="text-sm text-gray-600">Ảnh Ngang</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <div className="text-2xl font-bold text-green-500 mb-2">
              {photos.filter(p => p.orientation === 'portrait').length}
            </div>
            <div className="text-sm text-gray-600">Ảnh Dọc</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <div className="text-2xl font-bold text-[#fc5d01] mb-2">
              {photos.length}
            </div>
            <div className="text-sm text-gray-600">Tổng Cộng</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
