'use client';

import { motion } from 'framer-motion';
import { Heart, Calendar, Gift, Play, Pause } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import RSVPForm from '../../components/RSVPForm';
import QRPayment from '../../components/QRPayment';
import Guestbook from '../../components/Guestbook';
import FallingHearts from '../../components/FallingHearts';
import WeddingGallery from '../../components/WeddingGallery';
import ChineseDecorations from '../../components/ChineseDecorations';
import PersonalizedWeddingInvitation from '../../components/PersonalizedWeddingInvitation';
import RandomHeroImage from '../../components/RandomHeroImage';
import { useWeddingData } from '../../hooks/useWeddingData';
import { getGuestInfo, GuestInfo } from '../../lib/guestData';

export default function PersonalizedWeddingPage() {
  const params = useParams();
  const guestSlug = params.guest as string;
  const [isPlaying, setIsPlaying] = useState(false);
  const [guestInfo, setGuestInfo] = useState<GuestInfo | null>(null);
  const [guestLoading, setGuestLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { weddingData, loading } = useWeddingData();
  
  // Lấy thông tin khách mời từ slug
  useEffect(() => {
    const loadGuestInfo = async () => {
      try {
        setGuestLoading(true);
        const guest = await getGuestInfo(guestSlug);
        setGuestInfo(guest);
      } catch (error) {
        console.error('Error loading guest info:', error);
        setGuestInfo(null);
      } finally {
        setGuestLoading(false);
      }
    };

    if (guestSlug) {
      loadGuestInfo();
    }
  }, [guestSlug]);

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

  // Loading state
  if (guestLoading) {
    return (
      <div className="min-h-screen bg-[#ffffff] flex items-center justify-center">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <div className="w-16 h-16 border-4 border-[#fc5d01] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải thông tin khách mời...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Nếu không tìm thấy khách mời, hiển thị thông báo
  if (!guestInfo) {
    return (
      <div className="min-h-screen bg-[#ffffff] flex items-center justify-center">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <Heart className="w-16 h-16 text-[#fc5d01] mx-auto mb-4" />
            <h1 className="text-3xl text-[#fc5d01] mb-4">Xin lỗi!</h1>
            <p className="text-gray-600 mb-6">
              Chúng tôi không tìm thấy thông tin lời mời của bạn.
            </p>
            <Link 
              href="/"
              className="bg-[#fc5d01] hover:bg-[#e55401] text-white font-light py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Về trang chính
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

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

      {/* Personalized Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden chinese-double-happiness">
        {/* Chinese Pattern Background */}
        <div className="absolute inset-0 chinese-pattern"></div>
        
        {/* Background Images with Chinese Frames */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 chinese-frame overflow-hidden opacity-20 rotate-12">
            <Image
              src="/Wedding/Ngang/KTIU0188.jpg"
              alt="Wedding photo"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute top-20 right-20 w-40 h-40 chinese-frame overflow-hidden opacity-15 -rotate-12">
            <Image
              src="/Wedding/Doc/KTIU0256.jpg"
              alt="Wedding photo"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-32 left-32 w-28 h-28 chinese-frame overflow-hidden opacity-20 rotate-45">
            <Image
              src="/Wedding/Doc/KTIU0370.jpg"
              alt="Wedding photo"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-20 right-32 w-36 h-36 chinese-frame overflow-hidden opacity-15 -rotate-45">
            <Image
              src="/Wedding/Doc/KTIU9199.JPG"
              alt="Wedding photo"
              fill
              className="object-cover"
            />
          </div>
          
          {/* Chinese Decorative Elements */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 opacity-60 rotate-12">
            <Image
              src="/weddingchinese/—Pngtree—chinese wedding ancient wedding cartoon_3807514.png"
              alt="Chinese decoration"
              fill
              className="object-contain drop-shadow-lg"
            />
          </div>
          <div className="absolute top-1/3 right-1/4 w-28 h-28 opacity-60 -rotate-12">
            <Image
              src="/weddingchinese/—Pngtree—chinese wedding ancient wedding cartoon_3807515.png"
              alt="Chinese decoration"
              fill
              className="object-contain drop-shadow-lg"
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
          {/* Left Column - Personalized Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Personalized Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="mb-6"
            >
              <p className="text-2xl md:text-3xl text-[#fc5d01] font-light">
                Kính gửi {guestInfo.title}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#fc5d01] font-medium mt-2">
                {guestInfo.name}
              </h2>
            </motion.div>

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
              {loading ? '24.10.2025 Nhà Trai - 15.07.2024 Nhà Gái' : `${weddingData.weddingDates.groomSide} Nhà Trai - ${weddingData.weddingDates.brideSide} Nhà Gái`}
            </motion.p>

            {/* Personalized Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mb-8 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-[#fedac2]/50"
            >
              <p className="text-gray-700 italic leading-relaxed">
                {guestInfo.personalMessage}
              </p>
            </motion.div>

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

      {/* Personalized Wedding Invitation Cards */}
      <section id="invitation">
        <PersonalizedWeddingInvitation guestInfo={guestInfo} />
      </section>

      {/* RSVP Section with personalized message */}
      <section id="rsvp" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl text-elegant text-[#fc5d01] mb-6">
              Xác nhận tham dự
            </h2>
            <div className="bg-gradient-to-r from-[#fedac2]/20 via-[#ffac7b]/20 to-[#fedac2]/20 rounded-2xl p-6 mb-8">
              <p className="text-lg text-gray-700 mb-4">
                Kính gửi {guestInfo.title} <span className="font-medium text-[#fc5d01]">{guestInfo.name}</span>,
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Đám cưới sẽ trọn vẹn và ý nghĩa hơn khi có sự hiện diện và chúc phúc của {guestInfo.title}. 
                Hãy xác nhận sự có mặt để Thanh An & Thanh Ngân chuẩn bị đón tiếp {guestInfo.title} chu đáo nhất nha ♥️
              </p>
            </div>
          </motion.div>
          <RSVPForm guestInfo={guestInfo} />
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

      {/* Gift Section */}
      <section id="gift" className="py-20 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl text-elegant text-[#fc5d01] mb-8">
              {guestInfo.invitedTo === 'bride' 
                ? 'Gửi Quà Đến Cô Dâu' 
                : 'Gửi Quà Đến Chú Rể'}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Cảm ơn {guestInfo.title} {guestInfo.name} đã dành tình cảm cho vợ chồng mình. 
              Chúng mình biết {guestInfo.title} đang rất bận, bận với công việc, với cuộc sống và với cả gia đình.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Nhưng thực sự sẽ rất tuyệt vời nếu như ngày Hạnh Phúc của chúng mình có thêm sự góp mặt của {guestInfo.title}. 
              Vợ chồng mình rất hi vọng sẽ có mặt {guestInfo.title} trong ngày quan trọng này để chứng kiến và chia sẻ niềm hạnh phúc này cùng chúng mình.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Một lần nữa, chân thành cảm ơn {guestInfo.title} ❤️
            </p>
          </motion.div>
          <QRPayment guestInfo={guestInfo} />
        </div>
      </section>

      {/* Enhanced Thank You Section - Lời Ngỏ */}
      <section className="py-32 bg-gradient-to-br from-[#fedac2]/15 via-white to-[#fdbc94]/15 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          {/* Main Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-[#fedac2]/30 p-12 md:p-16 relative overflow-hidden"
          >
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

              {/* Personalized Message */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mb-12"
              >
                <div className="max-w-4xl mx-auto">
                  <blockquote className="text-xl md:text-2xl font-light text-gray-700 leading-relaxed italic mb-8">
                    &ldquo;Cảm ơn {guestInfo.title} {guestInfo.name} đã là một phần quan trọng trong hành trình tình yêu của chúng tôi. 
                    Sự hiện diện, lời chúc phúc và tình cảm của {guestInfo.title} đã làm cho ngày đặc biệt này trở nên 
                    ý nghĩa và trọn vẹn hơn bao giờ hết.&rdquo;
                  </blockquote>
                  
                  <div className="bg-gradient-to-r from-[#fedac2]/20 via-[#ffac7b]/20 to-[#fedac2]/20 rounded-2xl p-8 border border-[#fedac2]/30">
                    <p className="text-lg text-gray-600 leading-relaxed mb-4">
                      Chúng tôi biết rằng {guestInfo.title} có những bận rộn riêng trong cuộc sống, 
                      nhưng việc {guestInfo.title} dành thời gian để chia sẻ niềm vui này cùng chúng tôi thật sự là một món quà vô giá.
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Tình yêu và hạnh phúc sẽ nhân lên gấp bội khi được chia sẻ cùng những người thân yêu như {guestInfo.title}. 
                      Cảm ơn {guestInfo.title} từ tận đáy lòng! 💕
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
                  Chúc {guestInfo.title} luôn hạnh phúc và thành công trong cuộc sống! 🌟
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="relative bg-gradient-to-br from-[#fc5d01] via-[#fd7f33] to-[#ffac7b] text-white overflow-hidden">
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
                    <Heart className="w-8 h-8" />
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
                    <p className="text-lg">24.10.2025</p>
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
                  &ldquo;Tình yêu không chỉ là nhìn vào mắt nhau, mà là cùng nhau nhìn về một hướng. 
                  Hạnh phúc không phải là điểm đến, mà là cách chúng ta đi cùng nhau.&rdquo;
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
                    © 2025 Wedding Website. Made with ❤️ for our special day
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
