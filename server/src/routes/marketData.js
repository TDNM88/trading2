const express = require('express');
const router = express.Router();

// Dữ liệu mẫu cho giá tiền điện tử
const cryptoPrices = [
  {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 68452.75,
    change24h: 2.34,
    high24h: 68950.20,
    low24h: 66780.45,
    volume24h: 42587654321,
    marketCap: 1328764591000,
    circulatingSupply: 19410625,
    totalSupply: 21000000,
    ath: 73800.50,
    athDate: '2025-05-15T14:30:00Z',
    image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png'
  },
  {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    price: 4285.32,
    change24h: 3.87,
    high24h: 4310.75,
    low24h: 4120.80,
    volume24h: 28796543210,
    marketCap: 514236789000,
    circulatingSupply: 120000000,
    totalSupply: null,
    ath: 4850.25,
    athDate: '2025-06-01T09:15:00Z',
    image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png'
  },
  {
    id: 'solana',
    symbol: 'SOL',
    name: 'Solana',
    price: 186.45,
    change24h: 5.62,
    high24h: 190.20,
    low24h: 175.30,
    volume24h: 7865432100,
    marketCap: 89574632000,
    circulatingSupply: 480000000,
    totalSupply: 520000000,
    ath: 215.75,
    athDate: '2025-06-10T11:20:00Z',
    image: 'https://cryptologos.cc/logos/solana-sol-logo.png'
  },
  {
    id: 'binancecoin',
    symbol: 'BNB',
    name: 'BNB',
    price: 625.80,
    change24h: 1.25,
    high24h: 630.45,
    low24h: 615.20,
    volume24h: 3256789000,
    marketCap: 96325478000,
    circulatingSupply: 153900000,
    totalSupply: 170000000,
    ath: 710.15,
    athDate: '2025-04-20T16:45:00Z',
    image: 'https://cryptologos.cc/logos/bnb-bnb-logo.png'
  },
  {
    id: 'ripple',
    symbol: 'XRP',
    name: 'XRP',
    price: 1.85,
    change24h: -0.75,
    high24h: 1.92,
    low24h: 1.82,
    volume24h: 4523698700,
    marketCap: 89621475000,
    circulatingSupply: 48500000000,
    totalSupply: 100000000000,
    ath: 2.35,
    athDate: '2025-05-25T08:30:00Z',
    image: 'https://cryptologos.cc/logos/xrp-xrp-logo.png'
  },
  {
    id: 'cardano',
    symbol: 'ADA',
    name: 'Cardano',
    price: 1.24,
    change24h: 4.32,
    high24h: 1.28,
    low24h: 1.18,
    volume24h: 2987654000,
    marketCap: 54123698000,
    circulatingSupply: 43700000000,
    totalSupply: 45000000000,
    ath: 1.85,
    athDate: '2025-06-05T13:10:00Z',
    image: 'https://cryptologos.cc/logos/cardano-ada-logo.png'
  },
  {
    id: 'polkadot',
    symbol: 'DOT',
    name: 'Polkadot',
    price: 32.85,
    change24h: 2.15,
    high24h: 33.20,
    low24h: 31.80,
    volume24h: 1875632000,
    marketCap: 42568974000,
    circulatingSupply: 1300000000,
    totalSupply: 1400000000,
    ath: 38.75,
    athDate: '2025-05-10T10:00:00Z',
    image: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png'
  },
  {
    id: 'dogecoin',
    symbol: 'DOGE',
    name: 'Dogecoin',
    price: 0.28,
    change24h: 8.75,
    high24h: 0.29,
    low24h: 0.25,
    volume24h: 5123456000,
    marketCap: 38975632000,
    circulatingSupply: 139200000000,
    totalSupply: null,
    ath: 0.34,
    athDate: '2025-05-30T20:45:00Z',
    image: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png'
  }
];

// Dữ liệu mẫu cho lịch sử giá của Bitcoin
const btcHistoricalData = {
  daily: generateHistoricalPriceData(30, 65000, 69000),
  hourly: generateHistoricalPriceData(24, 67500, 68500),
  weekly: generateHistoricalPriceData(12, 60000, 69000),
  monthly: generateHistoricalPriceData(12, 55000, 69000),
  yearly: generateHistoricalPriceData(12, 45000, 69000)
};

