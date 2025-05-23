import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  LineChart, TrendingUp, Activity, Search, Filter, 
  Star, Eye, Calendar, ChevronDown 
} from 'lucide-react';

interface Indicator {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: string;
  likes: number;
  views: number;
  publishedDate: string;
  author: string;
}

const indicators: Indicator[] = [
  {
    id: 'trend-master-pro',
    name: 'Trend Master Pro',
    description: 'Advanced trend identification system with multiple timeframe analysis and smart entry/exit signals.',
    thumbnail: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80',
    category: 'Trend Following',
    likes: 2456,
    views: 15789,
    publishedDate: '2024-02-15',
    author: 'Trading Labs'
  },
  {
    id: 'momentum-scanner',
    name: 'Momentum Scanner',
    description: 'Real-time momentum detection with volume analysis and breakout alerts.',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80',
    category: 'Momentum',
    likes: 1893,
    views: 12450,
    publishedDate: '2024-02-10',
    author: 'Quant Solutions'
  },
  {
    id: 'volatility-predictor',
    name: 'Volatility Predictor',
    description: 'AI-powered volatility forecasting with market regime detection.',
    thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80',
    category: 'Volatility',
    likes: 3210,
    views: 18670,
    publishedDate: '2024-02-05',
    author: 'Alpha Research'
  },
  {
    id: 'smart-divergence',
    name: 'Smart Divergence',
    description: 'Automated divergence detection across multiple indicators with confirmation signals.',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80',
    category: 'Pattern Recognition',
    likes: 1567,
    views: 9870,
    publishedDate: '2024-02-01',
    author: 'Tech Traders'
  }
];

const categories = [
  'All',
  'Trend Following',
  'Momentum',
  'Volatility',
  'Pattern Recognition',
  'Volume Analysis',
  'Price Action'
];

const Library = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'recent' | 'name'>('popular');

  const filteredIndicators = indicators
    .filter(indicator => 
      (selectedCategory === 'All' || indicator.category === selectedCategory) &&
      (indicator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       indicator.description.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.likes - a.likes;
        case 'recent':
          return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  return (
    <div className="pt-24 pb-12 min-h-screen bg-[#0B1118]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Trading Indicator Library</h1>
          <p className="text-xl text-gray-400">
            Discover our collection of professional trading indicators
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search indicators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl flex items-center space-x-2 hover:bg-gray-700/50 transition-colors">
                <Filter className="h-5 w-5" />
                <span>Filters</span>
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'popular' | 'recent' | 'name')}
                className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="popular">Most Popular</option>
                <option value="recent">Most Recent</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Indicators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredIndicators.map((indicator, index) => (
            <motion.div
              key={indicator.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800/30 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all group"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={indicator.thumbnail}
                  alt={indicator.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-sm">
                  <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-500">
                    {indicator.category}
                  </span>
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      {indicator.likes}
                    </span>
                    <span className="flex items-center">
                      <Eye className="h-4 w-4 text-blue-500 mr-1" />
                      {indicator.views}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-500 transition-colors">
                  {indicator.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {indicator.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(indicator.publishedDate).toLocaleDateString()}
                  </div>
                  <Link
                    to={`/library/${indicator.id}`}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm transition-colors"
                  >
                    View More
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Library;