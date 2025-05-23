import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, DollarSign, 
  Clock, AlertTriangle, Activity 
} from 'lucide-react';

const PortfolioOverview = () => {
  // Mock data - Replace with real data from your broker integration
  const holdings = [
    {
      symbol: 'RELIANCE',
      quantity: 100,
      avgPrice: 2450.75,
      ltp: 2487.30,
      pnl: 3655,
      pnlPercent: 1.49
    },
    {
      symbol: 'INFY',
      quantity: 150,
      avgPrice: 1560.25,
      ltp: 1578.45,
      pnl: 2730,
      pnlPercent: 1.16
    }
  ];

  const foPositions = [
    {
      symbol: 'NIFTY 19000 CE',
      quantity: 50,
      avgPrice: 245.50,
      ltp: 228.75,
      pnl: -837.50,
      pnlPercent: -6.83
    }
  ];

  const totalPnL = [...holdings, ...foPositions].reduce((sum, pos) => sum + pos.pnl, 0);
  const portfolioValue = holdings.reduce((sum, pos) => sum + pos.quantity * pos.ltp, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/30 rounded-xl p-6 border border-gray-700"
        >
          <h3 className="text-gray-400 mb-2">Portfolio Value</h3>
          <div className="text-2xl font-bold">₹{portfolioValue.toLocaleString()}</div>
          <div className="mt-2 text-sm text-gray-400">
            {holdings.length} Stocks • {foPositions.length} F&O Positions
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/30 rounded-xl p-6 border border-gray-700"
        >
          <h3 className="text-gray-400 mb-2">Day's P&L</h3>
          <div className={`text-2xl font-bold flex items-center ${
            totalPnL >= 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            {totalPnL >= 0 ? (
              <TrendingUp className="h-6 w-6 mr-2" />
            ) : (
              <TrendingDown className="h-6 w-6 mr-2" />
            )}
            ₹{Math.abs(totalPnL).toLocaleString()}
          </div>
          <div className="mt-2 text-sm text-gray-400">
            Updated as of {new Date().toLocaleTimeString()}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/30 rounded-xl p-6 border border-gray-700"
        >
          <h3 className="text-gray-400 mb-2">Available Margin</h3>
          <div className="text-2xl font-bold">₹1,50,000</div>
          <div className="mt-2 text-sm text-gray-400">
            Margin utilized: 65%
          </div>
        </motion.div>
      </div>

      {/* Holdings */}
      <div className="bg-gray-800/30 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold">Holdings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-400 border-b border-gray-700">
                <th className="p-4">Symbol</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Avg Price</th>
                <th className="p-4">LTP</th>
                <th className="p-4">Current Value</th>
                <th className="p-4">P&L</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((holding, index) => (
                <motion.tr
                  key={holding.symbol}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-gray-700/50"
                >
                  <td className="p-4">{holding.symbol}</td>
                  <td className="p-4">{holding.quantity}</td>
                  <td className="p-4">₹{holding.avgPrice.toFixed(2)}</td>
                  <td className="p-4">₹{holding.ltp.toFixed(2)}</td>
                  <td className="p-4">₹{(holding.quantity * holding.ltp).toLocaleString()}</td>
                  <td className="p-4">
                    <div className={`flex items-center ${
                      holding.pnl >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {holding.pnl >= 0 ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      ₹{Math.abs(holding.pnl).toFixed(2)}
                      <span className="ml-1 text-sm">
                        ({Math.abs(holding.pnlPercent).toFixed(2)}%)
                      </span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* F&O Positions */}
      <div className="bg-gray-800/30 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold">F&O Positions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-400 border-b border-gray-700">
                <th className="p-4">Instrument</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Avg Price</th>
                <th className="p-4">LTP</th>
                <th className="p-4">P&L</th>
              </tr>
            </thead>
            <tbody>
              {foPositions.map((position, index) => (
                <motion.tr
                  key={position.symbol}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-gray-700/50"
                >
                  <td className="p-4">{position.symbol}</td>
                  <td className="p-4">{position.quantity}</td>
                  <td className="p-4">₹{position.avgPrice.toFixed(2)}</td>
                  <td className="p-4">₹{position.ltp.toFixed(2)}</td>
                  <td className="p-4">
                    <div className={`flex items-center ${
                      position.pnl >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {position.pnl >= 0 ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      ₹{Math.abs(position.pnl).toFixed(2)}
                      <span className="ml-1 text-sm">
                        ({Math.abs(position.pnlPercent).toFixed(2)}%)
                      </span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PortfolioOverview;