import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, Brain, BarChart as ChartBar, LineChart, TrendingUp, Clock, Calendar, Filter, Settings, Play, Pause } from 'lucide-react';

const TradeAlgoPilot = () => {
  const [activeTab, setActiveTab] = useState<'ai' | 'algo'>('ai');
  const [question, setQuestion] = useState('');
  const [selectedAlgoType, setSelectedAlgoType] = useState('intraday');

  const algoTypes = {
    intraday: [
      { name: 'VWAP Strategy', status: 'active' },
      { name: 'Price Action Scalping', status: 'inactive' },
      { name: 'Moving Average Crossover', status: 'active' }
    ],
    swing: [
      { name: 'Trend Following', status: 'active' },
      { name: 'Mean Reversion', status: 'inactive' },
      { name: 'Breakout Strategy', status: 'active' }
    ],
    stbt: [
      { name: 'Options Premium Decay', status: 'active' },
      { name: 'Gap Trading', status: 'inactive' },
      { name: 'Volatility Trading', status: 'active' }
    ]
  };

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-6 py-3 rounded-xl flex items-center space-x-2 ${
              activeTab === 'ai'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400'
            }`}
          >
            <Bot className="h-5 w-5" />
            <span>AI Trading Assistant</span>
          </button>
          <button
            onClick={() => setActiveTab('algo')}
            className={`px-6 py-3 rounded-xl flex items-center space-x-2 ${
              activeTab === 'algo'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400'
            }`}
          >
            <Brain className="h-5 w-5" />
            <span>Algo Setup</span>
          </button>
        </div>

        {activeTab === 'ai' ? (
          <div className="space-y-8">
            {/* AI Chat Interface */}
            <div className="bg-gray-800/30 rounded-xl border border-gray-700 p-6">
              <div className="flex items-center space-x-4 mb-6">
                <Bot className="h-8 w-8 text-blue-500" />
                <div>
                  <h2 className="text-xl font-semibold">Trading AI Assistant</h2>
                  <p className="text-gray-400">Ask me anything about market analysis</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-4">
                  <Bot className="h-6 w-6 text-blue-500 mt-1" />
                  <div className="bg-gray-700/50 rounded-xl p-4 max-w-2xl">
                    <p>Hello! I can help you with market analysis, trading strategies, and more. What would you like to know?</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask about market analysis, trading strategies..."
                  className="flex-1 px-4 py-3 bg-gray-700/50 rounded-xl border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center space-x-2">
                  <Send className="h-5 w-5" />
                  <span>Ask AI</span>
                </button>
              </div>
            </div>

            {/* Quick Questions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "What are NIFTY's support levels today?",
                "Analyze Bank NIFTY trend",
                "How strong are Reliance's fundamentals?",
                "Show me top gainers in IT sector",
                "What's the market sentiment today?",
                "Identify potential breakout stocks"
              ].map((q, i) => (
                <button
                  key={i}
                  className="p-4 bg-gray-800/30 rounded-xl border border-gray-700 hover:border-blue-500 text-left transition-colors"
                  onClick={() => setQuestion(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Algo Categories */}
            <div className="flex space-x-4">
              {['intraday', 'swing', 'stbt'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedAlgoType(type)}
                  className={`px-6 py-3 rounded-xl capitalize ${
                    selectedAlgoType === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-400'
                  }`}
                >
                  {type === 'stbt' ? 'STBT-BTST' : type}
                </button>
              ))}
            </div>

            {/* Algo Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {algoTypes[selectedAlgoType as keyof typeof algoTypes].map((algo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800/30 rounded-xl border border-gray-700 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{algo.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      algo.status === 'active'
                        ? 'bg-green-500/20 text-green-500'
                        : 'bg-red-500/20 text-red-500'
                    }`}>
                      {algo.status}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>Win Rate</span>
                      <span>68%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: '68%' }}
                      />
                    </div>
                    
                    <div className="flex justify-between">
                      <button className="px-4 py-2 bg-gray-700 rounded-lg text-sm">
                        Settings
                      </button>
                      <button className={`px-4 py-2 rounded-lg text-sm ${
                        algo.status === 'active'
                          ? 'bg-red-600 text-white'
                          : 'bg-green-600 text-white'
                      }`}>
                        {algo.status === 'active' ? 'Stop' : 'Start'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TradeAlgoPilot;