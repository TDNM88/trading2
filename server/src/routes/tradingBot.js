const express = require('express');
const router = express.Router();

// Dữ liệu mẫu cho các bot giao dịch
const tradingBots = [
  {
    id: 'grid-bot',
    name: 'Bot Lưới (Grid Trading)',
    description: 'Giao dịch tự động trong khoảng giá định sẵn bằng cách đặt lệnh mua và bán đồng thời.',
    profitRate: '15-40%',
    riskLevel: 'Thấp',
    timeframe: 'Trung và dài hạn',
    bestFor: 'Thị trường sideway (đi ngang)',
    minCapital: 100,
    icon: 'grid',
    active: 5482,
    totalProfit: '1.85M USDT'
  },
  {
    id: 'martingale-bot',
    name: 'Bot Martingale',
    description: 'Tự động tăng kích thước vị thế sau mỗi lần thua lỗ để bù đắp khoản lỗ trước đó.',
    profitRate: '20-60%',
    riskLevel: 'Cao',
    timeframe: 'Ngắn hạn',
    bestFor: 'Thị trường có xu hướng mạnh',
    minCapital: 500,
    icon: 'trending-up',
    active: 2867,
    totalProfit: '2.34M USDT'
  },
  {
    id: 'cta-bot',
    name: 'Bot CTA (Copy Trading Automation)',
    description: 'Sao chép giao dịch từ các nhà giao dịch hàng đầu một cách tự động với tùy chỉnh quản lý rủi ro.',
    profitRate: '25-45%',
    riskLevel: 'Trung bình',
    timeframe: 'Đa dạng',
    bestFor: 'Người mới và người không có thời gian giao dịch',
    minCapital: 200,
    icon: 'copy',
    active: 8941,
    totalProfit: '3.92M USDT'
  },
  {
    id: 'ai-bot',
    name: 'Bot Trí Tuệ Nhân Tạo',
    description: 'Sử dụng học máy và AI để phân tích thị trường và đưa ra quyết định giao dịch tự động.',
    profitRate: '30-70%',
    riskLevel: 'Trung bình-Cao',
    timeframe: 'Đa dạng',
    bestFor: 'Thị trường biến động',
    minCapital: 1000,
    icon: 'brain',
    active: 1543,
    totalProfit: '1.67M USDT'
  }
];

// Dữ liệu cấu hình mẫu cho bot
const botConfigurations = [
  {
    botId: 'grid-bot',
    pairOptions: ['BTC/USDT', 'ETH/USDT', 'BNB/USDT', 'SOL/USDT', 'XRP/USDT'],
    gridLevels: [5, 10, 15, 20, 30, 50, 100],
    profitPerGrid: [0.5, 0.8, 1, 1.5, 2, 3, 5],
    timeframes: ['4h', '1d', '3d', '1w']
  },
  {
    botId: 'martingale-bot',
    pairOptions: ['BTC/USDT', 'ETH/USDT', 'BNB/USDT', 'ADA/USDT', 'DOT/USDT', 'LINK/USDT'],
    leverageOptions: [1, 2, 3, 5, 10, 20],
    startingPositionSizes: [10, 20, 50, 100, 200, 500],
    maxPositions: [3, 5, 7, 10],
    timeframes: ['15m', '1h', '4h', '1d']
  },
  {
    botId: 'cta-bot',
    tradersToFollow: ['trader1', 'trader2', 'trader3', 'trader4', 'trader5'],
    positionSizePercentages: [10, 20, 30, 50, 100],
    maxConcurrentTrades: [3, 5, 10, 20],
    stopLossPercentages: [5, 10, 15, 20]
  },
  {
    botId: 'ai-bot',
    models: ['Trend Predictor', 'Pattern Recognition', 'News Sentiment', 'Hybrid'],
    timeframes: ['5m', '15m', '1h', '4h', '1d'],
    riskLevels: ['Conservative', 'Balanced', 'Aggressive'],
    indicators: ['MACD', 'RSI', 'Bollinger Bands', 'Moving Averages', 'Volume Profile']
  }
];

// Dữ liệu hiệu suất bot
const botPerformance = [
  {
    botId: 'grid-bot',
    dailyProfit: 0.8,
    weeklyProfit: 4.7,
    monthlyProfit: 18.5,
    yearlyProfit: 92.4,
    winRate: 89,
    avgTradesPerDay: 12
  },
  {
    botId: 'martingale-bot',
    dailyProfit: 1.2,
    weeklyProfit: 7.8,
    monthlyProfit: 32.4,
    yearlyProfit: 128.7,
    winRate: 75,
    avgTradesPerDay: 8
  },
  {
    botId: 'cta-bot',
    dailyProfit: 0.9,
    weeklyProfit: 6.2,
    monthlyProfit: 25.1,
    yearlyProfit: 105.6,
    winRate: 82,
    avgTradesPerDay: 15
  },
  {
    botId: 'ai-bot',
    dailyProfit: 1.5,
    weeklyProfit: 9.8,
    monthlyProfit: 38.7,
    yearlyProfit: 152.3,
    winRate: 79,
    avgTradesPerDay: 22
  }
];

// Lấy danh sách tất cả các bot
router.get('/bots', (req, res) => {
  res.json(tradingBots);
});

// Lấy thông tin chi tiết về bot
router.get('/bot/:id', (req, res) => {
  const bot = tradingBots.find(b => b.id === req.params.id);
  
  if (!bot) {
    return res.status(404).json({ message: 'Không tìm thấy bot' });
  }
  
  // Kết hợp thông tin bot với cấu hình và hiệu suất
  const config = botConfigurations.find(c => c.botId === bot.id);
  const performance = botPerformance.find(p => p.botId === bot.id);
  
  res.json({
    ...bot,
    configuration: config,
    performance: performance
  });
});

// Lấy cấu hình có sẵn cho bot
router.get('/config/:botId', (req, res) => {
  const config = botConfigurations.find(c => c.botId === req.params.botId);
  
  if (!config) {
    return res.status(404).json({ message: 'Không tìm thấy cấu hình bot' });
  }
  
  res.json(config);
});

// Lấy dữ liệu hiệu suất của bot
router.get('/performance/:botId', (req, res) => {
  const performance = botPerformance.find(p => p.botId === req.params.botId);
  
  if (!performance) {
    return res.status(404).json({ message: 'Không tìm thấy dữ liệu hiệu suất' });
  }
  
  res.json(performance);
});

// Tạo bot mới
router.post('/create', (req, res) => {
  const { botType, configuration } = req.body;
  
  // Giả lập việc tạo bot
  res.json({
    success: true,
    message: `Đã tạo bot ${botType} thành công`,
    botId: `${botType}-${Date.now()}`,
    configuration,
    createdAt: new Date()
  });
});

// Bật/tắt bot
router.post('/toggle/:botId', (req, res) => {
  const { status } = req.body; // 'active' hoặc 'inactive'
  
  res.json({
    success: true,
    message: `Đã ${status === 'active' ? 'kích hoạt' : 'tắt'} bot ${req.params.botId}`,
    botId: req.params.botId,
    status,
    timestamp: new Date()
  });
});

module.exports = router;
