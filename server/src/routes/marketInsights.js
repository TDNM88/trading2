const express = require('express');
const router = express.Router();

// Dữ liệu mẫu cho tin tức thị trường
const marketNews = [
  {
    id: 'news1',
    title: 'Bitcoin có thể đạt 100.000 USD trước cuối năm 2025',
    summary: 'Các nhà phân tích dự đoán Bitcoin sẽ tăng mạnh do áp lực thiếu nguồn cung sau halving và sự chấp nhận rộng rãi của các tổ chức tài chính.',
    content: 'Các chuyên gia phân tích thị trường từ Standard Chartered và Ark Invest dự báo Bitcoin có thể đạt mốc 100.000 USD trước cuối năm 2025. Nguyên nhân chủ yếu đến từ việc nguồn cung bị hạn chế sau sự kiện halving, trong khi nhu cầu từ các nhà đầu tư tổ chức và các ETF tiếp tục tăng mạnh.',
    category: 'Phân tích cơ bản',
    author: 'Michael Thompson',
    date: '2025-07-01',
    sentiment: 'bullish',
    image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d',
    tags: ['Bitcoin', 'Halving', 'ETF', 'Institutional']
  },
  {
    id: 'news2',
    title: 'Ethereum chuẩn bị ra mắt bản nâng cấp Cancun-Deneb vào tháng 8',
    summary: 'Bản nâng cấp mới nhất của Ethereum hứa hẹn cải thiện hiệu suất và giảm phí giao dịch đáng kể.',
    content: 'Ethereum Foundation vừa công bố lịch trình chính thức cho bản nâng cấp Cancun-Deneb dự kiến diễn ra vào tháng 8 năm 2025.',
    category: 'Công nghệ',
    author: 'Elena Rodriguez',
    date: '2025-07-01',
    sentiment: 'bullish',
    image: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05',
    tags: ['Ethereum', 'Cancun', 'Deneb', 'EIP-4844']
  },
  {
    id: 'news3',
    title: 'SEC bất ngờ phê duyệt ETF Ethereum Spot đầu tiên',
    summary: 'Động thái này đánh dấu sự thay đổi lớn trong quan điểm của cơ quan quản lý đối với tài sản crypto.',
    content: 'Trong một động thái bất ngờ, Ủy ban Chứng khoán và Giao dịch Mỹ (SEC) đã phê duyệt đơn đăng ký ETF Ethereum Spot đầu tiên từ BlackRock và Fidelity.',
    category: 'Quy định',
    author: 'David Chang',
    date: '2025-06-30',
    sentiment: 'bullish',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040',
    tags: ['Ethereum', 'ETF', 'SEC', 'Regulation']
  },
  {
    id: 'news4',
    title: 'Cảnh báo: Mẫu hình đảo chiều xuất hiện trên biểu đồ BTC',
    summary: 'Các nhà phân tích kỹ thuật cảnh báo về mẫu hình double top trên biểu đồ hàng ngày của Bitcoin.',
    content: 'Các chuyên gia phân tích kỹ thuật từ TradingView và CryptoQuant đang cảnh báo về sự xuất hiện của một mẫu hình đảo chiều double top trên biểu đồ hàng ngày của Bitcoin.',
    category: 'Phân tích kỹ thuật',
    author: 'Sarah Johnson',
    date: '2025-06-30',
    sentiment: 'bearish',
    image: 'https://images.unsplash.com/photo-1624996379697-f01d168b1a52',
    tags: ['Bitcoin', 'Technical Analysis', 'Double Top', 'Price Prediction']
  }
];

// Dữ liệu mẫu cho phân tích kỹ thuật
const technicalAnalysis = [
  {
    id: 'ta1',
    title: 'Phân tích BTC: Xu hướng tăng vẫn tiếp diễn',
    summary: 'Bitcoin vẫn duy trì xu hướng tăng dài hạn với các mức hỗ trợ mạnh.',
    content: 'Bitcoin vẫn đang trong xu hướng tăng giá dài hạn dù có những điều chỉnh ngắn hạn. Các đường trung bình động 50 và 200 ngày tiếp tục cho tín hiệu golden cross.',
    symbol: 'BTC/USDT',
    timeframe: '1d',
    author: 'Alex Turner',
    date: '2025-07-01',
    sentiment: 'bullish',
    image: 'https://images.unsplash.com/photo-1621761119247-5953c63579b6',
    indicators: ['MA', 'RSI', 'MACD', 'Volume']
  },
  {
    id: 'ta2',
    title: 'Phân tích ETH: Vùng giá 4.000 USD là mức kháng cự mạnh',
    summary: 'Ethereum gặp khó khăn tại ngưỡng tâm lý quan trọng 4.000 USD.',
    content: 'Ethereum đang phải đối mặt với áp lực bán mạnh tại ngưỡng tâm lý 4.000 USD. Sau 3 lần kiểm tra không thành công, đây tiếp tục là mức kháng cự mạnh cần vượt qua.',
    symbol: 'ETH/USDT',
    timeframe: '1d',
    author: 'Maria Chen',
    date: '2025-06-30',
    sentiment: 'neutral',
    image: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05',
    indicators: ['Fibonacci', 'RSI', 'MACD', 'Volume']
  }
];

// Route lấy tin tức thị trường
router.get('/news', (req, res) => {
  res.json(marketNews);
});

// Route lấy chi tiết tin tức
router.get('/news/:id', (req, res) => {
  const news = marketNews.find(n => n.id === req.params.id);
  
  if (!news) {
    return res.status(404).json({ message: 'Không tìm thấy tin tức' });
  }
  
  res.json(news);
});

// Route lấy phân tích kỹ thuật
router.get('/technical', (req, res) => {
  res.json(technicalAnalysis);
});

// Route lấy chi tiết phân tích kỹ thuật
router.get('/technical/:id', (req, res) => {
  const analysis = technicalAnalysis.find(a => a.id === req.params.id);
  
  if (!analysis) {
    return res.status(404).json({ message: 'Không tìm thấy phân tích kỹ thuật' });
  }
  
  res.json(analysis);
});

module.exports = router;
