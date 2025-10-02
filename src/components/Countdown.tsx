'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Heart, Calendar, Clock, Star } from 'lucide-react';

interface CountdownProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
        setIsExpired(false);
      } else {
        setIsExpired(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: 'Ngày', value: timeLeft.days, icon: Calendar, color: 'from-[#fc5d01] to-[#fd7f33]' },
    { label: 'Giờ', value: timeLeft.hours, icon: Clock, color: 'from-[#fd7f33] to-[#ffac7b]' },
    { label: 'Phút', value: timeLeft.minutes, icon: Star, color: 'from-[#ffac7b] to-[#fdbc94]' },
    { label: 'Giây', value: timeLeft.seconds, icon: Heart, color: 'from-[#fdbc94] to-[#fedac2]' },
  ];

  if (isExpired) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center py-12"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-8xl mb-6"
        >
          🎉
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-light text-[#fc5d01] mb-4">
          Ngày Hạnh Phúc Đã Đến!
        </h2>
        <p className="text-xl text-gray-600">
          Chúc mừng Thanh An & Thanh Ngân!
        </p>
      </motion.div>
    );
  }

  return (
    <div className="relative">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Hearts */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#fc5d01]/20"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 2) * 60}%`,
            }}
            animate={{
              y: [-10, -20, -10],
              x: [-5, 5, -5],
              opacity: [0.2, 0.4, 0.2],
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
            <Heart className="w-4 h-4 fill-current" />
          </motion.div>
        ))}
      </div>

      {/* Main Countdown Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 relative z-10"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-full shadow-xl mb-6"
        >
          <Heart className="w-8 h-8 text-white fill-current" />
        </motion.div>
        
        <h2 className="text-3xl md:text-4xl font-light text-[#fc5d01] mb-4">
          Đếm Ngược Đến Ngày Hạnh Phúc
        </h2>
        <p className="text-lg text-gray-600 mb-2">
          4/9 Âm Lịch - 24/10/2025
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] mx-auto rounded-full"></div>
      </motion.div>

      {/* Countdown Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto relative z-10"
      >
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ 
              scale: 1.05,
              y: -5,
              transition: { duration: 0.2 }
            }}
          >
            <Card className="relative overflow-hidden bg-white/95 backdrop-blur-sm border border-[#fedac2]/30 shadow-xl hover:shadow-2xl transition-all duration-300 p-6 text-center group">
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${unit.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              {/* Icon */}
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  delay: index * 0.5,
                  ease: "easeInOut"
                }}
                className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${unit.color} rounded-full shadow-lg mb-4 relative z-10`}
              >
                <unit.icon className="w-6 h-6 text-white" />
              </motion.div>

              {/* Number */}
              <motion.div
                key={unit.value}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] bg-clip-text text-transparent mb-2">
                  {unit.value.toString().padStart(2, '0')}
                </div>
                <div className="text-sm md:text-base text-gray-600 font-medium">
                  {unit.label}
                </div>
              </motion.div>

              {/* Decorative Corner Elements */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-[#fc5d01]/20 rounded-full"></div>
              <div className="absolute bottom-2 left-2 w-2 h-2 bg-[#fd7f33]/20 rounded-full"></div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Special Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-center mt-12 relative z-10"
      >
        <div className="bg-gradient-to-r from-[#fedac2]/20 via-[#ffac7b]/20 to-[#fedac2]/20 rounded-2xl p-8 border border-[#fedac2]/30 backdrop-blur-sm max-w-2xl mx-auto">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-4xl mb-4"
          >
            💕
          </motion.div>
          <p className="text-lg text-gray-700 leading-relaxed italic">
            &ldquo;Mỗi giây trôi qua đều đưa chúng ta đến gần hơn với ngày hạnh phúc nhất. 
            Cảm ơn bạn đã đồng hành cùng chúng tôi trong hành trình tình yêu này!&rdquo;
          </p>
          <div className="flex items-center justify-center space-x-2 mt-4">
            <Heart className="w-4 h-4 fill-current text-[#fc5d01]" />
            <span className="text-[#fc5d01] font-medium">Thanh An & Thanh Ngân</span>
            <Heart className="w-4 h-4 fill-current text-[#fc5d01]" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
