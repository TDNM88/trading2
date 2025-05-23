import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Star, Eye, Calendar, Share2, Download, Settings, 
  Play, ChevronDown, ArrowLeft 
} from 'lucide-react';
import TradingViewChart from '../components/TradingViewChart';

const IndicatorDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'settings' | 'documentation'>('overview');

  // Mock data - In a real app, fetch this based on the ID
  const indicator = {
    id,
    name: 'Trend Master Pro',
    description: 'Advanced trend identification system with multiple timeframe analysis and smart entry/exit signals.',
    longDescription: `
      The Trend Master Pro is a sophisticated trading indicator that combines multiple technical analysis methods to identify high-probability trading opportunities. It uses a proprietary algorithm to analyze market trends across different timeframes and generate accurate entry and exit signals.

      Key Features:
      - Multi-timeframe analysis
      - Smart trend detection
      - Dynamic support/resistance levels
      - Volume analysis integration
      - Custom alert system
    `,
    thumbnail: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80',
    category: 'Trend Following',
    likes: 2456,
    views: 15789,
    publishedDate: '2024-02-15',
    author: 'Trading Labs',
    version: '2.1.0',
    lastUpdated: '2024-03-01',
    price: 199,
    settings: [
      { name: 'Period', default: 14, type: 'number', range: [1, 50] },
      { name: 'Sensitivity', default: 3, type: 'number', range: [1, 10] },
      { name: 'Show Signals', default: true, type: 'boolean' },
      { name: 'Alert on Cross', default: true, type: 'boolean' }
    ]
  };

  return (
    <div className="pt-24 pb-12 min-h-screen bg-[#0B1118]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center text-gray-400 hover:text-white mb-6"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Library
          </button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{indicator.name}</h1>
              <p className="text-gray-400 mb-4">{indicator.description}</p>
              <div className="flex items-center space-x-4 text-sm">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-500">
                  {indicator.category}
                </span>
                <span className="flex items-center text-gray-400">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  {indicator.likes} likes
                </span>
                <span className="flex items-center text-gray-400">
                  <Eye className="h-4 w-4 text-blue-500 mr-1" />
                  {indicator.views} views
                </span>
                <span className="flex items-center text-gray-400">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(indicator.publishedDate).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors flex items-center">
                <Download className="h-5 w-5 mr-2" />
                Download
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart and Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Chart */}
            <div className="bg-gray-800/30 rounded-xl border border-gray-700 p-6">
              <div className="h-[500px]">
                <TradingViewChart />
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-gray-800/30 rounded-xl border border-gray-700 overflow-hidden">
              <div className="flex border-b border-gray-700">
                {(['overview', 'settings', 'documentation'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-4 text-sm font-medium capitalize transition-colors ${
                      activeTab === tab
                        ? 'bg-gray-700/50 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700/30'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="prose prose-invert max-w-none">
                    <p className="whitespace-pre-line">{indicator.longDescription}</p>
                  </div>
                )}
                
                {activeTab === 'settings' && (
                  <div className="space-y-4">
                    {indicator.settings.map((setting, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{setting.name}</h4>
                          <p className="text-sm text-gray-400">Default: {setting.default}</p>
                        </div>
                        {setting.type === 'number' ? (
                          <input
                            type="number"
                            defaultValue={setting.default}
                            min={setting.range[0]}
                            max={setting.range[1]}
                            className="px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 w-24"
                          />
                        ) : (
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              defaultChecked={setting.default}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                {activeTab === 'documentation' && (
                  <div className="prose prose-invert max-w-none">
                    <h3>Installation</h3>
                    <p>Detailed installation instructions and usage guidelines...</p>
                    
                    <h3>Parameters</h3>
                    <ul>
                      {indicator.settings.map((setting, index) => (
                        <li key={index}>
                          <strong>{setting.name}</strong>: Description of what this parameter does...
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author Info */}
            <div className="bg-gray-800/30 rounded-xl border border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-4">About the Author</h3>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                  <span className="text-xl font-bold">{indicator.author[0]}</span>
                </div>
                <div>
                  <h4 className="font-medium">{indicator.author}</h4>
                  <p className="text-sm text-gray-400">Verified Developer</p>
                </div>
              </div>
            </div>

            {/* Indicator Info */}
            <div className="bg-gray-800/30 rounded-xl border border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-4">Indicator Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-400">Version</label>
                  <p className="font-medium">{indicator.version}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Last Updated</label>
                  <p className="font-medium">
                    {new Date(indicator.lastUpdated).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Category</label>
                  <p className="font-medium">{indicator.category}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Price</label>
                  <p className="font-medium">${indicator.price}</p>
                </div>
              </div>
            </div>

            {/* Video Preview */}
            <div className="bg-gray-800/30 rounded-xl border border-gray-700 overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={indicator.thumbnail}
                  alt="Video preview"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <button className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <Play className="h-8 w-8" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-medium">Video Tutorial</h4>
                <p className="text-sm text-gray-400">Learn how to use {indicator.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndicatorDetail;