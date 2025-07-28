'use client';

import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export interface WeddingData {
  coupleNames: {
    groom: string;
    bride: string;
  };
  weddingDates: {
    groomSide: string;
    brideSide: string;
  };
  venues: {
    groomSide: {
      name: string;
      address: string;
      date: string;
      vietnameseDate: string;
    };
    brideSide: {
      name: string;
      address: string;
      date: string;
      vietnameseDate: string;
    };
  };
  timeline: {
    groomSide: Array<{
      time: string;
      event: string;
    }>;
    brideSide: Array<{
      time: string;
      event: string;
    }>;
  };
  bankAccounts: Array<{
    id: string;
    name: string;
    bank: string;
    accountNumber: string;
    accountName: string;
  }>;
  loveStory: {
    groom: {
      name: string;
      description: string;
      quote: string;
    };
    bride: {
      name: string;
      description: string;
      quote: string;
    };
  };
}

const defaultWeddingData: WeddingData = {
  coupleNames: {
    groom: 'Thanh An',
    bride: 'Thanh Ngân'
  },
  weddingDates: {
    groomSide: '14.07.2024',
    brideSide: '15.07.2024'
  },
  venues: {
    groomSide: {
      name: 'Khách Sạn Anh Thanh Đô',
      address: 'Khu Đô Thị Vườn Xanh - TT. Đô Lương - Nghệ An',
      date: 'Sunday, 14 July, 2024',
      vietnameseDate: 'Chủ Nhật, ngày 14.07.2024 (14.06 Giáp Thìn)'
    },
    brideSide: {
      name: 'Sảnh 5 - Tầng 2 - Diamond Palace',
      address: 'Khách Sạn Giao Tế - Số 9, Hồ Tùng Mậu, TP. Vinh, Nghệ An',
      date: 'Monday, 15 July, 2024',
      vietnameseDate: 'Thứ 2, ngày 15.07.2024 (15.06 Giáp Thìn)'
    }
  },
  timeline: {
    groomSide: [
      { time: '09:30', event: 'Đón khách' },
      { time: '10:00', event: 'Lễ Thành Hôn' },
      { time: '10:30', event: 'Khai tiệc' },
      { time: '12:00', event: 'Chụp ảnh cùng Cô Dâu & Chú Rể' }
    ],
    brideSide: [
      { time: '09:30', event: 'Đón khách' },
      { time: '10:00', event: 'Lễ Thành Hôn' },
      { time: '10:30', event: 'Khai tiệc' },
      { time: '12:00', event: 'Chụp ảnh cùng Cô Dâu & Chú Rể' }
    ]
  },
  bankAccounts: [
    {
      id: 'groom',
      name: 'Thanh An',
      bank: 'Vietcombank',
      accountNumber: '1234567890',
      accountName: 'Thanh An'
    },
    {
      id: 'bride',
      name: 'Thanh Ngân',
      bank: 'Techcombank',
      accountNumber: '0987654321',
      accountName: 'Thanh Ngân'
    }
  ],
  loveStory: {
    groom: {
      name: 'Thanh An',
      description: 'Thanh An, chàng trai nhẹ nhàng, tình cảm',
      quote: 'Mỗi ngày thức dậy bạn nghĩ đến 1 ai đó, trước khi đi ngủ bạn nghĩ đến 1 ai đó… Đó là 1 ngày trọn vẹn. Cảm ơn vì đã gặp được em "Thanh Ngân", anh mong sau này, dù có thế nào, chúng ta cũng mãi yêu thương nhau, mãi nắm tay nhau đi đến hết con đường còn lại em nhé !!'
    },
    bride: {
      name: 'Thanh Ngân',
      description: 'Thanh Ngân, cô gái xinh tươi vui vẻ.',
      quote: 'Cái gọi là duyên phận, chính là trong ngàn vạn người gặp được người cần gặp là anh, trong ngàn vạn năm, giữa mênh mông hoang hoải vô tận của thời gian, không sớm một bước cũng không muộn một bước. Mong rằng cuộc sống sau này sẽ đối xử tốt với em, để vui vẻ, hạnh phúc luôn cạnh em'
    }
  }
};

export function useWeddingData() {
  const [weddingData, setWeddingData] = useState<WeddingData>(defaultWeddingData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWeddingData = async () => {
      try {
        setLoading(true);
        const docRef = doc(db, 'wedding', 'data');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setWeddingData(docSnap.data() as WeddingData);
        } else {
          // Sử dụng dữ liệu mặc định nếu chưa có dữ liệu trong Firebase
          setWeddingData(defaultWeddingData);
        }
      } catch (err) {
        console.error('Error loading wedding data:', err);
        setError('Không thể tải dữ liệu');
        // Sử dụng dữ liệu mặc định khi có lỗi
        setWeddingData(defaultWeddingData);
      } finally {
        setLoading(false);
      }
    };

    loadWeddingData();
  }, []);

  return { weddingData, loading, error };
}
