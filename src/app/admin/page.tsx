'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Eye, EyeOff, Lock, Users, MessageSquare, Calendar, Settings, Database, Plus, Edit, Trash2, Search, Filter, Download, RefreshCw } from 'lucide-react';
import { db } from '../../lib/firebase';
import { doc, getDoc, setDoc, collection, getDocs, deleteDoc, query, orderBy } from 'firebase/firestore';
import { getAllGuests, addGuest, updateGuest, deleteGuest, createSlug, GuestInfo } from '../../lib/guestData';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { toast } from 'sonner';

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

interface GuestMessage {
  id: string;
  name: string;
  message: string;
  relationship: string;
  createdAt: Date | { toDate: () => Date };
}

interface RSVPResponse {
  id: string;
  name: string;
  phone: string;
  guestCount: number;
  event: string;
  attending: boolean;
  guestSlug?: string;
  guestTitle?: string;
  guestRelationship?: string;
  createdAt: Date | { toDate: () => Date };
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('wedding');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Wedding Data
  const [weddingData, setWeddingData] = useState<WeddingData>({
    coupleNames: {
      groom: 'Thanh An',
      bride: 'Thanh Ngân'
    },
    weddingDates: {
      groomSide: '24.10.2025',
      brideSide: '23.10.2025'
    },
    venues: {
      groomSide: {
        name: 'Nhà Hàng Thắng Lợi 1',
        address: '01 Lê Hồng Phong, Long Xuyên, An Giang',
        date: 'Friday, 24 October, 2025',
        vietnameseDate: 'Thứ 6, ngày 24.10.2025 (4.9 Ất Tỵ)'
      },
      brideSide: {
        name: 'Nhà Hàng Restaurant',
        address: '90 Ấp An Phú, Kế Sách, Cần Thơ',
        date: 'Monday, 15 July, 2024',
        vietnameseDate: 'Thứ 2, ngày 23.10.2025 (15.06 Giáp Thìn)'
      }
    },
    timeline: {
      groomSide: [
        { time: '12:00', event: 'Chụp ảnh cùng Dâu & Rể' },
        { time: '10:00', event: 'Lễ Thành Hôn' },
        { time: '10:30', event: 'Khai tiệc' },
        
      ],
      brideSide: [
        { time: '09:30', event: 'Đón khách' },
        { time: '10:00', event: 'Lễ Thành Hôn' },
        { time: '10:30', event: 'Khai tiệc' },
        { time: '12:00', event: 'Chụp ảnh cùng Dâu & Rể' }
      ]
    },
    bankAccounts: [
      {
        id: 'groom',
        name: 'Thanh An',
        bank: 'Vietcombank',
        accountNumber: '1037798878',
        accountName: 'THANH AN'
      },
      {
        id: 'bride',
        name: 'Thanh Ngân',
        bank: 'Techcombank',
        accountNumber: '9399366669',
        accountName: 'THANH NGAN'
      }
    ],
    loveStory: {
      groom: {
        name: 'Thanh An',
        description: 'Thanh An, chàng trai nhẹ nhàng và tình cảm, luôn tin rằng tình yêu đẹp nhất không nằm ở những lời hứa, mà ở sự đồng hành mỗi ngày. Với anh, hạnh phúc là khi có thể cùng người mình thương chia sẻ ước mơ, vượt qua thử thách và cùng nhau trưởng thành.',
        quote: 'Mỗi ngày thức dậy bạn nghĩ đến 1 ai đó, trước khi đi ngủ bạn nghĩ đến 1 ai đó… Đó là 1 ngày trọn vẹn. Cảm ơn vì đã gặp được em "Thanh Ngân", anh mong sau này, dù có thế nào, chúng ta cũng mãi yêu thương nhau, mãi nắm tay nhau đi đến hết con đường còn lại em nhé !!'
      },
      bride: {
        name: 'Thanh Ngân',
        description: 'Thanh Ngân, cô gái xinh tươi vui vẻ.',
        quote: 'Cái gọi là duyên phận, chính là trong ngàn vạn người gặp được người cần gặp là anh, trong ngàn vạn năm, giữa mênh mông hoang hoải vô tận của thời gian, không sớm một bước cũng không muộn một bước. Mong rằng cuộc sống sau này sẽ đối xử tốt với em, để vui vẻ, hạnh phúc luôn cạnh em'
      }
    }
  });

  // Other Data
  const [guests, setGuests] = useState<GuestInfo[]>([]);
  const [guestMessages, setGuestMessages] = useState<GuestMessage[]>([]);
  const [rsvpResponses, setRSVPResponses] = useState<RSVPResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState<'all' | 'groom' | 'bride'>('all');

  // Guest Form
  const [showGuestForm, setShowGuestForm] = useState(false);
  const [editingGuest, setEditingGuest] = useState<GuestInfo | null>(null);
  const [guestForm, setGuestForm] = useState({
    name: '',
    title: 'Anh',
    personalMessage: '',
    relationship: 'bạn bè',
    invitedTo: 'groom' as 'groom' | 'bride',
    specialNotes: ''
  });

  const ADMIN_PASSWORD = 'wedding2024';

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadWeddingData(),
        loadGuests(),
        loadGuestMessages(),
        loadRSVPResponses()
      ]);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Có lỗi khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  const loadWeddingData = async () => {
    try {
      const docRef = doc(db, 'wedding', 'data');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setWeddingData(docSnap.data() as WeddingData);
      }
    } catch (error) {
      console.error('Error loading wedding data:', error);
    }
  };

  const loadGuests = async () => {
    try {
      const guestsData = await getAllGuests();
      setGuests(guestsData);
    } catch (error) {
      console.error('Error loading guests:', error);
    }
  };

  const loadGuestMessages = async () => {
    try {
      const q = query(collection(db, 'guestbook'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const messages: GuestMessage[] = [];
      querySnapshot.forEach((doc) => {
        messages.push({
          id: doc.id,
          ...doc.data(),
        } as GuestMessage);
      });
      setGuestMessages(messages);
    } catch (error) {
      console.error('Error loading guest messages:', error);
    }
  };

  const loadRSVPResponses = async () => {
    try {
      const q = query(collection(db, 'rsvp'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const responses: RSVPResponse[] = [];
      querySnapshot.forEach((doc) => {
        responses.push({
          id: doc.id,
          ...doc.data(),
        } as RSVPResponse);
      });
      setRSVPResponses(responses);
    } catch (error) {
      console.error('Error loading RSVP responses:', error);
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

  const handleSaveWeddingData = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, 'wedding', 'data');
      await setDoc(docRef, weddingData);
      toast.success('Đã lưu dữ liệu cưới thành công!');
    } catch (error) {
      console.error('Error saving wedding data:', error);
      toast.error('Lỗi khi lưu dữ liệu cưới!');
    }
    setLoading(false);
  };

  const handleSaveGuest = async () => {
    if (!guestForm.name.trim()) {
      toast.error('Vui lòng nhập tên khách mời');
      return;
    }

    setLoading(true);
    try {
      const slug = createSlug(guestForm.name);
      const guestData = {
        ...guestForm,
        slug
      };

      if (editingGuest) {
        await updateGuest(editingGuest.id!, guestData);
        toast.success('Đã cập nhật khách mời thành công!');
      } else {
        await addGuest(guestData);
        toast.success('Đã thêm khách mời thành công!');
      }

      setShowGuestForm(false);
      setEditingGuest(null);
      setGuestForm({
        name: '',
        title: 'Anh',
        personalMessage: '',
        relationship: 'bạn bè',
        invitedTo: 'groom',
        specialNotes: ''
      });
      await loadGuests();
    } catch (error) {
      console.error('Error saving guest:', error);
      toast.error('Lỗi khi lưu khách mời!');
    }
    setLoading(false);
  };

  const handleDeleteGuest = async (guestId: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa khách mời này?')) return;

    setLoading(true);
    try {
      await deleteGuest(guestId);
      toast.success('Đã xóa khách mời thành công!');
      await loadGuests();
    } catch (error) {
      console.error('Error deleting guest:', error);
      toast.error('Lỗi khi xóa khách mời!');
    }
    setLoading(false);
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa lời chúc này?')) return;

    setLoading(true);
    try {
      await deleteDoc(doc(db, 'guestbook', messageId));
      toast.success('Đã xóa lời chúc thành công!');
      await loadGuestMessages();
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Lỗi khi xóa lời chúc!');
    }
    setLoading(false);
  };

  const handleDeleteRSVP = async (rsvpId: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa phản hồi RSVP này?')) return;

    setLoading(true);
    try {
      await deleteDoc(doc(db, 'rsvp', rsvpId));
      toast.success('Đã xóa phản hồi RSVP thành công!');
      await loadRSVPResponses();
    } catch (error) {
      console.error('Error deleting RSVP:', error);
      toast.error('Lỗi khi xóa phản hồi RSVP!');
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

  const filteredGuests = guests.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guest.relationship.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === 'all' || guest.invitedTo === filterBy;
    return matchesSearch && matchesFilter;
  });

  const exportData = () => {
    const data = {
      weddingData,
      guests,
      guestMessages,
      rsvpResponses
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wedding-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
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
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-xl p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-full flex items-center justify-center">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-light text-[#fc5d01]">Wedding Admin Panel</h1>
                <p className="text-gray-600">Quản lý toàn bộ dữ liệu đám cưới</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={loadAllData}
                disabled={loading}
                variant="outline"
                size="sm"
                className="border-[#fc5d01] text-[#fc5d01] hover:bg-[#fc5d01] hover:text-white"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Làm mới
              </Button>
              <Button
                onClick={exportData}
                variant="outline"
                size="sm"
                className="border-[#fc5d01] text-[#fc5d01] hover:bg-[#fc5d01] hover:text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Xuất dữ liệu
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-2 mb-8"
        >
          <div className="flex space-x-2 overflow-x-auto">
            {[
              { id: 'wedding', label: 'Dữ liệu cưới', icon: Calendar },
              { id: 'guests', label: 'Khách mời', icon: Users },
              { id: 'messages', label: 'Lời chúc', icon: MessageSquare },
              { id: 'rsvp', label: 'RSVP', icon: Calendar },
              { id: 'settings', label: 'Cài đặt', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#fc5d01] text-white shadow-md'
                    : 'text-gray-600 hover:bg-[#fedac2]/20 hover:text-[#fc5d01]'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {/* Wedding Data Tab */}
          {activeTab === 'wedding' && (
            <motion.div
              key="wedding"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-light text-[#fc5d01]">Dữ liệu cưới</h2>
                <Button
                  onClick={handleSaveWeddingData}
                  disabled={loading}
                  className="bg-[#fc5d01] hover:bg-[#e55401] text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                </Button>
              </div>

              {/* Tên cặp đôi */}
              <Card className="p-6">
                <h3 className="text-xl font-medium text-[#fc5d01] mb-4">Tên cặp đôi</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Chú rể</label>
                    <Input
                      value={weddingData.coupleNames.groom}
                      onChange={(e) => updateNestedData(['coupleNames', 'groom'], e.target.value)}
                      className="border-[#fedac2] focus:border-[#fc5d01] focus:ring-[#fc5d01]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cô dâu</label>
                    <Input
                      value={weddingData.coupleNames.bride}
                      onChange={(e) => updateNestedData(['coupleNames', 'bride'], e.target.value)}
                      className="border-[#fedac2] focus:border-[#fc5d01] focus:ring-[#fc5d01]"
                    />
                  </div>
                </div>
              </Card>

              {/* Ngày cưới */}
              <Card className="p-6">
                <h3 className="text-xl font-medium text-[#fc5d01] mb-4">Ngày cưới</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nhà trai</label>
                    <Input
                      value={weddingData.weddingDates.groomSide}
                      onChange={(e) => updateNestedData(['weddingDates', 'groomSide'], e.target.value)}
                      placeholder="dd.mm.yyyy"
                      className="border-[#fedac2] focus:border-[#fc5d01] focus:ring-[#fc5d01]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nhà gái</label>
                    <Input
                      value={weddingData.weddingDates.brideSide}
                      onChange={(e) => updateNestedData(['weddingDates', 'brideSide'], e.target.value)}
                      placeholder="dd.mm.yyyy"
                      className="border-[#fedac2] focus:border-[#fc5d01] focus:ring-[#fc5d01]"
                    />
                  </div>
                </div>
              </Card>

              {/* Địa điểm tổ chức */}
              <Card className="p-6">
                <h3 className="text-xl font-medium text-[#fc5d01] mb-4">Địa điểm tổ chức</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-3">Nhà trai</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tên địa điểm</label>
                        <Input
                          value={weddingData.venues.groomSide.name}
                          onChange={(e) => updateNestedData(['venues', 'groomSide', 'name'], e.target.value)}
                          className="border-[#fedac2] focus:border-[#fc5d01] focus:ring-[#fc5d01]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                        <Input
                          value={weddingData.venues.groomSide.address}
                          onChange={(e) => updateNestedData(['venues', 'groomSide', 'address'], e.target.value)}
                          className="border-[#fedac2] focus:border-[#fc5d01] focus:ring-[#fc5d01]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ngày (tiếng Anh)</label>
                        <Input
                          value={weddingData.venues.groomSide.date}
                          onChange={(e) => updateNestedData(['venues', 'groomSide', 'date'], e.target.value)}
                          placeholder="Monday, 15 July, 2024"
                          className="border-[#fedac2] focus:border-[#fc5d01] focus:ring-[#fc5d01]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ngày (tiếng Việt)</label>
                        <Input
                          value={weddingData.venues.groomSide.vietnameseDate}
                          onChange={(e) => updateNestedData(['venues', 'groomSide', 'vietnameseDate'], e.target.value)}
                          placeholder="Thứ 2, ngày 23.10.2025 (15.06 Giáp Thìn)"
                          className="border-[#fedac2] focus:border-[#fc5d01] focus:ring-[#fc5d01]"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-3">Nhà gái</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tên địa điểm</label>
                        <Input
                          value={weddingData.venues.brideSide.name}
                          onChange={(e) => updateNestedData(['venues', 'brideSide', 'name'], e.target.value)}
                          className="border-[#fedac2] focus:border-[#fc5d01] focus:ring-[#fc5d01]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                        <Input
                          value={weddingData.venues.brideSide.address}
                          onChange={(e) => updateNestedData(['venues', 'brideSide', 'address'], e.target.value)}
                          className="border-[#fedac2] focus:border-[#fc5d01] focus:ring-[#fc5d01]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ngày (tiếng Anh)</label>
                        <Input
                          value={weddingData.venues.brideSide.date}
                          onChange={(e) => updateNestedData(['venues', 'brideSide', 'date'], e.target.value)}
                          placeholder="Monday, 15 July, 2024"
                          className="border-[#fedac2] focus:border-[#fc5d01] focus:ring-[#fc5d01]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ngày (tiếng Việt)</label>
                        <Input
                          value={weddingData.venues.brideSide.vietnameseDate}
                          onChange={(e) => updateNestedData(['venues', 'brideSide', 'vietnameseDate'], e.target.value)}
                          placeholder="Thứ 2, ngày 23.10.2025 (15.06 Giáp Thìn)"
                          className="border-[#fedac2] focus:border-[#fc5d01] focus:ring-[#fc5d01]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Thông tin ngân hàng */}
              <Card className="p-6">
                <h3 className="text-xl font-medium text-[#fc5d01] mb-4">Thông tin ngân hàng</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {weddingData.bankAccounts.map((account, index) => (
                    <div key={account.id}>
                      <h4 className="text-lg font-medium text-gray-800 mb-3">{account.name}</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Tên ngân hàng</label>
                          <Input
                            value={account.bank}
                            onChange={(e) => {
                              const newAccounts = [...weddingData.bankAccounts];
                              newAccounts[index].bank = e.target.value;
                              updateNestedData(['bankAccounts'], newAccounts);
                            }}
                            className="border-[#fedac2] focus:border-[#fc5d01] focus:ring-[#fc5d01]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Số tài khoản</label>
                          <Input
                            value={account.accountNumber}
                            onChange={(e) => {
                              const newAccounts = [...weddingData.bankAccounts];
                              newAccounts[index].accountNumber = e.target.value;
                              updateNestedData(['bankAccounts'], newAccounts);
                            }}
                            className="border-[#fedac2] focus:border-[#fc5d01] focus:ring-[#fc5d01]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Tên chủ tài khoản</label>
                          <Input
                            value={account.accountName}
                            onChange={(e) => {
                              const newAccounts = [...weddingData.bankAccounts];
                              newAccounts[index].accountName = e.target.value;
                              updateNestedData(['bankAccounts'], newAccounts);
                            }}
                            className="border-[#fedac2] focus:border-[#fc5d01] focus:ring-[#fc5d01]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Timeline */}
              <Card className="p-6">
                <h3 className="text-xl font-medium text-[#fc5d01] mb-4">Timeline sự kiện</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {(['groomSide', 'brideSide'] as const).map((side) => (
                    <div key={side}>
                      <h4 className="text-lg font-medium text-gray-800 mb-3">
                        {side === 'groomSide' ? 'Nhà trai' : 'Nhà gái'}
                      </h4>
                      <div className="space-y-3">
                        {weddingData.timeline[side].map((event, index) => (
                          <div key={index} className="flex space-x-2">
                            <Input
                              placeholder="Giờ"
                              value={event.time}
                              onChange={(e) => {
                                const newTimeline = [...weddingData.timeline[side]];
                                newTimeline[index].time = e.target.value;
                                updateNestedData(['timeline', side], newTimeline);
                              }}
                              className="w-20 text-sm border-[#fedac2] focus:border-[#fc5d01]"
                            />
                            <Input
                              placeholder="Sự kiện"
                              value={event.event}
                              onChange={(e) => {
                                const newTimeline = [...weddingData.timeline[side]];
                                newTimeline[index].event = e.target.value;
                                updateNestedData(['timeline', side], newTimeline);
                              }}
                              className="flex-1 text-sm border-[#fedac2] focus:border-[#fc5d01]"
                            />
                            <Button
                              onClick={() => removeTimelineEvent(side, index)}
                              size="sm"
                              variant="destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          onClick={() => addTimelineEvent(side)}
                          variant="outline"
                          size="sm"
                          className="w-full border-dashed border-[#fc5d01] text-[#fc5d01] hover:bg-[#fc5d01] hover:text-white"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Thêm sự kiện
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Love Story */}
              <Card className="p-6">
                <h3 className="text-xl font-medium text-[#fc5d01] mb-4">Love Story</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-3">Chú rể</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                        <Input
                          value={weddingData.loveStory.groom.description}
                          onChange={(e) => updateNestedData(['loveStory', 'groom', 'description'], e.target.value)}
                          className="border-[#fedac2] focus:border-[#fc5d01]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lời nhắn</label>
                        <Textarea
                          value={weddingData.loveStory.groom.quote}
                          onChange={(e) => updateNestedData(['loveStory', 'groom', 'quote'], e.target.value)}
                          rows={4}
                          className="border-[#fedac2] focus:border-[#fc5d01]"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-3">Cô dâu</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                        <Input
                          value={weddingData.loveStory.bride.description}
                          onChange={(e) => updateNestedData(['loveStory', 'bride', 'description'], e.target.value)}
                          className="border-[#fedac2] focus:border-[#fc5d01]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lời nhắn</label>
                        <Textarea
                          value={weddingData.loveStory.bride.quote}
                          onChange={(e) => updateNestedData(['loveStory', 'bride', 'quote'], e.target.value)}
                          rows={4}
                          className="border-[#fedac2] focus:border-[#fc5d01]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Guests Tab */}
          {activeTab === 'guests' && (
            <motion.div
              key="guests"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-light text-[#fc5d01]">Quản lý khách mời</h2>
                <Button
                  onClick={() => {
                    setShowGuestForm(true);
                    setEditingGuest(null);
                    setGuestForm({
                      name: '',
                      title: 'Anh',
                      personalMessage: '',
                      relationship: 'bạn bè',
                      invitedTo: 'groom',
                      specialNotes: ''
                    });
                  }}
                  className="bg-[#fc5d01] hover:bg-[#e55401] text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm khách mời
                </Button>
              </div>

              {/* Search and Filter */}
              <Card className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Tìm kiếm theo tên hoặc mối quan hệ..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-[#fedac2] focus:border-[#fc5d01]"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <select
                      value={filterBy}
                      onChange={(e) => setFilterBy(e.target.value as 'all' | 'groom' | 'bride')}
                      className="px-3 py-2 border border-[#fedac2] rounded-lg focus:border-[#fc5d01] focus:outline-none"
                    >
                      <option value="all">Tất cả</option>
                      <option value="groom">Nhà trai</option>
                      <option value="bride">Nhà gái</option>
                    </select>
                  </div>
                </div>
              </Card>

              {/* Guests List */}
              <div className="grid gap-4">
                {filteredGuests.map((guest) => (
                  <Card key={guest.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-medium text-gray-800">
                            {guest.title} {guest.name}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            guest.invitedTo === 'groom' ? 'bg-blue-100 text-blue-800' :
                            'bg-pink-100 text-pink-800'
                          }`}>
                            {guest.invitedTo === 'groom' ? 'Nhà trai' : 'Nhà gái'}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{guest.relationship}</p>
                        <p className="text-gray-500 text-sm mt-2 line-clamp-2">{guest.personalMessage}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={() => {
                            setEditingGuest(guest);
                            setGuestForm({
                              name: guest.name,
                              title: guest.title,
                              personalMessage: guest.personalMessage,
                              relationship: guest.relationship,
                              invitedTo: guest.invitedTo,
                              specialNotes: guest.specialNotes || ''
                            });
                            setShowGuestForm(true);
                          }}
                          size="sm"
                          variant="outline"
                          className="border-[#fc5d01] text-[#fc5d01] hover:bg-[#fc5d01] hover:text-white"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleDeleteGuest(guest.id!)}
                          size="sm"
                          variant="destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Guest Form Modal */}
              {showGuestForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-medium text-[#fc5d01]">
                          {editingGuest ? 'Chỉnh sửa khách mời' : 'Thêm khách mời mới'}
                        </h3>
                        <Button
                          onClick={() => {
                            setShowGuestForm(false);
                            setEditingGuest(null);
                          }}
                          variant="ghost"
                          size="sm"
                        >
                          ×
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tên</label>
                            <Input
                              value={guestForm.name}
                              onChange={(e) => setGuestForm({ ...guestForm, name: e.target.value })}
                              className="border-[#fedac2] focus:border-[#fc5d01]"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Xưng hô</label>
                            <select
                              value={guestForm.title}
                              onChange={(e) => setGuestForm({ ...guestForm, title: e.target.value })}
                              className="w-full px-3 py-2 border border-[#fedac2] rounded-lg focus:border-[#fc5d01] focus:outline-none"
                            >
                              <option value="Anh">Anh</option>
                              <option value="Chị">Chị</option>
                              <option value="Bạn">Bạn</option>
                              <option value="Cô">Cô</option>
                              <option value="Chú">Chú</option>
                              <option value="Bác">Bác</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Mối quan hệ</label>
                            <Input
                              value={guestForm.relationship}
                              onChange={(e) => setGuestForm({ ...guestForm, relationship: e.target.value })}
                              className="border-[#fedac2] focus:border-[#fc5d01]"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Được mời tham dự</label>
                            <select
                              value={guestForm.invitedTo}
                              onChange={(e) => setGuestForm({ ...guestForm, invitedTo: e.target.value as 'groom' | 'bride' })}
                              className="w-full px-3 py-2 border border-[#fedac2] rounded-lg focus:border-[#fc5d01] focus:outline-none"
                            >
                              <option value="groom">Nhà trai</option>
                              <option value="bride">Nhà gái</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Lời nhắn cá nhân</label>
                          <Textarea
                            value={guestForm.personalMessage}
                            onChange={(e) => setGuestForm({ ...guestForm, personalMessage: e.target.value })}
                            rows={4}
                            className="border-[#fedac2] focus:border-[#fc5d01]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Ghi chú đặc biệt</label>
                          <Textarea
                            value={guestForm.specialNotes}
                            onChange={(e) => setGuestForm({ ...guestForm, specialNotes: e.target.value })}
                            rows={2}
                            className="border-[#fedac2] focus:border-[#fc5d01]"
                          />
                        </div>

                        <div className="flex justify-end space-x-4 pt-4">
                          <Button
                            onClick={() => {
                              setShowGuestForm(false);
                              setEditingGuest(null);
                            }}
                            variant="outline"
                          >
                            Hủy
                          </Button>
                          <Button
                            onClick={handleSaveGuest}
                            disabled={loading}
                            className="bg-[#fc5d01] hover:bg-[#e55401] text-white"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            {loading ? 'Đang lưu...' : 'Lưu'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </motion.div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <motion.div
              key="messages"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-light text-[#fc5d01]">Lời chúc từ khách mời</h2>
                <div className="text-sm text-gray-600">
                  Tổng cộng: {guestMessages.length} lời chúc
                </div>
              </div>

              <div className="grid gap-4">
                {guestMessages.map((message) => (
                  <Card key={message.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-medium text-gray-800">{message.name}</h3>
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                            {message.relationship}
                          </span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{message.message}</p>
                        <p className="text-gray-500 text-sm mt-2">{formatDate(message.createdAt)}</p>
                      </div>
                      <Button
                        onClick={() => handleDeleteMessage(message.id)}
                        size="sm"
                        variant="destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* RSVP Tab */}
          {activeTab === 'rsvp' && (
            <motion.div
              key="rsvp"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-light text-[#fc5d01]">Phản hồi RSVP</h2>
                <div className="text-sm text-gray-600">
                  Tổng cộng: {rsvpResponses.length} phản hồi
                </div>
              </div>

              {/* RSVP Statistics */}
              <Card className="p-6">
                <h3 className="text-xl font-medium text-gray-800 mb-4">Thống kê RSVP</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {rsvpResponses.filter(r => r.attending).length}
                    </div>
                    <div className="text-gray-600 text-sm">Sẽ tham gia</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">
                      {rsvpResponses.filter(r => !r.attending).length}
                    </div>
                    <div className="text-gray-600 text-sm">Không tham gia</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#fc5d01]">
                      {rsvpResponses
                        .filter(r => r.attending)
                        .reduce((total, r) => total + r.guestCount, 0)}
                    </div>
                    <div className="text-gray-600 text-sm">Tổng số người tham dự</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {rsvpResponses.length > 0 
                        ? Math.round((rsvpResponses.filter(r => r.attending).length / rsvpResponses.length) * 100)
                        : 0}%
                    </div>
                    <div className="text-gray-600 text-sm">Tỷ lệ tham gia</div>
                  </div>
                </div>
              </Card>

              {/* Event Breakdown */}
              <Card className="p-6">
                <h3 className="text-xl font-medium text-gray-800 mb-4">Thống kê theo sự kiện</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Nhà trai */}
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <h4 className="text-lg font-medium text-blue-800 mb-2">Nhà trai</h4>
                    <div className="space-y-2">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          {rsvpResponses
                            .filter(r => r.attending && (r.event === 'nha-trai' || r.event === 'both'))
                            .reduce((total, r) => total + r.guestCount, 0)}
                        </div>
                        <div className="text-blue-700 text-sm">Số người tham dự</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-blue-600">
                          {rsvpResponses.filter(r => r.attending && (r.event === 'nha-trai' || r.event === 'both')).length}
                        </div>
                        <div className="text-blue-700 text-xs">Số phản hồi</div>
                      </div>
                    </div>
                  </div>

                  {/* Nhà gái */}
                  <div className="text-center p-4 bg-pink-50 rounded-lg">
                    <h4 className="text-lg font-medium text-pink-800 mb-2">Nhà gái</h4>
                    <div className="space-y-2">
                      <div>
                        <div className="text-2xl font-bold text-pink-600">
                          {rsvpResponses
                            .filter(r => r.attending && (r.event === 'nha-gai' || r.event === 'both'))
                            .reduce((total, r) => total + r.guestCount, 0)}
                        </div>
                        <div className="text-pink-700 text-sm">Số người tham dự</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-pink-600">
                          {rsvpResponses.filter(r => r.attending && (r.event === 'nha-gai' || r.event === 'both')).length}
                        </div>
                        <div className="text-pink-700 text-xs">Số phản hồi</div>
                      </div>
                    </div>
                  </div>

                  {/* Cả hai */}
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <h4 className="text-lg font-medium text-purple-800 mb-2">Cả hai sự kiện</h4>
                    <div className="space-y-2">
                      <div>
                        <div className="text-2xl font-bold text-purple-600">
                          {rsvpResponses
                            .filter(r => r.attending && r.event === 'both')
                            .reduce((total, r) => total + r.guestCount, 0)}
                        </div>
                        <div className="text-purple-700 text-sm">Số người tham dự</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-purple-600">
                          {rsvpResponses.filter(r => r.attending && r.event === 'both').length}
                        </div>
                        <div className="text-purple-700 text-xs">Số phản hồi</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid gap-4">
                {rsvpResponses.map((rsvp) => (
                  <Card key={rsvp.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-medium text-gray-800">{rsvp.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            rsvp.attending ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {rsvp.attending ? 'Tham gia' : 'Không tham gia'}
                          </span>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Số điện thoại:</span> {rsvp.phone}
                          </div>
                          <div>
                            <span className="font-medium">Số người:</span> {rsvp.guestCount}
                          </div>
                          <div>
                            <span className="font-medium">Sự kiện:</span> {rsvp.event}
                          </div>
                        </div>
                        <p className="text-gray-500 text-sm mt-2">{formatDate(rsvp.createdAt)}</p>
                      </div>
                      <Button
                        onClick={() => handleDeleteRSVP(rsvp.id)}
                        size="sm"
                        variant="destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-light text-[#fc5d01]">Cài đặt hệ thống</h2>
              
              <Card className="p-6">
                <h3 className="text-xl font-medium text-gray-800 mb-4">Thống kê</h3>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#fc5d01]">{guests.length}</div>
                    <div className="text-gray-600">Khách mời</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#fc5d01]">{guestMessages.length}</div>
                    <div className="text-gray-600">Lời chúc</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#fc5d01]">{rsvpResponses.length}</div>
                    <div className="text-gray-600">RSVP</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#fc5d01]">
                      {rsvpResponses.filter(r => r.attending).length}
                    </div>
                    <div className="text-gray-600">Sẽ tham gia</div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-medium text-gray-800 mb-4">Xuất dữ liệu</h3>
                <p className="text-gray-600 mb-4">
                  Xuất toàn bộ dữ liệu đám cưới thành file JSON để sao lưu hoặc chuyển đổi.
                </p>
                <Button
                  onClick={exportData}
                  className="bg-[#fc5d01] hover:bg-[#e55401] text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Xuất dữ liệu
                </Button>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
