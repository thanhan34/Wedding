'use client';

import { motion } from 'framer-motion';
import { Card } from './ui/card';

export default function DetailedEventCards() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#fedac2]/10 to-[#fdbc94]/10 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 relative z-10">
        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Nhà Trai Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <Card className="bg-gradient-to-br from-[#fedac2]/30 to-white border-2 border-[#fc5d01]/20 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              {/* Title */}
              <h3 className="text-xl font-extrabold text-center text-[#fc5d01] mb-3" style={{ fontFamily: 'serif' }}>
                Nhà Trai
              </h3>

              {/* Names */}
              <p className="text-center text-sm text-gray-800 mb-3">
                Thanh Ngân 💞 Thanh An
              </p>

              {/* Date - English */}
              <p className="text-center text-xs font-semibold text-gray-700 mb-0.5">
                Friday, 24 October, 2025
              </p>

              {/* Date - Vietnamese */}
              <p className="text-center text-[10px] text-gray-600 mb-4">
                Thứ 6, ngày 24.10.2025 (4.9 Ất Tỵ)
              </p>

              {/* Location Box */}
              <div className="bg-[#fedac2]/40 rounded-2xl p-3 mb-4">
                <p className="text-center text-xs font-bold text-gray-800 mb-1">
                  Tại: Nhà Hàng Thắng Lợi 1
                </p>
                <p className="text-center text-[10px] text-gray-700 leading-snug">
                  01 Lê Hồng Phong, Long Xuyên, An Giang
                </p>
              </div>

              {/* Invitation */}
              <div className="text-center">
                <h4 className="text-sm font-bold text-[#fc5d01] mb-2">
                  TRÂN TRỌNG KÍNH MỜI !
                </h4>
                <p className="text-[10px] text-gray-700 mb-2 leading-snug">
                  Đến dự buổi tiệc chung vui cùng gia đình chúng mình
                </p>
                <p className="text-xs font-bold text-gray-800">
                  Bạn + người thương (GĐ bạn)
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Nhà Gái Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group"
          >
            <Card className="bg-gradient-to-br from-[#fedac2]/30 to-white border-2 border-[#fc5d01]/20 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              {/* Title */}
              <h3 className="text-xl font-bold text-center text-[#fc5d01] mb-3" style={{ fontFamily: 'serif' }}>
                Nhà Gái
              </h3>

              {/* Names */}
              <p className="text-center text-sm text-gray-800 mb-3">
                Thanh An & Thanh Ngân
              </p>

              {/* Date - English */}
              <p className="text-center text-xs font-semibold text-gray-700 mb-0.5">
                Thursday, 23 October, 2025
              </p>

              {/* Date - Vietnamese */}
              <p className="text-center text-[10px] text-gray-600 mb-4">
                Thứ 5, ngày 23.10.2025 (3.9 Ất Tỵ)
              </p>

              {/* Location Box */}
              <div className="bg-[#fedac2]/40 rounded-2xl p-3 mb-4">
                <p className="text-center text-xs font-bold text-gray-800 mb-1">
                  Tại: Nhà Hàng Thanh Tâm
                </p>
                <p className="text-center text-[10px] text-gray-700 leading-snug">
                  90 Ấp An Phú, Kế Sách, Cần Thơ
                </p>
              </div>

              {/* Invitation */}
              <div className="text-center">
                <h4 className="text-sm font-bold text-[#fc5d01] mb-2">
                  TRÂN TRỌNG KÍNH MỜI !
                </h4>
                <p className="text-[10px] text-gray-700 mb-2 leading-snug">
                  Đến dự buổi tiệc chung vui cùng gia đình chúng mình
                </p>
                <p className="text-xs font-bold text-gray-800">
                  Bạn + người thương (GĐ bạn)
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Báo Hỷ Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative group"
          >
            <Card className="bg-gradient-to-br from-[#fedac2]/30 to-white border-2 border-[#fc5d01]/20 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              {/* Title */}
              <h3 className="text-xl font-bold text-center text-[#fc5d01] mb-3" style={{ fontFamily: 'serif' }}>
                Tiệc Báo Hỷ
              </h3>

              {/* Names */}
              <p className="text-center text-sm text-gray-800 mb-3">
                Thanh Ngân 💞 Thanh An
              </p>

              {/* Date - English */}
              <p className="text-center text-xs font-semibold text-gray-700 mb-0.5">
                Saturday, 15 November, 2025
              </p>

              {/* Date - Vietnamese */}
              <p className="text-center text-[10px] text-gray-600 mb-4">
                Thứ Bảy, ngày 15.11.2025 (26.9 Ất Tỵ)
              </p>

              {/* Location Box */}
              <div className="bg-[#fedac2]/40 rounded-2xl p-3 mb-4">
                <p className="text-center text-xs font-bold text-gray-800 mb-1">
                  Tại: Resort Cồn Khương
                </p>
                <p className="text-center text-[10px] text-gray-700 leading-snug">
                  99A, Võ Văn Tần, Cái Khế, Cần Thơ
                </p>
              </div>

              {/* Invitation */}
              <div className="text-center">
                <h4 className="text-sm font-bold text-[#fc5d01] mb-2">
                  TRÂN TRỌNG KÍNH MỜI !
                </h4>
                <p className="text-[10px] text-gray-700 mb-2 leading-snug">
                  Đến dự buổi tiệc báo hỷ chung vui cùng gia đình chúng mình
                </p>
                <p className="text-xs font-bold text-gray-800">
                  Bạn + người thương (GĐ bạn)
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
