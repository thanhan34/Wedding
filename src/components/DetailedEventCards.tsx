'use client';

import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Heart, Gift } from 'lucide-react';

export default function DetailedEventCards() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#fedac2]/10 to-[#fdbc94]/10 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Hearts */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#fc5d01]/10"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [-10, -20, -10],
              opacity: [0.1, 0.2, 0.1],
              scale: [0.8, 1.2, 0.8],
              rotate: [0, 360]
            }}
            transition={{
              duration: 8 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          >
            <Heart className="w-6 h-6 fill-current" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-full shadow-xl mb-8"
          >
            <Gift className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl text-elegant text-[#fc5d01] mb-4">Chi Tiết Sự Kiện</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Thông tin chi tiết về lịch trình và dress code cho từng buổi tiệc
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] mx-auto rounded-full mt-6"></div>
        </motion.div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Nhà Trai Detailed Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="relative group"
          >
            <Card className="bg-gradient-to-br from-white via-[#fff8f5] to-[#fedac2]/20 border-2 border-[#fc5d01]/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden group-hover:shadow-3xl transition-all duration-500">
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#fc5d01]/5 via-transparent to-[#fd7f33]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={false}
              />

              {/* Header with Icon */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Heart className="w-8 h-8 text-white fill-current" />
                </div>
                <h3 className="text-2xl font-bold text-[#fc5d01] mb-2">Nhà Trai</h3>
                <p className="text-xl font-medium text-gray-800">24.10.2025</p>
                <p className="text-gray-600 font-semibold">Nhà Hàng Thắng Lợi 1</p>
                <p className="text-sm text-gray-500 mt-2">Số 01 Đ. Lê Hồng Phong, P. Mỹ Bình, Thành phố Long Xuyên, An Giang</p>
              </div>

              {/* Schedule */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-4 p-3 bg-[#fc5d01] text-white rounded-xl">
                  <div className="w-14 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold">11:00</span>
                  </div>
                  <span className="font-medium">Chụp ảnh cùng Cô Dâu & Chú Rể</span>
                </div>
                
                <div className="flex items-center space-x-4 p-3 bg-[#fc5d01] text-white rounded-xl">
                  <div className="w-14 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold">11:30</span>
                  </div>
                  <span className="font-medium">Hôn Lễ Bái Đấu</span>
                </div>
                
                <div className="flex items-center space-x-4 p-3 bg-[#fc5d01] text-white rounded-xl">
                  <div className="w-14 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold">12:00</span>
                  </div>
                  <span className="font-medium">Khai tiệc</span>
                </div>
              </div>

              {/* Dress Code */}
              <div className="border-t-2 border-[#fedac2] pt-6">
                <h4 className="text-lg font-semibold text-gray-800 text-center mb-4">Dress Code</h4>
                <div className="flex justify-center space-x-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-500 rounded-full mx-auto mb-2 shadow-md"></div>
                    <p className="text-sm font-medium text-gray-700">Đỏ</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-black rounded-full mx-auto mb-2 shadow-md"></div>
                    <p className="text-sm font-medium text-gray-700">Đen</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white border-2 border-gray-300 rounded-full mx-auto mb-2 shadow-md"></div>
                    <p className="text-sm font-medium text-gray-700">Trắng</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Nhà Gái Detailed Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="relative group"
          >
            <Card className="bg-gradient-to-br from-white via-[#fff8f5] to-[#fedac2]/20 border-2 border-[#fc5d01]/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden group-hover:shadow-3xl transition-all duration-500">
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#fc5d01]/5 via-transparent to-[#fd7f33]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={false}
              />

              {/* Header with Icon */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Heart className="w-8 h-8 text-white fill-current" />
                </div>
                <h3 className="text-2xl font-bold text-[#fc5d01] mb-2">Nhà Gái</h3>
                <p className="text-xl font-medium text-gray-800">23.10.2025</p>
                <p className="text-gray-600 font-semibold">Thanh Tâm Restaurant</p>
                <p className="text-sm text-gray-500 mt-2">97 Phạm Văn Hùng, TT. Kế Sách, Kế Sách, Sóc Trăng</p>
              </div>

              {/* Schedule */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-4 p-3 bg-[#fc5d01] text-white rounded-xl">
                  <div className="w-14 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold">16:00</span>
                  </div>
                  <span className="font-medium">Chụp ảnh cùng Cô Dâu & Chú Rể</span>
                </div>
                
                <div className="flex items-center space-x-4 p-3 bg-[#fc5d01] text-white rounded-xl">
                  <div className="w-14 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold">16:30</span>
                  </div>
                  <span className="font-medium">Hôn Lễ Bái Đấu</span>
                </div>
                
                <div className="flex items-center space-x-4 p-3 bg-[#fc5d01] text-white rounded-xl">
                  <div className="w-14 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold">17:00</span>
                  </div>
                  <span className="font-medium">Khai tiệc</span>
                </div>
              </div>

              {/* Dress Code */}
              <div className="border-t-2 border-[#fedac2] pt-6">
                <h4 className="text-lg font-semibold text-gray-800 text-center mb-4">Dress Code</h4>
                <div className="flex justify-center space-x-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-500 rounded-full mx-auto mb-2 shadow-md"></div>
                    <p className="text-sm font-medium text-gray-700">Đỏ</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-black rounded-full mx-auto mb-2 shadow-md"></div>
                    <p className="text-sm font-medium text-gray-700">Đen</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white border-2 border-gray-300 rounded-full mx-auto mb-2 shadow-md"></div>
                    <p className="text-sm font-medium text-gray-700">Trắng</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Báo Hỷ Detailed Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="relative group"
          >
            <Card className="bg-gradient-to-br from-white via-[#fff8f5] to-[#fedac2]/20 border-2 border-[#fc5d01]/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden group-hover:shadow-3xl transition-all duration-500">
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#fc5d01]/5 via-transparent to-[#fd7f33]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={false}
              />

              {/* Header with Icon */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#fc5d01] mb-2">Báo Hỷ</h3>
                <p className="text-xl font-medium text-gray-800">14.12.2025</p>
                <p className="text-gray-600 font-semibold">Resort Cồn Khương</p>
                <p className="text-sm text-gray-500 mt-2">99A, Võ Văn Tần, Cái Khế, Cần Thơ</p>
              </div>

              {/* Schedule */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-4 p-3 bg-[#fc5d01] text-white rounded-xl">
                  <div className="w-14 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold">15:00</span>
                  </div>
                  <span className="font-medium">Chụp ảnh cùng Cô Dâu & Chú Rể</span>
                </div>
                
                <div className="flex items-center space-x-4 p-3 bg-[#fc5d01] text-white rounded-xl">
                  <div className="w-14 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold">15:30</span>
                  </div>
                  <span className="font-medium">Hôn Lễ Bái Đấu</span>
                </div>
                
                <div className="flex items-center space-x-4 p-3 bg-[#fc5d01] text-white rounded-xl">
                  <div className="w-14 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold">16:00</span>
                  </div>
                  <span className="font-medium">Khai tiệc</span>
                </div>
              </div>

              {/* Dress Code */}
              <div className="border-t-2 border-[#fedac2] pt-6">
                <h4 className="text-lg font-semibold text-gray-800 text-center mb-4">Dress Code</h4>
                <div className="flex justify-center space-x-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-500 rounded-full mx-auto mb-2 shadow-md"></div>
                    <p className="text-sm font-medium text-gray-700">Đỏ</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-black rounded-full mx-auto mb-2 shadow-md"></div>
                    <p className="text-sm font-medium text-gray-700">Đen</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white border-2 border-gray-300 rounded-full mx-auto mb-2 shadow-md"></div>
                    <p className="text-sm font-medium text-gray-700">Trắng</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
