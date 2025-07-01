import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart2,
  LineChart,
  Settings,
  ChevronUp,
  ChevronDown,
  BookOpen,
  Timer
} from 'lucide-react';
import TradingViewChart from '../components/TradingViewChart';
import OrderEntry from '../components/OrderEntry';
import OrderBook from '../components/OrderBook';
import PositionBook from '../components/PositionBook';
import TradingInterface from '../components/TradingInterface';
import { useTradingStore } from '../stores/tradingStore';

const TradePage = () => {
  const { balance, availableMargin } = useTradingStore();
  const [selectedSymbol, setSelectedSymbol] = useState('BTCUSDT');
  const [tabView, setTabView] = useState<'orders' | 'positions'>('orders');
  const [timeframe, setTimeframe] = useState('1h');
  const [chartType, setChartType] = useState<'candles' | 'line'>('candles');
  const [isOrderEntryExpanded, setIsOrderEntryExpanded] = useState(true);
  const [isControlsExpanded, setIsControlsExpanded] = useState(true);
  
  const popularSymbols = [
    { symbol: 'BTCUSDT', name: 'Bitcoin', price: 68432.51, change: 2.3 },
    { symbol: 'ETHUSDT', name: 'Ethereum', price: 3274.18, change: 1.8 },
    { symbol: 'SOLUSDT', name: 'Solana', price: 142.87, change: -0.9 },
    { symbol: 'BNBUSDT', name: 'BNB', price: 564.32, change: 0.5 },
    { symbol: 'ADAUSDT', name: 'Cardano', price: 0.45, change: -1.2 },
  ];
  
  const timeframes = ['1m', '5m', '15m', '30m', '1h', '4h', '1d', '1w'];
  
  return (
    <div className="pt-20 pb-24 px-4">
      {/* Header with balance */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Giao dịch</h1>
        <div className="flex space-x-4">
          <div className="bg-gray-800/30 rounded-lg p-2 px-4">
            <span className="text-xs text-gray-400">Số dư:</span>
            <div className="font-semibold">₫{balance.toLocaleString()}</div>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-2 px-4">
            <span className="text-xs text-gray-400">Khả dụng:</span>
            <div className="font-semibold">₫{availableMargin.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Left column - Symbol search and chart */}
        <div className="lg:col-span-3 space-y-4">
          {/* Symbol selector */}
          <div className="bg-gray-800/30 rounded-xl border border-gray-700 p-4">
            <div className="flex flex-wrap gap-2">
              {popularSymbols.map((sym) => (
                <button
                  key={sym.symbol}
                  onClick={() => setSelectedSymbol(sym.symbol)}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-3 ${selectedSymbol === sym.symbol ? 'bg-blue-600' : 'bg-gray-700/50 hover:bg-gray-700'}`}
                >
                  <div>
                    <div className="font-medium">{sym.symbol}</div>
                    <div className="text-xs text-gray-400">{sym.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${sym.price.toLocaleString()}</div>
                    <div className={`text-xs ${sym.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {sym.change >= 0 ? '+' : ''}{sym.change}%
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Chart with controls */}
          <div className="bg-gray-800/30 rounded-xl border border-gray-700 p-4">
            {/* Chart controls */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-2">
                {timeframes.map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-3 py-1 rounded-lg text-sm ${timeframe === tf ? 'bg-blue-600' : 'bg-gray-700/50 hover:bg-gray-700'}`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setChartType('candles')}
                  className={`p-2 rounded-lg ${chartType === 'candles' ? 'bg-blue-600' : 'bg-gray-700/50 hover:bg-gray-700'}`}
                >
                  <BarChart2 size={18} />
                </button>
                <button
                  onClick={() => setChartType('line')}
                  className={`p-2 rounded-lg ${chartType === 'line' ? 'bg-blue-600' : 'bg-gray-700/50 hover:bg-gray-700'}`}
                >
                  <LineChart size={18} />
                </button>
                <button className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-700">
                  <Settings size={18} />
                </button>
              </div>
            </div>
            
            {/* TradingView Chart */}
            <div className="h-[500px]">
              <TradingViewChart symbol={selectedSymbol} theme="dark" />
            </div>
          </div>
        </div>
        
        {/* Right column - Order entry and trading interface */}
        <div className="space-y-4">
          {/* Order Entry Section */}
          <div className="bg-gray-800/30 rounded-xl border border-gray-700">
            <div 
              className="p-4 flex justify-between items-center cursor-pointer" 
              onClick={() => setIsOrderEntryExpanded(!isOrderEntryExpanded)}
            >
              <h2 className="text-lg font-semibold">Đặt lệnh</h2>
              {isOrderEntryExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            
            {isOrderEntryExpanded && (
              <div className="p-4 pt-0 border-t border-gray-700">
                <OrderEntry />
              </div>
            )}
          </div>
          
          {/* Trading Interface */}
          <div className="bg-gray-800/30 rounded-xl border border-gray-700">
            <div 
              className="p-4 flex justify-between items-center cursor-pointer" 
              onClick={() => setIsControlsExpanded(!isControlsExpanded)}
            >
              <h2 className="text-lg font-semibold">Công cụ giao dịch</h2>
              {isControlsExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            
            {isControlsExpanded && (
              <div className="p-4 pt-0 border-t border-gray-700">
                <TradingInterface />
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Bottom section - Orders and Positions */}
      <div className="mt-4">
        <div className="bg-gray-800/30 rounded-xl border border-gray-700">
          <div className="flex border-b border-gray-700">
            <button 
              className={`flex-1 py-4 text-center font-medium flex justify-center items-center ${tabView === 'orders' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
              onClick={() => setTabView('orders')}
            >
              <BookOpen size={18} className="mr-2" />
              Sổ lệnh
            </button>
            <button 
              className={`flex-1 py-4 text-center font-medium flex justify-center items-center ${tabView === 'positions' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
              onClick={() => setTabView('positions')}
            >
              <Timer size={18} className="mr-2" />
              Vị thế
            </button>
          </div>
          
          <div className="p-4">
            {tabView === 'orders' ? <OrderBook /> : <PositionBook />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradePage;
