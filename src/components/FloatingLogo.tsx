'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function FloatingLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, x: -50 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed bottom-6 left-6 z-40"
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
        className="bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-2xl border-2 border-[#fc5d01]/30 hover:border-[#fc5d01] transition-all duration-300"
      >
        <Image
          src="/orange-logo.png"
          alt="Wedding Logo"
          width={60}
          height={60}
          className="object-contain"
          priority
        />
      </motion.div>
    </motion.div>
  );
}
