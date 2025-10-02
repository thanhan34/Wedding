'use client';

import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Heart, Gem, Star, Coffee, Plane } from 'lucide-react';
import Image from 'next/image';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  image?: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    date: "Tháng 1, 2020",
    title: "Lần đầu gặp gỡ",
    description: "Chúng tôi gặp nhau lần đầu tại một quán cà phê nhỏ. Ánh mắt anh khiến em không thể quên. Đó là khoảnh khắc định mệnh, khi hai trái tim bắt đầu đập cùng nhịp.",
    icon: <Coffee className="w-6 h-6" />,
    color: "from-[#fc5d01] to-[#fd7f33]",
    image: "/Wedding/Doc/KTIU0157.jpg"
  },
  {
    date: "Tháng 6, 2020",
    title: "Hẹn hò đầu tiên",
    description: "Buổi hẹn hò đầu tiên tại công viên, chúng tôi đã trò chuyện suốt cả ngày mà không biết mệt. Những tiếng cười giòn tan và ánh mắt lung linh đã làm nên kỷ niệm đẹp nhất.",
    icon: <Heart className="w-6 h-6" />,
    color: "from-[#fd7f33] to-[#ffac7b]",
    image: "/Wedding/Doc/KTIU0180.jpg"
  },
  {
    date: "Tháng 12, 2022",
    title: "Chuyến du lịch đáng nhớ",
    description: "Chuyến du lịch Đà Lạt lãng mạn, nơi chúng tôi hiểu rằng mình là dành cho nhau. Giữa khung cảnh thơ mộng của thành phố ngàn hoa, tình yêu chúng tôi đã thăng hoa.",
    icon: <Plane className="w-6 h-6" />,
    color: "from-[#ffac7b] to-[#fdbc94]",
    image: "/Wedding/Doc/KTIU0370.jpg"
  },
  {
    date: "Tháng 2, 2024",
    title: "Lời cầu hôn",
    description: "Anh đã quỳ gối cầu hôn em trong một buổi hoàng hôn tuyệt đẹp. Em đã nói 'Có' với đầy hạnh phúc. Đó là khoảnh khắc thiêng liêng nhất, khi chúng tôi hứa sẽ yêu nhau mãi mãi.",
    icon: <Gem className="w-6 h-6" />,
    color: "from-[#fdbc94] to-[#fedac2]",
    image: "/Wedding/Doc/KTIU8198.JPG"
  }
];

