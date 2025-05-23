import React, { useState , useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, AlertTriangle, Settings, 
  RefreshCw, Bell, Brain, ChevronDown, ChevronUp,
  Activity, Wallet, BookOpen, DollarSign, Bot, LineChart,
  BarChart2, Calendar
} from 'lucide-react';
import {
  LineChart as Chart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import TradingViewChart from '../components/TradingViewChart';
import PortfolioOverview from '../components/PortfolioOverview';
import AnalyticsModule from '../components/AnalyticsModule';
import AlertSystem from '../components/AlertSystem';
import TradingInterface from '../components/TradingInterface';
import MarketOverview from '../components/MarketOverview';
import NSEHolidays from '../components/NSEHolidays';
import MarketCharts from '../components/MarketCharts';

const Dashboard = () => {
  const navigate = useNavigate();  // initialize navigate hook
  const [activeTab, setActiveTab] = useState('overview');
  const [isCollapsed, setIsCollapsed] = useState(false);
    useEffect(() => {
  const token = localStorage.getItem('token');
  console.log('Token in Dashboard:', token);
  if (!token) {
    navigate('/login');
  }
}, [navigate]);


  const tabs = [
    { id: 'overview', label: 'Portfolio Overview', icon: Activity },
    { id: 'market', label: 'Market Overview', icon: BarChart2 },
    { id: 'analytics', label: 'Analytics', icon: LineChart },
    { id: 'trading', label: 'Trading Interface', icon: Brain },
    { id: 'charts', label: 'Charts', icon: TrendingUp },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'holidays', label: 'NSE Holidays', icon: Calendar }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <PortfolioOverview />;
      case 'market':
        return <MarketOverview />;
      case 'analytics':
        return <AnalyticsModule />;
      case 'trading':
        return <TradingInterface />;
      case 'charts':
        return <MarketCharts />;
      case 'alerts':
        return <AlertSystem />;
      case 'holidays':
        return <NSEHolidays />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1118]">
      {/* Navigation */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-[#0B1118]/95 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1 -mb-px overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 border-b-2 font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-[#00ff41] text-[#00ff41] bg-[#00ff41]/5'
                    : 'border-transparent text-gray-400 hover:text-white hover:border-gray-700'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="pt-16">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;