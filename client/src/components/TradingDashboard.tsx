import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, AlertTriangle, Settings, 
  Download, RefreshCw, Bell, X, ChevronLeft, ChevronRight,
  Activity, Wallet, BookOpen, DollarSign, Bot, ToggleLeft, ToggleRight
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';

interface TradingDashboardProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

interface ToggleState {
  autoTrading: boolean;
  notifications: boolean;
  riskManagement: boolean;
  emergencyStop: boolean;
}

const TradingDashboard: React.FC<TradingDashboardProps> = ({ isCollapsed }) => {
  // Performance data state
  const [performanceData] = useState(() => 
    Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      pnl: Math.random() * 10000 - 5000,
      cumulative: Math.random() * 15000
    }))
  );

  // Toggle states with persistence
  const [toggles, setToggles] = useState<ToggleState>(() => {
    const saved = localStorage.getItem('tradingDashboardToggles');
    return saved ? JSON.parse(saved) : {
      autoTrading: false,
      notifications: true,
      riskManagement: true,
      emergencyStop: false
    };
  });

  // Save toggles to localStorage when they change
  useEffect(() => {
    localStorage.setItem('tradingDashboardToggles', JSON.stringify(toggles));
  }, [toggles]);

  const handleToggle = (key: keyof ToggleState) => {
    setToggles(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const totalPnL = 4430.00;
  const capitalUtilization = 65;
  const maxDailyLoss = -25000;
  const currentLoss = -15000;

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

  const ToggleSwitch = ({ 
    label, 
    isOn, 
    onToggle,
    description
  }: { 
    label: string;
    isOn: boolean;
    onToggle: () => void;
    description: string;
  }) => (
    <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium">{label}</span>
        <button
          onClick={onToggle}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            isOn ? 'bg-green-500' : 'bg-gray-700'
          }`}
          role="switch"
          aria-checked={isOn}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isOn ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );

  if (isCollapsed) {
    return (
      <div className="h-full bg-gray-900/50 border-l border-gray-800 p-4">
        <div className="space-y-4">
          <button className="w-8 h-8 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors flex items-center justify-center">
            <Settings className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors flex items-center justify-center">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors flex items-center justify-center">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-900/50 border-l border-gray-800 p-6 overflow-y-auto custom-scrollbar">
      {/* Account Summary */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Account Summary</h2>
        <div className={`text-3xl font-bold ${totalPnL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          ₹{totalPnL.toFixed(2)}
        </div>
        <div className="h-32 mt-4">
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

      {/* Trading Controls */}
      <div className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold mb-4">Trading Controls</h2>
        <ToggleSwitch
          label="Auto Trading"
          isOn={toggles.autoTrading}
          onToggle={() => handleToggle('autoTrading')}
          description="Enable automated trading strategies"
        />
        <ToggleSwitch
          label="Notifications"
          isOn={toggles.notifications}
          onToggle={() => handleToggle('notifications')}
          description="Receive trade alerts and updates"
        />
        <ToggleSwitch
          label="Risk Management"
          isOn={toggles.riskManagement}
          onToggle={() => handleToggle('riskManagement')}
          description="Automatic position sizing and stop-loss"
        />
        <ToggleSwitch
          label="Emergency Stop"
          isOn={toggles.emergencyStop}
          onToggle={() => handleToggle('emergencyStop')}
          description="Instantly close all positions"
        />
      </div>

      {/* Trading Statistics */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {[
          { title: 'Total Trades', value: '156', icon: Activity, change: '+12%' },
          { title: 'Portfolio Value', value: '₹125,430', icon: Wallet, change: '+5.2%' },
          { title: 'Win Rate', value: '68%', icon: TrendingUp, change: '+2.1%' },
          { title: 'Avg. Return', value: '₹2,450', icon: DollarSign, change: '+8.3%' }
        ].map((stat, index) => (
          <div key={index} className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="h-5 w-5 text-gray-400" />
              <span className="text-green-500 text-sm">{stat.change}</span>
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.title}</div>
          </div>
        ))}
      </div>

      {/* Risk Management */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Risk Management</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Capital Utilization</span>
              <span>{capitalUtilization}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${capitalUtilization}%` }}
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
                className="h-full bg-red-500 rounded-full transition-all duration-300"
                style={{ width: `${(currentLoss / maxDailyLoss) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </button>
          <button 
            className={`flex items-center justify-center space-x-2 ${
              toggles.emergencyStop 
                ? 'bg-red-700 hover:bg-red-800' 
                : 'bg-red-600 hover:bg-red-700'
            } text-white px-4 py-2 rounded-lg transition-colors`}
          >
            <AlertTriangle className="h-4 w-4" />
            <span>Emergency</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradingDashboard;