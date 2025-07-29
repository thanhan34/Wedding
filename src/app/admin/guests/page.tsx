'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Plus, Edit, Trash2, Copy, ExternalLink, Users, Search, Filter, Loader2 } from 'lucide-react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { toast } from 'sonner';
import { 
  getAllGuests, 
  addGuest, 
  updateGuest, 
  deleteGuest, 
  createSlug, 
  createPersonalizedUrl, 
  initializeDefaultGuests,
  GuestInfo 
} from '../../../lib/guestData';
import { 
  messageTemplates, 
  getAllCategories, 
  getTemplatesByCategory
} from '../../../lib/messageTemplates';

export default function GuestManagementPage() {
  const [guests, setGuests] = useState<GuestInfo[]>([]);
  const [filteredGuests, setFilteredGuests] = useState<GuestInfo[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState<'all' | 'both' | 'groom' | 'bride'>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingGuest, setEditingGuest] = useState<GuestInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [newGuest, setNewGuest] = useState<Partial<GuestInfo>>({
    name: '',
    title: 'Anh',
    personalMessage: '',
    relationship: '',
    invitedTo: 'both',
    specialNotes: ''
  });

  // Load guests from Firebase
  const loadGuests = async () => {
    try {
      setLoading(true);
      const guestList = await getAllGuests();
      setGuests(guestList);
      setFilteredGuests(guestList);
    } catch (error) {
      console.error('Error loading guests:', error);
      toast.error('Lỗi khi tải danh sách khách mời');
    } finally {
      setLoading(false);
    }
  };

  // Initialize data on component mount
  useEffect(() => {
    const initializeData = async () => {
      try {
        await initializeDefaultGuests();
        await loadGuests();
      } catch (error) {
        console.error('Error initializing data:', error);
        toast.error('Lỗi khi khởi tạo dữ liệu');
      }
    };

    initializeData();
  }, []);

  // Filter guests based on search term and filter
  useEffect(() => {
    let filtered = guests;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(guest => 
        guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.relationship.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by invitation type
    if (filterBy !== 'all') {
      filtered = filtered.filter(guest => guest.invitedTo === filterBy);
    }

    setFilteredGuests(filtered);
  }, [guests, searchTerm, filterBy]);

  const handleAddGuest = async () => {
    if (!newGuest.name || !newGuest.personalMessage) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    setSubmitting(true);
    try {
      const slug = createSlug(newGuest.name);
      const guestData: Omit<GuestInfo, 'id'> = {
        slug,
        name: newGuest.name,
        title: newGuest.title || 'Anh',
        personalMessage: newGuest.personalMessage,
        relationship: newGuest.relationship || '',
        invitedTo: newGuest.invitedTo || 'both',
        specialNotes: newGuest.specialNotes
      };

      await addGuest(guestData);
      await loadGuests(); // Reload data
      
      // Reset form
      setNewGuest({
        name: '',
        title: 'Anh',
        personalMessage: '',
        relationship: '',
        invitedTo: 'both',
        specialNotes: ''
      });
      setShowAddForm(false);
      toast.success('Đã thêm khách mời thành công!');
    } catch (error: unknown) {
      console.error('Error adding guest:', error);
      toast.error(error instanceof Error ? error.message : 'Lỗi khi thêm khách mời');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateGuest = async () => {
    if (!editingGuest || !editingGuest.id) return;

    setSubmitting(true);
    try {
      const updates: Partial<GuestInfo> = {
        name: newGuest.name,
        title: newGuest.title,
        personalMessage: newGuest.personalMessage,
        relationship: newGuest.relationship,
        invitedTo: newGuest.invitedTo,
        specialNotes: newGuest.specialNotes
      };

      // Update slug if name changed
      if (newGuest.name && newGuest.name !== editingGuest.name) {
        updates.slug = createSlug(newGuest.name);
      }

      await updateGuest(editingGuest.id, updates);
      await loadGuests(); // Reload data
      
      setEditingGuest(null);
      setNewGuest({
        name: '',
        title: 'Anh',
        personalMessage: '',
        relationship: '',
        invitedTo: 'both',
        specialNotes: ''
      });
      toast.success('Đã cập nhật khách mời thành công!');
    } catch (error: unknown) {
      console.error('Error updating guest:', error);
      toast.error(error instanceof Error ? error.message : 'Lỗi khi cập nhật khách mời');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteGuest = async (guest: GuestInfo) => {
    if (!guest.id) return;
    
    if (!confirm(`Bạn có chắc chắn muốn xóa khách mời "${guest.name}"?`)) {
      return;
    }

    try {
      await deleteGuest(guest.id);
      await loadGuests(); // Reload data
      toast.success('Đã xóa khách mời thành công!');
    } catch (error: unknown) {
      console.error('Error deleting guest:', error);
      toast.error(error instanceof Error ? error.message : 'Lỗi khi xóa khách mời');
    }
  };

  const handleEditGuest = (guest: GuestInfo) => {
    setEditingGuest(guest);
    setNewGuest({
      name: guest.name,
      title: guest.title,
      personalMessage: guest.personalMessage,
      relationship: guest.relationship,
      invitedTo: guest.invitedTo,
      specialNotes: guest.specialNotes
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Đã sao chép vào clipboard!');
  };

  const getPersonalizedUrl = (guest: GuestInfo) => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    return createPersonalizedUrl(guest, baseUrl);
  };

  const closeForm = () => {
    setShowAddForm(false);
    setEditingGuest(null);
    setNewGuest({
      name: '',
      title: 'Anh',
      personalMessage: '',
      relationship: '',
      invitedTo: 'both',
      specialNotes: ''
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fedac2]/10 to-[#fdbc94]/10 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#fc5d01] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fedac2]/10 to-[#fdbc94]/10 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-full flex items-center justify-center shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-light text-[#fc5d01] mb-2">Quản Lý Khách Mời</h1>
          <p className="text-gray-600">Tạo và quản lý lời mời cá nhân hóa cho từng khách mời</p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Tìm kiếm theo tên hoặc mối quan hệ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value as 'all' | 'both' | 'groom' | 'bride')}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fc5d01] focus:border-[#fc5d01]"
                >
                  <option value="all">Tất cả</option>
                  <option value="both">Cả hai ngày</option>
                  <option value="groom">Nhà trai</option>
                  <option value="bride">Nhà gái</option>
                </select>
              </div>
            </div>

            {/* Add Button */}
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-[#fc5d01] hover:bg-[#e55401] text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Thêm khách mời
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center p-4 bg-gradient-to-br from-[#fc5d01]/10 to-[#fd7f33]/10 rounded-lg">
              <div className="text-2xl font-bold text-[#fc5d01]">{guests.length}</div>
              <div className="text-sm text-gray-600">Tổng số</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{guests.filter(g => g.invitedTo === 'groom').length}</div>
              <div className="text-sm text-gray-600">Nhà trai</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-pink-500/10 to-pink-600/10 rounded-lg">
              <div className="text-2xl font-bold text-pink-600">{guests.filter(g => g.invitedTo === 'bride').length}</div>
              <div className="text-sm text-gray-600">Nhà gái</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{guests.filter(g => g.invitedTo === 'both').length}</div>
              <div className="text-sm text-gray-600">Cả hai ngày</div>
            </div>
          </div>
        </motion.div>

        {/* Add/Edit Form */}
        {(showAddForm || editingGuest) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-light text-[#fc5d01] mb-6">
                  {editingGuest ? 'Chỉnh sửa khách mời' : 'Thêm khách mời mới'}
                </h2>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Họ tên</label>
                      <Input
                        type="text"
                        value={newGuest.name}
                        onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                        placeholder="Nhập họ tên"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Xưng hô</label>
                      <select
                        value={newGuest.title}
                        onChange={(e) => setNewGuest({ ...newGuest, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fc5d01] focus:border-[#fc5d01]"
                      >
                        <option value="Anh">Anh</option>
                        <option value="Chị">Chị</option>
                        <option value="Bạn">Bạn</option>
                        <option value="Cô">Cô</option>
                        <option value="Chú">Chú</option>
                        <option value="Bác">Bác</option>
                        <option value="Em">Em</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mối quan hệ</label>
                      <Input
                        type="text"
                        value={newGuest.relationship}
                        onChange={(e) => setNewGuest({ ...newGuest, relationship: e.target.value })}
                        placeholder="VD: bạn thân, đồng nghiệp, họ hàng..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Được mời tham dự</label>
                      <select
                        value={newGuest.invitedTo}
                        onChange={(e) => setNewGuest({ ...newGuest, invitedTo: e.target.value as 'both' | 'groom' | 'bride' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fc5d01] focus:border-[#fc5d01]"
                      >
                        <option value="both">Cả hai ngày</option>
                        <option value="groom">Nhà trai</option>
                        <option value="bride">Nhà gái</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">Lời nhắn cá nhân</label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowTemplates(!showTemplates)}
                        className="text-[#fc5d01] border-[#fc5d01] hover:bg-[#fc5d01] hover:text-white"
                      >
                        {showTemplates ? 'Ẩn mẫu' : 'Chọn mẫu có sẵn'}
                      </Button>
                    </div>
                    
                    {showTemplates && (
                      <div className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Chọn danh mục:</label>
                          <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fc5d01] focus:border-[#fc5d01]"
                          >
                            <option value="">-- Chọn danh mục --</option>
                            {getAllCategories().map(category => (
                              <option key={category} value={category}>{category}</option>
                            ))}
                          </select>
                        </div>
                        
                        {selectedCategory && (
                          <div className="space-y-2 max-h-60 overflow-y-auto">
                            {getTemplatesByCategory(selectedCategory).map((template) => (
                              <div
                                key={template.id}
                                className="p-3 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 cursor-pointer transition-colors"
                                onClick={() => {
                                  setNewGuest({ 
                                    ...newGuest, 
                                    personalMessage: template.message,
                                    relationship: template.relationship 
                                  });
                                  setShowTemplates(false);
                                  toast.success('Đã áp dụng mẫu tin nhắn!');
                                }}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-medium text-gray-800 text-sm">{template.title}</h4>
                                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                    {template.relationship}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 line-clamp-3">
                                  {template.message.substring(0, 150)}...
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div className="mt-3 text-center">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const randomTemplate = messageTemplates[Math.floor(Math.random() * messageTemplates.length)];
                              setNewGuest({ 
                                ...newGuest, 
                                personalMessage: randomTemplate.message,
                                relationship: randomTemplate.relationship 
                              });
                              setShowTemplates(false);
                              toast.success('Đã áp dụng mẫu ngẫu nhiên!');
                            }}
                            className="text-purple-600 border-purple-600 hover:bg-purple-600 hover:text-white"
                          >
                            🎲 Chọn ngẫu nhiên
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    <Textarea
                      value={newGuest.personalMessage}
                      onChange={(e) => setNewGuest({ ...newGuest, personalMessage: e.target.value })}
                      placeholder="Nhập lời nhắn cá nhân cho khách mời hoặc chọn từ mẫu có sẵn..."
                      rows={4}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      💡 Mẹo: Sử dụng các mẫu có sẵn và chỉnh sửa theo ý muốn để tiết kiệm thời gian
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ghi chú đặc biệt (tùy chọn)</label>
                    <Textarea
                      value={newGuest.specialNotes}
                      onChange={(e) => setNewGuest({ ...newGuest, specialNotes: e.target.value })}
                      placeholder="Ghi chú đặc biệt nếu có..."
                      rows={2}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  <Button
                    variant="outline"
                    onClick={closeForm}
                    disabled={submitting}
                  >
                    Hủy
                  </Button>
                  <Button
                    onClick={editingGuest ? handleUpdateGuest : handleAddGuest}
                    className="bg-[#fc5d01] hover:bg-[#e55401] text-white"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {editingGuest ? 'Đang cập nhật...' : 'Đang thêm...'}
                      </>
                    ) : (
                      editingGuest ? 'Cập nhật' : 'Thêm khách mời'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Guest List */}
        <div className="grid gap-6">
          {filteredGuests.map((guest, index) => (
            <motion.div
              key={guest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Guest Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-medium text-gray-800">
                          {guest.title} {guest.name}
                        </h3>
                        <p className="text-gray-600">{guest.relationship}</p>
                        <div className="flex items-center mt-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            guest.invitedTo === 'both' 
                              ? 'bg-purple-100 text-purple-800'
                              : guest.invitedTo === 'groom'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-pink-100 text-pink-800'
                          }`}>
                            {guest.invitedTo === 'both' ? 'Cả hai ngày' : 
                             guest.invitedTo === 'groom' ? 'Nhà trai' : 'Nhà gái'}
                          </span>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditGuest(guest)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteGuest(guest)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-gray-700 italic">
                        &ldquo;{guest.personalMessage}&rdquo;
                      </p>
                    </div>

                    {guest.specialNotes && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                        <p className="text-sm text-yellow-800">
                          <strong>Ghi chú:</strong> {guest.specialNotes}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="lg:w-80">
                    <div className="bg-gradient-to-br from-[#fc5d01]/5 to-[#fd7f33]/5 rounded-lg p-4">
                      <h4 className="font-medium text-gray-800 mb-3">URL Cá nhân hóa</h4>
                      
                      <div className="bg-white border rounded-lg p-3 mb-3">
                        <p className="text-sm text-gray-600 break-all">
                          {getPersonalizedUrl(guest)}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(getPersonalizedUrl(guest))}
                          className="w-full"
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Sao chép URL
                        </Button>
                        
                        <Button
                          size="sm"
                          onClick={() => window.open(getPersonalizedUrl(guest), '_blank')}
                          className="w-full bg-[#fc5d01] hover:bg-[#e55401] text-white"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Xem trước
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredGuests.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl text-gray-500 mb-2">Không tìm thấy khách mời</h3>
            <p className="text-gray-400">
              {searchTerm || filterBy !== 'all' 
                ? 'Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc'
                : 'Hãy thêm khách mời đầu tiên của bạn'
              }
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
