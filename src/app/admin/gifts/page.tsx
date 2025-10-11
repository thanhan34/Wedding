'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, TrendingUp, Users, DollarSign, Calendar, Download, Search, Filter, RefreshCw, Heart } from 'lucide-react';
import { getAllGifts, getGiftStats, formatAmount, GiftInfo, GiftStats } from '../../../lib/giftData';
import { Card } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { toast } from 'sonner';

export default function GiftsAdminPage() {
  const [gifts, setGifts] = useState<GiftInfo[]>([]);
  const [stats, setStats] = useState<GiftStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState<'all' | 'bride' | 'groom'>('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [giftsData, statsData] = await Promise.all([
        getAllGifts(),
        getGiftStats()
      ]);
      setGifts(giftsData);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading gifts:', error);
      toast.error('Có lỗi khi tải dữ liệu quà tặng');
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = ['Tên khách', 'Số tiền', 'Người nhận', 'Lời chúc', 'Ngày gửi'];
    const rows = filteredGifts.map(gift => [
      gift.guestName,
      gift.amount.toString(),
      gift.recipient === 'bride' ? 'Cô dâu' : 'Chú rể',
      gift.message || '',
      new Date(gift.createdAt).toLocaleString('vi-VN')
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gifts-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredGifts = gifts.filter(gift => {
    const matchesSearch = gift.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (gift.message && gift.message.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterBy === 'all' || gift.recipient === filterBy;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fedac2]/10 to-[#fdbc94]/10 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#fc5d01] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-xl p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-full flex items-center justify-center">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-light text-[#fc5d01]">Quản lý quà cưới</h1>
                <p className="text-gray-600">Theo dõi và quản lý các khoản quà tặng</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={loadData}
                disabled={loading}
                variant="outline"
                size="sm"
                className="border-[#fc5d01] text-[#fc5d01] hover:bg-[#fc5d01] hover:text-white"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Làm mới
              </Button>
              <Button
                onClick={exportToCSV}
                variant="outline"
                size="sm"
                className="border-[#fc5d01] text-[#fc5d01] hover:bg-[#fc5d01] hover:text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Xuất CSV
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Statistics Cards */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {/* Total Amount */}
            <Card className="p-6 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] text-white">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-8 h-8 opacity-80" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  💰
                </motion.div>
              </div>
              <div className="text-3xl font-bold mb-2">{formatAmount(stats.totalAmount)}</div>
              <div className="text-white/80 text-sm">Tổng tiền quà tặng</div>
            </Card>

            {/* Total Count */}
            <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-700 text-white">
              <div className="flex items-center justify-between mb-4">
                <Gift className="w-8 h-8 opacity-80" />
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🎁
                </motion.div>
              </div>
              <div className="text-3xl font-bold mb-2">{stats.totalCount}</div>
              <div className="text-white/80 text-sm">Tổng số quà tặng</div>
            </Card>

            {/* Bride */}
            <Card className="p-6 bg-gradient-to-br from-pink-500 to-pink-700 text-white">
              <div className="flex items-center justify-between mb-4">
                <Heart className="w-8 h-8 opacity-80" />
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  👰
                </motion.div>
              </div>
              <div className="text-3xl font-bold mb-2">{formatAmount(stats.brideAmount)}</div>
              <div className="text-white/80 text-sm">Cô dâu ({stats.brideCount} quà)</div>
            </Card>

            {/* Groom */}
            <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-700 text-white">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 opacity-80" />
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  🤵
                </motion.div>
              </div>
              <div className="text-3xl font-bold mb-2">{formatAmount(stats.groomAmount)}</div>
              <div className="text-white/80 text-sm">Chú rể ({stats.groomCount} quà)</div>
            </Card>
          </motion.div>
        )}

        {/* Additional Stats */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mb-8"
          >
            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-3">
                <TrendingUp className="w-6 h-6 text-[#fc5d01]" />
                <h3 className="text-lg font-medium text-gray-800">Số tiền trung bình</h3>
              </div>
              <div className="text-2xl font-bold text-[#fc5d01]">
                {formatAmount(stats.averageAmount)}
              </div>
              <p className="text-gray-600 text-sm mt-2">Trung bình mỗi món quà</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Calendar className="w-6 h-6 text-[#fc5d01]" />
                <h3 className="text-lg font-medium text-gray-800">Quà gần đây</h3>
              </div>
              <div className="text-2xl font-bold text-[#fc5d01]">
                {gifts.slice(0, 5).length}
              </div>
              <p className="text-gray-600 text-sm mt-2">5 món quà mới nhất</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Users className="w-6 h-6 text-[#fc5d01]" />
                <h3 className="text-lg font-medium text-gray-800">Tỷ lệ</h3>
              </div>
              <div className="text-2xl font-bold text-[#fc5d01]">
                {stats.totalCount > 0 
                  ? `${Math.round((stats.brideCount / stats.totalCount) * 100)}% - ${Math.round((stats.groomCount / stats.totalCount) * 100)}%`
                  : '0% - 0%'
                }
              </div>
              <p className="text-gray-600 text-sm mt-2">Cô dâu - Chú rể</p>
            </Card>
          </motion.div>
        )}

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Tìm kiếm theo tên khách hoặc lời chúc..."
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
                  onChange={(e) => setFilterBy(e.target.value as 'all' | 'bride' | 'groom')}
                  className="px-3 py-2 border border-[#fedac2] rounded-lg focus:border-[#fc5d01] focus:outline-none"
                >
                  <option value="all">Tất cả</option>
                  <option value="bride">Cô dâu</option>
                  <option value="groom">Chú rể</option>
                </select>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Gifts List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-light text-[#fc5d01]">
              Danh sách quà tặng ({filteredGifts.length})
            </h2>
          </div>

          <AnimatePresence mode="popLayout">
            {filteredGifts.length === 0 ? (
              <Card className="p-12 text-center">
                <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Chưa có quà tặng nào</p>
                <p className="text-gray-400 text-sm mt-2">
                  Quà tặng sẽ được hiển thị tại đây khi khách mời gửi
                </p>
              </Card>
            ) : (
              filteredGifts.map((gift, index) => (
                <motion.div
                  key={gift.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#fc5d01] to-[#fd7f33] rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {gift.guestName.charAt(0)}
                          </div>
                          <div>
                            <h3 className="text-xl font-medium text-gray-800">{gift.guestName}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                gift.recipient === 'bride' 
                                  ? 'bg-pink-100 text-pink-800' 
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {gift.recipient === 'bride' ? '👰 Cô dâu' : '🤵 Chú rể'}
                              </span>
                              <span className="text-gray-500 text-sm">
                                {formatDate(gift.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="ml-15 space-y-2">
                          <div className="flex items-center space-x-2">
                            <DollarSign className="w-5 h-5 text-[#fc5d01]" />
                            <span className="text-2xl font-bold text-[#fc5d01]">
                              {formatAmount(gift.amount)}
                            </span>
                          </div>

                          {gift.message && (
                            <div className="bg-[#fedac2]/10 rounded-lg p-4 mt-3">
                              <p className="text-gray-700 leading-relaxed italic">
                                &ldquo;{gift.message}&rdquo;
                              </p>
                            </div>
                          )}

                          {gift.bankAccount && (
                            <p className="text-gray-500 text-sm mt-2">
                              TK: {gift.bankAccount}
                            </p>
                          )}
                        </div>
                      </div>

                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          delay: index * 0.2
                        }}
                        className="text-4xl"
                      >
                        🎁
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