// Dữ liệu mẫu cho thị trường tổng thể
const marketOverview = {
  totalMarketCap: 2.45, // Đơn vị: Nghìn tỷ USD
  totalVolume24h: 187.5, // Đơn vị: Tỷ USD
  btcDominance: 45.2,
  ethDominance: 19.8,
  totalCryptocurrencies: 12845,
  totalExchanges: 384,
  topGainers: [
    { symbol: 'DOGE', name: 'Dogecoin', change24h: 8.75 },
    { symbol: 'SOL', name: 'Solana', change24h: 5.62 },
    { symbol: 'ADA', name: 'Cardano', change24h: 4.32 }
  ],
  topLosers: [
    { symbol: 'XRP', name: 'XRP', change24h: -0.75 },
    { symbol: 'LINK', name: 'Chainlink', change24h: -1.25 },
    { symbol: 'AVAX', name: 'Avalanche', change24h: -2.10 }
  ]
};

// Dữ liệu mẫu cho thị trường giao dịch
const tradingMarkets = [
  {
    pair: 'BTC/USDT',
    price: 68452.75,
    change24h: 2.34,
    high24h: 68950.20,
    low24h: 66780.45,
    volume24h: 42587654321,
    volumeQuote: 2915487632,
    bidPrice: 68450.25,
    askPrice: 68455.50,
    spreadPercentage: 0.008,
    isHot: true
  },
  {
    pair: 'ETH/USDT',
    price: 4285.32,
    change24h: 3.87,
    high24h: 4310.75,
    low24h: 4120.80,
    volume24h: 28796543210,
    volumeQuote: 1234587600,
    bidPrice: 4285.00,
    askPrice: 4285.75,
    spreadPercentage: 0.017,
    isHot: true
  },
  {
    pair: 'SOL/USDT',
    price: 186.45,
    change24h: 5.62,
    high24h: 190.20,
    low24h: 175.30,
    volume24h: 7865432100,
    volumeQuote: 1467890234,
    bidPrice: 186.40,
    askPrice: 186.55,
    spreadPercentage: 0.08,
    isHot: true
  },
  {
    pair: 'BNB/USDT',
    price: 625.80,
    change24h: 1.25,
    high24h: 630.45,
    low24h: 615.20,
    volume24h: 3256789000,
    volumeQuote: 2035798100,
    bidPrice: 625.70,
    askPrice: 625.95,
    spreadPercentage: 0.04,
    isHot: false
  },
  {
    pair: 'XRP/USDT',
    price: 1.85,
    change24h: -0.75,
    high24h: 1.92,
    low24h: 1.82,
    volume24h: 4523698700,
    volumeQuote: 8369841595,
    bidPrice: 1.849,
    askPrice: 1.851,
    spreadPercentage: 0.11,
    isHot: false
  }
];

// Hàm tạo dữ liệu lịch sử giá ngẫu nhiên
function generateHistoricalPriceData(count, minPrice, maxPrice) {
  const now = new Date();
  const data = [];
  
  for (let i = 0; i < count; i++) {
    const timestamp = new Date(now);
    timestamp.setDate(now.getDate() - (count - i));
    
    const randomPrice = minPrice + Math.random() * (maxPrice - minPrice);
    const volume = 10000000000 + Math.random() * 50000000000;
    
    data.push({
      timestamp: timestamp.toISOString(),
      price: parseFloat(randomPrice.toFixed(2)),
      volume: Math.floor(volume),
      marketCap: parseFloat(randomPrice.toFixed(2)) * 19410625
    });
  }
  
  return data;
}

// Route lấy tất cả giá tiền điện tử
router.get('/prices', (req, res) => {
  res.json(cryptoPrices);
});

// Route lấy giá của một tiền điện tử cụ thể
router.get('/price/:id', (req, res) => {
  const coin = cryptoPrices.find(c => c.id === req.params.id);
  
  if (!coin) {
    return res.status(404).json({ message: 'Không tìm thấy tiền điện tử' });
  }
  
  res.json(coin);
});

// Route lấy dữ liệu lịch sử giá của Bitcoin
router.get('/history/btc', (req, res) => {
  const { interval = 'daily' } = req.query;
  
  if (!btcHistoricalData[interval]) {
    return res.status(400).json({ message: 'Khoảng thời gian không hợp lệ' });
  }
  
  res.json(btcHistoricalData[interval]);
});

// Route lấy tổng quan thị trường
router.get('/overview', (req, res) => {
  res.json(marketOverview);
});

// Route lấy thị trường giao dịch
router.get('/markets', (req, res) => {
  res.json(tradingMarkets);
});

// Route lấy chi tiết một cặp giao dịch
router.get('/market/:pair', (req, res) => {
  const market = tradingMarkets.find(m => m.pair.replace('/', '') === req.params.pair);
  
  if (!market) {
    return res.status(404).json({ message: 'Không tìm thấy cặp giao dịch' });
  }
  
  res.json(market);
});

module.exports = router;
