import React, { useState } from 'react';
import {
  BarChart2,
  LineChart,
  Settings,
  AlertTriangle,
  Shield
} from 'lucide-react';
import TradingViewChart from '../components/TradingViewChart';

interface FuturesPosition {
  symbol: string;
  side: 'LONG' | 'SHORT';
  size: number;
  leverage: number;
  entryPrice: number;
  markPrice: number;
  liquidationPrice: number;
  margin: number;
  pnl: number;
  pnlPercent: number;
  stopLoss?: number;
  takeProfit?: number;
}

interface FuturesOrder {
  id: string;
  symbol: string;
  type: 'LIMIT' | 'MARKET' | 'STOP' | 'TAKE_PROFIT';
  side: 'BUY' | 'SELL';
  size: number;
  leverage: number;
  price?: number;
  triggerPrice?: number;
  status: 'OPEN' | 'FILLED' | 'CANCELLED' | 'REJECTED';
  reduceOnly: boolean;
  timestamp: Date;
}

const mockPositions: FuturesPosition[] = [
  {
    symbol: 'BTCUSDT',
    side: 'LONG',
    size: 0.05,
    leverage: 10,
    entryPrice: 67240.5,
    markPrice: 68432.8,
    liquidationPrice: 60516.45,
    margin: 336.20,
    pnl: 59.67,
    pnlPercent: 1.78,
    stopLoss: 65000,
    takeProfit: 72000
  },
  {
    symbol: 'ETHUSDT',
    side: 'SHORT',
    size: 0.5,
    leverage: 5,
    entryPrice: 3350.25,
    markPrice: 3274.18,
    liquidationPrice: 3685.28,
    margin: 335.03,
    pnl: 38.04,
    pnlPercent: 2.27
  }
];

const mockOrders: FuturesOrder[] = [
  {
    id: '12345',
    symbol: 'BTCUSDT',
    type: 'LIMIT',
    side: 'BUY',
    size: 0.02,
    leverage: 10,
    price: 66500,
    status: 'OPEN',
    reduceOnly: false,
    timestamp: new Date(Date.now() - 3600000)
  },
  {
    id: '12346',
    symbol: 'ETHUSDT',
    type: 'STOP',
    side: 'SELL',
    size: 0.5,
    leverage: 5,
    triggerPrice: 3200,
    status: 'OPEN',
    reduceOnly: true,
    timestamp: new Date(Date.now() - 7200000)
  }
];

