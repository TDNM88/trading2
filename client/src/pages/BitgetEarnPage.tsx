import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Clock, Info, Wallet, ArrowRight, Lock, DollarSign } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  type: 'staking' | 'savings';
  asset: string;
  apy: number;
  duration: number;
  minAmount: number;
  maxAmount: number;
  totalStaked: number;
  description: string;
  isFlexible: boolean;
  isPopular: boolean;
}

interface StakingHistory {
  id: string;
  asset: string;
  amount: number;
  startDate: string;
  endDate: string;
  estimatedReturn: number;
  status: 'active' | 'completed' | 'pending';
}

interface EarnStats {
  totalEarned: number;
  totalStaked: number;
  activeProducts: number;
  avgApy: number;
}

const BitgetEarnPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [history, setHistory] = useState<StakingHistory[]>([]);
  const [stats, setStats] = useState<EarnStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<'staking' | 'savings'>('staking');
  
  useEffect(() => {
    // Gọi API để lấy danh sách sản phẩm
    fetch('http://localhost:5000/api/earn/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching earn products:', err);
        setLoading(false);
      });
    
    // Gọi API để lấy lịch sử staking
    fetch('http://localhost:5000/api/earn/history')
      .then(res => res.json())
      .then(data => {
        setHistory(data);
      })
      .catch(err => {
        console.error('Error fetching staking history:', err);
      });
    
    // Gọi API để lấy thống kê
    fetch('http://localhost:5000/api/earn/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
      })
      .catch(err => {
        console.error('Error fetching earn stats:', err);
      });
  }, []);
  
  const handleStake = async (productId: string) => {
    try {
      const product = products.find(p => p.id === productId);
      if (!product) return;
      
      // Đây chỉ là demo, trong thực tế sẽ mở modal để nhập số lượng
      const amount = product.minAmount;
      
      const res = await fetch('http://localhost:5000/api/earn/stake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, amount })
      });
      
      const data = await res.json();
      
      if (data.success) {
        // Trong môi trường thực, bạn có thể cập nhật lịch sử staking ở đây
        alert(`Đã stake thành công ${amount} ${product.asset}`);
      }
    } catch (error) {
      console.error('Error staking:', error);
    }
  };

  const filteredProducts = products.filter(product => product.type === selectedTab);

  return (
    <div className="pt-20 pb-32 px-4 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Bitget Earn</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Kiếm lãi suất trên tài sản crypto của bạn với các sản phẩm staking và tiết kiệm lãi suất cao.
        </p>
      </motion.div>
      
      {/* Thống kê tổng quan */}
      {stats && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <div className="flex items-center mb-2">
              <TrendingUp className="text-blue-500 mr-2" size={20} />
              <h3 className="text-sm text-gray-500 dark:text-gray-400">Tổng thu nhập</h3>
            </div>
            <p className="text-2xl font-bold text-green-500">+${stats.totalEarned.toFixed(2)}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <div className="flex items-center mb-2">
              <Wallet className="text-purple-500 mr-2" size={20} />
              <h3 className="text-sm text-gray-500 dark:text-gray-400">Tổng đã stake</h3>
            </div>
            <p className="text-2xl font-bold">${stats.totalStaked.toLocaleString()}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <div className="flex items-center mb-2">
              <Info className="text-green-500 mr-2" size={20} />
              <h3 className="text-sm text-gray-500 dark:text-gray-400">Sản phẩm đang hoạt động</h3>
            </div>
            <p className="text-2xl font-bold">{stats.activeProducts}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <div className="flex items-center mb-2">
              <TrendingUp className="text-yellow-500 mr-2" size={20} />
              <h3 className="text-sm text-gray-500 dark:text-gray-400">APY trung bình</h3>
            </div>
            <p className="text-2xl font-bold">{stats.avgApy}%</p>
          </div>
        </motion.div>
      )}
      
      {/* Tab chọn loại sản phẩm */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-6"
      >
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setSelectedTab('staking')}
            className={`pb-2 px-4 font-medium ${selectedTab === 'staking' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-400'}`}
          >
            Staking
          </button>
          <button
            onClick={() => setSelectedTab('savings')}
            className={`pb-2 px-4 font-medium ${selectedTab === 'savings' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 dark:text-gray-400'}`}
          >
            Tiết kiệm linh hoạt
          </button>
        </div>
      </motion.div>
      
      {/* Danh sách sản phẩm */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-10"
      >
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md ${product.isPopular ? 'ring-2 ring-blue-500' : ''}`}>
                {product.isPopular && (
                  <div className="bg-blue-500 text-white text-xs font-bold text-center py-1">
                    PHỔ BIẾN NHẤT
                  </div>
                )}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{product.asset}</p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xl font-bold py-1 px-3 rounded-lg">
                      {product.apy}% APY
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <Calendar className="text-gray-500 mr-2" size={16} />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {product.isFlexible ? 'Linh hoạt' : `${product.duration} ngày`}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <Lock className="text-gray-500 mr-2" size={16} />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {product.isFlexible ? 'Không khóa' : 'Có thời gian khóa'}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <DollarSign className="text-gray-500 mr-2" size={16} />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Tối thiểu: {product.minAmount} {product.asset}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    {product.description}
                  </p>
                  
                  <button
                    onClick={() => handleStake(product.id)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors font-medium"
                  >
                    Stake ngay
                  </button>
                </div>
                <div className="bg-gray-50 dark:bg-gray-750 p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Tổng đã stake: {product.totalStaked.toLocaleString()} {product.asset}
                    </span>
                    <div className="flex items-center text-sm text-blue-500 cursor-pointer hover:text-blue-600">
                      <span>Chi tiết</span>
                      <ArrowRight size={14} className="ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
      
      {/* Lịch sử staking */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-xl font-bold mb-4">Lịch sử staking của bạn</h2>
        {history.length > 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Tài sản</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Số lượng</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Ngày bắt đầu</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Ngày kết thúc</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Lợi nhuận ước tính</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {history.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                    <td className="py-4 px-4 font-medium">{item.asset}</td>
                    <td className="py-4 px-4">{item.amount} {item.asset}</td>
                    <td className="py-4 px-4">{new Date(item.startDate).toLocaleDateString()}</td>
                    <td className="py-4 px-4">{item.endDate ? new Date(item.endDate).toLocaleDateString() : 'Linh hoạt'}</td>
                    <td className="py-4 px-4 text-green-500">+{item.estimatedReturn} {item.asset}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                        ${item.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 
                          item.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' : 
                          'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'}`}>
                        {item.status === 'active' ? 'Đang hoạt động' : 
                         item.status === 'pending' ? 'Đang xử lý' : 'Đã hoàn thành'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500 dark:text-gray-400">Bạn chưa có giao dịch staking nào.</p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
              Khám phá các sản phẩm staking
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default BitgetEarnPage;
