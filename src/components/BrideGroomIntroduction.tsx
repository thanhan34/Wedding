'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Heart, Quote, Sparkles, Star, Flower2, Crown } from 'lucide-react';
import { useWeddingData } from '../hooks/useWeddingData';

export default function BrideGroomIntroduction() {
  const { weddingData, loading } = useWeddingData();

  return (
    <section className="py-24 bg-gradient-to-br from-[#fedac2]/20 via-white via-50% to-[#fdbc94]/20 relative overflow-hidden">
      {/* Enhanced Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Background Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-[#fc5d01]/10 to-[#fd7f33]/5 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.15, 0.05],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-[#ffac7b]/10 to-[#fdbc94]/5 rounded-full blur-3xl"
        />

        {/* Floating Hearts with Enhanced Animation */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#fc5d01]/15"
            style={{
              left: `${10 + i * 8}%`,
              top: `${5 + (i % 4) * 25}%`,
            }}
            animate={{
              y: [-20, -35, -20],
              x: [-5, 5, -5],
              opacity: [0.1, 0.4, 0.1],
              scale: [0.6, 1.4, 0.6],
              rotate: [0, 360]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          >
            <Heart className="w-5 h-5 fill-current" />
          </motion.div>
        ))}

        {/* Enhanced Sparkle Effects */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute text-[#ffac7b]/25"
            style={{
              left: `${15 + i * 10}%`,
              top: `${15 + (i % 3) * 30}%`,
            }}
            animate={{
              scale: [0, 2, 0],
              rotate: [0, 270, 540],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-3 h-3" />
          </motion.div>
        ))}

        {/* Floating Flower Elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`flower-${i}`}
            className="absolute text-[#fd7f33]/20"
            style={{
              left: `${25 + i * 12}%`,
              top: `${8 + (i % 2) * 50}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.3, 0.8],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 12 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          >
            <Flower2 className="w-4 h-4" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          {/* Decorative Top Elements */}
          <div className="flex items-center justify-center mb-8">
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-[#fc5d01]/30 mr-4"
            >
              <Crown className="w-8 h-8" />
            </motion.div>
            
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#fc5d01] via-[#fd7f33] to-[#ffac7b] rounded-full shadow-2xl relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-full animate-pulse opacity-50"></div>
              <Heart className="w-12 h-12 text-white fill-current relative z-10" />
            </motion.div>
            
            <motion.div
              animate={{ 
                rotate: [360, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-[#fd7f33]/30 ml-4"
            >
              <Crown className="w-8 h-8" />
            </motion.div>
          </div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-extralight text-transparent bg-clip-text bg-gradient-to-r from-[#fc5d01] via-[#fd7f33] to-[#ffac7b] mb-6 tracking-wide"
          >
            Giới Thiệu Cô Dâu & Chú Rể
          </motion.h2>
          
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="w-32 h-1 bg-gradient-to-r from-[#fc5d01] via-[#fd7f33] to-[#ffac7b] mx-auto rounded-full mb-6"
          />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Hãy cùng tìm hiểu về câu chuyện tình yêu và những con người đặc biệt trong ngày trọng đại này
          </motion.p>
          
          {/* Decorative Bottom Elements */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
                className="w-2 h-2 bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] rounded-full"
              />
            ))}
          </div>
        </motion.div>

        {/* Bride and Groom Introduction */}
        <div className="space-y-20">
          
          {/* Groom Section - Image Left, Text Right */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Enhanced Groom Photo */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className="relative inline-block w-full">
                {/* Multiple Rotating Rings */}
                <motion.div
                  animate={{ 
                    rotate: [0, 360]
                  }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute -inset-8 bg-gradient-to-r from-[#fc5d01] via-[#fd7f33] to-[#ffac7b] rounded-3xl opacity-15 blur-xl"
                />
                
                <motion.div
                  animate={{ 
                    rotate: [360, 0]
                  }}
                  transition={{ 
                    duration: 15, 
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute -inset-4 bg-gradient-to-l from-[#ffac7b] via-[#fd7f33] to-[#fc5d01] rounded-3xl opacity-10 blur-lg"
                />
                
                {/* Enhanced Photo Container */}
                <motion.div
                  whileHover={{ 
                    scale: 1.03,
                    rotateY: 5,
                    transition: { duration: 0.4 }
                  }}
                  className="relative w-full h-[420px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 backdrop-blur-sm"
                  style={{
                    background: 'linear-gradient(145deg, rgba(252,93,1,0.1), rgba(253,127,51,0.1))'
                  }}
                >
                  <Image
                    src="/Wedding/Doc/KTIU8198.JPG"
                    alt="Chú rể Thanh An"
                    fill
                    className="object-cover hover:scale-110 transition-all duration-700 hover:brightness-110"
                  />
                  
                  {/* Enhanced Overlay Effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#fc5d01]/5 via-transparent to-[#fd7f33]/5"></div>
                  
                  {/* Corner Decorations */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#fc5d01]/40 rounded-tl-lg"></div>
                  <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[#fd7f33]/40 rounded-tr-lg"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[#fc5d01]/40 rounded-bl-lg"></div>
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#fd7f33]/40 rounded-br-lg"></div>
                </motion.div>
                
                {/* Enhanced Floating Elements */}
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.3, 1],
                    y: [-5, -15, -5]
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-6 -right-6 text-5xl drop-shadow-lg"
                >
                  💙
                </motion.div>
                
                <motion.div
                  animate={{ 
                    rotate: [360, 0],
                    scale: [1, 1.4, 1],
                    y: [5, 15, 5]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute -bottom-6 -left-6 text-4xl drop-shadow-lg"
                >
                  ⭐
                </motion.div>
                
                {/* Additional Floating Hearts */}
                <motion.div
                  animate={{ 
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.6, 1, 0.6],
                    x: [-10, 10, -10]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                  className="absolute top-1/2 -left-8 text-2xl"
                >
                  💫
                </motion.div>
              </div>
            </motion.div>

            {/* Groom Text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Enhanced Name and Title */}
              <div className="text-left relative">
                {/* Background Decoration */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-[#fc5d01]/5 to-[#fd7f33]/5 rounded-full blur-xl"></div>
                
                <motion.h3 
                  className="text-6xl font-extralight text-transparent bg-clip-text bg-gradient-to-r from-[#fc5d01] via-[#fd7f33] to-[#ffac7b] mb-4 relative z-10"
                  whileHover={{ 
                    scale: 1.05,
                    textShadow: "0 0 20px rgba(252,93,1,0.3)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {loading ? 'Thanh An' : weddingData.loveStory.groom.name}
                </motion.h3>
                
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-24 h-1.5 bg-gradient-to-r from-[#fc5d01] via-[#fd7f33] to-[#ffac7b] rounded-full mb-6 shadow-lg"
                />
                
                <div className="flex items-center space-x-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="text-[#fc5d01]/60"
                  >
                    <Crown className="w-6 h-6" />
                  </motion.div>
                  <p className="text-2xl text-gray-600 font-light tracking-wide">Chú Rể</p>
                </div>
              </div>

              {/* Enhanced Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative"
              >
                <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-[#fc5d01]/30 to-transparent rounded-full"></div>
                <p className="text-xl text-gray-700 leading-relaxed font-light pl-6">
                  {loading ? 'Thanh An, chàng trai nhẹ nhàng, tình cảm' : weddingData.loveStory.groom.description}
                </p>
              </motion.div>

              {/* Enhanced Quote */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative"
              >
                {/* Quote Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#fedac2]/20 via-[#ffac7b]/10 to-transparent rounded-3xl blur-sm"></div>
                
                <div className="relative bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-[#fc5d01]/20 shadow-xl">
                  {/* Decorative Quote Icon */}
                  <motion.div
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Quote className="w-6 h-6 text-white" />
                  </motion.div>
                  
                  {/* Quote Text */}
                  <blockquote className="text-gray-700 italic leading-relaxed text-lg font-light pt-4">
                    {loading 
                      ? 'Mỗi ngày thức dậy bạn nghĩ đến 1 ai đó, trước khi đi ngủ bạn nghĩ đến 1 ai đó… Đó là 1 ngày trọn vẹn. Cảm ơn vì đã gặp được em "Thanh Ngân", anh mong sau này, dù có thế nào, chúng ta cũng mãi yêu thương nhau, mãi nắm tay nhau đi đến hết con đường còn lại em nhé !!'
                      : weddingData.loveStory.groom.quote
                    }
                  </blockquote>
                  
                  {/* Decorative Elements */}
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeInOut"
                        }}
                        className="w-2 h-2 bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] rounded-full"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Bride Section - Text Left, Image Right */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Enhanced Bride Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-6 lg:order-1"
            >
              {/* Enhanced Name and Title */}
              <div className="text-left relative">
                {/* Background Decoration */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#fd7f33]/5 to-[#ffac7b]/5 rounded-full blur-xl"></div>
                
                <motion.h3 
                  className="text-6xl font-extralight text-transparent bg-clip-text bg-gradient-to-r from-[#fd7f33] via-[#ffac7b] to-[#fdbc94] mb-4 relative z-10"
                  whileHover={{ 
                    scale: 1.05,
                    textShadow: "0 0 20px rgba(253,127,51,0.3)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {loading ? 'Thanh Ngân' : weddingData.loveStory.bride.name}
                </motion.h3>
                
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-24 h-1.5 bg-gradient-to-r from-[#fd7f33] via-[#ffac7b] to-[#fdbc94] rounded-full mb-6 shadow-lg"
                />
                
                <div className="flex items-center space-x-3">
                  <motion.div
                    animate={{ rotate: [360, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="text-[#fd7f33]/60"
                  >
                    <Flower2 className="w-6 h-6" />
                  </motion.div>
                  <p className="text-2xl text-gray-600 font-light tracking-wide">Cô Dâu</p>
                </div>
              </div>

              {/* Enhanced Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative"
              >
                <div className="absolute -right-2 top-0 w-1 h-full bg-gradient-to-b from-[#fd7f33]/30 to-transparent rounded-full"></div>
                <p className="text-xl text-gray-700 leading-relaxed font-light pr-6">
                  {loading ? 'Thanh Ngân, cô gái xinh tươi vui vẻ.' : weddingData.loveStory.bride.description}
                </p>
              </motion.div>

              {/* Enhanced Quote */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative"
              >
                {/* Quote Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#ffac7b]/20 via-[#fdbc94]/10 to-transparent rounded-3xl blur-sm"></div>
                
                <div className="relative bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-[#fd7f33]/20 shadow-xl">
                  {/* Decorative Quote Icon */}
                  <motion.div
                    animate={{ 
                      rotate: [0, -5, 5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-[#fd7f33] to-[#ffac7b] rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Quote className="w-6 h-6 text-white" />
                  </motion.div>
                  
                  {/* Quote Text */}
                  <blockquote className="text-gray-700 italic leading-relaxed text-lg font-light pt-4">
                    {loading 
                      ? 'Cái gọi là duyên phận, chính là trong ngàn vạn người gặp được người cần gặp là anh, trong ngàn vạn năm, giữa mênh mông hoang hoải vô tận của thời gian, không sớm một bước cũng không muộn một bước. Mong rằng cuộc sống sau này sẽ đối xử tốt với em, để vui vẻ, hạnh phúc luôn cạnh em'
                      : weddingData.loveStory.bride.quote
                    }
                  </blockquote>
                  
                  {/* Decorative Elements */}
                  <div className="absolute bottom-4 left-4 flex space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeInOut"
                        }}
                        className="w-2 h-2 bg-gradient-to-r from-[#fd7f33] to-[#ffac7b] rounded-full"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Enhanced Bride Photo */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="relative lg:order-2"
            >
              <div className="relative inline-block w-full">
                {/* Multiple Rotating Rings */}
                <motion.div
                  animate={{ 
                    rotate: [0, -360]
                  }}
                  transition={{ 
                    duration: 22, 
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute -inset-8 bg-gradient-to-r from-[#fd7f33] via-[#ffac7b] to-[#fdbc94] rounded-3xl opacity-15 blur-xl"
                />
                
                <motion.div
                  animate={{ 
                    rotate: [360, 0]
                  }}
                  transition={{ 
                    duration: 18, 
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute -inset-4 bg-gradient-to-l from-[#fdbc94] via-[#ffac7b] to-[#fd7f33] rounded-3xl opacity-10 blur-lg"
                />
                
                {/* Enhanced Photo Container */}
                <motion.div
                  whileHover={{ 
                    scale: 1.03,
                    rotateY: -5,
                    transition: { duration: 0.4 }
                  }}
                  className="relative w-full h-[420px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 backdrop-blur-sm"
                  style={{
                    background: 'linear-gradient(145deg, rgba(253,127,51,0.1), rgba(255,172,123,0.1))'
                  }}
                >
                  <Image
                    src="/Wedding/Ngang/KTIU9125.JPG"
                    alt="Cô dâu Thanh Ngân"
                    fill
                    className="object-cover hover:scale-110 transition-all duration-700 hover:brightness-110"
                  />
                  
                  {/* Enhanced Overlay Effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-bl from-[#fd7f33]/5 via-transparent to-[#ffac7b]/5"></div>
                  
                  {/* Corner Decorations */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#fd7f33]/40 rounded-tl-lg"></div>
                  <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[#ffac7b]/40 rounded-tr-lg"></div>
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[#fd7f33]/40 rounded-bl-lg"></div>
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#ffac7b]/40 rounded-br-lg"></div>
                </motion.div>
                
                {/* Enhanced Floating Elements */}
                <motion.div
                  animate={{ 
                    rotate: [0, -360],
                    scale: [1, 1.3, 1],
                    y: [-5, -15, -5]
                  }}
                  transition={{ 
                    duration: 9, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-6 -left-6 text-5xl drop-shadow-lg"
                >
                  💖
                </motion.div>
                
                <motion.div
                  animate={{ 
                    rotate: [-360, 0],
                    scale: [1, 1.4, 1],
                    y: [5, 15, 5]
                  }}
                  transition={{ 
                    duration: 7, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                  }}
                  className="absolute -bottom-6 -right-6 text-4xl drop-shadow-lg"
                >
                  🌸
                </motion.div>
                
                {/* Additional Floating Elements */}
                <motion.div
                  animate={{ 
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.6, 1, 0.6],
                    x: [10, -10, 10]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2.5
                  }}
                  className="absolute top-1/2 -right-8 text-2xl"
                >
                  ✨
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Bottom Section - Love Connection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20"
        >
          {/* Decorative Background */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-96 h-32 bg-gradient-to-r from-[#fc5d01]/5 via-[#fd7f33]/10 to-[#ffac7b]/5 rounded-full blur-3xl -z-10"></div>
          
          <div className="relative inline-block">
            {/* Enhanced Connection Lines */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-0.5 bg-gradient-to-r from-[#fc5d01] via-[#fd7f33] to-[#ffac7b] rounded-full"
            />
            
            {/* Animated Sparkles on Line */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.6 + 1,
                  ease: "easeInOut"
                }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#ffac7b]"
                style={{
                  left: `${50 + (i - 1) * 15}%`
                }}
              >
                <Sparkles className="w-3 h-3" />
              </motion.div>
            ))}
            
            {/* Enhanced Center Heart */}
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative z-10 inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#fc5d01] via-[#fd7f33] to-[#ffac7b] rounded-full shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-full animate-pulse opacity-60"></div>
              <Heart className="w-10 h-10 text-white fill-current relative z-10" />
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-10"
          >
            <h4 className="text-3xl font-extralight text-transparent bg-clip-text bg-gradient-to-r from-[#fc5d01] via-[#fd7f33] to-[#ffac7b] mb-6">
              Tình Yêu Đích Thực
            </h4>
            
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="w-16 h-0.5 bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] mx-auto rounded-full mb-6"
            />
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
              Hai trái tim đã tìm thấy nhau trong cuộc đời này, và giờ đây họ sẽ bước vào hành trình mới 
              với tình yêu, sự hiểu biết và cam kết trọn đời bên nhau.
            </p>
            
            {/* Final Decorative Elements */}
            <div className="flex items-center justify-center mt-8 space-x-6">
              {['💕', '🌟', '💕'].map((emoji, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut"
                  }}
                  className="text-2xl"
                >
                  {emoji}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
