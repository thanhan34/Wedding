'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ChineseDecorations() {
  const [petals, setPetals] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  useEffect(() => {
    // Create gentle falling petals
    const newPetals = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 8
    }));
    setPetals(newPetals);
  }, []);

  return (
    <>
      {/* Elegant Floating Petals */}
      <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            initial={{ y: -20, opacity: 0 }}
            animate={{
              y: ['-20px', 'calc(100vh + 20px)'],
              x: [0, Math.sin(petal.id) * 30],
              rotate: [0, 360],
              opacity: [0, 0.6, 0.6, 0]
            }}
            transition={{
              duration: 15 + petal.id * 2,
              repeat: Infinity,
              ease: "linear",
              delay: petal.delay
            }}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: `${petal.x}%`,
              background: 'linear-gradient(135deg, #fedac2 0%, #fdbc94 100%)',
              boxShadow: '0 2px 4px rgba(252, 93, 1, 0.2)'
            }}
          />
        ))}
      </div>

      {/* Chinese Decorative Images */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {/* Top Left Corner - Chinese Wedding Cartoon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-4 left-4"
        >
          <div className="w-24 h-24 opacity-80 relative">
            <Image
              src="/weddingchinese/—Pngtree—chinese wedding ancient wedding cartoon_3807514.png"
              alt="Chinese decoration"
              fill
              className="object-contain drop-shadow-lg"
            />
          </div>
        </motion.div>

        {/* Top Right Corner - Chinese Wedding Cartoon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute top-4 right-4"
        >
          <div className="w-24 h-24 opacity-80 relative">
            <Image
              src="/weddingchinese/—Pngtree—chinese wedding ancient wedding cartoon_3807515.png"
              alt="Chinese decoration"
              fill
              className="object-contain drop-shadow-lg"
            />
          </div>
        </motion.div>

        {/* Bottom Left Corner - Chinese Pattern */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="absolute bottom-4 left-4"
        >
          <div className="w-20 h-20 opacity-70 rounded-full overflow-hidden shadow-lg relative">
            <Image
              src="/weddingchinese/m2i8A0H7K9H7m2N4.png"
              alt="Chinese pattern"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Bottom Right Corner - Chinese Pattern */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="absolute bottom-4 right-4"
        >
          <div className="w-20 h-20 opacity-70 rounded-full overflow-hidden shadow-lg relative">
            <Image
              src="/weddingchinese/kisspng-wedding-invitation-chinese-marriage-bridegroom-cartoon-bride-and-groom-5a8841a6ba1bb4.9223908115188791427623.png"
              alt="Chinese pattern"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Subtle Side Ornaments */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {/* Left Side Ornament */}
        <motion.div
          animate={{ 
            y: [-10, 10, -10],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute left-8 top-1/2 transform -translate-y-1/2"
        >
          <svg width="40" height="120" viewBox="0 0 40 120" className="opacity-15">
            <defs>
              <linearGradient id="sideGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fc5d01" />
                <stop offset="50%" stopColor="#fd7f33" />
                <stop offset="100%" stopColor="#fc5d01" />
              </linearGradient>
            </defs>
            <path
              d="M20 10 Q30 20 20 30 Q10 20 20 10 M20 30 Q30 40 20 50 Q10 40 20 30 M20 50 Q30 60 20 70 Q10 60 20 50 M20 70 Q30 80 20 90 Q10 80 20 70 M20 90 Q30 100 20 110 Q10 100 20 90"
              fill="url(#sideGradient1)"
              stroke="#fc5d01"
              strokeWidth="0.5"
            />
          </svg>
        </motion.div>

        {/* Right Side Ornament */}
        <motion.div
          animate={{ 
            y: [10, -10, 10],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute right-8 top-1/2 transform -translate-y-1/2"
        >
          <svg width="40" height="120" viewBox="0 0 40 120" className="opacity-15">
            <defs>
              <linearGradient id="sideGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fd7f33" />
                <stop offset="50%" stopColor="#fc5d01" />
                <stop offset="100%" stopColor="#fd7f33" />
              </linearGradient>
            </defs>
            <path
              d="M20 10 Q30 20 20 30 Q10 20 20 10 M20 30 Q30 40 20 50 Q10 40 20 30 M20 50 Q30 60 20 70 Q10 60 20 50 M20 70 Q30 80 20 90 Q10 80 20 70 M20 90 Q30 100 20 110 Q10 100 20 90"
              fill="url(#sideGradient2)"
              stroke="#fd7f33"
              strokeWidth="0.5"
            />
          </svg>
        </motion.div>
      </div>

      {/* Elegant Double Happiness Symbol */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: [0.05, 0.15, 0.05],
          scale: [0.95, 1.05, 0.95]
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-5"
      >
        <svg width="200" height="200" viewBox="0 0 200 200" className="opacity-10">
          <defs>
            <linearGradient id="happinessGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fc5d01" />
              <stop offset="50%" stopColor="#fd7f33" />
              <stop offset="100%" stopColor="#fc5d01" />
            </linearGradient>
          </defs>
          <text
            x="100"
            y="120"
            fontSize="80"
            textAnchor="middle"
            fill="url(#happinessGradient)"
            fontFamily="serif"
            fontWeight="bold"
          >
            囍
          </text>
        </svg>
      </motion.div>

      {/* Subtle Border Enhancement */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {/* Top Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#fc5d01] to-transparent opacity-20"></div>
        
        {/* Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#fc5d01] to-transparent opacity-20"></div>
        
        {/* Left Border */}
        <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#fd7f33] to-transparent opacity-20"></div>
        
        {/* Right Border */}
        <div className="absolute top-0 right-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#fd7f33] to-transparent opacity-20"></div>
      </div>

      {/* Floating Lantern Elements */}
      <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`lantern-${i}`}
            animate={{
              y: [-20, 20, -20],
              rotate: [-2, 2, -2]
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 3
            }}
            className="absolute opacity-10"
            style={{
              left: `${20 + i * 30}%`,
              top: `${15 + i * 20}%`
            }}
          >
            <svg width="60" height="80" viewBox="0 0 60 80">
              <defs>
                <linearGradient id={`lanternGradient${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fc5d01" />
                  <stop offset="50%" stopColor="#fd7f33" />
                  <stop offset="100%" stopColor="#fc5d01" />
                </linearGradient>
              </defs>
              {/* Lantern Body */}
              <ellipse cx="30" cy="40" rx="25" ry="30" fill={`url(#lanternGradient${i})`} stroke="#fc5d01" strokeWidth="1" />
              {/* Top Cap */}
              <rect x="25" y="8" width="10" height="8" fill="#fd7f33" rx="2" />
              {/* Bottom Tassel */}
              <line x1="30" y1="70" x2="30" y2="75" stroke="#fc5d01" strokeWidth="2" />
              <circle cx="30" cy="76" r="2" fill="#fd7f33" />
              {/* Decorative Lines */}
              <line x1="10" y1="25" x2="50" y2="25" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
              <line x1="10" y1="40" x2="50" y2="40" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
              <line x1="10" y1="55" x2="50" y2="55" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
            </svg>
          </motion.div>
        ))}
      </div>
    </>
  );
}