export default function LoveStoryTimeline() {
  return (
    <div className="relative">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Hearts */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#fc5d01]/10"
            style={{
              left: `${5 + i * 12}%`,
              top: `${10 + (i % 4) * 25}%`,
            }}
            animate={{
              y: [-15, -25, -15],
              x: [-8, 8, -8],
              opacity: [0.1, 0.3, 0.1],
              scale: [0.8, 1.3, 0.8],
              rotate: [0, 360]
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          >
            <Heart className="w-6 h-6 fill-current" />
          </motion.div>
        ))}

        {/* Sparkle Effects */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute text-[#ffac7b]/20"
            style={{
              left: `${10 + i * 8}%`,
              top: `${15 + (i % 3) * 30}%`,
            }}
            animate={{
              scale: [0, 1.5, 0],
              rotate: [0, 180, 360],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          >
            <Star className="w-3 h-3 fill-current" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
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
            className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-full shadow-xl mb-4"
          >
            <Heart className="w-7 h-7 text-white fill-current" />
          </motion.div>
          
          <h2 className="text-2xl md:text-3xl font-light text-[#fc5d01] mb-3">
            Chuyện Tình Yêu Của Chúng Tôi
          </h2>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-snug">
            Mỗi khoảnh khắc đều là một trang sách trong câu chuyện tình yêu của chúng tôi. 
            Hãy cùng lật từng trang để khám phá hành trình từ lần gặp đầu tiên đến ngày hạnh phúc nhất.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] mx-auto rounded-full mt-4"></div>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Main Timeline Line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#fc5d01] via-[#fd7f33] to-[#fedac2] rounded-full shadow-lg"></div>

          {/* Timeline Events */}
          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, y: 50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              className={`relative flex items-center mb-10 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot with Animation */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 z-20"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 360]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    delay: index * 0.5,
                    ease: "easeInOut"
                  }}
                  className={`w-12 h-12 bg-gradient-to-br ${event.color} rounded-full border-3 border-white shadow-xl flex items-center justify-center`}
                >
                  <div className="text-white scale-75">
                    {event.icon}
                  </div>
                </motion.div>
                
                {/* Pulse Effect */}
                <motion.div
                  animate={{ 
                    scale: [1, 2, 1],
                    opacity: [0.5, 0, 0.5]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    delay: index * 0.7,
                    ease: "easeInOut"
                  }}
                  className={`absolute inset-0 bg-gradient-to-br ${event.color} rounded-full opacity-20`}
                />
              </motion.div>

              {/* Content Card */}
              <div className={`ml-20 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                <motion.div
                  whileHover={{ 
                    scale: 1.02,
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                >
                  <Card className="relative overflow-hidden bg-white border border-[#fedac2]/30 shadow-xl hover:shadow-2xl transition-all duration-500 group">
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    
                    {/* Image Section */}
                    {event.image && (
                      <div className="relative h-32 overflow-hidden">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        
                        {/* Date Badge */}
                        <div className={`absolute top-2 right-2 bg-gradient-to-r ${event.color} text-white px-2 py-0.5 rounded-full text-xs font-medium shadow-lg`}>
                          {event.date}
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-4 relative z-10">
                      <div className="flex items-center mb-2">
                        <motion.div
                          animate={{ 
                            rotate: [0, 10, -10, 0]
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity,
                            delay: index * 0.5,
                            ease: "easeInOut"
                          }}
                          className={`p-2 bg-gradient-to-r ${event.color} rounded-full text-white mr-3 shadow-lg scale-75`}
                        >
                          {event.icon}
                        </motion.div>
                        <div>
                          <h3 className="text-base font-bold text-gray-800 mb-0.5">
                            {event.title}
                          </h3>
                          {!event.image && (
                            <div className="text-xs text-[#fc5d01] font-semibold">
                              {event.date}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 leading-snug text-xs">
                        {event.description}
                      </p>

                      {/* Decorative Elements */}
                      <div className="flex items-center justify-end mt-2 space-x-1.5">
                        <motion.div
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            delay: index * 0.3,
                            ease: "easeInOut"
                          }}
                          className="w-1.5 h-1.5 bg-[#fc5d01] rounded-full"
                        />
                        <motion.div
                          animate={{ 
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{ 
                            duration: 2.5, 
                            repeat: Infinity,
                            delay: index * 0.3 + 0.2,
                            ease: "easeInOut"
                          }}
                          className="w-2 h-2 bg-[#fd7f33] rounded-full"
                        />
                        <motion.div
                          animate={{ 
                            scale: [1, 1.1, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            delay: index * 0.3 + 0.4,
                            ease: "easeInOut"
                          }}
                          className="w-1.5 h-1.5 bg-[#ffac7b] rounded-full"
                        />
                      </div>
                    </div>

                    {/* Corner Decorations */}
                    <div className="absolute top-3 left-3 w-3 h-3 bg-[#fc5d01]/20 rounded-full"></div>
                    <div className="absolute bottom-3 right-3 w-3 h-3 bg-[#fd7f33]/20 rounded-full"></div>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-10"
        >
          <div className="bg-gradient-to-r from-[#fedac2]/20 via-[#ffac7b]/20 to-[#fedac2]/20 rounded-2xl p-5 border border-[#fedac2]/30 max-w-3xl mx-auto">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-3xl mb-3"
            >
              💕
            </motion.div>
            <h3 className="text-lg font-light text-[#fc5d01] mb-2">
              Và Câu Chuyện Vẫn Tiếp Tục...
            </h3>
            <p className="text-sm text-gray-700 leading-snug italic">
              &ldquo;Từ những khoảnh khắc đầu tiên đến ngày hôm nay, mỗi bước đi trong hành trình tình yêu 
              đều dẫn chúng tôi đến với nhau. Và giờ đây, chúng tôi sẵn sàng viết tiếp câu chuyện 
              với tư cách là vợ chồng, cùng nhau tạo nên những kỷ niệm đẹp mới.&rdquo;
            </p>
            <div className="flex items-center justify-center space-x-2 mt-4">
              <Heart className="w-4 h-4 fill-current text-[#fc5d01]" />
              <span className="text-[#fc5d01] font-medium text-sm">Thanh An & Thanh Ngân</span>
              <Heart className="w-4 h-4 fill-current text-[#fc5d01]" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
