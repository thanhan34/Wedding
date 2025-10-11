'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Gift } from 'lucide-react';
import { useState } from 'react';
import { useWeddingData } from '../hooks/useWeddingData';
import { GuestInfo } from '../lib/guestData';
import Lottie from 'lottie-react';
import giftAnimation from '../../public/Gift premium animation.json';
import Image from 'next/image';

interface QRPaymentProps {
  guestInfo?: GuestInfo;
}

export default function QRPayment({ guestInfo }: QRPaymentProps) {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [openedGifts, setOpenedGifts] = useState<Set<string>>(new Set());
  const { weddingData, loading } = useWeddingData();

  // Lọc tài khoản ngân hàng dựa trên khách mời được mời tham dự bên nào
  // Nếu không có guestInfo (trang chính), mặc định hiển thị tài khoản nhà gái
  const filteredBankAccounts = guestInfo 
    ? weddingData.bankAccounts.filter(account => account.id === guestInfo.invitedTo)
    : weddingData.bankAccounts.filter(account => account.id === 'bride');

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 gap-8">
        {[1, 2].map((index) => (
          <div key={index} className="bg-white rounded-lg shadow-xl p-8 border border-[#fedac2]/30 animate-pulse">
            <div className="text-center mb-6">
              <div className="h-6 bg-[#fedac2]/30 rounded mb-2"></div>
              <div className="h-4 bg-[#fedac2]/20 rounded w-24 mx-auto"></div>
            </div>
            <div className="flex justify-center mb-6">
              <div className="w-48 h-48 bg-[#fedac2]/30 rounded-lg"></div>
            </div>
            <div className="space-y-4">
              <div className="bg-[#fedac2]/20 rounded-lg p-4">
                <div className="h-4 bg-[#fedac2]/30 rounded mb-2"></div>
                <div className="h-6 bg-[#fedac2]/30 rounded"></div>
              </div>
              <div className="bg-[#fedac2]/20 rounded-lg p-4">
                <div className="h-4 bg-[#fedac2]/30 rounded mb-2"></div>
                <div className="h-6 bg-[#fedac2]/30 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const copyToClipboard = (text: string, accountId: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedAccount(accountId);
      setTimeout(() => setCopiedAccount(null), 2000);
    });
  };

  const isGiftOpen = openedGifts.has('main-gift');
  
  const toggleMainGift = () => {
    setOpenedGifts(prev => {
      const newSet = new Set(prev);
      if (newSet.has('main-gift')) {
        newSet.delete('main-gift');
      } else {
        newSet.add('main-gift');
      }
      return newSet;
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Single Gift Box Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-lg shadow-xl p-8 border border-[#fedac2]/30 relative overflow-hidden mb-8"
      >
        <div className="text-center mb-6">
          <h3 className="text-3xl font-light text-[#fc5d01] mb-2">
            {guestInfo 
              ? (guestInfo.invitedTo === 'bride' 
                  ? 'Gửi Quà Đến Cô Dâu' 
                  : 'Gửi Quà Đến Chú Rể')
              : 'Gửi Quà Đến Cô Dâu'
            }
          </h3>
          <p className="text-lg text-gray-600">Thông tin chuyển khoản</p>
        </div>

        {/* Gift Box or QR Codes */}
        <div className="flex justify-center mb-6 relative">
          <AnimatePresence mode="wait">
            {!isGiftOpen ? (
              // Lottie Gift Animation
              <motion.div
                key="gift-box"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0, rotateY: 180 }}
                transition={{ duration: 0.5 }}
                className="relative cursor-pointer group"
                onClick={toggleMainGift}
              >
                <div className="w-64 h-64 relative">
                  {/* Base Shadow */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-6 bg-black/20 rounded-full blur-xl"></div>
                  
                  {/* Lottie Animation Container */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="w-48 h-48 relative"
                    >
                      <Lottie
                        animationData={giftAnimation}
                        loop={true}
                        autoplay={true}
                        className="w-full h-full drop-shadow-2xl"
                        style={{
                          filter: 'drop-shadow(0 10px 20px rgba(252, 93, 1, 0.3))'
                        }}
                      />
                      
                      {/* Glow Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-[#fc5d01]/20 via-[#fd7f33]/30 to-[#fc5d01]/20 rounded-full blur-2xl"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.4, 0.8, 0.4]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                    
                    {/* Floating Elements */}
                    <motion.div
                      className="absolute -top-8 -right-8 text-3xl"
                      animate={{ 
                        rotate: 360,
                        y: [-4, 4, -4],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                        y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                      }}
                    >
                      💰
                    </motion.div>
                    
                    <motion.div
                      className="absolute -bottom-8 -left-8 text-2xl"
                      animate={{ 
                        rotate: -360,
                        x: [-3, 3, -3],
                        scale: [0.8, 1.3, 0.8]
                      }}
                      transition={{ 
                        rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                        x: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                        scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                      }}
                    >
                      💎
                    </motion.div>
                    
                    <motion.div
                      className="absolute top-1/4 -left-10 text-2xl"
                      animate={{ 
                        y: [-5, 5, -5],
                        opacity: [0.7, 1, 0.7],
                        rotate: [0, 180, 360]
                      }}
                      transition={{ 
                        duration: 6, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: 1
                      }}
                    >
                      🪙
                    </motion.div>
                    
                    <motion.div
                      className="absolute bottom-1/4 -right-10 text-2xl"
                      animate={{ 
                        x: [-5, 5, -5],
                        scale: [0.7, 1.4, 0.7],
                        rotate: [0, -180, -360]
                      }}
                      transition={{ 
                        duration: 5, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: 2
                      }}
                    >
                      💍
                    </motion.div>
                  </div>
                  
                  {/* Click Hint */}
                  <motion.div
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-[#fc5d01] font-medium"
                    animate={{ 
                      opacity: [0.5, 1, 0.5],
                      y: [0, -2, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Nhấn để mở quà 🎁
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              // QR Codes (filtered by guest side)
              <motion.div
                key="qr-codes"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="grid md:grid-cols-1 gap-8 max-w-md mx-auto">
                  {filteredBankAccounts.map((account, index) => (
                    <motion.div
                      key={account.id}
                      initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      className="bg-gradient-to-br from-white via-[#fedac2]/5 to-[#fdbc94]/10 rounded-2xl shadow-xl p-6 border-2 border-[#fedac2]/30"
                    >
                      <div className="text-center mb-4">
                        <h4 className="text-xl font-light text-[#fc5d01] mb-1">{account.name}</h4>
                        <p className="text-sm text-gray-600">{account.bank}</p>
                      </div>
                      
                      {/* QR Code */}
                      <div className="flex justify-center mb-4">
                        <div className="w-48 h-48 bg-white rounded-xl shadow-inner flex items-center justify-center border-2 border-[#fedac2]/30 p-3">
                          <div className="relative w-full h-full">
                            <Image
                              src={account.id === 'bride' ? '/qr/qr-codau.png' : '/qr/qr-chure.png'}
                              alt={`QR Code ${account.name}`}
                              fill
                              className="object-contain rounded-lg"
                              priority
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Account Details */}
                      <div className="space-y-3">
                        <div className="bg-[#fedac2]/20 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-gray-600 mb-1">Số tài khoản</p>
                              <p className="text-sm font-medium text-gray-800">{account.accountNumber}</p>
                            </div>
                            <button
                              onClick={() => copyToClipboard(account.accountNumber, `${account.id}-account`)}
                              className="p-2 hover:bg-[#fedac2]/40 rounded-lg transition-colors duration-200"
                            >
                              {copiedAccount === `${account.id}-account` ? (
                                <Check className="w-4 h-4 text-green-600" />
                              ) : (
                                <Copy className="w-4 h-4 text-[#fc5d01]" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="bg-[#fedac2]/20 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-gray-600 mb-1">Tên tài khoản</p>
                              <p className="text-sm font-medium text-gray-800">{account.accountName}</p>
                            </div>
                            <button
                              onClick={() => copyToClipboard(account.accountName, `${account.id}-name`)}
                              className="p-2 hover:bg-[#fedac2]/40 rounded-lg transition-colors duration-200"
                            >
                              {copiedAccount === `${account.id}-name` ? (
                                <Check className="w-4 h-4 text-green-600" />
                              ) : (
                                <Copy className="w-4 h-4 text-[#fc5d01]" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Close button */}
                <motion.button
                  onClick={toggleMainGift}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute -top-3 -right-3 bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] text-white rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white"
                >
                  <motion.div
                    animate={{ rotate: [0, 90, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ✕
                  </motion.div>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Message */}
        <div className="text-center">
          <p className="text-sm text-gray-600 italic">
            Cảm ơn {guestInfo && <span className="lowercase">{guestInfo.title}</span>} đã gửi lời chúc và quà cưới đến chúng mình! ❤️
          </p>
        </div>
      </motion.div>
    </div>
  );
}
