const express = require('express');
const router = express.Router();

// Dữ liệu mẫu cho các khóa học
const courses = [
  {
    id: 'btc-basics',
    title: 'Nhập môn Bitcoin và Blockchain',
    description: 'Hiểu rõ về các nguyên lý cơ bản của Bitcoin và công nghệ blockchain nền tảng.',
    level: 'Cơ bản',
    duration: '4 giờ',
    lessons: 12,
    instructor: 'Michael Chen',
    rating: 4.8,
    reviews: 1254,
    category: 'Blockchain',
    thumbnail: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d',
    price: 0,
    isFeatured: true
  },
  {
    id: 'trading-basics',
    title: 'Giao dịch Crypto cho người mới bắt đầu',
    description: 'Học cách đọc biểu đồ, thực hiện phân tích cơ bản và kỹ thuật cho người mới.',
    level: 'Cơ bản',
    duration: '6 giờ',
    lessons: 18,
    instructor: 'Sarah Johnson',
    rating: 4.7,
    reviews: 876,
    category: 'Giao dịch',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3',
    price: 0,
    isFeatured: true
  },
  {
    id: 'technical-analysis',
    title: 'Phân tích kỹ thuật nâng cao',
    description: 'Khóa học chuyên sâu về các mô hình biểu đồ, chỉ báo kỹ thuật và chiến lược giao dịch.',
    level: 'Trung cấp',
    duration: '10 giờ',
    lessons: 24,
    instructor: 'Robert Williams',
    rating: 4.9,
    reviews: 1542,
    category: 'Giao dịch',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3',
    price: 49,
    isFeatured: true
  },
  {
    id: 'defi-masterclass',
    title: 'DeFi Masterclass',
    description: 'Hiểu sâu về tài chính phi tập trung, các giao thức DeFi và cơ hội đầu tư.',
    level: 'Nâng cao',
    duration: '12 giờ',
    lessons: 30,
    instructor: 'Elena Zhang',
    rating: 4.8,
    reviews: 942,
    category: 'DeFi',
    thumbnail: 'https://images.unsplash.com/photo-1639322537228-f710d846310a',
    price: 99,
    isFeatured: false
  },
  {
    id: 'risk-management',
    title: 'Quản lý rủi ro trong giao dịch Crypto',
    description: 'Học cách bảo vệ vốn và xây dựng chiến lược giao dịch bền vững dài hạn.',
    level: 'Trung cấp',
    duration: '5 giờ',
    lessons: 15,
    instructor: 'David Park',
    rating: 4.6,
    reviews: 687,
    category: 'Giao dịch',
    thumbnail: 'https://images.unsplash.com/photo-1560221328-12fe60f83ab8',
    price: 39,
    isFeatured: false
  },
  {
    id: 'nft-investing',
    title: 'Đầu tư và giao dịch NFT',
    description: 'Khám phá thế giới NFT và cách xác định dự án tiềm năng để đầu tư.',
    level: 'Trung cấp',
    duration: '8 giờ',
    lessons: 20,
    instructor: 'Jessica Lee',
    rating: 4.7,
    reviews: 523,
    category: 'NFT',
    thumbnail: 'https://images.unsplash.com/photo-1646815079665-4a104a7329ca',
    price: 59,
    isFeatured: false
  }
];

