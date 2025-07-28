'use client';

import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Heart, Calendar, MapPin, Gem } from 'lucide-react';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const timelineEvents: TimelineEvent[] = [
  {
    date: "Tháng 1, 2020",
    title: "Lần đầu gặp gỡ",
    description: "Chúng tôi gặp nhau lần đầu tại một quán cà phê nhỏ. Ánh mắt anh khiến em không thể quên.",
    icon: <Heart className="w-6 h-6" />
  },
  {
    date: "Tháng 6, 2020",
    title: "Hẹn hò đầu tiên",
    description: "Buổi hẹn hò đầu tiên tại công viên, chúng tôi đã trò chuyện suốt cả ngày mà không biết mệt.",
    icon: <Calendar className="w-6 h-6" />
  },
  {
    date: "Tháng 12, 2022",
    title: "Chuyến du lịch đáng nhớ",
    description: "Chuyến du lịch Đà Lạt lãng mạn, nơi chúng tôi hiểu rằng mình là dành cho nhau.",
    icon: <MapPin className="w-6 h-6" />
  },
  {
    date: "Tháng 2, 2024",
    title: "Lời cầu hôn",
    description: "Anh đã quỳ gối cầu hôn em trong một buổi hoàng hôn tuyệt đẹp. Em đã nói 'Có' với đầy hạnh phúc.",
    icon: <Gem className="w-6 h-6" />
  }
];

export default function LoveStoryTimeline() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center mb-12 wedding-text-gradient"
      >
        Chuyện Tình Yêu Của Chúng Tôi
      </motion.h2>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#fc5d01] to-[#fedac2]"></div>

        {timelineEvents.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={`relative flex items-center mb-8 ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* Timeline dot */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-[#fc5d01] rounded-full border-4 border-white shadow-lg z-10"></div>

            {/* Content */}
            <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
              <Card className="wedding-card wedding-shadow p-6">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-gradient-to-r from-[#fc5d01] to-[#fd7f33] rounded-full text-white mr-3">
                    {event.icon}
                  </div>
                  <div>
                    <div className="text-sm text-[#fc5d01] font-semibold">
                      {event.date}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {event.title}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {event.description}
                </p>
              </Card>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
