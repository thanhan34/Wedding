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
  events: Array<{
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    address: string;
    mapUrl: string;
    type: 'engagement' | 'wedding' | 'reception';
    description: string;
  }>;
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
    groomSide: '29.11.2025',
    brideSide: '28.11.2025'
  },
  venues: {
    groomSide: {
      name: 'Khách Sạn Anh Thanh Đô',
      address: 'Số 01 Đ. Lê Hồng Phong, P. Mỹ Bình, Thành phố Long Xuyên, An Giang',
      date: 'Saturday, 29 November, 2025',
      vietnameseDate: 'Thứ 7, ngày 29.11.2025 (10.10 Ất Tỵ)'
    },
    brideSide: {
      name: 'Nhà Hàng Thanh Tâm',
      address: '97 Phạm Văn Hùng, TT. Kế Sách, Kế Sách, Sóc Trăng',
      date: 'Friday, 28 November, 2025',
      vietnameseDate: 'Thứ 6, ngày 28.11.2025 (09.10 Ất Tỵ)'
    }
  },
  timeline: {
    groomSide: [
      { time: '11:00', event: 'Chụp ảnh cùng dâu rể' },
      { time: '11:30', event: 'Nghi lễ bắt đầu' },
      { time: '12:00', event: 'Khai tiệc' }
    ],
    brideSide: [
      { time: '16:00', event: 'Chụp ảnh cùng dâu rể' },
      { time: '16:30', event: 'Nghi lễ bắt đầu' },
      { time: '17:00', event: 'Khai tiệc' }
    ]
  },
  events: [
    {
      id: 'bao-hy',
      title: 'Tiệc Báo Hỷ',
      date: 'Chủ Nhật, 23/11/2025',
      time: '16:00 - 18:00',
      location: 'Victoria Resort Cần Thơ',
      address: 'Cái Khế, Ninh Kiều, Cần Thơ',
      mapUrl: 'https://maps.google.com/?q=Victoria+Resort+Can+Tho+Cai+Khe+Ninh+Kieu',
      type: 'engagement',
      description: 'Tiệc báo hỷ tại Victoria Resort Cần Thơ với không gian sang trọng bên bờ sông Hậu. Chương trình bắt đầu lúc 16:00 với nghi lễ báo hỷ và tiệc mừng.'
    },
    {
      id: 'wedding-groom',
      title: 'Lễ Cưới Nhà Trai',
      date: 'Thứ Sáu, 29/11/2025',
      time: '11:00 - 13:00',
      location: 'Khách Sạn Anh Thanh Đô',
      address: 'Số 01 Đ. Lê Hồng Phong, P. Mỹ Bình, Thành phố Long Xuyên, An Giang',
      mapUrl: 'https://maps.google.com/?q=Khach+San+Anh+Thanh+Do+Le+Hong+Phong+Long+Xuyen+An+Giang',
      type: 'wedding',
      description: 'Lễ cưới tại nhà trai với chương trình: 11:00 Chụp ảnh cùng dâu rể, 11:30 Nghi lễ bắt đầu, 12:00 Khai tiệc'
    },
    {
      id: 'wedding-bride',
      title: 'Lễ Cưới Nhà Gái',
      date: 'Thứ Năm, 28/11/2025',
      time: '16:00 - 18:00',
      location: 'Nhà Hàng Thanh Tâm',
      address: '97 Phạm Văn Hùng, TT. Kế Sách, Kế Sách, Sóc Trăng',
      mapUrl: 'https://maps.google.com/?q=Nha+Hang+Thanh+Tam+Pham+Van+Hung+Ke+Sach+Soc+Trang',
      type: 'wedding',
      description: 'Lễ cưới tại nhà gái với chương trình: 16:00 Chụp ảnh cùng dâu rể, 16:30 Nghi lễ bắt đầu, 17:00 Khai tiệc'
    }
  ],
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
  const [loading, setLoading] = useState(false); // Start with false to show default data immediately
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWeddingData = async () => {
      try {
        // Don't set loading to true, keep showing default data
        
        // Add timeout to prevent hanging
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Timeout')), 3000); // 3 second timeout
        });
        
        const dataPromise = (async () => {
          const docRef = doc(db, 'wedding', 'data');
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            return docSnap.data() as WeddingData;
          } else {
            return defaultWeddingData;
          }
        })();
        
        const result = await Promise.race([dataPromise, timeoutPromise]);
        setWeddingData(result as WeddingData);
        
      } catch (err) {
        console.error('Error loading wedding data:', err);
        setError('Sử dụng dữ liệu mặc định');
        // Keep using default data when there's an error or timeout
        setWeddingData(defaultWeddingData);
      }
      // Don't set loading to false since it's already false
    };

    loadWeddingData();
  }, []);

  return { weddingData, loading, error };
}
