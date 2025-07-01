const express = require('express');
const router = express.Router();

// Dữ liệu mẫu cho top traders
const topTraders = [
  {
    id: 'trader1',
    name: 'Alex Crypto',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    profit: 289.4,
    profitPercentage: 28.9,
    followers: 5840,
    winRate: 92,
    tradingPairs: ['BTC/USDT', 'ETH/USDT', 'SOL/USDT'],
    description: 'Chiến lược giao dịch theo xu hướng dài hạn',
    riskLevel: 'Thấp',
    verified: true
  },
  {
    id: 'trader2',
    name: 'Sophia Trading',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    profit: 932.7,
    profitPercentage: 93.2,
    followers: 12453,
    winRate: 87,
    tradingPairs: ['BTC/USDT', 'ADA/USDT', 'XRP/USDT', 'DOT/USDT'],
    description: 'Giao dịch biến động ngắn hạn với đòn bẩy thấp',
    riskLevel: 'Trung bình',
    verified: true
  },
  {
    id: 'trader3',
    name: 'CryptoMaster',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    profit: 1482.3,
    profitPercentage: 148.2,
    followers: 8723,
    winRate: 81,
    tradingPairs: ['ETH/USDT', 'BNB/USDT', 'MATIC/USDT'],
    description: 'Kết hợp phân tích kỹ thuật và on-chain',
    riskLevel: 'Cao',
    verified: true
  },
  {
    id: 'trader4',
    name: 'Emma Strategy',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    profit: 576.8,
    profitPercentage: 57.6,
    followers: 3265,
    winRate: 90,
    tradingPairs: ['BTC/USDT', 'ETH/USDT', 'AVAX/USDT', 'ATOM/USDT'],
    description: 'Chiến lược DCA với cặp tiền top market cap',
    riskLevel: 'Thấp',
    verified: true
  },
  {
    id: 'trader5',
    name: 'LunarTrade',
    avatar: 'https://randomuser.me/api/portraits/men/62.jpg',
    profit: 762.5,
    profitPercentage: 76.2,
    followers: 6731,
    winRate: 84,
    tradingPairs: ['BTC/USDT', 'ETH/USDT', 'LINK/USDT'],
    description: 'Scalping và giao dịch theo momentum',
    riskLevel: 'Trung bình',
    verified: true
  },
  {
    id: 'trader6',
    name: 'Crypto Kelly',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    profit: 429.6,
    profitPercentage: 42.9,
    followers: 2841,
    winRate: 88,
    tradingPairs: ['BTC/USDT', 'ETH/USDT', 'DOT/USDT'],
    description: 'Giao dịch theo tin tức và phân tích cơ bản',
    riskLevel: 'Trung bình',
    verified: true
  }
];

// Dữ liệu thống kê cho copy trading
const copyTradingStats = {
  totalTraders: 326,
  totalFollowers: 158450,
  averageProfit: 62.4,
  topProfit: 284.7,
  totalTradingVolume: '2.86B USDT'
};

// Dữ liệu hoạt động gần đây
const recentActivities = [
  {
    id: 'act1',
    trader: 'Alex Crypto',
    action: 'opened',
    pair: 'BTC/USDT',
    position: 'long',
    amount: 0.25,
    price: 62480,
    timestamp: Date.now() - 1000 * 60 * 5
  },
  {
    id: 'act2',
    trader: 'Sophia Trading',
    action: 'closed',
    pair: 'ETH/USDT',
    position: 'short',
    amount: 3.5,
    price: 3250,
    profit: 12.4,
    timestamp: Date.now() - 1000 * 60 * 15
  },
  {
    id: 'act3',
    trader: 'CryptoMaster',
    action: 'opened',
    pair: 'SOL/USDT',
    position: 'long',
    amount: 45,
    price: 138.75,
    timestamp: Date.now() - 1000 * 60 * 30
  },
  {
    id: 'act4',
    trader: 'LunarTrade',
    action: 'closed',
    pair: 'BNB/USDT',
    position: 'long',
    amount: 8.2,
    price: 580.25,
    profit: 7.8,
    timestamp: Date.now() - 1000 * 60 * 50
  }
];

// Get all top traders
router.get('/top-traders', (req, res) => {
  res.json(topTraders);
});

// Get trader details by ID
router.get('/trader/:id', (req, res) => {
  const trader = topTraders.find(t => t.id === req.params.id);
  if (trader) {
    res.json(trader);
  } else {
    res.status(404).json({ message: 'Không tìm thấy trader' });
  }
});

// Get copy trading statistics
router.get('/stats', (req, res) => {
  res.json(copyTradingStats);
});

// Get recent activities
router.get('/activities', (req, res) => {
  res.json(recentActivities);
});

// Follow a trader
router.post('/follow/:id', (req, res) => {
  const { investment } = req.body;
  const traderId = req.params.id;
  
  // Mock response for following a trader
  res.json({
    success: true,
    message: `Đã bắt đầu sao chép giao dịch của trader ${traderId} với khoản đầu tư ${investment} USDT`,
    followId: `follow-${Date.now()}`,
    timestamp: new Date()
  });
});

// Unfollow a trader
router.post('/unfollow/:id', (req, res) => {
  const traderId = req.params.id;
  
  // Mock response for unfollowing a trader
  res.json({
    success: true,
    message: `Đã ngừng sao chép giao dịch của trader ${traderId}`,
    timestamp: new Date()
  });
});

module.exports = router;
