'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import { Send, MessageSquare, User, Clock, Heart, Sparkles, Users, MessageCircle } from 'lucide-react';

interface GuestMessage {
  id: string;
  name: string;
  message: string;
  relationship: string;
  createdAt: Date | { toDate: () => Date };
}

export default function Guestbook() {
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    relationship: 'friend',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const q = query(collection(db, 'guestbook'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData: GuestMessage[] = [];
      querySnapshot.forEach((doc) => {
        messagesData.push({
          id: doc.id,
          ...doc.data(),
        } as GuestMessage);
      });
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.message.trim()) {
      toast.error('Vui lòng nhập đầy đủ tên và lời chúc');
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'guestbook'), {
        ...formData,
        createdAt: new Date(),
      });

      toast.success('Cảm ơn lời chúc của bạn! 💕');
      
      // Reset form
      setFormData({
        name: '',
        message: '',
        relationship: 'friend',
      });
      setCurrentStep(0);
    } catch (error) {
      console.error('Error submitting message:', error);
      toast.error('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (timestamp: Date | { toDate: () => Date } | null | undefined) => {
    if (!timestamp) return '';
    const date = typeof timestamp === 'object' && 'toDate' in timestamp ? timestamp.toDate() : new Date(timestamp as Date);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const suggestedMessages = [
    "Chúc mừng hạnh phúc! Chúc hai bạn trăm năm hạnh phúc!",
    "Happy Wedding, chúc 2 vk ck trăm năm hạnh phúc, sớm sinh quý tử nhé.",
    "Trăm năm hạnh phúc nhé 2 vợ chồng 😍😍",
    "Chúc mừng hạnh phúc đôi bạn trẻ",
    "HAPPY WEDDING",
    "Chúc mừng hạnh phúc hai bạn. Chúc hai bạn bên nhau đầu bạc răng long, sớm có thiên thần nhỏ nhé!",
    "Một chương mới đã mở ra với hai bạn rồi. Tôi mong cuộc sống mới của cả hai sẽ tràn ngập hy vọng, hạnh phúc và niềm vui!",
    "Gửi lời chúc mừng chân thành nhất tới bạn của tôi. Chúc hai bạn một cuộc sống thật tuyệt vời, hòa thuận, gắn bó son sắt, thủy chung, hạnh phúc lâu dài."
  ];

  const steps = [
    { title: "Mối Quan Hệ", icon: Users },
    { title: "Lời Chúc", icon: MessageCircle },
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
            className="text-3xl md:text-4xl font-light text-[#fc5d01] mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Gửi Lời Chúc Cho Dâu Rể
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Vui lòng làm theo các bước dưới đây để gửi lời chúc 💕
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
            <span className="text-sm font-medium text-[#fc5d01]">Bước {currentStep + 1}/3:</span>
            <span className="text-sm text-gray-700">{steps[currentStep]?.title}</span>
          </div>
        </motion.div>

        {/* Compact Form Card */}
        <motion.div
          className="max-w-3xl mx-auto mb-16"
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
                    👥 <strong>Chọn mối quan hệ</strong> của bạn với cô dâu chú rể
                  </p>
                )}
                {currentStep === 1 && (
                  <p className="text-gray-700 text-base">
                    💌 <strong>Chọn lời chúc</strong> có sẵn hoặc viết lời chúc riêng
                  </p>
                )}
                {currentStep === 2 && (
                  <p className="text-gray-700 text-base">
                    ✍️ <strong>Điền tên</strong> để hoàn thành lời chúc
                  </p>
                )}
              </motion.div>
            </div>

            <form onSubmit={handleSubmit} className="p-8">
              <AnimatePresence mode="wait">
                {/* Step 0: Relationship Selection */}
                {currentStep === 0 && (
                  <motion.div
                    key="step0"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-8"
                  >
                    <motion.h3 
                      className="text-2xl font-light text-gray-800 text-center mb-8 font-dancing-script"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Bạn là ai của cô dâu chú rể?
                    </motion.h3>
                    
                    <div className="grid md:grid-cols-2 gap-6 ">
                      {[
                        { key: 'couple', title: 'Bạn Cô Dâu Chú Rể', icon: '👫', desc: 'Bạn của cả hai' },
                        { key: 'bride', title: 'Bạn Cô Dâu', icon: '👰', desc: 'Bạn của cô dâu' },
                        { key: 'groom', title: 'Bạn Chú Rể', icon: '🤵', desc: 'Bạn của chú rể' },
                        { key: 'family', title: 'Gia Đình', icon: '👨‍👩‍👧‍👦', desc: 'Thành viên gia đình' }
                      ].map((relationship, index) => (
                        <motion.button
                          key={relationship.key}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, relationship: relationship.key });
                            setCurrentStep(1);
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
                            <div className="text-4xl mb-3">{relationship.icon}</div>
                            <h4 className="text-lg font-medium text-gray-800 font-dancing-script">{relationship.title}</h4>                            
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 1: Message Selection */}
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
                      Chọn lời chúc của bạn
                    </motion.h3>
                    
                    {/* Suggested Messages */}
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {suggestedMessages.map((suggestion, index) => (
                        <motion.button
                          key={index}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, message: suggestion });
                            setCurrentStep(2);
                          }}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="w-full p-4 text-left rounded-xl border-2 border-[#fedac2] hover:border-[#fc5d01] transition-all duration-300 bg-white hover:shadow-md"
                        >
                          <div className="flex items-start">
                            <Heart className="w-4 h-4 mr-3 mt-1 text-[#fc5d01] flex-shrink-0" />
                            <span className="text-gray-700 leading-relaxed">{suggestion}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    {/* Custom Message Option */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="border-t border-[#fedac2]/30 pt-6"
                    >
                      <h4 className="text-lg font-light text-[#fc5d01] mb-4 text-center">Hoặc viết lời chúc riêng:</h4>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Viết lời chúc từ trái tim bạn..."
                        rows={4}
                        className="w-full border-2 border-[#fedac2] focus:border-[#fc5d01] focus:ring-2 focus:ring-[#fc5d01]/20 resize-none rounded-xl"
                      />
                      <div className="flex justify-center mt-4">
                        <motion.button
                          type="button"
                          onClick={() => {
                            if (formData.message.trim()) {
                              setCurrentStep(2);
                            }
                          }}
                          disabled={!formData.message.trim()}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-2 bg-[#fc5d01] text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Tiếp tục
                        </motion.button>
                      </div>
                    </motion.div>

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

                {/* Step 2: Name Input */}
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
                      Tên của bạn
                    </motion.h3>
                    
                    <div className="max-w-md mx-auto space-y-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-3"
                      >
                        <label className="block text-lg font-light text-gray-800 flex items-center justify-center">
                          <User className="w-5 h-5 mr-2 text-[#fc5d01]" />
                          Họ tên đầy đủ
                        </label>
                        <div className="relative group">
                          <Input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Nhập họ tên của bạn"
                            className="w-full pl-12 pr-4 py-4 text-base rounded-xl border-2 border-[#fedac2] focus:border-[#fc5d01] focus:ring-[#fc5d01] transition-all duration-300 text-center"
                            required
                          />
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#fc5d01]" />
                        </div>
                      </motion.div>
                    </div>

                    <div className="flex justify-center space-x-6">
                      <motion.button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 text-gray-600 hover:text-[#fc5d01] transition-colors duration-300 text-sm"
                      >
                        ← Quay lại
                      </motion.button>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting || !formData.name.trim() || !formData.message.trim()}
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
                            Gửi lời chúc
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

        {/* View All Messages Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-16"
        >
          <motion.a
            href="https://docs.google.com/spreadsheets/d/1-kA-FDLoM0Nx6h0aUGN7nAC6eX6_sXri_vp0J_BUrV4/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center bg-gradient-to-r from-[#fedac2] to-[#fdbc94] hover:from-[#fdbc94] hover:to-[#ffac7b] text-[#fc5d01] font-light text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-[#fc5d01]/20"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            <span>Xem tất cả lời chúc của mọi người</span>
            <Sparkles className="w-4 h-4 ml-2" />
          </motion.a>
        </motion.div>

        {/* Display recent messages */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl md:text-4xl font-light text-[#fc5d01] mb-4">
              Lời chúc gần đây
            </h3>
            <div className="w-20 h-1 bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] mx-auto rounded-full"></div>
          </motion.div>

          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className="w-20 h-20 mx-auto text-[#fedac2] mb-6" />
                </motion.div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                  <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Sparkles className="w-8 h-8 text-[#fc5d01] opacity-60" />
                  </motion.div>
                </div>
              </div>
              <p className="text-gray-500 font-light text-lg">Chưa có lời chúc nào. Hãy là người đầu tiên gửi lời chúc!</p>
            </motion.div>
          ) : (
            messages.slice(0, 5).map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative bg-gradient-to-br from-white via-[#fedac2]/5 to-[#fdbc94]/10 rounded-2xl shadow-xl p-8 border border-[#fedac2]/40 hover:shadow-2xl transition-all duration-300 backdrop-blur-sm overflow-hidden group">
                  {/* Decorative background */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#fedac2]/20 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
                  
                  <div className="relative flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-16 h-16 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-full flex items-center justify-center text-white font-light text-xl shadow-lg border-4 border-white"
                      >
                        {message.name.charAt(0).toUpperCase()}
                      </motion.div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xl font-light text-[#fc5d01] flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          {message.name}
                        </h4>
                        <div className="flex items-center text-sm text-gray-500 font-light bg-white/60 px-3 py-1 rounded-full">
                          <Clock className="w-4 h-4 mr-1" />
                          {formatDate(message.createdAt)}
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-[#fc5d01] to-[#fd7f33] rounded-full"></div>
                        <p className="text-gray-700 leading-relaxed font-light text-lg pl-6 italic">
                          &ldquo;{message.message}&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}

          {messages.length > 5 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <motion.a
                href="https://docs.google.com/spreadsheets/d/1-kA-FDLoM0Nx6h0aUGN7nAC6eX6_sXri_vp0J_BUrV4/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] hover:from-[#e55401] hover:to-[#e56b2a] text-white font-light py-4 px-10 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                <span>Xem thêm lời chúc</span>
                <Sparkles className="w-4 h-4 ml-2" />
              </motion.a>
            </motion.div>
          )}
        </div>

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
            Cảm ơn bạn đã dành thời gian cho chúng mình
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
