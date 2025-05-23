import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, DollarSign, Clock, 
  AlertTriangle, Settings, RefreshCw, ChevronDown,
  ArrowUpRight, ArrowDownRight, Search
} from 'lucide-react';
import TradingViewChart from './TradingViewChart';
import HotPairs from './HotPairs';

const PaperTrading = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('BTC-USD');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('88552.4');
  const [leverage, setLeverage] = useState('10X');
  const [side, setSide] = useState<'Long' | 'Short'>('Long');
  const [orderType, setOrderType] = useState<'Market' | 'Limit'>('Market');
  const [activeTab, setActiveTab] = useState('positions');

  const handleSubmitOrder = () => {
    console.log({
      symbol: selectedSymbol,
      type: orderType,
      side,
      size,
      price,
      leverage
    });
  };

  return (
    <div className="min-h-screen bg-cyber-black">
      <HotPairs />
      <div className="pt-16">
        <div className="grid grid-cols-12 gap-0 h-[calc(100vh-4rem)]">
          {/* Chart Area */}
          <div className="col-span-12 lg:col-span-9 border-r border-cyber-green/20 flex flex-col">
            <div className="p-4 flex-grow flex flex-col min-h-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <select 
                    value={selectedSymbol}
                    onChange={(e) => setSelectedSymbol(e.target.value)}
                    className="cyber-select bg-cyber-darker text-white px-3 py-2 rounded-lg border border-cyber-green/20"
                  >
                    <option value="BTC-USD">BTC-USD</option>
                    <option value="ETH-USD">ETH-USD</option>
                    <option value="SOL-USD">SOL-USD</option>
                  </select>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold font-mono text-cyber-green">88,453.1</span>
                    <span className="text-green-500 flex items-center">
                      <ArrowUpRight className="h-4 w-4" />
                      +0.12%
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-lg bg-cyber-darker hover:bg-cyber-dark border border-cyber-green/20">
                    <RefreshCw className="h-5 w-5 text-cyber-green" />
                  </button>
                  <button className="p-2 rounded-lg bg-cyber-darker hover:bg-cyber-dark border border-cyber-green/20">
                    <Settings className="h-5 w-5 text-cyber-green" />
                  </button>
                </div>
              </div>
              
              <div className="flex-grow min-h-0">
                <TradingViewChart symbol={selectedSymbol} />
              </div>
            </div>

            {/* Trading History */}
            <div className="border-t border-cyber-green/20 p-4">
              <div className="flex space-x-4 mb-4">
                {['positions', 'orders', 'fills', 'assets'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-mono uppercase tracking-wider ${
                      activeTab === tab
                        ? 'bg-cyber-green/20 text-cyber-green border border-cyber-green/30'
                        : 'text-gray-400 hover:text-cyber-green hover:bg-cyber-green/10'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-400 font-mono text-xs uppercase">
                      <th className="px-4 py-2">Time</th>
                      <th className="px-4 py-2">Price(USD)</th>
                      <th className="px-4 py-2">Amount(USD)</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono">
                    <tr className="border-t border-cyber-green/10">
                      <td className="px-4 py-2 text-gray-400">00:55:44</td>
                      <td className="px-4 py-2 text-red-500">88,453.3</td>
                      <td className="px-4 py-2">7,078.2</td>
                    </tr>
                    <tr className="border-t border-cyber-green/10">
                      <td className="px-4 py-2 text-gray-400">00:55:39</td>
                      <td className="px-4 py-2 text-green-500">88,486.5</td>
                      <td className="px-4 py-2">7,078.9</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Order Panel */}
          <div className="col-span-12 lg:col-span-3 bg-cyber-darker border-l border-cyber-green/20">
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSide('Long')}
                    className={`px-6 py-2 rounded-lg text-sm font-mono uppercase tracking-wider ${
                      side === 'Long'
                        ? 'bg-[#00ff41] text-black font-bold shadow-[0_0_20px_rgba(0,255,65,0.3)]'
                        : 'bg-cyber-dark text-gray-400 hover:text-cyber-green hover:bg-cyber-green/10'
                    }`}
                  >
                    Long
                  </button>
                  <button
                    onClick={() => setSide('Short')}
                    className={`px-6 py-2 rounded-lg text-sm font-mono uppercase tracking-wider ${
                      side === 'Short'
                        ? 'bg-red-600 text-white font-bold shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                        : 'bg-cyber-dark text-gray-400 hover:text-red-500 hover:bg-red-500/10'
                    }`}
                  >
                    Short
                  </button>
                </div>
                <select
                  value={leverage}
                  onChange={(e) => setLeverage(e.target.value)}
                  className="cyber-select bg-cyber-dark text-white px-3 py-2 rounded-lg border border-cyber-green/20"
                >
                  {['1X', '5X', '10X', '20X'].map((lev) => (
                    <option key={lev} value={lev}>{lev}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-6">
                <div className="form-group">
                  <label className="form-label font-mono">Price</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="cyber-input font-mono"
                    placeholder="0.00"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label font-mono">Size</label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      className="cyber-input font-mono"
                      placeholder="0.00"
                    />
                    <select className="cyber-select w-24 font-mono">
                      <option value="BTC">BTC</option>
                      <option value="USD">USD</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label font-mono">Pay</label>
                  <input
                    type="number"
                    className="cyber-input font-mono"
                    placeholder="0.00"
                    disabled
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="cyber-checkbox" />
                  <span className="text-sm text-gray-400 font-mono">Take Profit/Stop Loss</span>
                </div>

                <button
                  onClick={handleSubmitOrder}
                  className={`w-full py-3 rounded-lg font-mono uppercase tracking-wider ${
                    side === 'Long'
                      ? 'bg-[#00ff41] text-black hover:bg-[#00cc33] shadow-[0_0_20px_rgba(0,255,65,0.3)]'
                      : 'bg-red-600 hover:bg-red-700 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                  }`}
                >
                  {side} {selectedSymbol}
                </button>

                <button className="w-full py-3 rounded-lg bg-cyber-green text-black font-mono uppercase tracking-wider hover:bg-[#00cc33] shadow-[0_0_20px_rgba(0,255,65,0.3)]">
                  Connect Wallet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperTrading;