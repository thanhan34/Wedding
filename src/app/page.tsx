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
import { useWeddingData } from '../hooks/useWeddingData';

export default function Home() {
  const weddingDate = "2024-12-15T18:00:00";
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

              {/* Main Hero Image */}
              <div className="relative w-80 h-96 md:w-96 md:h-[28rem] lg:w-[26rem] lg:h-[32rem] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50 backdrop-blur-sm">
                <Image
                  src="/Wedding/z6735568048498_05b7b7a4be9b803d3a635bddaa5d9e2a.jpg"
                  alt="Thanh An & Thanh Ngân - Wedding Hero"
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                
                {/* Decorative Corner Elements */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/60 rounded-tl-lg"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/60 rounded-tr-lg"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/60 rounded-bl-lg"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/60 rounded-br-lg"></div>
              </div>

              {/* Sparkle Effects */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`sparkle-${i}`}
                  className="absolute text-[#ffac7b] text-2xl"
                  style={{
                    left: `${20 + i * 25}%`,
                    top: `${10 + (i % 2) * 80}%`,
                  }}
                  animate={{
                    scale: [0, 1.5, 0],
                    rotate: [0, 180, 360],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.6,
                    ease: "easeInOut"
                  }}
                >
                  ✨
                </motion.div>
              ))}
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
      <section className="py-20 bg-gradient-to-br from-[#fedac2]/10 to-[#fdbc94]/10 chinese-background-pattern">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl text-elegant text-[#fc5d01] mb-4">Timeline</h2>
            <p className="text-lg text-gray-600">Sự hiện diện của Quý vị là niềm vinh hạnh của Gia đình chúng tôi!</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Nhà Trai Timeline */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-lg shadow-xl p-8 border border-[#fedac2]/30"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-light text-[#fc5d01] mb-2">Nhà Trai</h3>
                <p className="text-3xl font-light text-gray-800 mb-4">
                  {loading ? '14 . 07 . 2024' : weddingData.weddingDates.groomSide.split('.').join(' . ')}
                </p>
                <p className="text-lg text-gray-600 mb-2">
                  {loading ? 'Khách Sạn Anh Thanh Đô' : weddingData.venues.groomSide.name}
                </p>
                <p className="text-base text-gray-500">
                  {loading ? 'Khu Đô Thị Vườn Xanh - TT. Đô Lương - Nghệ An' : weddingData.venues.groomSide.address}
                </p>
              </div>
              
              <div className="space-y-6">
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
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-[#fc5d01] rounded-full flex items-center justify-center text-white font-medium text-sm">
                        {event.time}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{event.event}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-[#fedac2]">
                <p className="text-center text-base text-gray-600 mb-4">Dress Code</p>
                <div className="flex justify-center space-x-4">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Đỏ</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-black rounded-full mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Đen</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-white border border-gray-300 rounded-full mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Trắng</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Nhà Gái Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-lg shadow-xl p-8 border border-[#fedac2]/30"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-light text-[#fc5d01] mb-2">Nhà Gái</h3>
                <p className="text-3xl font-light text-gray-800 mb-4">
                  {loading ? '15 . 07 . 2024' : weddingData.weddingDates.brideSide.split('.').join(' . ')}
                </p>
                <p className="text-lg text-gray-600 mb-2">
                  {loading ? 'Sảnh 5 - Tầng 2 - Diamond Palace' : weddingData.venues.brideSide.name}
                </p>
                <p className="text-base text-gray-500">
                  {loading ? 'Khách Sạn Giao Tế - Số 9, Hồ Tùng Mậu, TP. Vinh, Nghệ An' : weddingData.venues.brideSide.address}
                </p>
              </div>
              
              <div className="space-y-6">
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
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-[#fc5d01] rounded-full flex items-center justify-center text-white font-medium text-sm">
                        {event.time}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{event.event}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-[#fedac2]">
                <p className="text-center text-base text-gray-600 mb-4">Dress Code</p>
                <div className="flex justify-center space-x-4">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Đỏ</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-black rounded-full mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Đen</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-white border border-gray-300 rounded-full mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Trắng</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Love Story Section */}
      <section id="love-story" className="py-20 bg-white relative">
        {/* Chinese Decorative Images */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            initial={{ opacity: 0, rotate: -20 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute top-20 left-10 w-16 h-16 opacity-40"
          >
            <img
              src="/weddingchinese/m2i8A0H7K9H7m2N4.png"
              alt="Chinese decoration 1"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, rotate: 20 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="absolute top-20 right-10 w-16 h-16 opacity-40"
          >
            <img
              src="/weddingchinese/kisspng-wedding-invitation-chinese-marriage-bridegroom-cartoon-bride-and-groom-5a8841a6ba1bb4.9223908115188791427623.png"
              alt="Chinese decoration 2"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="absolute bottom-20 left-1/4 w-18 h-18 opacity-35"
          >
            <img
              src="/weddingchinese/—Pngtree—chinese wedding ancient wedding cartoon_3807514.png"
              alt="Chinese decoration"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl text-elegant text-[#fc5d01] mb-8">Love Story</h2>
            <p className="text-lg text-gray-600 leading-relaxed italic">
              "Trăm triệu hạt mưa rơi, không hạt nào rơi nhầm chỗ. Tất cả người ta từng gặp, không một người nào là ngẫu nhiên, 
              người đến bởi nợ đầy, người đi bởi duyên cạn, mọi thứ đều là duyên phận an bài, 
              chúng ta trở thành vợ chồng cũng chính là vì đủ duyên"
            </p>
          </motion.div>

          <div className="space-y-16">
            {/* Thanh An */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8"
            >
              <div className="w-48 h-48 rounded-full overflow-hidden shadow-xl border-4 border-[#fedac2]">
                <Image
                  src="/Wedding/z6735567906204_6be847502f4b9d7e3f2a695bdc41a4bd.jpg"
                  alt="Thanh An"
                  width={192}
                  height={192}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-light text-[#fc5d01] mb-4">
                  {loading ? 'Thanh An' : weddingData.loveStory.groom.name}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {loading ? 'Thanh An, chàng trai nhẹ nhàng, tình cảm' : weddingData.loveStory.groom.description}
                </p>
                <p className="text-gray-600 leading-relaxed italic">
                  "{loading ? 'Mỗi ngày thức dậy bạn nghĩ đến 1 ai đó, trước khi đi ngủ bạn nghĩ đến 1 ai đó… Đó là 1 ngày trọn vẹn. Cảm ơn vì đã gặp được em "Thanh Ngân", anh mong sau này, dù có thế nào, chúng ta cũng mãi yêu thương nhau, mãi nắm tay nhau đi đến hết con đường còn lại em nhé !!' : weddingData.loveStory.groom.quote}"
                </p>
              </div>
            </motion.div>

            {/* Thanh Ngân */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col md:flex-row-reverse items-center space-y-6 md:space-y-0 md:space-x-8 md:space-x-reverse"
            >
              <div className="w-48 h-48 rounded-full overflow-hidden shadow-xl border-4 border-[#fedac2]">
                <Image
                  src="/Wedding/z6735567917740_1a81acc6ac24e1836c441ae42a93c0a6.jpg"
                  alt="Thanh Ngân"
                  width={192}
                  height={192}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1 text-center md:text-right">
                <h3 className="text-3xl font-light text-[#fc5d01] mb-4">
                  {loading ? 'Thanh Ngân' : weddingData.loveStory.bride.name}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {loading ? 'Thanh Ngân, cô gái xinh tươi vui vẻ.' : weddingData.loveStory.bride.description}
                </p>
                <p className="text-gray-600 leading-relaxed italic">
                  "{loading ? 'Cái gọi là duyên phận, chính là trong ngàn vạn người gặp được người cần gặp là anh, trong ngàn vạn năm, giữa mênh mông hoang hoải vô tận của thời gian, không sớm một bước cũng không muộn một bước. Mong rằng cuộc sống sau này sẽ đối xử tốt với em, để vui vẻ, hạnh phúc luôn cạnh em' : weddingData.loveStory.bride.quote}"
                </p>
              </div>
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