// Dữ liệu mẫu cho các tài liệu học tập
const resources = [
  {
    id: 'ebook-crypto',
    title: 'Ebook: Toàn tập về tiền điện tử',
    description: 'Hướng dẫn toàn diện về tiền điện tử cho người mới bắt đầu.',
    type: 'Ebook',
    pages: 120,
    author: 'Crypto Academy',
    language: 'Tiếng Việt',
    downloads: 45280,
    format: 'PDF',
    thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c'
  },
  {
    id: 'guide-charts',
    title: 'Hướng dẫn đọc biểu đồ',
    description: 'Tất cả những gì bạn cần biết về cách đọc và phân tích biểu đồ giá cryptocurrency.',
    type: 'Hướng dẫn',
    pages: 45,
    author: 'Trading Team',
    language: 'Tiếng Việt',
    downloads: 38750,
    format: 'PDF',
    thumbnail: 'https://images.unsplash.com/photo-1642790551116-304f29ebc456'
  },
  {
    id: 'trading-glossary',
    title: 'Từ điển thuật ngữ giao dịch',
    description: 'Tổng hợp các thuật ngữ phổ biến trong thị trường cryptocurrency.',
    type: 'Từ điển',
    terms: 250,
    author: 'Education Department',
    language: 'Tiếng Việt',
    downloads: 26480,
    format: 'PDF',
    thumbnail: 'https://images.unsplash.com/photo-1456953180671-730de08edaa7'
  }
];

// Dữ liệu mẫu cho các webinar
const webinars = [
  {
    id: 'webinar-market-analysis',
    title: 'Phân tích thị trường Q3 2025',
    description: 'Phân tích thị trường cryptocurrency trong quý 3 năm 2025 và dự đoán xu hướng.',
    date: '2025-07-15T14:00:00Z',
    duration: '90 phút',
    speaker: 'John Smith, Chuyên gia phân tích thị trường',
    registrations: 1250,
    isFree: true,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71'
  },
  {
    id: 'webinar-defi-trends',
    title: 'Xu hướng DeFi mới nhất',
    description: 'Khám phá các xu hướng và cơ hội mới nhất trong không gian DeFi.',
    date: '2025-07-20T15:00:00Z',
    duration: '60 phút',
    speaker: 'Emma Rodriguez, Nhà sáng lập DeFi Labs',
    registrations: 875,
    isFree: true,
    thumbnail: 'https://images.unsplash.com/photo-1639322537180-d959bd2a0acd'
  }
];

// Route lấy tất cả khóa học
router.get('/courses', (req, res) => {
  res.json(courses);
});

// Route lấy chi tiết khóa học
router.get('/course/:id', (req, res) => {
  const course = courses.find(c => c.id === req.params.id);
  
  if (!course) {
    return res.status(404).json({ message: 'Không tìm thấy khóa học' });
  }
  
  res.json(course);
});

// Route lấy tất cả tài liệu học tập
router.get('/resources', (req, res) => {
  res.json(resources);
});

// Route lấy chi tiết tài liệu học tập
router.get('/resource/:id', (req, res) => {
  const resource = resources.find(r => r.id === req.params.id);
  
  if (!resource) {
    return res.status(404).json({ message: 'Không tìm thấy tài liệu học tập' });
  }
  
  res.json(resource);
});

// Route lấy tất cả webinar
router.get('/webinars', (req, res) => {
  res.json(webinars);
});

// Route lấy chi tiết webinar
router.get('/webinar/:id', (req, res) => {
  const webinar = webinars.find(w => w.id === req.params.id);
  
  if (!webinar) {
    return res.status(404).json({ message: 'Không tìm thấy webinar' });
  }
  
  res.json(webinar);
});

// Route đăng ký khóa học
router.post('/enroll', (req, res) => {
  const { courseId, userId } = req.body;
  
  // Giả lập việc đăng ký khóa học
  res.json({
    success: true,
    message: `Đã đăng ký thành công khóa học ${courseId}`,
    enrollmentId: `enr-${Date.now()}`,
    courseId,
    userId,
    enrollmentDate: new Date()
  });
});

// Route đăng ký webinar
router.post('/register-webinar', (req, res) => {
  const { webinarId, email } = req.body;
  
  // Giả lập việc đăng ký webinar
  res.json({
    success: true,
    message: `Đã đăng ký thành công webinar ${webinarId}`,
    registrationId: `reg-${Date.now()}`,
    webinarId,
    email,
    registrationDate: new Date()
  });
});

module.exports = router;
