import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Award, TrendingUp, BarChart2, ArrowUpRight, Users, UserPlus, UserMinus } from 'lucide-react';

interface Trader {
  id: string;
  name: string;
  avatar: string;
  roi: number;
  winRate: number;
  followers: number;
  isFollowing: boolean;
  trades30d: number;
}

interface CopyStats {
  totalFollowers: number;
  totalTraders: number;
  avgProfit: number;
  totalCopiedVolume: number;
}

interface Activity {
  id: string;
  trader: string;
  traderAvatar: string;
  action: string;
  pair: string;
  amount: number;
  profit?: number;
  timestamp: string;
}

const CopyTradingPage: React.FC = () => {
  const [topTraders, setTopTraders] = useState<Trader[]>([]);
  const [stats, setStats] = useState<CopyStats | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  useEffect(() => {
    // Gọi API để lấy top traders
    fetch('http://localhost:5000/api/copy-trading/top-traders')
      .then(res => res.json())
      .then(data => {
        setTopTraders(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching top traders:', err);
        setLoading(false);
      });
    
    // Gọi API để lấy thống kê
    fetch('http://localhost:5000/api/copy-trading/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
      })
      .catch(err => {
        console.error('Error fetching copy stats:', err);
      });
    
    // Gọi API để lấy hoạt động gần đây
    fetch('http://localhost:5000/api/copy-trading/activities')
      .then(res => res.json())
      .then(data => {
        setActivities(data);
      })
      .catch(err => {
        console.error('Error fetching activities:', err);
      });
  }, []);
  
  const handleFollowToggle = async (traderId: string) => {
    try {
      const trader = topTraders.find(t => t.id === traderId);
      if (!trader) return;
      
      const endpoint = trader.isFollowing ? 'unfollow' : 'follow';
      
      const res = await fetch(`http://localhost:5000/api/copy-trading/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ traderId })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setTopTraders(prevTraders => 
          prevTraders.map(t => 
            t.id === traderId ? { ...t, isFollowing: !t.isFollowing } : t
          )
        );
      }
    } catch (error) {
      console.error('Error toggling follow status:', error);
    }
  };
  
  const filteredTraders = topTraders.filter(trader => 
    trader.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-20 pb-32 px-4 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Copy Trading</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Sao chép các giao dịch từ những nhà giao dịch hàng đầu trên Bitget và kiếm lợi nhuận tự động.
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
              <Users className="text-blue-500 mr-2" size={20} />
              <h3 className="text-sm text-gray-500 dark:text-gray-400">Người theo dõi</h3>
            </div>
            <p className="text-2xl font-bold">{stats.totalFollowers.toLocaleString()}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <div className="flex items-center mb-2">
              <Award className="text-purple-500 mr-2" size={20} />
              <h3 className="text-sm text-gray-500 dark:text-gray-400">Nhà giao dịch</h3>
            </div>
            <p className="text-2xl font-bold">{stats.totalTraders.toLocaleString()}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <div className="flex items-center mb-2">
              <TrendingUp className="text-green-500 mr-2" size={20} />
              <h3 className="text-sm text-gray-500 dark:text-gray-400">Lợi nhuận trung bình</h3>
            </div>
            <p className="text-2xl font-bold text-green-500">+{stats.avgProfit}%</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <div className="flex items-center mb-2">
              <BarChart2 className="text-cyan-500 mr-2" size={20} />
              <h3 className="text-sm text-gray-500 dark:text-gray-400">Khối lượng sao chép</h3>
            </div>
            <p className="text-2xl font-bold">${stats.totalCopiedVolume.toLocaleString()}M</p>
          </div>
        </motion.div>
      )}
      
      {/* Nhà giao dịch hàng đầu */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-10"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Nhà giao dịch hàng đầu</h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm nhà giao dịch..."
              className="pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left">Trader</th>
                  <th className="py-3 px-4 text-center">ROI (30D)</th>
                  <th className="py-3 px-4 text-center">Tỷ lệ thắng</th>
                  <th className="py-3 px-4 text-center">Giao dịch (30D)</th>
                  <th className="py-3 px-4 text-center">Người theo dõi</th>
                  <th className="py-3 px-4 text-center">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredTraders.map((trader) => (
                  <tr key={trader.id} className="border-t border-gray-200 dark:border-gray-700">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <img src={trader.avatar} alt={trader.name} className="w-10 h-10 rounded-full mr-3" />
                        <div>
                          <p className="font-medium">{trader.name}</p>
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-gray-500 dark:text-gray-400">Chi tiết</span>
                            <ArrowRight size={12} className="ml-1" />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`flex items-center justify-center ${trader.roi >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {trader.roi >= 0 ? '+' : ''}{trader.roi}%
                        {trader.roi >= 0 && <ArrowUpRight size={14} className="ml-1" />}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">{trader.winRate}%</td>
                    <td className="py-4 px-4 text-center">{trader.trades30d}</td>
                    <td className="py-4 px-4 text-center">{trader.followers.toLocaleString()}</td>
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleFollowToggle(trader.id)}
                        className={`px-4 py-2 rounded-full flex items-center justify-center ${trader.isFollowing
                          ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200' 
                          : 'bg-blue-500 text-white'}`}
                      >
                        {trader.isFollowing ? (
                          <>
                            <UserMinus size={16} className="mr-1" />
                            Hủy theo dõi
                          </>
                        ) : (
                          <>
                            <UserPlus size={16} className="mr-1" />
                            Theo dõi
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
      
      {/* Hoạt động gần đây */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-xl font-bold mb-4">Hoạt động gần đây</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          {activities.map((activity) => (
            <div key={activity.id} className="p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
              <div className="flex items-start">
                <img src={activity.traderAvatar} alt={activity.trader} className="w-10 h-10 rounded-full mr-3" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p>
                      <span className="font-medium">{activity.trader}</span> 
                      <span className="text-gray-500 dark:text-gray-400"> {activity.action} </span>
                      <span className="font-medium">{activity.pair}</span>
                      <span className="text-gray-500 dark:text-gray-400"> với </span>
                      <span className="font-medium">${activity.amount}</span>
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(activity.timestamp).toLocaleTimeString()}</span>
                  </div>
                  {activity.profit !== undefined && (
                    <p className={`mt-1 text-sm ${activity.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {activity.profit >= 0 ? '+' : ''}{activity.profit}%
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CopyTradingPage;
