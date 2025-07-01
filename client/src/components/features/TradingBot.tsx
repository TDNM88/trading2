import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Grid, Repeat, TrendingUp, ArrowRight } from 'lucide-react';

const TradingBot = () => {
  return (
    <section className="py-20 bg-[#0B1118]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Bot Giao Dịch Tự Động</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Tự động hóa chiến lược giao dịch của bạn 24/7 với các bot thông minh, không cần phải luôn theo dõi thị trường.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Grid Trading Bot',
              icon: Grid,
              description: 'Tận dụng biến động giá trong phạm vi, tự động mua thấp và bán cao.',
              profit: 'Lợi nhuận trung bình: 15-30% hàng tháng',
              color: 'from-blue-600 to-cyan-400'
            },
            {
              name: 'Martingale Bot',
              icon: Repeat,
              description: 'Chiến lược giảm giá trung bình, tự động tối ưu hóa kích thước vị thế theo xu hướng thị trường.',
              profit: 'Lợi nhuận trung bình: 10-25% hàng tháng',
              color: 'from-purple-600 to-pink-400'
            },
            {
              name: 'CTA Trading Bot',
              icon: TrendingUp,
              description: 'Bot theo xu hướng tự động phát hiện và giao dịch theo các xu hướng mạnh trên thị trường.',
              profit: 'Lợi nhuận trung bình: 20-40% hàng tháng',
              color: 'from-green-500 to-emerald-300'
            }
          ].map((bot, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden hover:border-blue-500/30 transition-all"
            >
              <div className={`bg-gradient-to-r ${bot.color} p-6`}>
                <bot.icon className="h-10 w-10 text-white mb-2" />
                <h3 className="text-2xl font-bold text-white">{bot.name}</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-300 mb-4">{bot.description}</p>
                <p className="text-green-500 font-medium mb-6">{bot.profit}</p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium flex justify-center items-center"
                >
                  Tạo Bot
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-blue-500/20"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-6 md:mb-0">
              <Bot className="h-12 w-12 text-blue-500 mr-4" />
              <div>
                <h3 className="text-xl font-bold">Tạo Bot Giao Dịch Tùy Chỉnh</h3>
                <p className="text-gray-400">Tự xây dựng chiến lược giao dịch độc đáo của riêng bạn</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-medium flex items-center"
            >
              Tạo Bot Tùy Chỉnh
              <ArrowRight className="ml-2 h-4 w-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TradingBot;
