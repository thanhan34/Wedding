'use client';

import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Heart, Star, Sparkles, Gift, Clock } from 'lucide-react';

export default function WeddingInvitation() {
  return (
    <div className="py-20 px-4 bg-gradient-to-br from-[#fedac2]/20 via-[#fff5f0] to-[#fdbc94]/20 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: (i * 60) % 1200,
              y: (i * 40) % 800,
              opacity: 0 
            }}
            animate={{ 
              y: [null, ((i * 40) % 800) + 100],
              x: [null, ((i * 60) % 1200) + 50],
              opacity: [0, 0.1, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: 25 + (i * 2),
              repeat: Infinity,
              delay: i * 0.5,
              ease: "linear"
            }}
            suppressHydrationWarning
          >
            {i % 5 === 0 ? (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#fedac2] to-[#fdbc94] opacity-20" />
            ) : i % 5 === 1 ? (
              <Heart className="w-6 h-6 text-[#fc5d01] fill-current opacity-20" />
            ) : i % 5 === 2 ? (
              <Star className="w-5 h-5 text-[#fd7f33] fill-current opacity-20" />
            ) : i % 5 === 3 ? (
              <Sparkles className="w-4 h-4 text-[#ffac7b] opacity-20" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] opacity-10" />
            )}
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-16"
        >
          {/* Decorative Elements Above Title */}
          <motion.div
            className="flex justify-center items-center space-x-4 mb-8"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#fc5d01] to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <motion.div
              className="w-8 h-8 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-full flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.2, rotate: 180 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Heart className="w-4 h-4 text-white fill-current" />
            </motion.div>
            <motion.div
              className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#fc5d01] to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-6xl font-light text-[#fc5d01] mb-8 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="relative z-10 text-elegant">Thiệp Mời Cưới</span>
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-[#fedac2]/15 via-[#fdbc94]/15 to-[#fedac2]/15 rounded-2xl -z-10"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.8 }}
            />
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg text-gray-600 font-light italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Chúng tôi rất hân hạnh được mời bạn tham dự
          </motion.p>
        </motion.div>

        {/* Wedding Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Nhà Trai Card */}
          <motion.div
            initial={{ opacity: 0, x: -100, rotate: -5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 100 }}
            whileHover={{ y: -10, rotate: 1, scale: 1.02 }}
            className="relative group"
          >
            {/* Heart Decoration */}
            <motion.div
              className="absolute -top-4 -right-4 z-20"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white fill-current" />
              </div>
            </motion.div>

            <Card className="bg-gradient-to-br from-white via-[#fff8f5] to-[#fedac2]/20 border-2 border-[#fc5d01]/30 rounded-3xl p-10 shadow-2xl relative overflow-hidden group-hover:shadow-3xl transition-all duration-500">
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#fc5d01]/5 via-transparent to-[#fd7f33]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={false}
              />
              
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-4 left-4 w-20 h-20 border-2 border-[#fc5d01] rounded-full" />
                <div className="absolute bottom-4 right-4 w-16 h-16 border-2 border-[#fd7f33] rounded-full" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-[#ffac7b] rounded-full" />
              </div>

              {/* Corner Decorations */}
              <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-[#fc5d01]/10 to-transparent rounded-br-full" />
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-[#fd7f33]/10 to-transparent rounded-tl-full" />

              <div className="relative z-10 text-center space-y-6">
                <motion.h2 
                  className="text-4xl font-light text-[#fc5d01] mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  Nhà Trai
                </motion.h2>

                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-medium text-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    Thanh Ngân & Thanh An
                  </motion.h3>
                  
                  <motion.p 
                    className="text-lg text-gray-600 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    Saturday, 29 November, 2025
                  </motion.p>
                  
                  <motion.p 
                    className="text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    Thứ 7, ngày 29.11.2025 (10.10 Ất Tỵ)
                  </motion.p>
                </div>

                <motion.div 
                  className="bg-gradient-to-r from-[#fc5d01]/10 to-[#fd7f33]/10 rounded-2xl p-6 space-y-3"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-lg font-semibold text-gray-800">
                    Tại: Nhà Hàng Thắng Lợi 1
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Số 01 Đ. Lê Hồng Phong, P. Mỹ Bình, Thành phố Long Xuyên, An Giang
                  </p>
                </motion.div>

                <motion.div 
                  className="border-t-2 border-[#fedac2] pt-6 space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  <p className="text-xl font-medium text-[#fc5d01]">
                    TRÂN TRỌNG KÍNH MỜI
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Đến dự buổi tiệc chung vui cùng gia đình chúng tôi
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    Bạn + người thương (GĐ bạn)
                  </p>
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <motion.div
                className="absolute bottom-4 left-4"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6 text-[#fc5d01] opacity-30" />
              </motion.div>
            </Card>
          </motion.div>

          {/* Nhà Gái Card */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotate: 5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.7, type: "spring", stiffness: 100 }}
            whileHover={{ y: -10, rotate: -1, scale: 1.02 }}
            className="relative group"
          >
            {/* Heart Decoration */}
            <motion.div
              className="absolute -top-4 -left-4 z-20"
              animate={{ 
                rotate: [0, -10, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, delay: 1 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white fill-current" />
              </div>
            </motion.div>

            <Card className="bg-gradient-to-br from-white via-[#fff8f5] to-[#fedac2]/20 border-2 border-[#fc5d01]/30 rounded-3xl p-10 shadow-2xl relative overflow-hidden group-hover:shadow-3xl transition-all duration-500">
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#fc5d01]/5 via-transparent to-[#fd7f33]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={false}
              />
              
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-4 right-4 w-20 h-20 border-2 border-[#fc5d01] rounded-full" />
                <div className="absolute bottom-4 left-4 w-16 h-16 border-2 border-[#fd7f33] rounded-full" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-[#ffac7b] rounded-full" />
              </div>

              {/* Corner Decorations */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#fc5d01]/10 to-transparent rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-[#fd7f33]/10 to-transparent rounded-tr-full" />

              <div className="relative z-10 text-center space-y-6">
                <motion.h2 
                  className="text-4xl font-light text-[#fc5d01] mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  Nhà Gái
                </motion.h2>

                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-medium text-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    Thanh An & Thanh Ngân
                  </motion.h3>
                  
                  <motion.p 
                    className="text-lg text-gray-600 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    Friday, 28 November, 2025
                  </motion.p>
                  
                  <motion.p 
                    className="text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                  >
                    Thứ 6, ngày 28.11.2025 (9.10 Ất Tỵ)
                  </motion.p>
                </div>

                <motion.div 
                  className="bg-gradient-to-r from-[#fc5d01]/10 to-[#fd7f33]/10 rounded-2xl p-6 space-y-3"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-lg font-semibold text-gray-800">
                    Tại: Nhà Hàng Thanh Tâm
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    97 Phạm Văn Hùng, TT. Kế Sách, Kế Sách, Sóc Trăng
                  </p>
                </motion.div>

                <motion.div 
                  className="border-t-2 border-[#fedac2] pt-6 space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.7 }}
                >
                  <p className="text-xl font-medium text-[#fc5d01]">
                    TRÂN TRỌNG KÍNH MỜI
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Đến dự buổi tiệc chung vui cùng gia đình chúng tôi
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    Bạn + người thương (GĐ bạn)
                  </p>
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <motion.div
                className="absolute bottom-4 right-4"
                animate={{ rotate: [0, -360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-6 h-6 text-[#fc5d01] opacity-30 fill-current" />
              </motion.div>
              </Card>
          </motion.div>

          {/* Tiệc Báo Hỷ Card */}
          <motion.div
            initial={{ opacity: 0, y: 50, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.9, type: "spring", stiffness: 100 }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="relative group"
          >
            {/* Gift Decoration */}
            <motion.div
              className="absolute -top-4 -right-4 z-20"
              animate={{ 
                rotate: [0, 15, -15, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 1, delay: 2 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <Gift className="w-6 h-6 text-white" />
              </div>
            </motion.div>

            <Card className="bg-gradient-to-br from-white via-[#fff8f5] to-[#fedac2]/20 border-2 border-[#fc5d01]/30 rounded-3xl p-10 shadow-2xl relative overflow-hidden group-hover:shadow-3xl transition-all duration-500">
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#fc5d01]/5 via-transparent to-[#fd7f33]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={false}
              />
              
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-4 left-4 w-20 h-20 border-2 border-[#fc5d01] rounded-full" />
                <div className="absolute bottom-4 right-4 w-16 h-16 border-2 border-[#fd7f33] rounded-full" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-[#ffac7b] rounded-full" />
              </div>

              {/* Corner Decorations */}
              <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-[#fc5d01]/10 to-transparent rounded-br-full" />
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-[#fd7f33]/10 to-transparent rounded-tl-full" />

              <div className="relative z-10 text-center space-y-6">
                <motion.h2 
                  className="text-4xl font-light text-[#fc5d01] mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  Tiệc Báo Hỷ
                </motion.h2>

                <div className="space-y-4">
                  <motion.h3 
                    className="text-2xl font-medium text-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    Thanh Ngân & Thanh An
                  </motion.h3>
                  
                  <motion.p 
                    className="text-lg text-gray-600 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                  >
                    Sunday, 14 December, 2025
                  </motion.p>
                  
                  <motion.p 
                    className="text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 }}
                  >
                    Chủ Nhật, ngày 14.12.2025 (25.10 Ất Tỵ)
                  </motion.p>
                </div>

                <motion.div 
                  className="bg-gradient-to-r from-[#fc5d01]/10 to-[#fd7f33]/10 rounded-2xl p-6 space-y-3"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-lg font-semibold text-gray-800">
                    Tại: Victoria Resort Cần Thơ
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Cái Khế, Ninh Kiều, Cần Thơ
                  </p>
                </motion.div>

                <motion.div 
                  className="border-t-2 border-[#fedac2] pt-6 space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.9 }}
                >
                  <p className="text-xl font-medium text-[#fc5d01]">
                    TRÂN TRỌNG KÍNH MỜI
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Đến dự buổi tiệc báo hỷ chung vui cùng gia đình chúng tôi
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    Bạn + người thương (GĐ bạn)
                  </p>
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <motion.div
                className="absolute bottom-4 left-4"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <Gift className="w-6 h-6 text-[#fc5d01] opacity-30" />
              </motion.div>
            </Card>
          </motion.div>
        </div>


        {/* Chi Tiết Sự Kiện Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Nhà Trai Detailed Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 2.4 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group"
            >
              <Card className="bg-gradient-to-br from-white via-[#fff8f5] to-[#fedac2]/20 border-2 border-[#fc5d01]/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden group-hover:shadow-3xl transition-all duration-500">
                {/* Header with Icon */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Heart className="w-8 h-8 text-white fill-current" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#fc5d01] mb-2">Nhà Trai</h3>
                  <p className="text-xl font-medium text-gray-800">29.11.2025</p>
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
              transition={{ duration: 0.8, delay: 2.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group"
            >
              <Card className="bg-gradient-to-br from-white via-[#fff8f5] to-[#fedac2]/20 border-2 border-[#fc5d01]/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden group-hover:shadow-3xl transition-all duration-500">
                {/* Header with Icon */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Heart className="w-8 h-8 text-white fill-current" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#fc5d01] mb-2">Nhà Gái</h3>
                  <p className="text-xl font-medium text-gray-800">28.11.2025</p>
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
              transition={{ duration: 0.8, delay: 2.8 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group"
            >
              <Card className="bg-gradient-to-br from-white via-[#fff8f5] to-[#fedac2]/20 border-2 border-[#fc5d01]/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden group-hover:shadow-3xl transition-all duration-500">
                {/* Header with Icon */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Gift className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#fc5d01] mb-2">Báo Hỷ</h3>
                  <p className="text-xl font-medium text-gray-800">14.12.2025</p>
                  <p className="text-gray-600 font-semibold">Victoria Resort Cần Thơ</p>
                  <p className="text-sm text-gray-500 mt-2">Cái Khế, Ninh Kiều, Cần Thơ</p>
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
        </motion.div>

        {/* Bottom Decoration */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3 }}
          className="text-center mt-16"
        >
          <motion.div
            className="inline-flex items-center justify-center space-x-4 p-6 bg-gradient-to-r from-[#fc5d01]/10 via-[#fd7f33]/10 to-[#fc5d01]/10 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            <Heart className="w-6 h-6 text-[#fc5d01] fill-current" />
            <motion.p 
              className="text-xl text-gray-700 font-medium"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Sự hiện diện của bạn là niềm hạnh phúc của chúng tôi
            </motion.p>
            <Heart className="w-6 h-6 text-[#fc5d01] fill-current" />
          </motion.div>
        </motion.div>

       
      </div>
    </div>
  );
}
