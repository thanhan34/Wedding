'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Eye, EyeOff, Lock } from 'lucide-react';
import { db } from '../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface WeddingData {
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

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [weddingData, setWeddingData] = useState<WeddingData>({
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
        accountName: 'THANH AN'
      },
      {
        id: 'bride',
        name: 'Thanh Ngân',
        bank: 'Techcombank',
        accountNumber: '0987654321',
        accountName: 'THANH NGAN'
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
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const ADMIN_PASSWORD = 'wedding2024'; // Thay đổi mật khẩu này

  useEffect(() => {
    loadWeddingData();
  }, []);

  const loadWeddingData = async () => {
    try {
      const docRef = doc(db, 'wedding', 'data');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setWeddingData(docSnap.data() as WeddingData);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setMessage('Đăng nhập thành công!');
    } else {
      setMessage('Mật khẩu không đúng!');
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, 'wedding', 'data');
      await setDoc(docRef, weddingData);
      setMessage('Đã lưu thành công!');
    } catch (error) {
      console.error('Error saving data:', error);
      setMessage('Lỗi khi lưu dữ liệu!');
    }
    setLoading(false);
  };

  const updateNestedData = (path: string[], value: unknown) => {
    setWeddingData(prev => {
      const newData = { ...prev };
      let current: Record<string, unknown> = newData as Record<string, unknown>;
      
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]] as Record<string, unknown>;
      }
      
      current[path[path.length - 1]] = value;
      return newData;
    });
  };

  const addTimelineEvent = (side: 'groomSide' | 'brideSide') => {
    setWeddingData(prev => ({
      ...prev,
      timeline: {
        ...prev.timeline,
        [side]: [...prev.timeline[side], { time: '', event: '' }]
      }
    }));
  };

  const removeTimelineEvent = (side: 'groomSide' | 'brideSide', index: number) => {
    setWeddingData(prev => ({
      ...prev,
      timeline: {
        ...prev.timeline,
        [side]: prev.timeline[side].filter((_, i) => i !== index)
      }
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fedac2]/10 to-[#fdbc94]/10 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-6">
            <Lock className="w-12 h-12 text-[#fc5d01] mx-auto mb-4" />
            <h1 className="text-2xl font-light text-[#fc5d01] mb-2">Admin Panel</h1>
            <p className="text-gray-600">Nhập mật khẩu để truy cập</p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mật khẩu"
                className="w-full px-4 py-3 border border-[#fedac2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc5d01] focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-[#fc5d01] hover:bg-[#e55401] text-white py-3 rounded-lg transition-colors duration-200"
            >
              Đăng nhập
            </button>

            {message && (
              <p className={`text-center text-sm ${message.includes('thành công') ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fedac2]/10 to-[#fdbc94]/10 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-xl p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-light text-[#fc5d01]">Wedding Admin Panel</h1>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center space-x-2 bg-[#fc5d01] hover:bg-[#e55401] text-white px-6 py-3 rounded-lg transition-colors duration-200 disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              <span>{loading ? 'Đang lưu...' : 'Lưu thay đổi'}</span>
            </button>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-lg ${message.includes('thành công') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {message}
            </div>
          )}

          <div className="grid gap-8">
            {/* Tên cặp đôi */}
            <div className="bg-[#fedac2]/10 rounded-lg p-6">
              <h2 className="text-xl font-medium text-[#fc5d01] mb-4">Tên cặp đôi</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chú rể</label>
                  <input
                    type="text"
                    value={weddingData.coupleNames.groom}
                    onChange={(e) => updateNestedData(['coupleNames', 'groom'], e.target.value)}
                    className="w-full px-4 py-2 border border-[#fedac2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc5d01]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cô dâu</label>
                  <input
                    type="text"
                    value={weddingData.coupleNames.bride}
                    onChange={(e) => updateNestedData(['coupleNames', 'bride'], e.target.value)}
                    className="w-full px-4 py-2 border border-[#fedac2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc5d01]"
                  />
                </div>
              </div>
            </div>

            {/* Địa điểm tổ chức */}
            <div className="bg-[#fedac2]/10 rounded-lg p-6">
              <h2 className="text-xl font-medium text-[#fc5d01] mb-4">Địa điểm tổ chức</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Nhà trai</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tên địa điểm</label>
                      <input
                        type="text"
                        value={weddingData.venues.groomSide.name}
                        onChange={(e) => updateNestedData(['venues', 'groomSide', 'name'], e.target.value)}
                        className="w-full px-3 py-2 border border-[#fedac2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc5d01]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                      <input
                        type="text"
                        value={weddingData.venues.groomSide.address}
                        onChange={(e) => updateNestedData(['venues', 'groomSide', 'address'], e.target.value)}
                        className="w-full px-3 py-2 border border-[#fedac2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc5d01]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ngày (tiếng Anh)</label>
                      <input
                        type="text"
                        value={weddingData.venues.groomSide.date}
                        onChange={(e) => updateNestedData(['venues', 'groomSide', 'date'], e.target.value)}
                        className="w-full px-3 py-2 border border-[#fedac2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc5d01]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ngày (tiếng Việt)</label>
                      <input
                        type="text"
                        value={weddingData.venues.groomSide.vietnameseDate}
                        onChange={(e) => updateNestedData(['venues', 'groomSide', 'vietnameseDate'], e.target.value)}
                        className="w-full px-3 py-2 border border-[#fedac2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc5d01]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Nhà gái</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tên địa điểm</label>
                      <input
                        type="text"
                        value={weddingData.venues.brideSide.name}
                        onChange={(e) => updateNestedData(['venues', 'brideSide', 'name'], e.target.value)}
                        className="w-full px-3 py-2 border border-[#fedac2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc5d01]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                      <input
                        type="text"
                        value={weddingData.venues.brideSide.address}
                        onChange={(e) => updateNestedData(['venues', 'brideSide', 'address'], e.target.value)}
                        className="w-full px-3 py-2 border border-[#fedac2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc5d01]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ngày (tiếng Anh)</label>
                      <input
                        type="text"
                        value={weddingData.venues.brideSide.date}
                        onChange={(e) => updateNestedData(['venues', 'brideSide', 'date'], e.target.value)}
                        className="w-full px-3 py-2 border border-[#fedac2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc5d01]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ngày (tiếng Việt)</label>
                      <input
                        type="text"
                        value={weddingData.venues.brideSide.vietnameseDate}
                        onChange={(e) => updateNestedData(['venues', 'brideSide', 'vietnameseDate'], e.target.value)}
                        className="w-full px-3 py-2 border border-[#fedac2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc5d01]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-[#fedac2]/10 rounded-lg p-6">
              <h2 className="text-xl font-medium text-[#fc5d01] mb-4">Timeline sự kiện</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {(['groomSide', 'brideSide'] as const).map((side) => (
                  <div key={side}>
                    <h3 className="text-lg font-medium text-gray-800 mb-3">
                      {side === 'groomSide' ? 'Nhà trai' : 'Nhà gái'}
                    </h3>
                    <div className="space-y-3">
                      {weddingData.timeline[side].map((event, index) => (
                        <div key={index} className="flex space-x-2">
                          <input
                            type="text"
                            placeholder="Giờ"
                            value={event.time}
                            onChange={(e) => {
                              const newTimeline = [...weddingData.timeline[side]];
                              newTimeline[index].time = e.target.value;
                              updateNestedData(['timeline', side], newTimeline);
                            }}
                            className="w-20 px-2 py-1 border border-[#fedac2] rounded focus:outline-none focus:ring-1 focus:ring-[#fc5d01] text-sm"
                          />
                          <input
                            type="text"
                            placeholder="Sự kiện"
                            value={event.event}
                            onChange={(e) => {
                              const newTimeline = [...weddingData.timeline[side]];
                              newTimeline[index].event = e.target.value;
                              updateNestedData(['timeline', side], newTimeline);
                            }}
                            className="flex-1 px-2 py-1 border border-[#fedac2] rounded focus:outline-none focus:ring-1 focus:ring-[#fc5d01] text-sm"
                          />
                          <button
                            onClick={() => removeTimelineEvent(side, index)}
                            className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                          >
                            Xóa
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addTimelineEvent(side)}
                        className="w-full px-3 py-2 border-2 border-dashed border-[#fc5d01] text-[#fc5d01] rounded-lg hover:bg-[#fc5d01] hover:text-white transition-colors duration-200"
                      >
                        + Thêm sự kiện
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Thông tin ngân hàng */}
            <div className="bg-[#fedac2]/10 rounded-lg p-6">
              <h2 className="text-xl font-medium text-[#fc5d01] mb-4">Thông tin ngân hàng</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {weddingData.bankAccounts.map((account, index) => (
                  <div key={account.id}>
                    <h3 className="text-lg font-medium text-gray-800 mb-3">{account.name}</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tên ngân hàng</label>
                        <input
                          type="text"
                          value={account.bank}
                          onChange={(e) => {
                            const newAccounts = [...weddingData.bankAccounts];
                            newAccounts[index].bank = e.target.value;
                            updateNestedData(['bankAccounts'], newAccounts);
                          }}
                          className="w-full px-3 py-2 border border-[#fedac2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc5d01]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Số tài khoản</label>
                        <input
                          type="text"
                          value={account.accountNumber}
                          onChange={(e) => {
                            const newAccounts = [...weddingData.bankAccounts];
                            newAccounts[index].accountNumber = e.target.value;
                            updateNestedData(['bankAccounts'], newAccounts);
                          }}
                          className="w-full px-3 py-2 border border-[#fedac2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc5d01]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tên chủ tài khoản</label>
                        <input
                          type="text"
                          value={account.accountName}
                          onChange={(e) => {
                            const newAccounts = [...weddingData.bankAccounts];
                            newAccounts[index].accountName = e.target.value;
                            updateNestedData(['bankAccounts'], newAccounts);
                          }}
                          className="w-full px-3 py-2 border border-[#fedac2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc5d01]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Love Story */}
            <div className="bg-[#fedac2]/10 rounded-lg p-6">
              <h2 className="text-xl font-medium text-[#fc5d01] mb-4">Love Story</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Chú rể</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                      <input
                        type="text"
                        value={weddingData.loveStory.groom.description}
                        onChange={(e) => updateNestedData(['loveStory', 'groom', 'description'], e.target.value)}
                        className="w-full px-3 py-2 border border-[#fedac2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc5d01]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Lời nhắn</label>
                      <textarea
                        value={weddingData.loveStory.groom.quote}
                        onChange={(e) => updateNestedData(['loveStory', 'groom', 'quote'], e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-[#fedac2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc5d01]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Cô dâu</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                      <input
                        type="text"
                        value={weddingData.loveStory.bride.description}
                        onChange={(e) => updateNestedData(['loveStory', 'bride', 'description'], e.target.value)}
                        className="w-full px-3 py-2 border border-[#fedac2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc5d01]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Lời nhắn</label>
                      <textarea
                        value={weddingData.loveStory.bride.quote}
                        onChange={(e) => updateNestedData(['loveStory', 'bride', 'quote'], e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-[#fedac2] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc5d01]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