const FuturesPage = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('BTCUSDT');
  const [tabView, setTabView] = useState<'positions' | 'orders'>('positions');
  const [timeframe, setTimeframe] = useState('1h');
  const [chartType, setChartType] = useState<'candles' | 'line'>('candles');
  const [leverage, setLeverage] = useState(10);
  const [orderType, setOrderType] = useState<'LIMIT' | 'MARKET' | 'STOP' | 'TAKE_PROFIT'>('MARKET');
  const [orderSide, setOrderSide] = useState<'BUY' | 'SELL'>('BUY');
  const [orderSize, setOrderSize] = useState('');
  const [orderPrice, setOrderPrice] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [isTpSlVisible, setIsTpSlVisible] = useState(false);
  
  const futuresSymbols = [
    { symbol: 'BTCUSDT', name: 'Bitcoin', price: 68432.51, change: 2.3, volume: '2.4B' },
    { symbol: 'ETHUSDT', name: 'Ethereum', price: 3274.18, change: 1.8, volume: '1.2B' },
    { symbol: 'SOLUSDT', name: 'Solana', price: 142.87, change: -0.9, volume: '542M' },
    { symbol: 'BNBUSDT', name: 'BNB', price: 564.32, change: 0.5, volume: '321M' },
    { symbol: 'ADAUSDT', name: 'Cardano', price: 0.45, change: -1.2, volume: '154M' },
  ];
  
  const timeframes = ['1m', '5m', '15m', '30m', '1h', '4h', '1d', '1w'];
  const leverageOptions = [1, 2, 3, 5, 10, 20, 50, 100, 125];

  // Giả lập số dư và margin sử dụng
  const balance = 25000;
  const totalMarginUsed = mockPositions.reduce((total, position) => total + position.margin, 0);
  const availableMargin = balance - totalMarginUsed;
  
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic đặt lệnh ở đây
    console.log('Order placed', {
      symbol: selectedSymbol,
      type: orderType,
      side: orderSide,
      size: parseFloat(orderSize),
      leverage,
      price: orderType !== 'MARKET' ? parseFloat(orderPrice) : undefined,
      stopLoss: stopLoss ? parseFloat(stopLoss) : undefined,
      takeProfit: takeProfit ? parseFloat(takeProfit) : undefined
    });
    
    // Reset form
    setOrderSize('');
    setOrderPrice('');
    setStopLoss('');
    setTakeProfit('');
  };
  
  return (
    <div className="pt-20 pb-24 px-4">
      {/* Header with balance */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Futures</h1>
        <div className="flex space-x-4">
          <div className="bg-gray-800/30 rounded-lg p-2 px-4">
            <span className="text-xs text-gray-400">Số dư:</span>
            <div className="font-semibold">₫{balance.toLocaleString()}</div>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-2 px-4">
            <span className="text-xs text-gray-400">Margin khả dụng:</span>
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
              {futuresSymbols.map((sym) => (
                <button
                  type="button"
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
                      {sym.change >= 0 ? '+' : ''}{sym.change}% • 24h: {sym.volume}
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
                    type="button"
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
                  type="button"
                  onClick={() => setChartType('candles')}
                  className={`p-2 rounded-lg ${chartType === 'candles' ? 'bg-blue-600' : 'bg-gray-700/50 hover:bg-gray-700'}`}
                >
                  <BarChart2 size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => setChartType('line')}
                  className={`p-2 rounded-lg ${chartType === 'line' ? 'bg-blue-600' : 'bg-gray-700/50 hover:bg-gray-700'}`}
                >
                  <LineChart size={18} />
                </button>
                <button
                  type="button" 
                  className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-700">
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
        
        {/* Right column - Order entry */}
        <div className="space-y-4">
          {/* Leverage selector */}
          <div className="bg-gray-800/30 rounded-xl border border-gray-700 p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Đòn bẩy</h3>
              <span className="font-semibold text-yellow-500">{leverage}x</span>
            </div>
            <input
              type="range"
              min="1"
              max="125"
              step="1"
              value={leverage}
              onChange={(e) => setLeverage(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-400">1x</span>
              <span className="text-sm text-gray-400">125x</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {leverageOptions.map((lev) => (
                <button
                  type="button"
                  key={lev}
                  onClick={() => setLeverage(lev)}
                  className={`px-2 py-1 text-xs rounded ${leverage === lev ? 'bg-yellow-500 text-black' : 'bg-gray-700'}`}
                >
                  {lev}x
                </button>
              ))}
            </div>
            <div className="mt-4 text-sm text-yellow-500 flex items-center">
              <AlertTriangle size={14} className="mr-1" />
              Đòn bẩy cao làm tăng rủi ro thanh lý
            </div>
          </div>

          {/* Order entry form */}
          <div className="bg-gray-800/30 rounded-xl border border-gray-700 p-4">
            <h3 className="text-lg font-semibold mb-4">Đặt lệnh</h3>
            
            {/* Long/Short toggle */}
            <div className="flex mb-4 rounded-lg overflow-hidden">
              <button
                type="button"
                className={`flex-1 py-2 text-center font-medium ${orderSide === 'BUY' ? 'bg-green-600' : 'bg-gray-700'}`}
                onClick={() => setOrderSide('BUY')}
              >
                Long
              </button>
              <button
                type="button"
                className={`flex-1 py-2 text-center font-medium ${orderSide === 'SELL' ? 'bg-red-600' : 'bg-gray-700'}`}
                onClick={() => setOrderSide('SELL')}
              >
                Short
              </button>
            </div>
            
            {/* Order type selector */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Loại lệnh
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['MARKET', 'LIMIT', 'STOP', 'TAKE_PROFIT'] as const).map((type) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => setOrderType(type)}
                    className={`py-2 text-center text-sm rounded ${orderType === type ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                  >
                    {type === 'MARKET' ? 'Market' : 
                     type === 'LIMIT' ? 'Limit' : 
                     type === 'STOP' ? 'Stop' : 'Take Profit'}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Kích thước ({selectedSymbol.replace('USDT', '')})
              </label>
              <input
                type="text"
                value={orderSize}
                onChange={(e) => setOrderSize(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700/50 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                placeholder="0.00"
              />
              <div className="flex justify-between mt-1">
                <button type="button" className="text-xs text-blue-400">25%</button>
                <button type="button" className="text-xs text-blue-400">50%</button>
                <button type="button" className="text-xs text-blue-400">75%</button>
                <button type="button" className="text-xs text-blue-400">100%</button>
              </div>
            </div>
            
            {/* Price inputs */}
            {orderType !== 'MARKET' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Giá (USDT)
                </label>
                <input
                  type="text"
                  value={orderPrice}
                  onChange={(e) => setOrderPrice(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700/50 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                  placeholder="0.00"
                />
              </div>
            )}
            
            {/* Stop Loss và Take Profit */}
            <div className="flex items-center justify-between mb-2">
              <label className="flex items-center text-sm font-medium text-gray-400" htmlFor="stop-loss-take-profit">
                <Shield className="h-4 w-4 mr-1" />
                Stop Loss / Take Profit
              </label>
              <button
                type="button"
                onClick={() => setIsTpSlVisible(!isTpSlVisible)}
                className="text-blue-500 text-sm"
              >
                {isTpSlVisible ? 'Ẩn' : 'Hiện'}
              </button>
            </div>
            
            {isTpSlVisible && (
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Stop Loss</label>
                  <input
                    type="text"
                    value={stopLoss}
                    onChange={(e) => setStopLoss(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700/50 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Take Profit</label>
                  <input
                    type="text"
                    value={takeProfit}
                    onChange={(e) => setTakeProfit(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700/50 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                    placeholder="0.00"
                  />
                </div>
              </div>
            )}
            
            {/* Order button */}
            <button
              type="button"
              onClick={handlePlaceOrder}
              className={`w-full py-3 rounded-lg font-medium text-white ${orderSide === 'BUY' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
            >
              {orderSide === 'BUY' ? 'Mua/Long' : 'Bán/Short'} {selectedSymbol}
            </button>
          </div>
        </div>
      </div>
      
      {/* Bottom section - Positions and Orders tabs */}
      <div className="mt-6 bg-gray-800/30 rounded-xl border border-gray-700 overflow-hidden">
        <div className="flex border-b border-gray-700">
          <button
            type="button"
            onClick={() => setTabView('positions')}
            className={`flex-1 py-3 text-center font-medium ${tabView === 'positions' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-400'}`}
          >
            Vị thế đang mở
          </button>
          <button
            type="button"
            onClick={() => setTabView('orders')}
            className={`flex-1 py-3 text-center font-medium ${tabView === 'orders' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-400'}`}
          >
            Lệnh đang chờ
          </button>
        </div>
        
        {/* Positions tab */}
        {tabView === 'positions' && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Cặp</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Vị thế</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Kích thước</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Đòn bẩy</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Giá vào lệnh</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Giá thanh lý</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">P&L</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {mockPositions.length > 0 ? mockPositions.map((position, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-800/20' : 'bg-gray-800/40'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{position.symbol}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${position.side === 'LONG' ? 'text-green-500' : 'text-red-500'}`}>
                      {position.side}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{position.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{position.leverage}x</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">${position.entryPrice.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-500">${position.liquidationPrice.toLocaleString()}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${position.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      ${position.pnl.toFixed(2)} ({position.pnlPercent.toFixed(2)}%)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button type="button" className="bg-blue-600 px-3 py-1 rounded text-white text-xs mr-2">TP/SL</button>
                      <button type="button" className="bg-red-600 px-3 py-1 rounded text-white text-xs">Đóng</button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-400">Không có vị thế nào đang mở</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Orders tab */}
        {tabView === 'orders' && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Cặp</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Loại</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Phía</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Kích thước</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Giá</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Trạng thái</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Thời gian</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {mockOrders.length > 0 ? mockOrders.map((order) => (
                  <tr key={order.id} className="bg-gray-800/20">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{order.symbol}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{order.type}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${order.side === 'BUY' ? 'text-green-500' : 'text-red-500'}`}>
                      {order.side}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{order.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">${order.price?.toLocaleString() || order.triggerPrice?.toLocaleString() || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{order.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{order.timestamp.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button type="button" className="bg-red-600 px-3 py-1 rounded text-white text-xs">Hủy</button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-400">Không có lệnh nào đang chờ</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default FuturesPage;