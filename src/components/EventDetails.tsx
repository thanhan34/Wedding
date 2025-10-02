'use client';

import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Calendar, MapPin, Clock, Car, Shirt, Phone, Heart, Star, Sparkles, Crown, Gift } from 'lucide-react';
import { useWeddingData } from '../hooks/useWeddingData';

interface EventInfo {
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
  mapUrl: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const getEventIcon = (type: string) => {
  switch (type) {
    case 'engagement':
      return <Gift className="w-6 h-6" />;
    case 'wedding':
      return <Crown className="w-6 h-6" />;
    case 'reception':
      return <Heart className="w-6 h-6" />;
    default:
      return <Heart className="w-6 h-6" />;
  }
};

const getEventColor = (type: string) => {
  switch (type) {
    case 'engagement':
      return "from-[#fc5d01] to-[#fd7f33]";
    case 'wedding':
      return "from-[#fc5d01] to-[#fd7f33]";
    case 'reception':
      return "from-pink-500 to-pink-600";
    default:
      return "from-[#fc5d01] to-[#fd7f33]";
  }
};

const additionalInfo = [
  {
    icon: <Shirt className="w-6 h-6" />,
    title: "Dress Code",
    content: "Trang phục lịch sự, màu sắc tươi sáng. Tránh màu trắng và đen.",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: <Car className="w-6 h-6" />,
    title: "Xe Đưa Đón",
    content: "Có xe đưa đón từ nhà cô dâu đến nhà chú rể lúc 10:30. Liên hệ: 0123456789",
    color: "from-green-500 to-green-600"
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Liên Hệ",
    content: "Mọi thắc mắc xin liên hệ: Cô dâu 9399366669 | Chú rể 0123456789",
    color: "from-[#fc5d01] to-[#fd7f33]"
  }
];

export default function EventDetails() {
  const { weddingData, loading, error } = useWeddingData();
  
  const openMap = (mapUrl: string) => {
    window.open(mapUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="py-20 px-4 bg-gradient-to-br from-[#fedac2]/10 via-white to-[#fdbc94]/10 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#fc5d01] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#fc5d01] text-lg">Đang tải thông tin sự kiện...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 px-4 bg-gradient-to-br from-[#fedac2]/10 via-white to-[#fdbc94]/10 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">Có lỗi xảy ra khi tải dữ liệu: {error}</p>
        </div>
      </div>
    );
  }

  // Check if weddingData and events exist before mapping
  if (!weddingData || !weddingData.events) {
    return (
      <div className="py-20 px-4 bg-gradient-to-br from-[#fedac2]/10 via-white to-[#fdbc94]/10 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#fc5d01] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#fc5d01] text-lg">Đang tải dữ liệu sự kiện...</p>
        </div>
      </div>
    );
  }

  const events = weddingData.events.map(event => ({
    title: event.title,
    date: event.date,
    time: event.time,
    location: event.location,
    address: event.address,
    mapUrl: event.mapUrl,
    icon: getEventIcon(event.type),
    color: getEventColor(event.type),
    description: event.description
  }));

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
              <Crown className="w-4 h-4 text-[#fedac2]" />
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
                <Calendar className="w-10 h-10 text-white" />
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
            <span className="relative z-10 text-elegant">Thiệp Mời</span>
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
            Chúng tôi rất hân hạnh được mời bạn tham dự lễ cưới của chúng tôi
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

        {/* Main Events */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <motion.h2 
            className="text-3xl font-light text-center text-[#fc5d01] mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Chương Trình Sự Kiện
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="bg-white/90 backdrop-blur-sm border-2 border-[#fedac2]/30 rounded-3xl p-5 h-full hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                  {/* Background Gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-0 group-hover:opacity-5`}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Header */}
                  <div className="text-center mb-4 relative z-10">
                    <motion.div 
                      className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${event.color} rounded-full text-white mb-3 shadow-xl`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                    >
                      <div className="scale-75">
                        {event.icon}
                      </div>
                    </motion.div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 text-xs leading-snug">
                      {event.description}
                    </p>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-3 relative z-10">
                    <motion.div 
                      className="flex items-start space-x-3 p-3 rounded-2xl bg-gradient-to-r from-[#fedac2]/10 to-[#fdbc94]/10"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Calendar className="w-4 h-4 text-[#fc5d01] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{event.date}</p>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-start space-x-3 p-3 rounded-2xl bg-gradient-to-r from-[#fedac2]/10 to-[#fdbc94]/10"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Clock className="w-4 h-4 text-[#fc5d01] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{event.time}</p>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-start space-x-3 p-3 rounded-2xl bg-gradient-to-r from-[#fedac2]/10 to-[#fdbc94]/10"
                      whileHover={{ scale: 1.02 }}
                    >
                      <MapPin className="w-4 h-4 text-[#fc5d01] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-800 text-sm mb-1">{event.location}</p>
                        <p className="text-gray-600 text-xs leading-snug">{event.address}</p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Map Button */}
                  <div className="mt-4 relative z-10">
                    <motion.button
                      onClick={() => openMap(event.mapUrl)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="group w-full bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] hover:from-[#e55401] hover:to-[#e56f2d] text-white font-medium py-3 px-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.3 }}
                      />
                      <div className="flex items-center justify-center relative z-10 text-sm">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>Xem Bản Đồ</span>
                        <motion.div
                          className="ml-2"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                        >
                          →
                        </motion.div>
                      </div>
                    </motion.button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <motion.h2 
            className="text-3xl font-light text-center text-[#fc5d01] mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Thông Tin Quan Trọng
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.6 + index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Card className="bg-white/90 backdrop-blur-sm border-2 border-[#fedac2]/30 rounded-3xl p-8 text-center h-full hover:shadow-xl transition-all duration-500 relative overflow-hidden">
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-5`}
                    transition={{ duration: 0.5 }}
                  />
                  
                  <motion.div 
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${info.color} rounded-full text-white mb-6 shadow-lg relative z-10`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                  >
                    {info.icon}
                  </motion.div>
                  
                  <h4 className="text-xl font-medium text-gray-800 mb-4 relative z-10">
                    {info.title}
                  </h4>
                  
                  <p className="text-gray-600 leading-relaxed relative z-10">
                    {info.content}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative"
        >
          <motion.h2 
            className="text-3xl font-light text-center text-[#fc5d01] mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Vị Trí Địa Điểm
          </motion.h2>

          <Card className="bg-white/90 backdrop-blur-sm border-2 border-[#fedac2]/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#fc5d01]/5 to-[#fd7f33]/5 opacity-0 hover:opacity-100"
              transition={{ duration: 0.5 }}
            />
            
            <div className="relative z-10">
              <div className="aspect-video w-full rounded-2xl overflow-hidden border-4 border-[#fedac2]/50 shadow-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4326002567447!2d106.69741831533309!3d10.776530192320445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b3330bcc9%3A0x2b6c6b8c6b8c6b8c!2sHo%20Chi%20Minh%20City%2C%20Vietnam!5e0!3m2!1sen!2s!4v1037798878123!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Wedding Venue Location"
                ></iframe>
              </div>
              
              <motion.div 
                className="text-center mt-8 p-6 bg-gradient-to-r from-[#fedac2]/20 to-[#fdbc94]/20 rounded-2xl"
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-lg font-medium text-gray-800 mb-2">
                  📍 Địa điểm chính: Đô Lương, Nghệ An
                </p>
                <p className="text-gray-600">
                  Nhà hàng tiệc cưới với không gian ấm cúng và trang trọng
                </p>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Thank You Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16"
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
              Rất mong được đón tiếp bạn trong ngày trọng đại của chúng tôi
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
