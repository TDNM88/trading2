import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Grid, Repeat, TrendingUp, Play, Pause, PlusCircle, Settings, ChevronRight, Clock, BarChart2, Percent } from 'lucide-react';

interface Bot {
  id: string;
  name: string;
  description: string;
  icon: string;
  profitRate: number;
  tradingVolume: number;
  totalProfit: number;
  trades: number;
  status: 'active' | 'inactive';
  createdAt: string;
  configuration: {
    strategy: string;
    pairs: string[];
    timeframe: string;
    riskLevel: 'low' | 'medium' | 'high';
    maxDrawdown: number;
    stopLoss: number;
    takeProfit: number;
  };
  performance: {
    daily: number;
    weekly: number;
    monthly: number;
    total: number;
    winRate: number;
  };
}

const TradingBotPage: React.FC = () => {
  const [bots, setBots] = useState<Bot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    fetch('http://localhost:5000/api/trading-bot/bots')
      .then(res => res.json())
      .then(data => {
        setBots(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching bots:', err);
        setLoading(false);
      });
  }, []);
  
  const handleToggleStatus = async (botId: string) => {
    try {
      const bot = bots.find(b => b.id === botId);
      if (!bot) return;
      
      const res = await fetch(`http://localhost:5000/api/trading-bot/toggle-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ botId })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setBots(prevBots => 
          prevBots.map(b => 
            b.id === botId ? { ...b, status: b.status === 'active' ? 'inactive' : 'active' } : b
          )
        );
      }
    } catch (error) {
      console.error('Error toggling bot status:', error);
    }
  };

  const BotIcon = ({ type }: { type: string }) => {
    switch (type) {
      case 'grid':
        return <Grid size={24} className="text-blue-500" />;
      case 'martingale':
        return <Repeat size={24} className="text-purple-500" />;
      case 'trend':
        return <TrendingUp size={24} className="text-green-500" />;
      default:
        return <Settings size={24} className="text-gray-500" />;
    }
  };

  return (
    <div className="pt-20 pb-32 px-4 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Trading Bot</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Tự động hóa giao dịch của bạn 24/7 với các chiến lược giao dịch thông minh.
        </p>
      </motion.div>
      
      {/* Thống kê tổng quan */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <div className="flex items-center mb-2">
            <TrendingUp className="text-green-500 mr-2" size={20} />
            <h3 className="text-sm text-gray-500 dark:text-gray-400">Tổng lợi nhuận</h3>
          </div>
          <p className="text-2xl font-bold">+$12,475.83</p>
          <p className="text-sm text-green-500 mt-1">+24.8% tổng ROI</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <div className="flex items-center mb-2">
            <BarChart2 className="text-blue-500 mr-2" size={20} />
            <h3 className="text-sm text-gray-500 dark:text-gray-400">Tổng giao dịch</h3>
          </div>
          <p className="text-2xl font-bold">1,247</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">78% giao dịch thắng</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <div className="flex items-center mb-2">
            <Percent className="text-purple-500 mr-2" size={20} />
            <h3 className="text-sm text-gray-500 dark:text-gray-400">Hiệu suất tuần</h3>
          </div>
          <p className="text-2xl font-bold text-green-500">+5.2%</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">+2.1% so với tuần trước</p>
        </div>
      </motion.div>
      
      {/* Danh sách bot */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-10"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Bot của bạn</h2>
          <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors">
            <PlusCircle size={18} className="mr-1" />
            Tạo Bot mới
          </button>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {bots.map(bot => (
              <div key={bot.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 mr-4">
                        <BotIcon type={bot.icon} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{bot.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{bot.description}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleToggleStatus(bot.id)}
                      className={`flex items-center ${bot.status === 'active' ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300' : 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'} px-3 py-1.5 rounded-full text-sm font-medium`}
                    >
                      {bot.status === 'active' ? (
                        <>
                          <Pause size={14} className="mr-1" />
                          Dừng
                        </>
                      ) : (
                        <>
                          <Play size={14} className="mr-1" />
                          Kích hoạt
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Lợi nhuận</p>
                      <p className={`text-lg font-semibold ${bot.totalProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {bot.totalProfit >= 0 ? '+' : ''}{bot.totalProfit}%
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Khối lượng</p>
                      <p className="text-lg font-semibold">${bot.tradingVolume.toLocaleString()}</p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Số giao dịch</p>
                      <p className="text-lg font-semibold">{bot.trades}</p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Tạo ngày</p>
                      <p className="text-lg font-semibold">{new Date(bot.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-3 flex justify-between items-center bg-gray-50 dark:bg-gray-750">
                  <div className="flex items-center">
                    <Clock size={16} className="text-gray-500 dark:text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Chiến lược: <span className="font-medium">{bot.configuration.strategy}</span>
                    </span>
                    <span className="mx-3 text-gray-300 dark:text-gray-600">|</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Cặp: <span className="font-medium">{bot.configuration.pairs.join(', ')}</span>
                    </span>
                  </div>
                  <button className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 flex items-center text-sm font-medium">
                    Chi tiết
                    <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
      
      {/* Chiến lược giao dịch phổ biến */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-xl font-bold mb-4">Chiến lược phổ biến</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
            <div className="p-6">
              <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900 inline-block mb-4">
                <Grid size={24} className="text-blue-500 dark:text-blue-300" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Grid Trading</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Tận dụng biến động giá trong phạm vi, tự động mua thấp và bán cao trong khoảng định sẵn.
              </p>
              <div className="flex items-center text-sm text-blue-500">
                <span className="font-medium">Khám phá</span>
                <ChevronRight size={16} className="ml-1" />
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-750 p-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">Lợi nhuận trung bình: <span className="text-green-500 font-medium">+15-30%</span> mỗi tháng</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
            <div className="p-6">
              <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900 inline-block mb-4">
                <Repeat size={24} className="text-purple-500 dark:text-purple-300" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Martingale</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Chiến lược giảm giá trung bình, tự động tối ưu hóa kích thước vị thế theo xu hướng thị trường.
              </p>
              <div className="flex items-center text-sm text-purple-500">
                <span className="font-medium">Khám phá</span>
                <ChevronRight size={16} className="ml-1" />
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-750 p-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">Lợi nhuận trung bình: <span className="text-green-500 font-medium">+10-25%</span> mỗi tháng</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
            <div className="p-6">
              <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900 inline-block mb-4">
                <TrendingUp size={24} className="text-green-500 dark:text-green-300" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Trend Following</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Bot tự động phát hiện và giao dịch theo các xu hướng mạnh trên thị trường với nhiều chỉ báo kỹ thuật.
              </p>
              <div className="flex items-center text-sm text-green-500">
                <span className="font-medium">Khám phá</span>
                <ChevronRight size={16} className="ml-1" />
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-750 p-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">Lợi nhuận trung bình: <span className="text-green-500 font-medium">+20-40%</span> mỗi tháng</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TradingBotPage;
