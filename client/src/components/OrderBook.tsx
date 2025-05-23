import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, Filter, Search, X, 
  AlertTriangle, CheckCircle, XCircle 
} from 'lucide-react';
import { useTradingStore, Order } from '../stores/tradingStore';
import { format } from 'date-fns';

const OrderBook = () => {
  const { orders, cancelOrder } = useTradingStore();
  const [filter, setFilter] = useState<'ALL' | 'OPEN' | 'EXECUTED' | 'CANCELLED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'ALL' || order.status === filter;
    const matchesSearch = order.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'EXECUTED':
        return 'text-green-500';
      case 'CANCELLED':
        return 'text-red-500';
      case 'REJECTED':
        return 'text-orange-500';
      default:
        return 'text-blue-500';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'EXECUTED':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'CANCELLED':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'REJECTED':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      default:
        return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="bg-gray-800/30 rounded-xl border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Order Book</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search orders..."
              className="pl-10 pr-4 py-2 bg-gray-700/50 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="px-4 py-2 bg-gray-700/50 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
          >
            <option value="ALL">All Orders</option>
            <option value="OPEN">Open</option>
            <option value="EXECUTED">Executed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-400 border-b border-gray-700">
              <th className="pb-3">Time</th>
              <th className="pb-3">Symbol</th>
              <th className="pb-3">Type</th>
              <th className="pb-3">Side</th>
              <th className="pb-3">Quantity</th>
              <th className="pb-3">Price</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredOrders.map((order) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="border-b border-gray-700/50"
                >
                  <td className="py-4 text-sm text-gray-400">
                    {format(order.timestamp, 'HH:mm:ss')}
                  </td>
                  <td className="py-4">{order.symbol}</td>
                  <td className="py-4 text-sm">
                    <span className="px-2 py-1 rounded-full bg-gray-700/50">
                      {order.type}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className={`text-sm ${
                      order.side === 'BUY' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {order.side}
                    </span>
                  </td>
                  <td className="py-4">{order.quantity}</td>
                  <td className="py-4">
                    {order.price ? `₹${order.price}` : 'Market'}
                  </td>
                  <td className="py-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <span className={`text-sm ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    {order.status === 'OPEN' && (
                      <button
                        onClick={() => cancelOrder(order.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg text-red-500 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>

        {filteredOrders.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No orders found
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderBook;