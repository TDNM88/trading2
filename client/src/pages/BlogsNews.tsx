import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Filter, Calendar, Clock, ArrowRight,
  BookOpen, Film, Monitor, Users, Book
} from 'lucide-react';

const categories = [
  { id: 'learning', name: 'Learning Blogs', icon: BookOpen },
  { id: 'movies', name: 'Trading Movies & Series', icon: Film },
  { id: 'gadgets', name: 'Trading Gadgets', icon: Monitor },
  { id: 'stories', name: "Traders' Stories", icon: Users },
  { id: 'books', name: 'Learning Books', icon: Book }
];

const BlogsNews = () => {
  const [activeTab, setActiveTab] = useState<'blogs' | 'news'>('blogs');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Blogs & Market News</h1>
          <p className="text-xl text-gray-400">Stay updated with the latest market insights</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-6 py-3 rounded-xl ${
              activeTab === 'blogs'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400'
            }`}
          >
            Blogs
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className={`px-6 py-3 rounded-xl ${
              activeTab === 'news'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400'
            }`}
          >
            News
          </button>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${activeTab}...`}
              className="w-full pl-12 pr-4 py-3 bg-gray-800/50 rounded-xl border border-gray-700 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <button className="px-6 py-3 bg-gray-800/50 rounded-xl border border-gray-700 flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>

        {activeTab === 'blogs' ? (
          <>
            {/* Blog Categories */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-xl border ${
                    selectedCategory === category.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-700 bg-gray-800/30'
                  } hover:border-blue-500 transition-colors group`}
                >
                  <category.icon className={`h-8 w-8 mb-2 ${
                    selectedCategory === category.id
                      ? 'text-blue-500'
                      : 'text-gray-400 group-hover:text-blue-500'
                  }`} />
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              ))}
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800/30 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all group"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/photo-${index % 2 === 0 ? '1642790106117-e829e14a795f' : '1590283603385-17ffb3a7f29f'}?auto=format&fit=crop&q=80`}
                      alt="Blog thumbnail"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-500 rounded-full text-sm">
                        {categories[index % categories.length].name}
                      </span>
                      <span className="flex items-center text-gray-400 text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        5 min read
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-500 transition-colors">
                      {index % 2 === 0 ? 'Essential Trading Psychology Tips' : 'Best Trading Setup Guide'}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Learn how to master your trading psychology and improve your trading performance.
                    </p>
                    <button className="flex items-center text-blue-500 hover:text-blue-400">
                      Read More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/30 rounded-xl p-6 border border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-500 rounded-full text-sm">
                    Market Update
                  </span>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date().toLocaleDateString()}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {index % 2 === 0 
                    ? 'Nifty hits new all-time high as IT stocks surge'
                    : 'RBI keeps repo rate unchanged at 6.5%'
                  }
                </h3>
                <p className="text-gray-400">
                  {index % 2 === 0
                    ? 'The Nifty 50 index reached a new milestone today, driven by strong performance in the technology sector.'
                    : 'The Reserve Bank of India maintained status quo on key policy rates for the sixth consecutive time.'
                  }
                </p>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsNews;