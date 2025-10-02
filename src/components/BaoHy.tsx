'use client';

import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Calendar, MapPin, Clock, Gift, Heart, Star, Sparkles, Users, Music, Camera, Utensils, Car, Phone, Mail } from 'lucide-react';

export default function BaoHy() {
  const openMap = () => {
    window.open('https://maps.google.com/?q=Victoria+Resort+Can+Tho+Cai+Khe+Ninh+Kieu', '_blank');
  };

  // Single event data for Báo Hỷ
  const baoHyEvent = {
    title: "Tiệc Báo Hỷ",
    coupleNames: "Thanh Ngân & Thanh An",
    date: "Saturday, 15 November, 2025",
    vietnameseDate: "Thứ Bảy, ngày 15.11.2025 (26.9 Ất Tỵ)",
    time: "16:00",
    location: "Resort Cồn Khương",
    address: "99A, Võ Văn Tần, Cái Khế, Cần Thơ",
    mapUrl: "https://maps.google.com/?q=Victoria+Resort+Can+Tho+Cai+Khe+Ninh+Kieu",
    description: "Tiệc báo hỷ với không gian sang trọng bên bờ sông Hậu thơ mộng"
  };


  return (
    <div className="py-20 px-4 bg-gradient-to-br from-[#fedac2]/10 via-white to-[#fdbc94]/10 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: 0 
            }}
            animate={{ 
              y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)],
              x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200)],
              opacity: [0, 0.1, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
          >
            {i % 4 === 0 ? (
              <Heart className="w-5 h-5 text-[#fc5d01] fill-current" />
            ) : i % 4 === 1 ? (
              <Star className="w-4 h-4 text-[#fd7f33] fill-current" />
            ) : i % 4 === 2 ? (
              <Sparkles className="w-4 h-4 text-[#ffac7b]" />
            ) : (
              <Gift className="w-4 h-4 text-[#fedac2]" />
            )}
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center justify-center mb-8"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative">
              <motion.div 
                className="w-20 h-20 bg-gradient-to-br from-[#fc5d01] via-[#fd7f33] to-[#ffac7b] rounded-full flex items-center justify-center shadow-2xl"
                animate={{ 
                  boxShadow: [
                    "0 20px 40px rgba(252, 93, 1, 0.3)",
                    "0 25px 50px rgba(252, 93, 1, 0.4)",
                    "0 20px 40px rgba(252, 93, 1, 0.3)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Gift className="w-10 h-10 text-white" />
              </motion.div>
              
              {/* Orbiting Elements */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-full"
                  style={{
                    top: "50%",
                    left: "50%",
                    transformOrigin: "0 0"
                  }}
                  animate={{
                    rotate: [0, 360],
                    x: [35, 35],
                    y: [-1.5, -1.5]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 1.33,
                    ease: "linear"
                  }}
                />
              ))}
            </div>
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-6xl font-light text-[#fc5d01] mb-6 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="relative z-10 text-elegant">Tiệc Báo Hỷ</span>
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-[#fedac2]/20 via-[#fdbc94]/20 to-[#fedac2]/20 rounded-2xl -z-10"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            />
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Chúng tôi rất hân hạnh được mời bạn tham dự tiệc báo hỷ của chúng tôi
            <motion.span
              className="inline-block ml-3"
              animate={{ 
                rotate: [0, 15, -15, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              💕
            </motion.span>
          </motion.p>
        </motion.div>

        {/* Main Event Card with Image */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch max-w-6xl mx-auto">
            {/* Couple Image */}
            <motion.div
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ scale: 1.05 }}
              className="group relative h-full"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-2xl h-full min-h-[600px]">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#fc5d01]/20 to-[#fd7f33]/20 opacity-0 group-hover:opacity-100 z-10"
                  transition={{ duration: 0.5 }}
                />
                <img
                  src="/Wedding/Doc/KTIU0157.jpg"
                  alt="Thanh Ngân & Thanh An"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 z-20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <h4 className="text-white text-2xl font-semibold mb-2">Thanh Ngân & Thanh An</h4>
                  <p className="text-white/90 text-sm">Một tình yêu đẹp như mơ</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Event Card */}
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group w-full h-full"
            >
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-[#fedac2]/30 rounded-3xl p-8 h-full min-h-[600px] hover:shadow-2xl transition-all duration-500 relative overflow-hidden flex flex-col justify-between">
              {/* Background Gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] opacity-0 group-hover:opacity-5"
                transition={{ duration: 0.5 }}
              />
              
              {/* Header */}
              <div className="text-center mb-8 relative z-10">
                <motion.div 
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-full text-white mb-6 shadow-xl"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.8 }}
                >
                  <Gift className="w-6 h-6" />
                </motion.div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  {baoHyEvent.title}
                </h3>
                <h4 className="text-base font-semibold text-[#fc5d01] mb-3">
                  {baoHyEvent.coupleNames}
                </h4>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  {baoHyEvent.date}
                </p>
                <p className="text-gray-600 text-xs mb-4">
                  {baoHyEvent.vietnameseDate}
                </p>
              </div>

              {/* Event Details */}
              <div className="space-y-8 relative z-10 mb-8">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <MapPin className="w-5 h-5 text-[#fc5d01]" />
                    <p className="text-gray-700 font-semibold text-base">Tại: {baoHyEvent.location}</p>
                  </div>
                  <p className="text-gray-600 text-sm leading-snug">{baoHyEvent.address}</p>
                </div>
                
                {/* Time Details */}
                <motion.div 
                  className="bg-gradient-to-r from-[#fedac2]/20 to-[#fdbc94]/20 rounded-2xl p-4 border-2 border-[#fedac2]/30"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-center space-x-3 mb-2">
                    <Clock className="w-5 h-5 text-[#fc5d01]" />
                    <p className="text-base font-bold text-gray-800">Thời gian: {baoHyEvent.time}</p>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <Star className="w-4 h-4 text-[#fc5d01]" />
                    <p className="text-sm text-center">
                      Chương trình bắt đầu đúng giờ
                    </p>
                    <Star className="w-4 h-4 text-[#fc5d01]" />
                  </div>
                </motion.div>

                {/* Dress Code Section */}
                <motion.div 
                  className="bg-gradient-to-r from-pink-50/80 to-white/80 rounded-2xl p-5 border-2 border-pink-200/50"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center space-x-2 mb-3">
                      <motion.div
                        className="flex items-center space-x-2"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      >
                        <Sparkles className="w-5 h-5 text-pink-500" />
                        <h5 className="text-base font-bold text-gray-800">Dress Code</h5>
                        <Sparkles className="w-5 h-5 text-pink-500" />
                      </motion.div>
                    </div>
                    
                    <div className="flex items-center justify-center space-x-6">
                      <motion.div 
                        className="flex flex-col items-center space-y-2"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border-3 border-gray-100">
                          <div className="w-6 h-6 bg-white rounded-full shadow-inner"></div>
                        </div>
                        <p className="text-sm font-semibold text-gray-700">Trắng</p>
                      </motion.div>
                      
                      <motion.div
                        className="text-2xl font-light text-pink-400"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        &
                      </motion.div>
                      
                      <motion.div 
                        className="flex flex-col items-center space-y-2"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full shadow-lg flex items-center justify-center border-3 border-pink-50">
                          <div className="w-6 h-6 bg-gradient-to-br from-pink-200 to-pink-300 rounded-full shadow-inner"></div>
                        </div>
                        <p className="text-sm font-semibold text-gray-700">Hồng Pastel</p>
                      </motion.div>
                    </div>
                    
                    <motion.div 
                      className="bg-gradient-to-r from-pink-100/50 to-white/50 rounded-xl p-3 border border-pink-200/30"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    >
                      <div className="flex items-center justify-center space-x-2 mb-1">
                        <Heart className="w-4 h-4 text-pink-500" />
                        <p className="text-sm font-medium text-gray-700">Trang phục gợi ý</p>
                        <Heart className="w-4 h-4 text-pink-500" />
                      </div>
                      <p className="text-gray-600 text-xs text-center">
                        Hãy diện những trang phục màu trắng hoặc hồng để hòa mình vào không khí lễ hội nhé! 🌸
                      </p>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Contact Info */}
                <motion.div 
                  className="bg-gradient-to-r from-[#fedac2]/20 to-[#fdbc94]/20 rounded-3xl p-8 border-2 border-[#fedac2]/30"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center space-x-4">
                      <Music className="w-8 h-8 text-[#fc5d01]" />
                      <p className="text-xl font-semibold text-gray-800">Tiệc mừng & Văn nghệ</p>
                    </div>
                    <div className="flex items-center justify-center space-x-4">
                      <Camera className="w-8 h-8 text-[#fc5d01]" />
                      <p className="text-xl font-semibold text-gray-800">Chụp ảnh lưu niệm</p>
                    </div>
                    <div className="flex items-center justify-center space-x-4">
                      <Phone className="w-8 h-8 text-[#fc5d01]" />
                      <p className="text-xl font-semibold text-gray-800">0292 3831 888</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Formal Invitation */}
              <div className="text-center mb-6 relative z-10">
                <motion.div
                  className="bg-gradient-to-r from-[#fc5d01]/10 to-[#fd7f33]/10 rounded-2xl p-6 border-2 border-[#fc5d01]/20"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-xl font-bold text-[#fc5d01] mb-4">TRÂN TRỌNG KÍNH MỜI</p>
                  <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                    Đến dự buổi tiệc chung vui cùng gia đình chúng tôi
                  </p>
                  <p className="text-xl font-semibold text-gray-800 mb-3">
                    Bạn + người thương (GĐ bạn)
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <Heart className="w-4 h-4 text-[#fc5d01]" />
                    <p className="text-sm">Sự hiện diện của bạn là niềm vinh hạnh cho chúng tôi</p>
                    <Heart className="w-4 h-4 text-[#fc5d01]" />
                  </div>
                </motion.div>
              </div>

              {/* Map Button */}
              {/* <div className="relative z-10">
                <motion.button
                  onClick={openMap}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group w-full bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] hover:from-[#e55401] hover:to-[#e56f2d] text-white font-medium py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  <div className="flex items-center justify-center relative z-10">
                    <MapPin className="w-5 h-5 mr-3" />
                    <span>Xem Bản Đồ</span>
                    <motion.div
                      className="ml-3"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                    >
                      →
                    </motion.div>
                  </div>
                </motion.button>
              </div> */}

            </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Thank You Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center"
        >
          <motion.div
            className="inline-flex items-center justify-center p-6 bg-gradient-to-r from-[#fc5d01]/10 to-[#fd7f33]/10 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            <motion.p 
              className="text-xl text-gray-700 flex items-center"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Rất mong được đón tiếp bạn trong buổi tiệc báo hỷ của chúng tôi
              <motion.span
                className="ml-3"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              >
                💖
              </motion.span>
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
