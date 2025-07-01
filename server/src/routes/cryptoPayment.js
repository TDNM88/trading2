const express = require('express');
const router = express.Router();

// Dữ liệu mẫu cho các phương thức thanh toán crypto
const paymentMethods = [
  {
    id: 'crypto-card',
    name: 'Thẻ Crypto',
    description: 'Thẻ Visa/Mastercard được liên kết với tài khoản crypto của bạn, cho phép chi tiêu trực tiếp từ số dư crypto.',
    benefits: [
      'Chấp nhận tại hơn 40 triệu điểm bán trên toàn thế giới',
      'Chuyển đổi tự động từ crypto sang fiat khi chi tiêu',
      'Cashback lên đến 8% cho mọi giao dịch',
      'Không phí phát hành và phí thường niên',
      'Bảo mật cao với xác thực 2 yếu tố'
    ],
    supportedCurrencies: ['BTC', 'ETH', 'USDT', 'USDC', 'BNB', 'SOL'],
    limits: {
      daily: 10000,
      monthly: 50000
    },
    fees: '0.5% cho mỗi giao dịch',
    image: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05',
    isPopular: true
  },
  {
    id: 'qr-payment',
    name: 'Thanh toán QR',
    description: 'Quét mã QR để thanh toán nhanh chóng bằng crypto tại các cửa hàng và doanh nghiệp hỗ trợ.',
    benefits: [
      'Thanh toán nhanh chóng trong vài giây',
      'Không cần thiết bị đặc biệt, chỉ cần điện thoại thông minh',
      'Hoàn toàn miễn phí cho người dùng',
      'Lịch sử giao dịch được lưu trữ và dễ dàng truy cập',
      'Tích hợp với ví di động'
    ],
    supportedCurrencies: ['BTC', 'ETH', 'USDT', 'USDC', 'BNB', 'SOL', 'XRP', 'ADA'],
    limits: {
      perTransaction: 5000
    },
    fees: 'Miễn phí',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040',
    isPopular: true
  },
  {
    id: 'pay-to-email',
    name: 'Thanh toán đến Email',
    description: 'Gửi crypto đến bất kỳ địa chỉ email nào, ngay cả khi người nhận chưa có ví crypto.',
    benefits: [
      'Gửi tiền cho bất kỳ ai có địa chỉ email',
      'Người nhận sẽ nhận được hướng dẫn cách nhận tiền',
      'Bảo mật với mã xác nhận',
      'Hoàn tiền tự động nếu không được nhận trong 7 ngày',
      'Tích hợp với hệ thống thông báo'
    ],
    supportedCurrencies: ['BTC', 'ETH', 'USDT', 'USDC', 'BNB'],
    limits: {
      perTransaction: 1000,
      daily: 5000
    },
    fees: '1 USD cho mỗi giao dịch',
    image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2',
    isPopular: false
  },
  {
    id: 'subscription',
    name: 'Thanh toán định kỳ',
    description: 'Thiết lập thanh toán tự động định kỳ bằng crypto cho các dịch vụ đăng ký và hóa đơn.',
    benefits: [
      'Tự động thanh toán theo lịch đã đặt',
      'Linh hoạt với các tùy chọn tần suất (hàng tuần, hàng tháng, hàng quý)',
      'Thông báo trước khi thanh toán',
      'Dễ dàng hủy hoặc điều chỉnh bất kỳ lúc nào',
      'Lưu trữ hóa đơn tự động'
    ],
    supportedCurrencies: ['USDT', 'USDC', 'BTC', 'ETH'],
    limits: {
      perTransaction: 2000,
      monthly: 10000
    },
    fees: '0.5% cho mỗi giao dịch',
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0',
    isPopular: false
  }
];

