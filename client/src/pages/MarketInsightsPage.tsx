import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, BarChart2, Globe, RefreshCw, Clock, ChevronDown, Search } from 'lucide-react';

interface CryptoPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap: number;
  volume: number;
  sparkline: number[];
}

interface MarketOverview {
  totalMarketCap: number;
  totalVolume24h: number;
  btcDominance: number;
  marketCapChangePercentage: number;
}

interface MarketNews {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  imageUrl: string;
  publishedAt: string;
}

const MarketInsightsPage: React.FC = () => {
  const [cryptoPrices, setCryptoPrices] = useState<CryptoPrice[]>([]);
  const [marketOverview, setMarketOverview] = useState<MarketOverview | null>(null);
  const [marketNews, setMarketNews] = useState<MarketNews[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTimeframe] = useState<'24h' | '7d' | '30d' | '1y'>('24h');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<'rank' | 'name' | 'price' | 'change'>('rank');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  useEffect(() => {
    // Gọi API để lấy giá crypto
    fetch('http://localhost:5000/api/market/prices')
      .then(res => res.json())
      .then(data => {
        setCryptoPrices(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching crypto prices:', err);
        setLoading(false);
      });
    
    // Gọi API để lấy tổng quan thị trường
    fetch('http://localhost:5000/api/market/overview')
      .then(res => res.json())
      .then(data => {
        setMarketOverview(data);
      })
      .catch(err => {
        console.error('Error fetching market overview:', err);
      });
    
    // Gọi API để lấy tin tức thị trường
    fetch('http://localhost:5000/api/market/news')
      .then(res => res.json())
      .then(data => {
        setMarketNews(data);
      })
      .catch(err => {
        console.error('Error fetching market news:', err);
      });
  }, []);
  
  // Hàm lọc và sắp xếp danh sách tiền điện tử
  const filteredAndSortedCryptos = cryptoPrices
    .filter(crypto => 
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return sortDirection === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      } else if (sortBy === 'price') {
        return sortDirection === 'asc' 
          ? a.current_price - b.current_price 
          : b.current_price - a.current_price;
      } else if (sortBy === 'change') {
        return sortDirection === 'asc' 
          ? a.price_change_percentage_24h - b.price_change_percentage_24h 
          : b.price_change_percentage_24h - a.price_change_percentage_24h;
      } 
      // Mặc định sắp xếp theo thứ hạng
      return sortDirection === 'asc' ? 1 : -1;
    });

  const handleSort = (column: 'rank' | 'name' | 'price' | 'change') => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('desc');
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
        <h1 className="text-3xl font-bold mb-2">Market Insights</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Phân tích chuyên sâu và cập nhật mới nhất về thị trường crypto
        </p>
      </motion.div>
      
      {/* Tổng quan thị trường */}
      {marketOverview && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-gray-500 dark:text-gray-400">Tổng vốn hóa thị trường</h3>
              <Globe className="text-blue-500" size={18} />
            </div>
            <p className="text-2xl font-bold">${marketOverview.totalMarketCap.toLocaleString()}</p>
            <span className={`text-sm ${marketOverview.marketCapChangePercentage >= 0 ? 'text-green-500' : 'text-red-500'} flex items-center mt-1`}>
              {marketOverview.marketCapChangePercentage >= 0 ? 
                <TrendingUp size={14} className="mr-1" /> : 
                <TrendingDown size={14} className="mr-1" />
              }
              {marketOverview.marketCapChangePercentage.toFixed(2)}%
            </span>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-gray-500 dark:text-gray-400">Tổng khối lượng giao dịch 24h</h3>
              <BarChart2 className="text-purple-500" size={18} />
            </div>
            <p className="text-2xl font-bold">${marketOverview.totalVolume24h.toLocaleString()}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-gray-500 dark:text-gray-400">BTC Dominance</h3>
              <div className="h-4 w-4 rounded-full bg-orange-400"></div>
            </div>
            <p className="text-2xl font-bold">{marketOverview.btcDominance.toFixed(2)}%</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-gray-500 dark:text-gray-400">Cập nhật dữ liệu</h3>
              <RefreshCw className="text-green-500 cursor-pointer" size={18} onClick={() => window.location.reload()} />
            </div>
            <p className="text-base font-medium">{new Date().toLocaleString()}</p>
          </div>
        </motion.div>
      )}
      
      {/* Thanh tìm kiếm và bộ lọc */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-6"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="text-gray-400" size={18} />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm coin..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex space-x-2">
            <div className="relative">
              <button className="flex items-center space-x-1 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700">
                <span className="text-sm">Timeframe: {selectedTimeframe}</span>
                <ChevronDown size={16} />
              </button>
              {/* Dropdown menu ở đây */}
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Bảng giá tiền điện tử */}
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
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th 
                    className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-650"
                    onClick={() => handleSort('rank')}
                  >
                    #
                    {sortBy === 'rank' && (
                      <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th 
                    className="py-3 px-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-650"
                    onClick={() => handleSort('name')}
                  >
                    Tên
                    {sortBy === 'name' && (
                      <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th 
                    className="py-3 px-4 text-right text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-650"
                    onClick={() => handleSort('price')}
                  >
                    Giá
                    {sortBy === 'price' && (
                      <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th 
                    className="py-3 px-4 text-right text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-650"
                    onClick={() => handleSort('change')}
                  >
                    24h%
                    {sortBy === 'change' && (
                      <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th className="py-3 px-4 text-right text-sm font-medium text-gray-500 dark:text-gray-400">
                    Vốn hóa
                  </th>
                  <th className="py-3 px-4 text-right text-sm font-medium text-gray-500 dark:text-gray-400">
                    Khối lượng
                  </th>
                  <th className="py-3 px-4 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                    Biểu đồ
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredAndSortedCryptos.map((crypto, index) => (
                  <tr key={crypto.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer">
                    <td className="py-4 px-4 whitespace-nowrap">{index + 1}</td>
                    <td className="py-4 px-4 whitespace-nowrap flex items-center">
                      <img 
                        src={`https://cryptologos.cc/logos/${crypto.id}-${crypto.symbol.toLowerCase()}-logo.png`} 
                        alt={crypto.name}
                        className="w-6 h-6 mr-2"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/24' }}
                      />
                      <div>
                        <span className="font-medium">{crypto.name}</span>
                        <span className="text-gray-500 dark:text-gray-400 ml-2">{crypto.symbol.toUpperCase()}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right whitespace-nowrap font-medium">
                      ${crypto.current_price.toLocaleString()}
                    </td>
                                        <td className="py-4 px-4 text-right whitespace-nowrap">
                      <span className={`${crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'} flex items-center justify-end`}>
                        {crypto.price_change_percentage_24h >= 0 ? 
                          <TrendingUp size={14} className="mr-1" /> : 
                          <TrendingDown size={14} className="mr-1" />
                        }
                        {crypto.price_change_percentage_24h.toFixed(2)}%
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      ${crypto.market_cap.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      ${crypto.volume.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 flex justify-center">
                      {/* Vẽ sparkline mini-chart ở đây */}
                      <div className="w-20 h-10 bg-gray-100 dark:bg-gray-700 rounded">
                        {crypto.sparkline && (
                          <div className="h-full flex items-end">
                            {crypto.sparkline.map((value, i) => (
                              <div 
                                key={i}
                                className={`flex-1 ${value > 0 ? 'bg-green-400' : 'bg-red-400'}`}
                                style={{ 
                                  height: `${Math.abs(value) * 100}%`,
                                  minWidth: '2px'
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
      
      {/* Tin tức thị trường */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-xl font-bold mb-4">Tin tức thị trường</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketNews.slice(0, 6).map(news => (
            <div key={news.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col">
              <img 
                src={news.imageUrl || 'https://via.placeholder.com/400x200?text=Crypto+News'} 
                alt={news.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex-grow">
                <h3 className="font-bold text-lg mb-2">{news.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">{news.summary}</p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <Clock size={12} className="mr-1" />
                    {new Date(news.publishedAt).toLocaleDateString()}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{news.source}</span>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-750 p-3 border-t border-gray-200 dark:border-gray-700">
                <a 
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm flex items-center justify-center hover:text-blue-600"
                >
                  Đọc thêm
                </a>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MarketInsightsPage;