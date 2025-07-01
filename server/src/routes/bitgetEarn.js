const express = require('express');
const router = express.Router();

// Dữ liệu mẫu cho các sản phẩm staking
const stakingProducts = [
  {
    id: 'btc-staking',
    token: 'BTC',
    name: 'Bitcoin',
    icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
    apy: 8.5,
    minAmount: 0.001,
    maxAmount: 5,
    lockPeriod: 30, // ngày
    totalStaked: 1250.76,
    availableAmount: 425.5,
    participants: 4827
  },
  {
    id: 'eth-staking',
    token: 'ETH',
    name: 'Ethereum',
    icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    apy: 12.0,
    minAmount: 0.01,
    maxAmount: 100,
    lockPeriod: 60, // ngày
    totalStaked: 18540.25,
    availableAmount: 2500.75,
    participants: 8962
  },
  {
    id: 'sol-staking',
    token: 'SOL',
    name: 'Solana',
    icon: 'https://cryptologos.cc/logos/solana-sol-logo.png',
    apy: 18.5,
    minAmount: 1,
    maxAmount: 1000,
    lockPeriod: 30, // ngày
    totalStaked: 385420,
    availableAmount: 52000,
    participants: 12453
  },
  {
    id: 'dot-staking',
    token: 'DOT',
    name: 'Polkadot',
    icon: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png',
    apy: 15.8,
    minAmount: 5,
    maxAmount: 2000,
    lockPeriod: 90, // ngày
    totalStaked: 245700,
    availableAmount: 31250,
    participants: 5842
  },
  {
    id: 'ada-staking',
    token: 'ADA',
    name: 'Cardano',
    icon: 'https://cryptologos.cc/logos/cardano-ada-logo.png',
    apy: 10.2,
    minAmount: 100,
    maxAmount: 50000,
    lockPeriod: 30, // ngày
    totalStaked: 15840000,
    availableAmount: 2450000,
    participants: 7294
  },
  {
    id: 'bnb-staking',
    token: 'BNB',
    name: 'Binance Coin',
    icon: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
    apy: 11.5,
    minAmount: 0.1,
    maxAmount: 100,
    lockPeriod: 60, // ngày
    totalStaked: 24850,
    availableAmount: 3750,
    participants: 6821
  }
];

// Dữ liệu mẫu cho các sản phẩm tiết kiệm
const savingsProducts = [
  {
    id: 'usdt-savings',
    token: 'USDT',
    name: 'Tether',
    icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
    apy: 12.5,
    minAmount: 10,
    maxAmount: 100000,
    term: 'Flexible',
    totalDeposited: 28540000,
    participants: 24853
  },
  {
    id: 'usdc-savings',
    token: 'USDC',
    name: 'USD Coin',
    icon: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
    apy: 13.2,
    minAmount: 10,
    maxAmount: 100000,
    term: 'Flexible',
    totalDeposited: 18750000,
    participants: 19862
  },
  {
    id: 'dai-savings',
    token: 'DAI',
    name: 'Dai',
    icon: 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png',
    apy: 11.8,
    minAmount: 10,
    maxAmount: 50000,
    term: 'Flexible',
    totalDeposited: 12450000,
    participants: 15732
  },
  {
    id: 'busd-savings',
    token: 'BUSD',
    name: 'Binance USD',
    icon: 'https://cryptologos.cc/logos/binance-usd-busd-logo.png',
    apy: 12.0,
    minAmount: 10,
    maxAmount: 80000,
    term: 'Flexible',
    totalDeposited: 15720000,
    participants: 17854
  }
];

// Dữ liệu lịch sử staking của người dùng
const userStakingHistory = [
  {
    id: 'stk1',
    token: 'BTC',
    amount: 0.15,
    apy: 8.5,
    startDate: '2025-06-01',
    endDate: '2025-07-01',
    status: 'active',
    estimatedEarnings: 0.00106,
    currentEarnings: 0.00085
  },
  {
    id: 'stk2',
    token: 'ETH',
    amount: 2.5,
    apy: 12.0,
    startDate: '2025-05-15',
    endDate: '2025-07-15',
    status: 'active',
    estimatedEarnings: 0.125,
    currentEarnings: 0.078
  },
  {
    id: 'stk3',
    token: 'SOL',
    amount: 50,
    apy: 18.5,
    startDate: '2025-06-10',
    endDate: '2025-07-10',
    status: 'active',
    estimatedEarnings: 0.77,
    currentEarnings: 0.31
  },
  {
    id: 'stk4',
    token: 'DOT',
    amount: 100,
    apy: 15.8,
    startDate: '2025-04-01',
    endDate: '2025-07-01',
    status: 'completed',
    estimatedEarnings: 3.95,
    currentEarnings: 3.95
  }
];

// Dữ liệu thống kê earn
const earnStats = {
  totalEarnUsers: 325840,
  totalStakedValue: '1.85B USDT',
  averageApy: 12.8,
  topApy: 20.5,
  totalRewardsDistributed: '125.4M USDT'
};

// Lấy tất cả sản phẩm staking
router.get('/staking-products', (req, res) => {
  res.json(stakingProducts);
});

// Lấy chi tiết sản phẩm staking
router.get('/staking-product/:id', (req, res) => {
  const product = stakingProducts.find(p => p.id === req.params.id);
  
  if (!product) {
    return res.status(404).json({ message: 'Không tìm thấy sản phẩm staking' });
  }
  
  res.json(product);
});

// Lấy tất cả sản phẩm tiết kiệm
router.get('/savings-products', (req, res) => {
  res.json(savingsProducts);
});

// Lấy chi tiết sản phẩm tiết kiệm
router.get('/savings-product/:id', (req, res) => {
  const product = savingsProducts.find(p => p.id === req.params.id);
  
  if (!product) {
    return res.status(404).json({ message: 'Không tìm thấy sản phẩm tiết kiệm' });
  }
  
  res.json(product);
});

// Lấy lịch sử staking của người dùng
router.get('/user/history', (req, res) => {
  res.json(userStakingHistory);
});

// Lấy thống kê earn
router.get('/stats', (req, res) => {
  res.json(earnStats);
});

// Đặt staking mới
router.post('/stake', (req, res) => {
  const { productId, amount } = req.body;
  
  // Giả lập việc đặt staking
  res.json({
    success: true,
    message: `Đã stake thành công ${amount} cho sản phẩm ${productId}`,
    stakingId: `stk-${Date.now()}`,
    amount,
    timestamp: new Date()
  });
});

// Rút tiền từ staking
router.post('/unstake/:id', (req, res) => {
  const stakingId = req.params.id;
  
  // Giả lập việc rút tiền
  res.json({
    success: true,
    message: `Đã unstake thành công cho staking ${stakingId}`,
    stakingId,
    timestamp: new Date()
  });
});

// Đặt tiết kiệm mới
router.post('/save', (req, res) => {
  const { productId, amount } = req.body;
  
  // Giả lập việc đặt tiết kiệm
  res.json({
    success: true,
    message: `Đã đặt tiết kiệm thành công ${amount} cho sản phẩm ${productId}`,
    savingId: `sav-${Date.now()}`,
    amount,
    timestamp: new Date()
  });
});

module.exports = router;
