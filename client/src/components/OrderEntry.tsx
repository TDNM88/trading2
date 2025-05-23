import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, AlertTriangle, 
  DollarSign, Clock, Info 
} from 'lucide-react';
import { useTradingStore, Order } from '../stores/tradingStore';

const OrderEntry = () => {
  const { placeOrder, balance, availableMargin } = useTradingStore();
  
  const [orderData, setOrderData] = useState({
    symbol: '',
    type: 'MARKET' as Order['type'],
    side: 'BUY' as Order['side'],
    quantity: 0,
    price: 0,
    triggerPrice: 0,
    orderType: 'MIS' as 'MIS' | 'NRML'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    placeOrder(orderData);
    setOrderData({
      symbol: '',
      type: 'MARKET',
      side: 'BUY',
      quantity: 0,
      price: 0,
      triggerPrice: 0,
      orderType: 'MIS'
    });
  };

  return (
    <div className="bg-gray-800/30 rounded-xl border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Place Order</h2>
        <div className="flex items-center space-x-4 text-sm">
          <span className="flex items-center">
            <DollarSign className="h-4 w-4 text-green-500 mr-1" />
            Balance: ₹{balance.toLocaleString()}
          </span>
          <span className="flex items-center">
            <Info className="h-4 w-4 text-blue-500 mr-1" />
            Available: ₹{availableMargin.toLocaleString()}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Symbol
            </label>
            <input
              type="text"
              value={orderData.symbol}
              onChange={(e) => setOrderData({ ...orderData, symbol: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700/50 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              placeholder="NIFTY50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Quantity
            </label>
            <input
              type="number"
              value={orderData.quantity}
              onChange={(e) => setOrderData({ ...orderData, quantity: parseInt(e.target.value) })}
              className="w-full px-4 py-2 bg-gray-700/50 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              min="1"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Order Type
            </label>
            <select
              value={orderData.type}
              onChange={(e) => setOrderData({ ...orderData, type: e.target.value as Order['type'] })}
              className="w-full px-4 py-2 bg-gray-700/50 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            >
              <option value="MARKET">Market</option>
              <option value="LIMIT">Limit</option>
              <option value="SL">Stop Loss</option>
              <option value="SL-M">Stop Loss Market</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Product Type
            </label>
            <select
              value={orderData.orderType}
              onChange={(e) => setOrderData({ ...orderData, orderType: e.target.value as 'MIS' | 'NRML' })}
              className="w-full px-4 py-2 bg-gray-700/50 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            >
              <option value="MIS">Intraday (MIS)</option>
              <option value="NRML">Delivery (NRML)</option>
            </select>
          </div>
        </div>

        {(orderData.type === 'LIMIT' || orderData.type === 'SL') && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Price
              </label>
              <input
                type="number"
                value={orderData.price}
                onChange={(e) => setOrderData({ ...orderData, price: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 bg-gray-700/50 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                step="0.05"
                required
              />
            </div>

            {orderData.type === 'SL' && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Trigger Price
                </label>
                <input
                  type="number"
                  value={orderData.triggerPrice}
                  onChange={(e) => setOrderData({ ...orderData, triggerPrice: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 bg-gray-700/50 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                  step="0.05"
                  required
                />
              </div>
            )}
          </div>
        )}

        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setOrderData({ ...orderData, side: 'BUY' })}
            type="submit"
            className={`flex-1 py-3 rounded-lg flex items-center justify-center space-x-2 ${
              orderData.side === 'BUY'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            <TrendingUp className="h-5 w-5" />
            <span>Buy</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setOrderData({ ...orderData, side: 'SELL' })}
            type="submit"
            className={`flex-1 py-3 rounded-lg flex items-center justify-center space-x-2 ${
              orderData.side === 'SELL'
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            <TrendingDown className="h-5 w-5" />
            <span>Sell</span>
          </motion.button>
        </div>

        {orderData.orderType === 'MIS' && (
          <div className="flex items-center p-4 bg-yellow-500/10 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
            <p className="text-sm text-yellow-500">
              MIS orders will be automatically squared off at end of day
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default OrderEntry;