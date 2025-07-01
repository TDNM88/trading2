import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Newspaper, BarChart2, Eye, ArrowRight } from 'lucide-react';

interface NewsItem {
  title: string;
  summary: string;
  date: string;
  image: string;
  category: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
}

const newsItems: NewsItem[] = [
  {
    title: 'Bitcoin phá vỡ ngưỡng $60,000, đạt mức cao mới trong năm',
    summary: 'Giá Bitcoin vượt ngưỡng $60,000 sau khi các quỹ ETF Bitcoin spot được SEC chấp thuận, thu hút dòng tiền lớn vào thị trường.',
    date: '12/04/2025',
    image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-4.0.3',
    category: 'Phân tích thị trường',
    sentiment: 'bullish'
  },
  {
    title: 'Ethereum chuyển đổi sang PoS giúp giảm 99% lượng điện năng tiêu thụ',
    summary: 'Báo cáo mới cho thấy The Merge đã giúp Ethereum giảm 99.95% lượng điện tiêu thụ, làm thay đổi quan điểm về tác động môi trường của tiền điện tử.',
    date: '10/04/2025',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3',
    category: 'Công nghệ',
    sentiment: 'neutral'
  },
  {
    title: 'Stablecoin USDT mất giá ngắn hạn sau tin đồn về dự trữ',
    summary: 'USDT của Tether dao động dưới mức $1 sau khi xuất hiện tin đồn về dự trữ của công ty. Tether phản hồi bằng báo cáo kiểm toán mới.',
    date: '08/04/2025',
    image: 'https://images.unsplash.com/photo-1621504450181-5d356f61d307?ixlib=rb-4.0.3',
    category: 'Tin tức',
    sentiment: 'bearish'
  },
  {
    title: 'Phân tích kỹ thuật: XRP có thể tăng 30% trong tháng tới',
    summary: 'Các chuyên gia phân tích kỹ thuật nhận định XRP đang hình thành mô hình tam giác tăng giá và có thể tăng tới 30% trong tháng tới.',
    date: '05/04/2025',
    image: 'https://images.unsplash.com/photo-1629339942248-45d4b10d11a5?ixlib=rb-4.0.3',
    category: 'Phân tích kỹ thuật',
    sentiment: 'bullish'
  }
];

const MarketInsights = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-[#0B1118]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Thông Tin Thị Trường</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Cập nhật tin tức và phân tích thị trường mới nhất để đưa ra quyết định giao dịch thông minh
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: TrendingUp,
              title: 'Phân tích xu hướng',
              description: 'Phân tích chuyên sâu về xu hướng thị trường và dự báo từ các chuyên gia hàng đầu.'
            },
            {
              icon: Newspaper,
              title: 'Tin tức thời gian thực',
              description: 'Cập nhật tin tức tiền điện tử và blockchain mới nhất từ các nguồn đáng tin cậy.'
            },
            {
              icon: BarChart2,
              title: 'Phân tích on-chain',
              description: 'Phân tích dữ liệu on-chain để nắm bắt các chỉ báo quan trọng về hoạt động của mạng lưới.'
            }
          ].map((feature, index) => (
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

        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-6">Tin Tức & Phân Tích Mới Nhất</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newsItems.slice(0, 4).map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-gray-800/30 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500/30 transition-all flex flex-col h-full"
              >
                <div className="h-48 overflow-hidden relative">
                  <div className={`absolute top-2 right-2 z-10 px-2 py-1 rounded text-xs font-medium ${
                    item.sentiment === 'bullish' ? 'bg-green-500/80' : 
                    item.sentiment === 'bearish' ? 'bg-red-500/80' : 'bg-gray-500/80'
                  }`}>
                    {item.sentiment === 'bullish' ? 'Tăng giá' : 
                     item.sentiment === 'bearish' ? 'Giảm giá' : 'Trung lập'}
                  </div>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).onerror = null;
                      (e.target as HTMLImageElement).src = 'https://placehold.co/800x400?text=Crypto+News';
                    }}
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
                    <span>{item.category}</span>
                    <span>{item.date}</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-3 line-clamp-2">{item.title}</h4>
                  <p className="text-gray-400 mb-4 line-clamp-3">{item.summary}</p>
                  <div className="mt-auto pt-2">
                    <button className="text-blue-500 hover:text-blue-400 font-medium flex items-center text-sm">
                      Đọc tiếp <ArrowRight className="ml-1 h-4 w-4" />
                    </button>
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
              <Eye className="mr-2 h-5 w-5" />
              Xem Tất Cả Tin Tức
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketInsights;
