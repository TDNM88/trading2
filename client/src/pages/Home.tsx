import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Home as HomeIcon, BarChart2, TrendingUp, LineChart, DollarSign, Wallet, PlayCircle, BookOpen, Activity, Zap, Trophy, Users } from 'lucide-react';
import CopyTrading from '../components/features/CopyTrading';
import TradingBot from '../components/features/TradingBot';
import BitgetEarn from '../components/features/BitgetEarn';
import MarketInsights from '../components/features/MarketInsights';
import CryptoPayment from '../components/features/CryptoPayment';
import TradingAcademy from '../components/features/TradingAcademy';
import TradingViewMiniChart from '../components/TradingViewMiniChart';
import HelpForm from '../components/HelpForm';

// Component trang chủ của ứng dụng
const HomePage = () => {
  return (
    <div className="relative min-h-screen pt-16">
      {/* Phần giới thiệu chính */}
      <section className="relative min-h-screen flex items-center bg-[#0B1118]">
        {/* Hình nền GIF */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-[#0B1118] z-10"></div>
          <div className="absolute inset-0 bg-[#0B1118]/60 z-[5]"></div>
          <img 
            src="https://media.giphy.com/media/JtBZm3Getg3dqxK0zP/giphy.gif" 
            alt="Ứng dụng demo gửi khách hàng"
            className="absolute inset-0 w-full h-full object-cover z-[1]"
          />
          {/* Hình nền dự phòng khi GIF đang tải */}
          <div 
            className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80')] bg-cover bg-center"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
              ỨNG DỤNG GIAO DỊCH 1Z
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Mua, bán và giao dịch Bitcoin, Ethereum cùng hơn 500 loại tiền điện tử với phân tích thời gian thực và công cụ chuyên nghiệp.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white text-lg font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center">
                  <PlayCircle className="w-6 h-6 mr-2" />
                  <span>Giao Dịch Ngay</span>
                  <motion.div
                    className="absolute right-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300"
                    initial={{ x: -10 }}
                    animate={{ x: 0 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-full sm:w-auto px-8 py-4 bg-gray-800/50 rounded-xl border-2 border-blue-500/30 text-lg font-semibold overflow-hidden transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10"
              >
                <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center text-blue-400 group-hover:text-blue-300">
                  <BookOpen className="w-6 h-6 mr-2" />
                  <span>Tải Ứng Dụng</span>
                  <motion.div
                    className="absolute right-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300"
                    initial={{ x: -10 }}
                    animate={{ x: 0 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Phần tính năng */}
      <section className="py-20 bg-[#0B1118]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: LineChart,
                title: "Phân Tích Thời Gian Thực",
                description: "Truy cập dữ liệu thị trường trực tiếp và các chỉ báo dự đoán"
              },
              {
                icon: TrendingUp,
                title: "Sao Chép Giao Dịch",
                description: "Theo dõi các nhà giao dịch hàng đầu và sao chép chiến lược của họ"
              },
              {
                icon: Activity,
                title: "Giao Dịch Hợp Đồng Tương Lai",
                description: "Giao dịch với đòn bẩy lên đến 125x cho BTC, ETH và hơn thế nữa"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900/30 p-6 rounded-lg border border-gray-800 hover:border-blue-500/50 transition-colors"
              >
                <feature.icon className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Phần Copy Trading */}
      <CopyTrading />

      {/* Phần Trading Bot */}
      <TradingBot />

      {/* Phần công cụ giao dịch */}
      <section className="py-20 bg-gradient-to-b from-[#0B1118] to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Công Cụ Giao Dịch Chuyên Nghiệp</h2>
            <p className="text-xl text-gray-400">Mọi thứ bạn cần để giao dịch thành công</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Giao Dịch Giao Ngay",
                description: "Giao dịch hơn 500 loại tiền điện tử với phí thấp"
              },
              {
                icon: Trophy,
                title: "Staking & Kiếm Lợi Nhuận",
                description: "Kiếm tới 20% APR với các sản phẩm tiết kiệm linh hoạt"
              },
              {
                icon: Users,
                title: "Thông Tin Cộng Đồng",
                description: "Truy cập phân tích thị trường độc quyền và tín hiệu giao dịch"
              }
            ].map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800/30 rounded-lg p-6 border border-gray-700 hover:border-blue-500/50 transition-all"
              >
                <tool.icon className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
                <p className="text-gray-400 mb-4">{tool.description}</p>
                <button className="text-blue-500 hover:text-blue-400 font-medium flex items-center">
                  TÌM HIỂU THÊM
                  <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Phần BitgetEarn - Staking & Savings */}
      <BitgetEarn />
      
      {/* Phần thống kê */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "50K+", label: "Nhà Giao Dịch" },
              { value: "95%", label: "Tỷ Lệ Thành Công" },
              { value: "24/7", label: "Hỗ Trợ" },
              { value: "100+", label: "Công Cụ Giao Dịch" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-500 mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Phần Market Insights - Thông tin thị trường */}
      <MarketInsights />
      
      {/* Phần tổng quan thị trường tiền điện tử */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tổng Quan Thị Trường Tiền Điện Tử</h2>
            <p className="text-xl text-gray-400">Theo dõi các loại tiền điện tử hàng đầu theo thời gian thực</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TradingViewMiniChart symbol="BITSTAMP:BTCUSD" width={300} height={200} />
            <TradingViewMiniChart symbol="BITSTAMP:ETHUSD" width={300} height={200} />
            <TradingViewMiniChart symbol="BINANCE:USDTUSD" width={300} height={200} />
            <TradingViewMiniChart symbol="BINANCE:BGBUSDT" width={300} height={200} />
          </div>
        </div>
      </section>

      {/* Phần thanh toán tiền điện tử */}
      <CryptoPayment />

      {/* Phần học viện giao dịch */}
      <TradingAcademy />

      {/* Phần biểu đồ giá */}
      <section className="py-20 bg-[#0B1118]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Giá Tiền Điện Tử Trực Tiếp</h2>
            <p className="text-xl text-gray-400">Theo dõi biến động giá theo thời gian thực</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TradingViewMiniChart symbol="BITSTAMP:BTCUSD" width={350} height={220} />
            <TradingViewMiniChart symbol="BITSTAMP:ETHUSD" width={350} height={220} />
            <TradingViewMiniChart symbol="BINANCE:USDTUSD" width={350} height={220} />
          </div>
        </div>
      </section>

      {/* Phần biểu mẫu hỗ trợ */}
      <HelpForm />

      {/* Thanh điều hướng cố định ở dưới cùng */}
      <nav className="fixed bottom-0 left-0 w-full bg-gray-900 text-gray-400 p-2 shadow-lg z-50">
        <div className="max-w-7xl mx-auto flex justify-around items-center">
          <a href="#" className="flex flex-col items-center text-center text-white">
            <HomeIcon className="h-6 w-6" />
            <span className="text-xs">Trang chủ</span>
          </a>
          <a href="#" className="flex flex-col items-center text-center">
            <BarChart2 className="h-6 w-6" />
            <span className="text-xs">Thị trường</span>
          </a>
          <a href="#" className="flex flex-col items-center text-center text-cyan-400 font-bold">
            <span className="text-lg">&gt;</span>
            <span className="text-xs">1Z</span>
          </a>
          <a href="#" className="flex flex-col items-center text-center">
            <TrendingUp className="h-6 w-6" />
            <span className="text-xs">Giao dịch</span>
          </a>
          <a href="#" className="flex flex-col items-center text-center">
            <LineChart className="h-6 w-6" />
            <span className="text-xs">Futures</span>
          </a>
          <a href="#" className="flex flex-col items-center text-center">
            <DollarSign className="h-6 w-6" />
            <span className="text-xs">Đầu tư</span>
          </a>
          <a href="#" className="flex flex-col items-center text-center">
            <Wallet className="h-6 w-6" />
            <span className="text-xs">Tài sản</span>
          </a>
        </div>
      </nav>
    </div>
  );
};
export default HomePage;