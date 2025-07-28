'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

export default function FallingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const colors = ['#fc5d01', '#fd7f33', '#ffac7b', '#fedac2', '#ff69b4'];
    
    const generateHeart = (id: number): Heart => ({
      id,
      x: Math.random() * 100, // Position from 0% to 100% of screen width
      size: Math.random() * 20 + 15, // Size between 15px and 35px
      duration: Math.random() * 3 + 4, // Duration between 4s and 7s
      delay: Math.random() * 2, // Delay between 0s and 2s
      color: colors[Math.floor(Math.random() * colors.length)]
    });

    // Generate initial hearts
    const initialHearts = Array.from({ length: 8 }, (_, i) => generateHeart(i));
    setHearts(initialHearts);

    // Add new hearts periodically
    const interval = setInterval(() => {
      setHearts(prevHearts => {
        const newHeart = generateHeart(Date.now());
        // Keep only recent hearts to prevent memory leak
        const recentHearts = prevHearts.slice(-15);
        return [...recentHearts, newHeart];
      });
    }, 2000); // Add new heart every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute"
            style={{
              left: `${heart.x}%`,
              top: '-50px',
              fontSize: `${heart.size}px`,
              color: heart.color,
            }}
            initial={{ 
              y: -50, 
              opacity: 0,
              rotate: 0,
              scale: 0
            }}
            animate={{ 
              y: window.innerHeight + 50, 
              opacity: [0, 1, 1, 0],
              rotate: [0, 360, 720],
              scale: [0, 1, 1, 0],
              x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50] // Slight horizontal drift
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              ease: "linear",
              opacity: {
                times: [0, 0.1, 0.9, 1],
                duration: heart.duration
              },
              scale: {
                times: [0, 0.1, 0.9, 1],
                duration: heart.duration
              }
            }}
            onAnimationComplete={() => {
              // Remove completed hearts
              setHearts(prev => prev.filter(h => h.id !== heart.id));
            }}
          >
            ♥️
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
