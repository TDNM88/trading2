import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, ArrowDownRight, Clock, AlertTriangle, 
  TrendingUp, TrendingDown, BarChart2, Timer, Settings
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

interface Position {
  id: string;
  type: 'Cash' | 'Futures' | 'Options';
  symbol: string;
  direction: 'Long' | 'Short';
  entryPrice: number;
  currentPrice: number;
  size: number;
  entryTime: Date;
  pnl: number;
  pnlPercent: number;
}

const PersonalTradingDashboard: React.FC = () => {
  // Mock data - Replace with real data
  const [positions] = useState<Position[]>([
    {
      id: '1',
      type: 'Cash',
      symbol: 'RELIANCE',
      direction: 'Long',
      entryPrice: 2450.75,
      currentPrice: 2487.30,
      size: 100,
      entryTime: new Date(Date.now() - 3600000), // 1 hour ago
      pnl: 3655,
      pnlPercent: 1.49
    },
    {
      id: '2',
      type: 'Futures',
      symbol: 'NIFTY',
      direction: 'Short',
      entryPrice: 22345.50,
      currentPrice: 22298.75,
      size: 50,
      entryTime: new Date(Date.now() - 7200000), // 2 hours ago
      pnl: 2337.50,
      pnlPercent: 0.21
    },
    {
      id: '3',
      type: 'Options',
      symbol: 'BANKNIFTY 48000 CE',
      direction: 'Long',
      entryPrice: 245.50,
      currentPrice: 228.75,
      size: 25,
      entryTime: new Date(Date.now() - 5400000), // 1.5 hours ago
      pnl: -418.75,
      pnlPercent: -6.83
    }
  ]);

  const [performanceData] = useState(() => 
    Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      pnl: Math.random() * 10000 - 5000,
      cumulative: Math.random() * 15000
    }))
  );

  const totalPnL = positions.reduce((sum, pos) => sum + pos.pnl, 0);
  const riskUtilization = 65; // Mock value - Replace with actual calculation
  const maxDailyLoss = -25000;
  const currentLoss = -15000;
  const maxTradesPerDay = 20;
  const currentTrades = 12;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/90 backdrop-blur-sm p-4 rounded-lg border border-gray-800">
          <p className="text-gray-400">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: ₹{entry.value.toFixed(2)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      {/* Position Overview Panel */}
      <div className="lg:col-span-2">
        <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Position Overview</h2>
          <div className="space-y-4">
            {['Cash', 'Futures', 'Options'].map(type => (
              <div key={type}>
                <h3 className="text-lg font-medium text-gray-300 mb-2">{type}</h3>
                <div className="space-y-2">
                  {positions
                    .filter(pos => pos.type === type)
                    .map(position => (
                      <div
                        key={position.id}
                        className="bg-gray-900/50 rounded-lg p-4 flex items-center justify-between"
                      >
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{position.symbol}</span>
                            <span className={`px-2 py-0.5 rounded text-xs ${
                              position.direction === 'Long'
                                ? 'bg-green-500/20 text-green-500'
                                : 'bg-red-500/20 text-red-500'
                            }`}>
                              {position.direction}
                            </span>
                          </div>
                          <div className="text-sm text-gray-400 mt-1">
                            <span>Size: {position.size}</span>
                            <span className="mx-2">•</span>
                            <span>Entry: ₹{position.entryPrice}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`flex items-center ${
                            position.pnl >= 0 ? 'text-green-500' : 'text-red-500'
                          }`}>
                            {position.pnl >= 0 ? (
                              <ArrowUpRight className="h-4 w-4 mr-1" />
                            ) : (
                              <ArrowDownRight className="h-4 w-4 mr-1" />
                            )}
                            <span>₹{Math.abs(position.pnl).toFixed(2)}</span>
                            <span className="ml-1">({Math.abs(position.pnlPercent).toFixed(2)}%)</span>
                          </div>
                          <div className="text-sm text-gray-400 mt-1 flex items-center justify-end">
                            <Clock className="h-3 w-3 mr-1" />
                            {Math.floor((Date.now() - position.entryTime.getTime()) / 3600000)}h
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Performance & Risk Panel */}
      <div className="space-y-6">
        {/* P&L Summary */}
        <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Today's P&L</h2>
          <div className={`text-3xl font-bold mb-2 ${
            totalPnL >= 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            ₹{totalPnL.toFixed(2)}
          </div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="pnlGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4ADE80" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#4ADE80" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" tick={{ fill: '#9CA3AF' }} stroke="#4B5563" />
                <YAxis tick={{ fill: '#9CA3AF' }} stroke="#4B5563" />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="pnl"
                  stroke="#4ADE80"
                  fill="url(#pnlGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Utilization */}
        <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Risk Management</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Risk Utilization</span>
                <span>{riskUtilization}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${riskUtilization}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Daily Loss Limit</span>
                <span className="text-red-500">{((currentLoss / maxDailyLoss) * 100).toFixed(0)}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 rounded-full"
                  style={{ width: `${(currentLoss / maxDailyLoss) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Daily Trades</span>
                <span>{currentTrades}/{maxTradesPerDay}</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${(currentTrades / maxTradesPerDay) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              <Settings className="h-4 w-4" />
              <span>Risk Settings</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
              <AlertTriangle className="h-4 w-4" />
              <span>Emergency Exit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalTradingDashboard;