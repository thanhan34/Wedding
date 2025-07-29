'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Input } from './ui/input';
import { toast } from 'sonner';
import { Send, Users, Heart, X, User, Phone, Calendar, MapPin, Sparkles } from 'lucide-react';
import { GuestInfo } from '../lib/guestData';

interface RSVPData {
  name: string;
  phone: string;
  guestCount: number;
  event: string;
  attending: boolean;
  guestSlug?: string;
}

interface RSVPFormProps {
  guestInfo?: GuestInfo;
}

export default function RSVPForm({ guestInfo }: RSVPFormProps) {
  const [formData, setFormData] = useState<RSVPData>({
    name: guestInfo?.name || '',
    phone: '',
    guestCount: 1,
    event: 'both',
    attending: true,
    guestSlug: guestInfo?.slug,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Vui lòng nhập tên của bạn');
      return;
    }

    if (!formData.phone.trim()) {
      toast.error('Vui lòng nhập số điện thoại');
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'rsvp'), {
        ...formData,
        guestTitle: guestInfo?.title,
        guestRelationship: guestInfo?.relationship,
        createdAt: new Date(),
      });

      toast.success('Cảm ơn bạn đã xác nhận tham dự! 💕');
      
      // Reset form
      setFormData({
        name: guestInfo?.name || '',
        phone: '',
        guestCount: 1,
        event: 'both',
        attending: true,
        guestSlug: guestInfo?.slug,
      });
      setCurrentStep(0);
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { title: "Tham Gia", icon: Heart },
    { title: "Sự Kiện", icon: Calendar },
    { title: "Số Người", icon: Users },
    { title: "Thông Tin", icon: User }
  ];

  return (
    <div className="py-16 px-4 bg-gradient-to-br from-[#fedac2]/10 via-white to-[#fdbc94]/10 relative">
      {/* Subtle Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        {[...Array(8)].map((_, i) => (
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
              opacity: [0, 0.05, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: 25 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 15,
              ease: "linear"
            }}
          >
            <Heart className="w-4 h-4 text-[#fc5d01] fill-current" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <motion.div
            className="inline-flex items-center justify-center mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-full flex items-center justify-center shadow-lg">
              <Heart className="w-8 h-8 text-white fill-current" />
            </div>
          </motion.div>

          <motion.h1 
            className="text-3xl md:text-4xl font-light text-[#fc5d01] mb-3 text-elegant"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Xác Nhận Tham Dự
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Vui lòng làm theo các bước dưới đây để xác nhận tham dự 💕
          </motion.p>
        </motion.div>

        {/* Compact Progress Steps */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center space-x-4 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-[#fedac2]/20">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <motion.div
                  className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                    index <= currentStep 
                      ? 'bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] text-white shadow-md' 
                      : 'bg-gray-100 text-gray-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <step.icon className="w-5 h-5" />
                </motion.div>
                
                {index < steps.length - 1 && (
                  <motion.div 
                    className={`w-8 h-0.5 mx-2 rounded-full transition-all duration-300 ${
                      index < currentStep ? 'bg-gradient-to-r from-[#fc5d01] to-[#fd7f33]' : 'bg-gray-200'
                    }`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: index < currentStep ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Step Labels */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-flex items-center space-x-2 bg-[#fc5d01]/10 px-4 py-2 rounded-full">
            <span className="text-sm font-medium text-[#fc5d01]">Bước {currentStep + 1}/4:</span>
            <span className="text-sm text-gray-700">{steps[currentStep]?.title}</span>
          </div>
        </motion.div>

        {/* Compact Form Card */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-[#fedac2]/20 overflow-hidden">
            {/* Instruction Header */}
            <div className="bg-gradient-to-r from-[#fc5d01]/5 to-[#fd7f33]/5 p-6 border-b border-[#fedac2]/20">
              <motion.div 
                className="text-center"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {currentStep === 0 && (
                  <p className="text-gray-700 text-base">
                    👆 <strong>Chọn một trong hai lựa chọn</strong> bên dưới
                  </p>
                )}
                {currentStep === 1 && (
                  <p className="text-gray-700 text-base">
                    📅 <strong>Chọn sự kiện</strong> bạn muốn tham gia
                  </p>
                )}
                {currentStep === 2 && (
                  <p className="text-gray-700 text-base">
                    👥 <strong>Chọn số người</strong> sẽ đi cùng bạn
                  </p>
                )}
                {currentStep === 3 && (
                  <p className="text-gray-700 text-base">
                    ✍️ <strong>Điền thông tin</strong> để chúng tôi liên hệ
                  </p>
                )}
              </motion.div>
            </div>

            <form onSubmit={handleSubmit} className="p-8">
              <AnimatePresence mode="wait">
                {/* Step 0: Attending Question */}
                {currentStep === 0 && (
                  <motion.div
                    key="step0"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                    className="text-center space-y-10"
                  >
                    {/* Enhanced Question Header */}
                    <motion.div
                      className="space-y-6"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <motion.div
                        className="flex justify-center items-center space-x-4 mb-6"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                      >
                        <motion.div
                          className="w-2 h-2 bg-[#fc5d01] rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div
                          className="w-3 h-3 bg-[#fd7f33] rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                        />
                        <motion.div
                          className="w-4 h-4 bg-[#ffac7b] rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                        />
                      </motion.div>

                      <motion.h3 
                        className="text-3xl md:text-4xl font-light text-gray-800 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        Bạn sẽ tham gia cùng chúng tôi chứ?
                      </motion.h3>

                      <motion.p
                        className="text-lg text-gray-600 max-w-md mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        Sự hiện diện của bạn sẽ làm cho ngày đặc biệt này thêm ý nghĩa
                      </motion.p>
                    </motion.div>
                    
                    <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                      {/* Yes Button - Enhanced */}
                      <motion.button
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, attending: true });
                          setCurrentStep(1);
                        }}
                        whileHover={{ scale: 1.03, y: -5 }}
                        whileTap={{ scale: 0.97 }}
                        initial={{ opacity: 0, y: 50, rotate: -2 }}
                        animate={{ opacity: 1, y: 0, rotate: 0 }}
                        transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
                        className="group relative p-10 rounded-3xl border-3 border-[#fedac2] hover:border-[#fc5d01] transition-all duration-500 bg-gradient-to-br from-white via-[#fff8f5] to-[#fedac2]/20 hover:shadow-2xl overflow-hidden"
                      >
                        {/* Animated Background */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-[#fc5d01]/10 via-[#fd7f33]/5 to-[#ffac7b]/10 opacity-0 group-hover:opacity-100"
                          transition={{ duration: 0.5 }}
                        />

                        {/* Floating Hearts */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute"
                              initial={{ 
                                x: Math.random() * 100 + '%',
                                y: '100%',
                                opacity: 0,
                                scale: 0
                              }}
                              animate={{ 
                                y: '-20%',
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0]
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.5,
                                ease: "easeOut"
                              }}
                            >
                              <Heart className="w-3 h-3 text-[#fc5d01] fill-current opacity-30" />
                            </motion.div>
                          ))}
                        </div>

                        {/* Corner Decorations */}
                        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-[#fc5d01]/10 to-transparent rounded-br-full" />
                        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-[#fd7f33]/10 to-transparent rounded-tl-full" />
                        
                        <div className="relative z-10 space-y-6">
                          <motion.div
                            className="w-20 h-20 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-full flex items-center justify-center mx-auto shadow-xl"
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                          >
                            <Heart className="w-10 h-10 text-white fill-current" />
                          </motion.div>
                          
                          <div className="space-y-3">
                            <motion.h4 
                              className="text-2xl font-medium text-[#fc5d01]"
                              whileHover={{ scale: 1.05 }}
                            >
                              Có, tôi sẽ đến!
                            </motion.h4>
                            <p className="text-gray-600 leading-relaxed">
                              Tôi rất hạnh phúc được tham gia<br/>
                              <span className="text-[#fc5d01] font-medium">ngày trọng đại này</span>
                            </p>
                          </div>

                          {/* Sparkle Effects */}
                          <motion.div
                            className="flex justify-center space-x-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                          >
                            {[...Array(3)].map((_, i) => (
                              <motion.div
                                key={i}
                                animate={{ 
                                  scale: [1, 1.5, 1],
                                  rotate: [0, 180, 360]
                                }}
                                transition={{ 
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: i * 0.3
                                }}
                              >
                                <Sparkles className="w-4 h-4 text-[#fc5d01] opacity-60" />
                              </motion.div>
                            ))}
                          </motion.div>
                        </div>
                      </motion.button>

                      {/* No Button - Enhanced */}
                      <motion.button
                        type="button"
                        onClick={async () => {
                          setFormData({ ...formData, attending: false });
                          
                          setIsSubmitting(true);
                          try {
                            await addDoc(collection(db, 'rsvp'), {
                              ...formData,
                              attending: false,
                              guestTitle: guestInfo?.title,
                              guestRelationship: guestInfo?.relationship,
                              createdAt: new Date(),
                            });

                            toast.success('Cảm ơn bạn đã phản hồi! 💕');
                            
                            // Reset form
                            setFormData({
                              name: guestInfo?.name || '',
                              phone: '',
                              guestCount: 1,
                              event: 'both',
                              attending: true,
                              guestSlug: guestInfo?.slug,
                            });
                            setCurrentStep(0);
                          } catch (error) {
                            console.error('Error submitting RSVP:', error);
                            toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
                          } finally {
                            setIsSubmitting(false);
                          }
                        }}
                        whileHover={{ scale: 1.03, y: -5 }}
                        whileTap={{ scale: 0.97 }}
                        initial={{ opacity: 0, y: 50, rotate: 2 }}
                        animate={{ opacity: 1, y: 0, rotate: 0 }}
                        transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
                        className="group relative p-10 rounded-3xl border-3 border-gray-200 hover:border-gray-400 transition-all duration-500 bg-gradient-to-br from-white via-gray-50 to-gray-100/30 hover:shadow-2xl overflow-hidden"
                      >
                        {/* Animated Background */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-gray-100/50 to-gray-200/30 opacity-0 group-hover:opacity-100"
                          transition={{ duration: 0.5 }}
                        />

                        {/* Corner Decorations */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gray-300/20 to-transparent rounded-bl-full" />
                        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-gray-300/20 to-transparent rounded-tr-full" />
                        
                        <div className="relative z-10 space-y-6">
                          <motion.div
                            className="w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center mx-auto shadow-xl"
                            whileHover={{ rotate: -360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                          >
                            <X className="w-10 h-10 text-white" />
                          </motion.div>
                          
                          <div className="space-y-3">
                            <motion.h4 
                              className="text-2xl font-medium text-gray-600"
                              whileHover={{ scale: 1.05 }}
                            >
                              Xin lỗi, tôi bận!
                            </motion.h4>
                            <p className="text-gray-500 leading-relaxed">
                              Chúc mừng hai bạn!<br/>
                              <span className="text-gray-600 font-medium">Hạnh phúc bên nhau</span>
                            </p>
                          </div>

                          {/* Gentle Animation */}
                          <motion.div
                            className="flex justify-center"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            <span className="text-2xl">🤗</span>
                          </motion.div>
                        </div>
                      </motion.button>
                    </div>

                    {/* Bottom Decoration */}
                    <motion.div
                      className="flex justify-center items-center space-x-2 mt-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      <motion.div
                        className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#fc5d01] to-transparent"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 1.3 }}
                      />
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      >
                        <Heart className="w-5 h-5 text-[#fc5d01] fill-current" />
                      </motion.div>
                      <motion.div
                        className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#fc5d01] to-transparent"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 1.3 }}
                      />
                    </motion.div>
                  </motion.div>
                )}

                {/* Step 1: Event Selection */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-8"
                  >
                    <motion.h3 
                      className="text-2xl font-light text-gray-800 text-center mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Bạn sẽ tham gia sự kiện nào?
                    </motion.h3>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        { key: 'nha-trai', title: 'Nhà Trai', date: '14.07.2024', location: 'Đô Lương, Nghệ An', icon: MapPin, color: 'from-blue-500 to-blue-600' },
                        { key: 'nha-gai', title: 'Nhà Gái', date: '15.07.2024', location: 'Vinh, Nghệ An', icon: MapPin, color: 'from-pink-500 to-pink-600' },
                        { key: 'both', title: 'Cả Hai Ngày', date: '14 & 15.07.2024', location: 'Nghệ An', icon: Heart, color: 'from-[#fc5d01] to-[#fd7f33]' }
                      ].map((event, index) => (
                        <motion.button
                          key={event.key}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, event: event.key });
                            setCurrentStep(2);
                          }}
                          whileHover={{ scale: 1.02, y: -3 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group relative p-6 rounded-2xl border-2 border-[#fedac2] hover:border-[#fc5d01] transition-all duration-300 bg-white hover:shadow-lg overflow-hidden"
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-[#fc5d01]/5 to-[#fd7f33]/5 opacity-0 group-hover:opacity-100"
                            transition={{ duration: 0.3 }}
                          />
                          
                          <div className="relative z-10 text-center space-y-3">
                            <div className={`w-12 h-12 bg-gradient-to-br ${event.color} rounded-full flex items-center justify-center mx-auto shadow-md`}>
                              <event.icon className="w-6 h-6 text-white" />
                            </div>
                            
                            <h4 className="text-lg font-medium text-gray-800">{event.title}</h4>
                            <p className="text-[#fc5d01] font-medium text-sm">{event.date}</p>
                            <p className="text-gray-600 text-xs">{event.location}</p>
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    <div className="flex justify-center">
                      <motion.button
                        type="button"
                        onClick={() => setCurrentStep(0)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 text-gray-600 hover:text-[#fc5d01] transition-colors duration-300 text-sm"
                      >
                        ← Quay lại
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Guest Count */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-8"
                  >
                    <motion.h3 
                      className="text-2xl font-light text-gray-800 text-center mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Bạn đi bao nhiêu người?
                    </motion.h3>
                    
                    <div className="flex justify-center gap-4 flex-wrap">
                      {[1, 2, 3, 4, 5].map((count, index) => (
                        <motion.button
                          key={count}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, guestCount: count });
                            setCurrentStep(3);
                          }}
                          whileHover={{ scale: 1.1, y: -3 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            delay: index * 0.1,
                            type: "spring",
                            stiffness: 300
                          }}
                          className="group relative w-20 h-20 rounded-full border-2 border-[#fedac2] hover:border-[#fc5d01] transition-all duration-300 bg-white hover:shadow-lg overflow-hidden"
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-[#fc5d01]/10 to-[#fd7f33]/10 opacity-0 group-hover:opacity-100 rounded-full"
                            transition={{ duration: 0.3 }}
                          />
                          
                          <div className="relative z-10 flex flex-col items-center justify-center h-full">
                            <div className="text-2xl font-bold text-[#fc5d01] mb-1">
                              {count}
                            </div>
                            <div className="text-gray-600 text-xs">người</div>
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    <div className="flex justify-center">
                      <motion.button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 text-gray-600 hover:text-[#fc5d01] transition-colors duration-300 text-sm"
                      >
                        ← Quay lại
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Personal Information */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-8"
                  >
                    <motion.h3 
                      className="text-2xl font-light text-gray-800 text-center mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Thông tin liên hệ
                    </motion.h3>
                    
                    <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-3"
                      >
                        <label className="block text-lg font-light text-gray-800 flex items-center">
                          <User className="w-5 h-5 mr-2 text-[#fc5d01]" />
                          Họ tên đầy đủ
                        </label>
                        <div className="relative group">
                          <Input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder={guestInfo ? `${guestInfo.title} ${guestInfo.name}` : "Nhập họ tên của bạn"}
                            className="w-full pl-12 pr-4 py-4 text-base rounded-xl border-2 border-[#fedac2] focus:border-[#fc5d01] focus:ring-[#fc5d01] transition-all duration-300"
                            readOnly={!!guestInfo}
                            required
                          />
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#fc5d01]" />
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-3"
                      >
                        <label className="block text-lg font-light text-gray-800 flex items-center">
                          <Phone className="w-5 h-5 mr-2 text-[#fc5d01]" />
                          Số điện thoại
                        </label>
                        <div className="relative group">
                          <Input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="Nhập số điện thoại"
                            className="w-full pl-12 pr-4 py-4 text-base rounded-xl border-2 border-[#fedac2] focus:border-[#fc5d01] focus:ring-[#fc5d01] transition-all duration-300"
                            required
                          />
                          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#fc5d01]" />
                        </div>
                      </motion.div>
                    </div>

                    <div className="flex justify-center space-x-6">
                      <motion.button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 text-gray-600 hover:text-[#fc5d01] transition-colors duration-300 text-sm"
                      >
                        ← Quay lại
                      </motion.button>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting || !formData.name.trim() || !formData.phone.trim()}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="group bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] hover:from-[#e55401] hover:to-[#e55401] text-white font-light py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-base disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100"
                          transition={{ duration: 0.3 }}
                        />
                        
                        {isSubmitting ? (
                          <div className="flex items-center justify-center relative z-10">
                            <motion.div
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            Đang gửi...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center relative z-10">
                            <Heart className="w-5 h-5 mr-2 fill-current" />
                            Gửi xác nhận
                            <Send className="w-4 h-4 ml-2" />
                          </div>
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </motion.div>

        {/* Thank You Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-12"
        >
          <motion.p 
            className="text-lg text-gray-600 flex items-center justify-center"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Cảm ơn bạn đã dành thời gian cho chúng tôi
            <motion.span
              className="ml-3"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            >
              ❤️
            </motion.span>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
