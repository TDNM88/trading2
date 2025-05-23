import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, X } from 'lucide-react';
import { useTradingStore } from '../stores/tradingStore';

const PositionBook = () => {
  const { positions, closePosition } = useTradingStore();

  return (
    <div className="bg-gray-800/30 rounded-xl border border-gray-700 p-6">
      <h2 className="text-xl font-semibold mb-6">Position Book</h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-400 border-b border-gray-700">
              <th className="pb-3">Symbol</th>
              <th className="pb-3">Type</th>
              <th className="pb-3">Quantity</th>
              <th className="pb-3">Avg. Price</th>
              <th className="pb-3">LTP</th>
              <th className="pb-3">P&L</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position) => (
              <motion.tr
                key={position.symbol}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-b border-gray-700/50"
              >
                <td className="py-4">{position.symbol}</td>
                <td className="py-4">
                  <span className="px-2 py-1 rounded-full bg-gray-700/50 text-sm">
                    {position.type}
                  </span>
                </td>
                <td className="py-4">{position.quantity}</td>
                <td className="py-4">₹{position.averagePrice.toFixed(2)}</td>
                <td className="py-4">₹{(position.averagePrice + position.pnl / position.quantity).toFixed(2)}</td>
                <td className="py-4">
                  <div className={`flex items-center space-x-1 ${
                    position.pnl >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {position.pnl >= 0 ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <span>₹{Math.abs(position.pnl).toFixed(2)}</span>
                  </div>
                </td>
                <td className="py-4">
                  <button
                    onClick={() => closePosition(position.symbol)}
                    className="p-2 hover:bg-red-500/20 rounded-lg text-red-500 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {positions.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No open positions
          </div>
        )}
      </div>
    </div>
  );
};

export default PositionBook;