// Dữ liệu mẫu cho các loại ví crypto
const cryptoWallets = [
  {
    id: 'mobile-wallet',
    name: 'Ví di động Bitget',
    description: 'Ví crypto an toàn và dễ sử dụng trên thiết bị di động của bạn.',
    features: [
      'Hỗ trợ hơn 10,000 loại tiền điện tử',
      'Tính năng bảo mật tiên tiến với Face ID và Touch ID',
      'Tích hợp sẵn với sàn giao dịch Bitget',
      'Theo dõi giá và thông báo tùy chỉnh',
      'Giao diện thân thiện với người dùng'
    ],
    platforms: ['iOS', 'Android'],
    rating: 4.8,
    downloads: '5M+',
    image: 'https://images.unsplash.com/photo-1592781959775-4bb076efbbfe'
  },
  {
    id: 'web-wallet',
    name: 'Ví Web Bitget',
    description: 'Truy cập ví crypto của bạn từ bất kỳ trình duyệt web nào.',
    features: [
      'Không cần cài đặt phần mềm',
      'Truy cập từ mọi thiết bị có kết nối internet',
      'Xác thực hai yếu tố',
      'Dễ dàng chuyển đổi giữa các tài khoản',
      'Lịch sử giao dịch chi tiết'
    ],
    platforms: ['Chrome', 'Firefox', 'Safari', 'Edge'],
    rating: 4.6,
    users: '3M+',
    image: 'https://images.unsplash.com/photo-1581822261290-991b38693d1b'
  },
  {
    id: 'hardware-wallet',
    name: 'Ví phần cứng Bitget',
    description: 'Giải pháp bảo mật cao cấp để lưu trữ crypto offline.',
    features: [
      'Bảo mật cấp quân đội với chip bảo mật riêng biệt',
      'Hỗ trợ hơn 5,000 loại tiền điện tử',
      'Khóa private key không bao giờ rời khỏi thiết bị',
      'Tương thích với các ứng dụng DeFi phổ biến',
      'Thiết kế nhỏ gọn, dễ mang theo'
    ],
    platforms: ['USB', 'Bluetooth'],
    rating: 4.9,
    price: '$79.99',
    image: 'https://images.unsplash.com/photo-1559589689-577aabd1db4f'
  }
];

// Dữ liệu mẫu cho thống kê thanh toán
const paymentStats = {
  totalTransactions: 8574962,
  totalVolume: '12.7B USDT',
  averageTransactionValue: 1482,
  mostPopularCurrency: 'USDT',
  fastestGrowingMethod: 'Thẻ Crypto',
  merchantCount: 125840
};

// Route lấy tất cả phương thức thanh toán
router.get('/methods', (req, res) => {
  res.json(paymentMethods);
});

// Route lấy chi tiết phương thức thanh toán
router.get('/method/:id', (req, res) => {
  const method = paymentMethods.find(m => m.id === req.params.id);
  
  if (!method) {
    return res.status(404).json({ message: 'Không tìm thấy phương thức thanh toán' });
  }
  
  res.json(method);
});

// Route lấy tất cả ví crypto
router.get('/wallets', (req, res) => {
  res.json(cryptoWallets);
});

// Route lấy chi tiết ví crypto
router.get('/wallet/:id', (req, res) => {
  const wallet = cryptoWallets.find(w => w.id === req.params.id);
  
  if (!wallet) {
    return res.status(404).json({ message: 'Không tìm thấy ví crypto' });
  }
  
  res.json(wallet);
});

// Route lấy thống kê thanh toán
router.get('/stats', (req, res) => {
  res.json(paymentStats);
});

// Route xử lý thanh toán mới
router.post('/process', (req, res) => {
  const { method, amount, currency, recipient } = req.body;
  
  // Giả lập xử lý thanh toán
  res.json({
    success: true,
    message: `Đã xử lý thanh toán ${amount} ${currency} sử dụng phương thức ${method}`,
    transactionId: `tx-${Date.now()}`,
    amount,
    currency,
    recipient,
    timestamp: new Date()
  });
});

module.exports = router;
