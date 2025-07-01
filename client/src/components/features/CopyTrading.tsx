import React from 'react';
import { motion } from 'framer-motion';
import { Copy, TrendingUp, UserCheck, ArrowRight } from 'lucide-react';

const topTraders = [
  {
    name: 'BitMaster',
    profit: '+254.6%',
    followers: '5.2K',
    winRate: '86%',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=trader1&backgroundColor=b6e3f4'
  },
  {
    name: 'CryptoWhale',
    profit: '+187.3%',
    followers: '3.7K',
    winRate: '82%',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=trader2&backgroundColor=c0aede'
  },
  {
    name: 'TradingGuru',
    profit: '+163.8%',
    followers: '4.1K',
    winRate: '79%',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=trader3&backgroundColor=d1d4f9'
  }
];

const CopyTrading = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-[#0B1118]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Giao Dịch Sao Chép</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Theo dõi nhà giao dịch chuyên nghiệp và sao chép chiến lược của họ. Tăng thu nhập mà không cần kỹ năng phân tích.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {[{ 
            icon: Copy, 
            title: 'Sao chép dễ dàng',
            description: 'Một cú nhấp chuột để sao chép toàn bộ danh mục đầu tư của nhà giao dịch hàng đầu.'
          }, { 
            icon: TrendingUp, 
            title: 'Lợi nhuận tự động',
            description: 'Nhận lợi nhuận khi các nhà giao dịch bạn theo dõi thành công.'
          }, { 
            icon: UserCheck, 
            title: 'Nhà giao dịch được chọn lọc',
            description: 'Chỉ những nhà giao dịch có hiệu suất đã được chứng minh mới được liệt kê.'
          }].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800/30 rounded-lg p-6 border border-gray-700 hover:border-blue-500/50 transition-all"
            >
              <feature.icon className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 mb-4">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
          <h3 className="text-2xl font-bold mb-6 text-center">Nhà Giao Dịch Hàng Đầu</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topTraders.map((trader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-gray-900/70 p-4 rounded-lg border border-gray-800 hover:border-blue-500/30 transition-all flex items-center"
              >
                <img 
                  src={trader.avatar} 
                  alt={trader.name} 
                  className="w-12 h-12 rounded-full mr-4 bg-blue-900/30" 
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{trader.name}</h4>
                    <span className="text-green-500 font-semibold">{trader.profit}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>{trader.followers} người theo dõi</span>
                    <span>Tỷ lệ thắng: {trader.winRate}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium inline-flex items-center"
            >
              Khám Phá Tất Cả Nhà Giao Dịch
              <ArrowRight className="ml-2 h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CopyTrading;
