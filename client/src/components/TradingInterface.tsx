import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  AlertOctagon, Power, ToggleLeft, ToggleRight, 
  TrendingUp, Settings, Play, Pause 
} from 'lucide-react';
import TradingViewChart from './TradingViewChart';

interface ToggleState {
  algoTrading: boolean;
  riskManagement: boolean;
  emergencyStop: boolean;
}

const TradingInterface = () => {
  const [toggles, setToggles] = useState<ToggleState>({
    algoTrading: false,
    riskManagement: true,
    emergencyStop: false
  });

  const handleToggle = (key: keyof ToggleState) => {
    setToggles(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleEmergencyExit = () => {
    // Implement emergency exit logic
    console.log('Emergency exit triggered');
  };

  return (
    <div className="space-y-6">
      {/* Trading Controls */}
      <div className="bg-gray-800/30 rounded-xl border border-gray-700 p-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
          Trading Controls
        </h2>

        <div className="space-y-4">
          {/* Algorithm Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
            <div>
              <h3 className="font-medium">Algorithmic Trading</h3>
              <p className="text-sm text-gray-400">Enable automated trading strategies</p>
            </div>
            <button
              onClick={() => handleToggle('algoTrading')}
              className="relative w-14 h-8 rounded-full transition-colors duration-200"
              style={{
                backgroundColor: toggles.algoTrading ? '#4ADE80' : '#374151'
              }}
            >
              <div
                className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-transform duration-200 ${
                  toggles.algoTrading ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* Risk Management */}
          <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
            <div>
              <h3 className="font-medium">Risk Management</h3>
              <p className="text-sm text-gray-400">Automatic position sizing and stop-loss</p>
            </div>
            <button
              onClick={() => handleToggle('riskManagement')}
              className="relative w-14 h-8 rounded-full transition-colors duration-200"
              style={{
                backgroundColor: toggles.riskManagement ? '#4ADE80' : '#374151'
              }}
            >
              <div
                className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-transform duration-200 ${
                  toggles.riskManagement ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* Emergency Stop */}
          <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
            <div>
              <h3 className="font-medium">Emergency Stop</h3>
              <p className="text-sm text-gray-400">Instantly close all positions</p>
            </div>
            <button
              onClick={() => handleToggle('emergencyStop')}
              className="relative w-14 h-8 rounded-full transition-colors duration-200"
              style={{
                backgroundColor: toggles.emergencyStop ? '#EF4444' : '#374151'
              }}
            >
              <div
                className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-transform duration-200 ${
                  toggles.emergencyStop ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Emergency Exit Button */}
        <button
          onClick={handleEmergencyExit}
          className="w-full mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium flex items-center justify-center space-x-2"
        >
          <AlertOctagon className="h-5 w-5" />
          <span>Emergency Exit All Positions</span>
        </button>
      </div>

      {/* Chart */}
      <div className="bg-gray-800/30 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <h3 className="font-medium">Advanced Chart</h3>
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <Settings className="h-5 w-5" />
          </button>
        </div>
        <div className="h-[500px]">
          <TradingViewChart />
        </div>
      </div>
    </div>
  );
};

export default TradingInterface;