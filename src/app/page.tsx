'use client';

import { motion } from 'framer-motion';
import { Heart, Calendar, MapPin, Gift, MessageSquare, Users, Play, Pause, Music } from 'lucide-react';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import Countdown from '../components/Countdown';
import LoveStoryTimeline from '../components/LoveStoryTimeline';
import EventDetails from '../components/EventDetails';
import RSVPForm from '../components/RSVPForm';
import QRPayment from '../components/QRPayment';
import Guestbook from '../components/Guestbook';
import FallingHearts from '../components/FallingHearts';
import WeddingGallery from '../components/WeddingGallery';
import ChineseDecorations from '../components/ChineseDecorations';
import WeddingInvitation from '../components/WeddingInvitation';
import RandomHeroImage from '../components/RandomHeroImage';
import { useWeddingData } from '../hooks/useWeddingData';

export default function Home() {
  const weddingDate = "2025-11-30T18:00:00";
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { weddingData, loading } = useWeddingData();

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#ffffff]">
      {/* Falling Hearts Effect */}
      <FallingHearts />
      
      {/* Chinese Decorations */}
      <ChineseDecorations />
      
      {/* Background Audio */}
      <audio ref={audioRef} loop>
        <source src="/wedding-music.mp3" type="audio/mpeg" />
      </audio>

      {/* Music Control */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed top-6 right-6 z-50"
      >
        <button
          onClick={toggleMusic}
          className="bg-white/90 backdrop-blur-sm border border-[#fedac2] rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-[#fc5d01]" />
          ) : (
            <Play className="w-5 h-5 text-[#fc5d01]" />
          )}
        </button>
      </motion.div>

      {/* Hero Section - Couple Names */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden chinese-double-happiness">
        {/* Chinese Pattern Background */}
        <div className="absolute inset-0 chinese-pattern"></div>
        
        {/* Background Images with Chinese Frames */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 chinese-frame overflow-hidden opacity-20 rotate-12">
            <Image
              src="/Wedding/z6735567858616_2114169ea6c7948b4122776ba07606c0.jpg"
              alt="Wedding photo"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute top-20 right-20 w-40 h-40 chinese-frame overflow-hidden opacity-15 -rotate-12">
            <Image
              src="/Wedding/z6735567871021_9e4913b6410c10f10977be2780d2f3f7.jpg"
              alt="Wedding photo"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-32 left-32 w-28 h-28 chinese-frame overflow-hidden opacity-20 rotate-45">
            <Image
              src="/Wedding/z6735567882402_9def3cf5b873424e21da131c35e3aae9.jpg"
              alt="Wedding photo"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-20 right-32 w-36 h-36 chinese-frame overflow-hidden opacity-15 -rotate-45">
            <Image
              src="/Wedding/z6735567894036_260ccd39a6a62711ab29b072eb173369.jpg"
              alt="Wedding photo"
              fill
              className="object-cover"
            />
          </div>
          
          {/* Chinese Decorative Elements */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 opacity-60 rotate-12">
            <img
              src="/weddingchinese/—Pngtree—chinese wedding ancient wedding cartoon_3807514.png"
              alt="Chinese decoration"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>
          <div className="absolute top-1/3 right-1/4 w-28 h-28 opacity-60 -rotate-12">
            <img
              src="/weddingchinese/—Pngtree—chinese wedding ancient wedding cartoon_3807515.png"
              alt="Chinese decoration"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>
        </div>

        {/* Elegant Chinese Decorative Elements */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-20 left-20 chinese-ornament">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] opacity-30"></div>
          </div>
          <div className="absolute top-40 right-32 chinese-ornament">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ffac7b] to-[#fd7f33] opacity-25"></div>
          </div>
          <div className="absolute bottom-32 left-40 chinese-ornament">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#fedac2] to-[#fdbc94] opacity-35"></div>
          </div>
          <div className="absolute bottom-20 right-20 chinese-ornament">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] opacity-30"></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto px-4 relative z-10">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl text-display text-[#fc5d01] mb-4">
                {loading ? 'Thanh An' : weddingData.coupleNames.groom}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mb-8"
            >
              <h2 className="text-4xl md:text-6xl lg:text-7xl text-display text-[#fc5d01] mb-8">
                {loading ? 'Thanh Ngân' : weddingData.coupleNames.bride}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center justify-center lg:justify-start mb-8"
            >
              <div className="w-20 h-px bg-[#fc5d01]"></div>
              <div className="mx-6 text-5xl text-script text-[#fc5d01]">&</div>
              <div className="w-20 h-px bg-[#fc5d01]"></div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg md:text-xl text-gray-600 mb-8 font-light"
            >
              {loading ? '14.07.2024 Nhà Trai - 15.07.2024 Nhà Gái' : `${weddingData.weddingDates.groomSide} Nhà Trai - ${weddingData.weddingDates.brideSide} Nhà Gái`}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <button
                onClick={() => scrollToSection('invitation')}
                className="bg-[#fc5d01] hover:bg-[#e55401] text-white font-light py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg"
              >
                Trân trọng kính mời!
              </button>
            </motion.div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="relative"
            >
              {/* Decorative Background Elements */}
              <div className="absolute -inset-8 bg-gradient-to-br from-[#fc5d01]/20 via-[#fd7f33]/15 to-[#ffac7b]/20 rounded-3xl blur-2xl"></div>
              <div className="absolute -inset-4 bg-gradient-to-br from-[#fedac2]/30 to-[#fdbc94]/30 rounded-2xl blur-xl"></div>
              
              {/* Floating Hearts Around Image */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-[#fc5d01]/40"
                  style={{
                    left: `${-10 + Math.random() * 120}%`,
                    top: `${-10 + Math.random() * 120}%`,
                  }}
                  animate={{
                    y: [-10, -20, -10],
                    x: [-5, 5, -5],
                    opacity: [0.3, 0.7, 0.3],
                    scale: [0.8, 1.2, 0.8],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                    ease: "easeInOut"
                  }}
                >
                  <Heart className="w-6 h-6 fill-current" />
                </motion.div>
              ))}

              {/* Random Hero Image Component */}
              <RandomHeroImage />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wedding Invitation Cards */}
      <section id="invitation">
        <WeddingInvitation />
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Đám cưới sẽ trọn vẹn và ý nghĩa hơn khi có sự hiện diện và chúc phúc của bạn. 
              Hãy xác nhận sự có mặt của bạn để Thanh An & Thanh Ngân chuẩn bị đón tiếp bạn chu đáo nhất nha ♥️
            </p>
          </motion.div>
          <RSVPForm />
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-br from-[#fedac2]/10 to-[#fdbc94]/10 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating Hearts */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-[#fc5d01]/5"
              style={{
                left: `${10 + i * 25}%`,
                top: `${15 + (i % 2) * 50}%`,
              }}
              animate={{
                y: [-10, -15, -10],
                opacity: [0.05, 0.1, 0.05],
                scale: [0.8, 1.1, 0.8],
                rotate: [0, 360]
              }}
              transition={{
                duration: 8 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            >
              <Heart className="w-4 h-4 fill-current" />
            </motion.div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
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
              <Calendar className="w-10 h-10 text-white" />
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl text-elegant text-[#fc5d01] mb-4">Timeline</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Sự hiện diện của Quý vị là niềm vinh hạnh của Gia đình chúng tôi! 
              Hãy cùng chúng tôi tạo nên những khoảnh khắc đáng nhớ nhất.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] mx-auto rounded-full mt-6"></div>
          </motion.div>

          {/* Countdown Integration */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <Countdown targetDate={weddingDate} />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            {/* Nhà Trai Timeline */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative group"
            >
              {/* Decorative Background Elements */}
              <div className="absolute -inset-4 bg-gradient-to-br from-[#fc5d01]/10 via-[#fd7f33]/5 to-[#ffac7b]/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-2 bg-gradient-to-br from-[#fedac2]/20 to-[#fdbc94]/20 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              
              <motion.div
                whileHover={{ 
                  scale: 1.03,
                  y: -8,
                  transition: { duration: 0.4, type: "spring", stiffness: 300 }
                }}
                className="bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 p-8 border-2 border-[#fedac2]/20 hover:border-[#fc5d01]/30 relative overflow-hidden backdrop-blur-sm"
              >
                {/* Animated Background Gradient */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-[#fc5d01]/3 via-[#fd7f33]/2 to-[#ffac7b]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    background: [
                      "linear-gradient(135deg, rgba(252,93,1,0.03) 0%, rgba(253,127,51,0.02) 50%, rgba(255,172,123,0.03) 100%)",
                      "linear-gradient(135deg, rgba(255,172,123,0.03) 0%, rgba(252,93,1,0.02) 50%, rgba(253,127,51,0.03) 100%)",
                      "linear-gradient(135deg, rgba(252,93,1,0.03) 0%, rgba(253,127,51,0.02) 50%, rgba(255,172,123,0.03) 100%)"
                    ]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Decorative Corner Elements */}
                <div className="absolute top-6 right-6 w-4 h-4 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="absolute bottom-6 left-6 w-3 h-3 bg-gradient-to-br from-[#fd7f33] to-[#ffac7b] rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="absolute top-12 right-12 w-2 h-2 bg-[#ffac7b] rounded-full opacity-30"></div>
                <div className="absolute bottom-12 left-12 w-2 h-2 bg-[#fc5d01] rounded-full opacity-30"></div>

                {/* Header Section */}
                <div className="text-center mb-10 relative z-10">
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                      scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-full shadow-xl mb-6 relative"
                  >
                    <Heart className="w-10 h-10 text-white fill-current" />
                    
                    {/* Pulse Ring */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.8, 1],
                        opacity: [0.6, 0, 0.6]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-full"
                    />
                  </motion.div>
                  
                  <motion.h3 
                    className="text-4xl font-light text-[#fc5d01] mb-4 relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    Nhà Trai
                    <motion.div
                      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: 64 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    />
                  </motion.h3>
                  
                  <motion.div
                    animate={{ 
                      scale: [1, 1.02, 1]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="bg-gradient-to-r from-[#fedac2]/30 via-[#ffac7b]/20 to-[#fedac2]/30 rounded-2xl p-6 mb-6 border border-[#fedac2]/40"
                  >
                    <motion.p
                      className="text-5xl font-light text-gray-800 mb-3"
                      animate={{ 
                        textShadow: [
                          "0 0 0px rgba(252,93,1,0)",
                          "0 0 10px rgba(252,93,1,0.3)",
                          "0 0 0px rgba(252,93,1,0)"
                        ]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {loading ? '14 . 07 . 2024' : weddingData.weddingDates.groomSide.split('.').join(' . ')}
                    </motion.p>
                    <p className="text-xl text-gray-600 mb-2 font-semibold">
                      {loading ? 'Khách Sạn Anh Thanh Đô' : weddingData.venues.groomSide.name}
                    </p>
                    <p className="text-base text-gray-500 leading-relaxed">
                      {loading ? 'Khu Đô Thị Vườn Xanh - TT. Đô Lương - Nghệ An' : weddingData.venues.groomSide.address}
                    </p>
                  </motion.div>
                </div>
                
                {/* Timeline Events */}
                <div className="space-y-4 relative z-10 mb-10">
                  {loading ? (
                    // Loading skeleton
                    [1, 2, 3, 4].map((index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-[#fedac2]/30 rounded-full animate-pulse"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-[#fedac2]/30 rounded animate-pulse"></div>
                        </div>
                      </div>
                    ))
                  ) : (
                    weddingData.timeline.groomSide.map((event, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ 
                          scale: 1.02,
                          x: 8,
                          transition: { duration: 0.3 }
                        }}
                        className="flex items-center space-x-5 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-[#fedac2]/10 hover:to-[#ffac7b]/10 transition-all duration-400 border border-transparent hover:border-[#fedac2]/30 group/item"
                      >
                        <motion.div
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 8, -8, 0]
                          }}
                          transition={{ 
                            duration: 4, 
                            repeat: Infinity,
                            delay: index * 0.3,
                            ease: "easeInOut"
                          }}
                          className="relative"
                        >
                          <div className="w-18 h-18 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-xl group-hover/item:shadow-2xl transition-shadow duration-300">
                            {event.time}
                          </div>
                          
                          {/* Glow Effect */}
                          <motion.div
                            animate={{ 
                              scale: [1, 1.3, 1],
                              opacity: [0, 0.4, 0]
                            }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity,
                              delay: index * 0.4,
                              ease: "easeInOut"
                            }}
                            className="absolute inset-0 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-2xl blur-md"
                          />
                        </motion.div>
                        
                        <div className="flex-1">
                          <motion.p 
                            className="font-semibold text-gray-800 text-lg group-hover/item:text-[#fc5d01] transition-colors duration-300"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            {event.event}
                          </motion.p>
                        </div>
                        
                        {/* Arrow Indicator */}
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          whileHover={{ opacity: 1, x: 0 }}
                          className="text-[#fc5d01] opacity-0 group-hover/item:opacity-100 transition-all duration-300"
                        >
                          →
                        </motion.div>
                      </motion.div>
                    ))
                  )}
                </div>

                {/* Dress Code Section */}
                <motion.div 
                  className="pt-8 border-t-2 border-gradient-to-r from-[#fedac2] via-[#ffac7b] to-[#fedac2] relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="text-center mb-8">
                    <motion.h4 
                      className="text-2xl font-light text-[#fc5d01] mb-2"
                      animate={{ 
                        scale: [1, 1.02, 1]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      Dress Code
                    </motion.h4>
                    <div className="w-16 h-1 bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] mx-auto rounded-full"></div>
                  </div>
                  
                  <div className="flex justify-center space-x-8">
                    {[
                      { color: 'bg-red-500', label: 'Đỏ', shadow: 'shadow-red-200' },
                      { color: 'bg-black', label: 'Đen', shadow: 'shadow-gray-300' },
                      { color: 'bg-white border-2 border-gray-300', label: 'Trắng', shadow: 'shadow-gray-200' }
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ 
                          scale: 1.15,
                          y: -5,
                          transition: { duration: 0.3, type: "spring", stiffness: 300 }
                        }}
                        className="text-center group/color cursor-pointer"
                      >
                        <motion.div 
                          className={`w-14 h-14 ${item.color} ${item.shadow} rounded-2xl mx-auto mb-4 shadow-xl group-hover/color:shadow-2xl transition-all duration-300 relative overflow-hidden`}
                          whileHover={{ rotate: [0, -5, 5, 0] }}
                          transition={{ duration: 0.4 }}
                        >
                          {/* Shine Effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                            animate={{ x: [-100, 100] }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity, 
                              repeatDelay: 3,
                              ease: "easeInOut"
                            }}
                          />
                        </motion.div>
                        <motion.p 
                          className="text-sm text-gray-600 font-semibold group-hover/color:text-[#fc5d01] transition-colors duration-300"
                          whileHover={{ scale: 1.1 }}
                        >
                          {item.label}
                        </motion.p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Nhà Gái Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative group"
            >
              {/* Decorative Background Elements */}
              <div className="absolute -inset-4 bg-gradient-to-br from-[#fd7f33]/10 via-[#ffac7b]/5 to-[#fdbc94]/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute -inset-2 bg-gradient-to-br from-[#ffac7b]/20 to-[#fedac2]/20 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              
              <motion.div
                whileHover={{ 
                  scale: 1.03,
                  y: -8,
                  transition: { duration: 0.4, type: "spring", stiffness: 300 }
                }}
                className="bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 p-8 border-2 border-[#fedac2]/20 hover:border-[#fd7f33]/30 relative overflow-hidden backdrop-blur-sm"
              >
                {/* Animated Background Gradient */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-[#fd7f33]/3 via-[#ffac7b]/2 to-[#fdbc94]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    background: [
                      "linear-gradient(135deg, rgba(253,127,51,0.03) 0%, rgba(255,172,123,0.02) 50%, rgba(253,188,148,0.03) 100%)",
                      "linear-gradient(135deg, rgba(253,188,148,0.03) 0%, rgba(253,127,51,0.02) 50%, rgba(255,172,123,0.03) 100%)",
                      "linear-gradient(135deg, rgba(253,127,51,0.03) 0%, rgba(255,172,123,0.02) 50%, rgba(253,188,148,0.03) 100%)"
                    ]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Decorative Corner Elements */}
                <div className="absolute top-6 left-6 w-4 h-4 bg-gradient-to-br from-[#fd7f33] to-[#ffac7b] rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="absolute bottom-6 right-6 w-3 h-3 bg-gradient-to-br from-[#ffac7b] to-[#fdbc94] rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="absolute top-12 left-12 w-2 h-2 bg-[#fdbc94] rounded-full opacity-30"></div>
                <div className="absolute bottom-12 right-12 w-2 h-2 bg-[#fd7f33] rounded-full opacity-30"></div>

                {/* Header Section */}
                <div className="text-center mb-10 relative z-10">
                  <motion.div
                    animate={{ 
                      rotate: [0, -360],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                      scale: { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#fd7f33] to-[#ffac7b] rounded-full shadow-xl mb-6 relative"
                  >
                    <Heart className="w-10 h-10 text-white fill-current" />
                    
                    {/* Pulse Ring */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.8, 1],
                        opacity: [0.6, 0, 0.6]
                      }}
                      transition={{ 
                        duration: 3.5, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 bg-gradient-to-br from-[#fd7f33] to-[#ffac7b] rounded-full"
                    />
                  </motion.div>
                  
                  <motion.h3 
                    className="text-4xl font-light text-[#fc5d01] mb-4 relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    Nhà Gái
                    <motion.div
                      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#fd7f33] to-[#ffac7b] rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: 64 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    />
                  </motion.h3>
                  
                  <motion.div
                    animate={{ 
                      scale: [1, 1.02, 1]
                    }}
                    transition={{ 
                      duration: 4.5, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="bg-gradient-to-r from-[#ffac7b]/30 via-[#fdbc94]/20 to-[#ffac7b]/30 rounded-2xl p-6 mb-6 border border-[#ffac7b]/40"
                  >
                    <motion.p
                      className="text-5xl font-light text-gray-800 mb-3"
                      animate={{ 
                        textShadow: [
                          "0 0 0px rgba(253,127,51,0)",
                          "0 0 10px rgba(253,127,51,0.3)",
                          "0 0 0px rgba(253,127,51,0)"
                        ]
                      }}
                      transition={{ 
                        duration: 3.5, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {loading ? '15 . 07 . 2024' : weddingData.weddingDates.brideSide.split('.').join(' . ')}
                    </motion.p>
                    <p className="text-xl text-gray-600 mb-2 font-semibold">
                      {loading ? 'Sảnh 5 - Tầng 2 - Diamond Palace' : weddingData.venues.brideSide.name}
                    </p>
                    <p className="text-base text-gray-500 leading-relaxed">
                      {loading ? 'Khách Sạn Giao Tế - Số 9, Hồ Tùng Mậu, TP. Vinh, Nghệ An' : weddingData.venues.brideSide.address}
                    </p>
                  </motion.div>
                </div>
                
                {/* Timeline Events */}
                <div className="space-y-4 relative z-10 mb-10">
                  {loading ? (
                    // Loading skeleton
                    [1, 2, 3, 4].map((index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-[#fedac2]/30 rounded-full animate-pulse"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-[#fedac2]/30 rounded animate-pulse"></div>
                        </div>
                      </div>
                    ))
                  ) : (
                    weddingData.timeline.brideSide.map((event, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ 
                          scale: 1.02,
                          x: -8,
                          transition: { duration: 0.3 }
                        }}
                        className="flex items-center space-x-5 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-[#ffac7b]/10 hover:to-[#fdbc94]/10 transition-all duration-400 border border-transparent hover:border-[#ffac7b]/30 group/item"
                      >
                        <motion.div
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, -8, 8, 0]
                          }}
                          transition={{ 
                            duration: 4.2, 
                            repeat: Infinity,
                            delay: index * 0.3,
                            ease: "easeInOut"
                          }}
                          className="relative"
                        >
                          <div className="w-18 h-18 bg-gradient-to-br from-[#fd7f33] to-[#ffac7b] rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-xl group-hover/item:shadow-2xl transition-shadow duration-300">
                            {event.time}
                          </div>
                          
                          {/* Glow Effect */}
                          <motion.div
                            animate={{ 
                              scale: [1, 1.3, 1],
                              opacity: [0, 0.4, 0]
                            }}
                            transition={{ 
                              duration: 2.2, 
                              repeat: Infinity,
                              delay: index * 0.4,
                              ease: "easeInOut"
                            }}
                            className="absolute inset-0 bg-gradient-to-br from-[#fd7f33] to-[#ffac7b] rounded-2xl blur-md"
                          />
                        </motion.div>
                        
                        <div className="flex-1">
                          <motion.p 
                            className="font-semibold text-gray-800 text-lg group-hover/item:text-[#fd7f33] transition-colors duration-300"
                            whileHover={{ x: -5 }}
                            transition={{ duration: 0.2 }}
                          >
                            {event.event}
                          </motion.p>
                        </div>
                        
                        {/* Arrow Indicator */}
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          whileHover={{ opacity: 1, x: 0 }}
                          className="text-[#fd7f33] opacity-0 group-hover/item:opacity-100 transition-all duration-300"
                        >
                          ←
                        </motion.div>
                      </motion.div>
                    ))
                  )}
                </div>

                {/* Dress Code Section */}
                <motion.div 
                  className="pt-8 border-t-2 border-gradient-to-r from-[#ffac7b] via-[#fdbc94] to-[#ffac7b] relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="text-center mb-8">
                    <motion.h4 
                      className="text-2xl font-light text-[#fc5d01] mb-2"
                      animate={{ 
                        scale: [1, 1.02, 1]
                      }}
                      transition={{ 
                        duration: 3.5, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      Dress Code
                    </motion.h4>
                    <div className="w-16 h-1 bg-gradient-to-r from-[#fd7f33] to-[#ffac7b] mx-auto rounded-full"></div>
                  </div>
                  
                  <div className="flex justify-center space-x-8">
                    {[
                      { color: 'bg-red-500', label: 'Đỏ', shadow: 'shadow-red-200' },
                      { color: 'bg-black', label: 'Đen', shadow: 'shadow-gray-300' },
                      { color: 'bg-white border-2 border-gray-300', label: 'Trắng', shadow: 'shadow-gray-200' }
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ 
                          scale: 1.15,
                          y: -5,
                          transition: { duration: 0.3, type: "spring", stiffness: 300 }
                        }}
                        className="text-center group/color cursor-pointer"
                      >
                        <motion.div 
                          className={`w-14 h-14 ${item.color} ${item.shadow} rounded-2xl mx-auto mb-4 shadow-xl group-hover/color:shadow-2xl transition-all duration-300 relative overflow-hidden`}
                          whileHover={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 0.4 }}
                        >
                          {/* Shine Effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                            animate={{ x: [-100, 100] }}
                            transition={{ 
                              duration: 2.2, 
                              repeat: Infinity, 
                              repeatDelay: 3,
                              ease: "easeInOut"
                            }}
                          />
                        </motion.div>
                        <motion.p 
                          className="text-sm text-gray-600 font-semibold group-hover/color:text-[#fd7f33] transition-colors duration-300"
                          whileHover={{ scale: 1.1 }}
                        >
                          {item.label}
                        </motion.p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
     

      {/* Album Section */}
      <section id="album" className="py-20 bg-gradient-to-br from-[#fedac2]/10 to-[#fdbc94]/10 chinese-double-happiness relative">
        <div className="absolute inset-0 chinese-pattern"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 chinese-lantern"
          >
            <h2 className="text-4xl md:text-5xl text-elegant chinese-gold mb-4">Album Ảnh Cưới</h2>
            <p className="text-lg text-gray-600">Những khoảnh khắc đẹp nhất của chúng tôi</p>
            <div className="flex justify-center items-center space-x-6 mt-6">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#fc5d01] to-[#fd7f33]"></div>
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#fd7f33] to-[#ffac7b]"></div>
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#fc5d01] to-[#fd7f33]"></div>
            </div>
          </motion.div>

          <WeddingGallery />
        </div>
      </section>

      {/* Guestbook Section */}
      <section id="guestbook" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl text-elegant text-[#fc5d01] mb-4">Gửi lời chúc cho Dâu Rể</h2>
          </motion.div>
          <Guestbook />
        </div>
      </section>

      {/* After Party Section */}
      <section className="py-20 bg-gradient-to-br from-[#fedac2]/10 to-[#fdbc94]/10">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl text-elegant text-[#fc5d01] mb-8">After Party</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: '🎮', title: 'Game' },
              { icon: '💃', title: 'Dance' },
              { icon: '🌸', title: 'Rút Hoa' },
              { icon: '🎁', title: 'Quà cưới' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl mb-4 shadow-lg mx-auto">
                  {item.icon}
                </div>
                <p className="text-lg font-light text-[#fc5d01]">{item.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gift Section */}
      <section id="gift" className="py-20 bg-white relative">
        {/* Chinese Decorative Images */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute top-10 left-1/4 w-18 h-18 opacity-45"
          >
            <img
              src="/weddingchinese/—Pngtree—chinese wedding ancient wedding cartoon_3807514.png"
              alt="Chinese decoration"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="absolute top-10 right-1/4 w-18 h-18 opacity-45"
          >
            <img
              src="/weddingchinese/—Pngtree—chinese wedding ancient wedding cartoon_3807515.png"
              alt="Chinese decoration"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="absolute bottom-20 left-10 w-16 h-16 opacity-40"
          >
            <img
              src="/weddingchinese/m2i8A0H7K9H7m2N4.png"
              alt="Chinese decoration 3"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="absolute bottom-20 right-10 w-16 h-16 opacity-40"
          >
            <img
              src="/weddingchinese/kisspng-wedding-invitation-chinese-marriage-bridegroom-cartoon-bride-and-groom-5a8841a6ba1bb4.9223908115188791427623.png"
              alt="Chinese decoration 4"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl text-elegant text-[#fc5d01] mb-8">Gửi Quà Đến Cô Dâu & Chú Rể</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Cảm ơn bạn đã dành tình cảm cho vợ chồng mình. Chúng mình biết các bạn đều đang rất bận, 
              bận với công việc, với cuộc sống và với cả gia đình bạn.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Nhưng thực sự sẽ rất tuyệt vời nếu như ngày Hạnh Phúc của chúng mình có thêm sự góp mặt của bạn. 
              Vợ chồng mình rất hi vọng sẽ có mặt bạn trong ngày quan trọng này để chứng kiến và chia sẻ niềm hạnh phúc này cùng chúng mình.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Một lần nữa, chân thành cảm ơn bạn ❤️
            </p>
          </motion.div>
          <QRPayment />
        </div>
      </section>

      {/* Enhanced Thank You Section - Lời Ngỏ */}
      <section className="py-32 bg-gradient-to-br from-[#fedac2]/15 via-white to-[#fdbc94]/15 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating Hearts */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-[#fc5d01]/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -40, -20],
                x: [-10, 10, -10],
                opacity: [0.2, 0.6, 0.2],
                scale: [0.8, 1.2, 0.8],
                rotate: [0, 360]
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            >
              <Heart className="w-6 h-6 fill-current" />
            </motion.div>
          ))}

          {/* Decorative Wedding Photos */}
          <div className="absolute inset-0 opacity-8">
            <motion.div
              initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
              whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute top-16 left-16 w-32 h-32 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50 backdrop-blur-sm"
            >
              <Image
                src="/Wedding/z6735567927961_c7b35df35d192ed05609826ff9940a4c.jpg"
                alt="Wedding memory"
                fill
                className="object-cover"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, rotate: 15, scale: 0.8 }}
              whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute top-24 right-16 w-28 h-28 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50 backdrop-blur-sm"
            >
              <Image
                src="/Wedding/z6735567939132_6f69d0c6e9fc1d92dc18868639c2c99f.jpg"
                alt="Wedding memory"
                fill
                className="object-cover"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
              whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="absolute bottom-24 left-20 w-36 h-36 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50 backdrop-blur-sm"
            >
              <Image
                src="/Wedding/z6735567951291_6900097c7a503aa5cf3befa46a85cd47.jpg"
                alt="Wedding memory"
                fill
                className="object-cover"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, rotate: 12, scale: 0.8 }}
              whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="absolute bottom-16 right-20 w-30 h-30 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50 backdrop-blur-sm"
            >
              <Image
                src="/Wedding/z6735567975547_767583a942095144b0aeb707a866ce8d.jpg"
                alt="Wedding memory"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Sparkle Effects */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute text-[#ffac7b]"
              style={{
                left: `${20 + i * 10}%`,
                top: `${15 + (i % 3) * 25}%`,
              }}
              animate={{
                scale: [0, 1.5, 0],
                rotate: [0, 180, 360],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut"
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          {/* Main Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-[#fedac2]/30 p-12 md:p-16 relative overflow-hidden"
          >
            {/* Card Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#fc5d01]/5 via-transparent to-[#fd7f33]/5 rounded-3xl"></div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#fedac2]/20 to-transparent rounded-full -translate-y-20 translate-x-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#ffac7b]/20 to-transparent rounded-full translate-y-16 -translate-x-16"></div>

            <div className="relative z-10">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-12"
              >
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
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-full shadow-xl mb-6"
                >
                  <Heart className="w-10 h-10 text-white fill-current" />
                </motion.div>
                
                <h2 className="text-5xl md:text-6xl font-light text-[#fc5d01] mb-4 text-elegant">Lời Ngỏ</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] mx-auto rounded-full"></div>
              </motion.div>

              {/* Featured Couple Photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-12"
              >
                <div className="relative inline-block">
                  <motion.div
                    animate={{ 
                      rotate: [0, 360]
                    }}
                    transition={{ 
                      duration: 20, 
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute -inset-4 bg-gradient-to-r from-[#fc5d01] via-[#fd7f33] to-[#ffac7b] rounded-full opacity-20 blur-lg"
                  />
                  
                  <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-2xl border-6 border-white">
                    <Image
                      src="/Wedding/z6735567987748_d7077417fb671d31654fd0bf9ae6ed0b.jpg"
                      alt="Thanh An & Thanh Ngân"
                      width={160}
                      height={160}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  
                  {/* Floating Elements Around Photo */}
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      duration: 8, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -top-2 -right-2 text-3xl"
                  >
                    💕
                  </motion.div>
                  
                  <motion.div
                    animate={{ 
                      rotate: [360, 0],
                      scale: [1, 1.3, 1]
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                    className="absolute -bottom-2 -left-2 text-2xl"
                  >
                    🌟
                  </motion.div>
                </div>
              </motion.div>

              {/* Thank You Message */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mb-12"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-7xl mb-6"
                >
                  ❤️
                </motion.div>
                
                <h3 className="text-4xl md:text-5xl font-light text-[#fc5d01] mb-6">Thank You!</h3>
                <p className="text-3xl font-light text-gray-800 mb-8">Thanh An ♥️ Thanh Ngân</p>
              </motion.div>

              {/* Heartfelt Message */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mb-12"
              >
                <div className="max-w-4xl mx-auto">
                  <blockquote className="text-xl md:text-2xl font-light text-gray-700 leading-relaxed italic mb-8">
                    "Cảm ơn bạn đã là một phần quan trọng trong hành trình tình yêu của chúng tôi. 
                    Sự hiện diện, lời chúc phúc và tình cảm của bạn đã làm cho ngày đặc biệt này trở nên 
                    ý nghĩa và trọn vẹn hơn bao giờ hết."
                  </blockquote>
                  
                  <div className="bg-gradient-to-r from-[#fedac2]/20 via-[#ffac7b]/20 to-[#fedac2]/20 rounded-2xl p-8 border border-[#fedac2]/30">
                    <p className="text-lg text-gray-600 leading-relaxed mb-4">
                      Chúng tôi biết rằng mỗi người đều có những bận rộn riêng trong cuộc sống, 
                      nhưng việc bạn dành thời gian để chia sẻ niềm vui này cùng chúng tôi thật sự là một món quà vô giá.
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Tình yêu và hạnh phúc sẽ nhân lên gấp bội khi được chia sẻ cùng những người thân yêu như bạn. 
                      Cảm ơn bạn từ tận đáy lòng! 💕
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Signature Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="mb-8"
              >
                <div className="flex items-center justify-center space-x-6 mb-6">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Heart className="w-6 h-6 fill-current text-[#fc5d01]" />
                  </motion.div>
                  <span className="text-xl font-light text-gray-600">Với tình yêu thương,</span>
                  <motion.div
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  >
                    <Heart className="w-6 h-6 fill-current text-[#fc5d01]" />
                  </motion.div>
                </div>
                
                <div className="text-3xl font-light text-[#fc5d01] mb-8">
                  Thanh An & Thanh Ngân
                </div>

                {/* Decorative Elements */}
                <div className="flex items-center justify-center space-x-4">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-3 h-3 bg-[#fc5d01] rounded-full"
                  />
                  <motion.div
                    animate={{ 
                      scale: [1, 1.4, 1],
                      rotate: [0, -180, -360]
                    }}
                    transition={{ 
                      duration: 5, 
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                    className="w-4 h-4 bg-[#fd7f33] rounded-full"
                  />
                  <motion.div
                    animate={{ 
                      scale: [1, 1.3, 1],
                      rotate: [0, 360, 0]
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                    className="w-3 h-3 bg-[#ffac7b] rounded-full"
                  />
                </div>
              </motion.div>

              {/* Final Blessing */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="text-center"
              >
                <motion.p
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="text-lg text-gray-600 font-light italic"
                >
                  Chúc bạn luôn hạnh phúc và thành công trong cuộc sống! 🌟
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="relative bg-gradient-to-br from-[#fc5d01] via-[#fd7f33] to-[#ffac7b] text-white overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/15 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-28 h-28 bg-white/10 rounded-full blur-2xl"></div>
        </div>

        {/* Floating Hearts Animation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-white/20"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 30}%`,
              }}
              animate={{
                y: [-10, -30, -10],
                opacity: [0.2, 0.5, 0.2],
                scale: [0.8, 1.2, 0.8],
                rotate: [0, 360]
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut"
              }}
            >
              <Heart className="w-4 h-4 fill-current" />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 py-16">
          <div className="max-w-6xl mx-auto px-4">
            {/* Main Footer Content */}
            <div className="grid md:grid-cols-3 gap-12 mb-12">
              
              {/* Left Column - Couple Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center md:text-left"
              >
                <div className="flex items-center justify-center md:justify-start mb-6">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30"
                  >
                    <Heart className="w-8 h-8 fill-current" />
                  </motion.div>
                </div>
                <h3 className="text-2xl font-light mb-4">
                  Thanh An & Thanh Ngân
                </h3>
                <p className="text-white/90 font-light leading-relaxed">
                  Cảm ơn bạn đã là một phần trong hành trình tình yêu của chúng tôi. 
                  Tình yêu thật sự bắt đầu khi không còn mong đợi gì từ đối phương.
                </p>
              </motion.div>

              {/* Center Column - Wedding Details */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="mb-6">
                  <motion.div
                    animate={{ 
                      rotate: [0, 360]
                    }}
                    transition={{ 
                      duration: 20, 
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 mx-auto"
                  >
                    <Calendar className="w-8 h-8" />
                  </motion.div>
                </div>
                <h3 className="text-2xl font-light mb-4">Ngày Trọng Đại</h3>
                <div className="space-y-3 text-white/90 font-light">
                  <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/20">
                    <p className="text-sm opacity-80">Nhà Trai</p>
                    <p className="text-lg">14.07.2024</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/20">
                    <p className="text-sm opacity-80">Nhà Gái</p>
                    <p className="text-lg">15.07.2024</p>
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Contact & Social */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center md:text-right"
              >
                <div className="flex items-center justify-center md:justify-end mb-6">
                  <motion.div
                    animate={{ 
                      y: [-2, 2, -2],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30"
                  >
                    <Gift className="w-8 h-8" />
                  </motion.div>
                </div>
                <h3 className="text-2xl font-light mb-4">Liên Hệ</h3>
                <div className="space-y-3 text-white/90 font-light">
                  <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/20">
                    <p className="text-sm opacity-80">Chú Rể</p>
                    <p>Thanh An</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/20">
                    <p className="text-sm opacity-80">Cô Dâu</p>
                    <p>Thanh Ngân</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Divider with decorative elements */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative mb-12"
            >
              <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] rounded-full p-3">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Heart className="w-6 h-6 fill-current text-white" />
                </motion.div>
              </div>
            </motion.div>

            {/* Bottom Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center"
            >
              {/* Quote */}
              <div className="mb-8">
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-3xl mb-4"
                >
                  💕
                </motion.div>
                <blockquote className="text-xl font-light italic text-white/95 max-w-3xl mx-auto leading-relaxed">
                  "Tình yêu không chỉ là nhìn vào mắt nhau, mà là cùng nhau nhìn về một hướng. 
                  Hạnh phúc không phải là điểm đến, mà là cách chúng ta đi cùng nhau."
                </blockquote>
              </div>

              {/* Signature */}
              <div className="mb-8">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart className="w-5 h-5 fill-current text-white/80" />
                  </motion.div>
                  <span className="text-lg font-light text-white/90">Với tình yêu thương,</span>
                  <motion.div
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <Heart className="w-5 h-5 fill-current text-white/80" />
                  </motion.div>
                </div>
                <p className="text-2xl font-light text-white">
                  Thanh An ♥️ Thanh Ngân
                </p>
              </div>

              {/* Copyright */}
              <div className="pt-8 border-t border-white/20">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                  <p className="text-sm text-white/70 font-light">
                    © 2024 Wedding Website. Made with ❤️ for our special day
                  </p>
                  <div className="flex items-center space-x-4">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                      className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 cursor-pointer"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: -360 }}
                      transition={{ duration: 0.3 }}
                      className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 cursor-pointer"
                    >
                      <Gift className="w-4 h-4" />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.2, y: -2 }}
                      transition={{ duration: 0.3 }}
                      className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 cursor-pointer"
                    >
                      <Calendar className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Wave Effect */}
        <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-r from-[#e55401] to-[#d44801]"></div>
      </footer>
    </div>
  );
}
