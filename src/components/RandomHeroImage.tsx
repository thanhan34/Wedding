'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, RefreshCw, Shuffle } from 'lucide-react';

interface RandomHeroImageProps {
  className?: string;
}

const RandomHeroImage: React.FC<RandomHeroImageProps> = ({ className = "" }) => {
  // Danh sách tất cả ảnh trong thư mục Wedding
  const weddingImages = [
    "/Wedding/z6735567858616_2114169ea6c7948b4122776ba07606c0.jpg",
    "/Wedding/z6735567871021_9e4913b6410c10f10977be2780d2f3f7.jpg",
    "/Wedding/z6735567882402_9def3cf5b873424e21da131c35e3aae9.jpg",
    "/Wedding/z6735567894036_260ccd39a6a62711ab29b072eb173369.jpg",
    "/Wedding/z6735567906204_6be847502f4b9d7e3f2a695bdc41a4bd.jpg",
    "/Wedding/z6735567917740_1a81acc6ac24e1836c441ae42a93c0a6.jpg",
    "/Wedding/z6735567927961_c7b35df35d192ed05609826ff9940a4c.jpg",
    "/Wedding/z6735567939132_6f69d0c6e9fc1d92dc18868639c2c99f.jpg",
    "/Wedding/z6735567951291_6900097c7a503aa5cf3befa46a85cd47.jpg",
    "/Wedding/z6735567975547_767583a942095144b0aeb707a866ce8d.jpg",
    "/Wedding/z6735567987748_d7077417fb671d31654fd0bf9ae6ed0b.jpg",
    "/Wedding/z6735567999368_6d9c40712c9abd26ef6da75acaeb655b.jpg",
    "/Wedding/z6735567999397_83c352a7a02daa39a797abde70651b9c.jpg",
    "/Wedding/z6735568022520_cdaecac085539ead6daf709770f008d3.jpg",
    "/Wedding/z6735568048498_05b7b7a4be9b803d3a635bddaa5d9e2a.jpg",
    "/Wedding/z6735568061311_68c76407f6a831c15690af90b6cdd02d.jpg",
    "/Wedding/z6735568086547_8c81b2729db2ad55e1d414077272acc2.jpg",
    "/Wedding/z6838080697898_bcd43c92e2da834b9d6ca4532e47d30c.jpg",
    "/Wedding/z6838080701992_98232c2adbdffc34945825587b9e5e0a.jpg",
    "/Wedding/z6838080707580_178be53a02163fad3c96084075663cf9.jpg",
    "/Wedding/z6838080712251_9dd253c936ac92d5a77f635b83574566.jpg",
    "/Wedding/z6838080722077_7ecc69fe88785110420f89038b157e48.jpg",
    "/Wedding/z6838080728726_fe43d78d183dc0a71cec5ba5b2bd7dce.jpg",
    "/Wedding/z6838080731335_17baac262b6862ca700fe900452d7c06.jpg",
    "/Wedding/z6838080733915_38de9ce32ca1e0d3d96907029032af74.jpg",
    "/Wedding/z6838080739496_710f8307bc0c00c5147535e0cd2356cf.jpg",
    "/Wedding/z6838080745654_5e8905d8daa2b2df3b7810e8fb5e69a6.jpg",
    "/Wedding/z6838080754535_4f378055edb7a651c9a75cd196b4e58d.jpg",
    "/Wedding/z6838080754857_b110d0d111d59f652dcf487256fa3b70.jpg",
    "/Wedding/z6838080763589_910a47e34d25b9d7bbe4db3541608773.jpg",
    "/Wedding/z6838080770873_7b285de85a681a017108d52fd5b4afdf.jpg",
    "/Wedding/z6838080771149_59b1e3630b3c686210dc857d65d5969e.jpg",
    "/Wedding/z6838080781897_2afadf8f9c02a4f5f3477057e35b8f0b.jpg",
    "/Wedding/z6838080785399_87e2b40eca427993d205d6c1d1aa053a.jpg",
    "/Wedding/z6838080792185_51f3e8cde7cf8e5581c1e1f274aa7684.jpg",
    "/Wedding/z6838080797153_cc9971c162105ab5bbd1c39e4c5c5ce4.jpg",
    "/Wedding/z6838080802537_8fef1d2348e120292fc7355db1f3b049.jpg",
    "/Wedding/z6838080802863_b95b803063f92b35d8e4b9da4cc08f79.jpg",
    "/Wedding/z6838080811371_8dc854e9755a1e43cccbc155007a0f74.jpg",
    "/Wedding/z6838080819935_42f83e79091a62e65c98af7c6e36d6bf.jpg",
    "/Wedding/z6838080822599_20fb664a8e4fd21a35dc8988832a36b8.jpg",
    "/Wedding/z6838080830595_51edb078861bf053465a9e407c630da6.jpg",
    "/Wedding/z6838080835676_006d003c8a87c4bce70a8acf9190259f.jpg",
    "/Wedding/z6838080836018_72b464351e24c07b52202c909a90eb71.jpg",
    "/Wedding/z6838080842550_b1c2724a39a3abede4973de82bef6a0c.jpg",
    "/Wedding/z6838080852677_0a197abc6ea1581d6a9e6eb58671b8fd.jpg",
    "/Wedding/z6838080853526_b0927a4c247f68559abc18c19ac89276.jpg",
    "/Wedding/z6838080860610_ff4d23d09d5b69485f5270ad923f4784.jpg",
    "/Wedding/z6838080866663_23d6bbf1c6fd4976631f98e139ece5c9.jpg",
    "/Wedding/z6838080875690_f57d955899caf7be9bdc8f6b81611c4a.jpg",
    "/Wedding/z6838080877495_7cc9632a07c6521867f094d09163f2a7.jpg",
    "/Wedding/z6838080884627_0e0d5b9ebc1a8416b102ab67545b7518.jpg",
    "/Wedding/z6838080886696_22458f83ecd91368360f984489fad70b.jpg",
    "/Wedding/z6838080891041_c1a93cf11983fc7ffc18b186721feb7b.jpg",
    "/Wedding/z6838080896568_53efe268ff69f80d45faea7df50df560.jpg",
    "/Wedding/z6838080902882_2eb23f16c748f339625609bfc6954228.jpg",
    "/Wedding/z6838080909561_52e5b9487821be42730ad71bae1f708d.jpg",
    "/Wedding/z6838080913226_199a824049f80777d9182ead4ac2fa08.jpg"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [autoChange, setAutoChange] = useState(true);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  // Random ảnh ban đầu
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * weddingImages.length);
    setCurrentImageIndex(randomIndex);
    // Load kích thước ảnh đầu tiên
    loadImageDimensions(weddingImages[randomIndex]);
  }, []);

  // Auto change ảnh mỗi 5 giây
  useEffect(() => {
    if (!autoChange) return;

    const interval = setInterval(() => {
      changeToRandomImage();
    }, 5000);

    return () => clearInterval(interval);
  }, [autoChange, currentImageIndex]);

  // Function để load ảnh và lấy kích thước
  const loadImageDimensions = (imageSrc: string) => {
    const img = new window.Image();
    img.onload = () => {
      const maxWidth = 416; // lg:w-[26rem] = 416px
      const maxHeight = 512; // lg:h-[32rem] = 512px
      
      let { width, height } = img;
      
      // Tính toán tỷ lệ để fit trong khung tối đa
      const widthRatio = maxWidth / width;
      const heightRatio = maxHeight / height;
      const ratio = Math.min(widthRatio, heightRatio);
      
      // Áp dụng tỷ lệ
      width = width * ratio;
      height = height * ratio;
      
      setImageDimensions({ width, height });
    };
    img.src = imageSrc;
  };

  const changeToRandomImage = () => {
    if (isChanging) return;
    
    setIsChanging(true);
    
    // Chọn ảnh khác với ảnh hiện tại
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * weddingImages.length);
    } while (newIndex === currentImageIndex && weddingImages.length > 1);
    
    // Load kích thước ảnh mới
    loadImageDimensions(weddingImages[newIndex]);
    
    setTimeout(() => {
      setCurrentImageIndex(newIndex);
      setIsChanging(false);
    }, 300);
  };

  const handleImageClick = () => {
    changeToRandomImage();
  };

  const toggleAutoChange = () => {
    setAutoChange(!autoChange);
  };

  return (
    <div className={`relative ${className}`}>
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


      {/* Main Hero Image Container */}
      <motion.div 
        className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50 backdrop-blur-sm cursor-pointer group"
        style={{
          width: imageDimensions.width > 0 ? `${imageDimensions.width}px` : '320px',
          height: imageDimensions.height > 0 ? `${imageDimensions.height}px` : '384px',
          minWidth: '280px',
          minHeight: '350px',
          maxWidth: '416px',
          maxHeight: '512px'
        }}
        animate={{
          width: imageDimensions.width > 0 ? `${imageDimensions.width}px` : '320px',
          height: imageDimensions.height > 0 ? `${imageDimensions.height}px` : '384px'
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        onClick={handleImageClick}>
        
        {/* Image Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={weddingImages[currentImageIndex]}
              alt={`Thanh An & Thanh Ngân - Wedding Photo ${currentImageIndex + 1}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority={currentImageIndex === 0}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Click Hint */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
            <Shuffle className="w-6 h-6 text-[#fc5d01]" />
          </div>
        </div>
        
        {/* Decorative Corner Elements */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/60 rounded-tl-lg"></div>
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/60 rounded-tr-lg"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/60 rounded-bl-lg"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/60 rounded-br-lg"></div>
      </motion.div>

      {/* Sparkle Effects */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute text-[#ffac7b] text-2xl pointer-events-none"
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

      {/* Loading Overlay */}
      <AnimatePresence>
        {isChanging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-[#fc5d01]/30 border-t-[#fc5d01] rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RandomHeroImage;
