import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Video, FileText, Award, ArrowRight, Play } from 'lucide-react';

interface CourseItem {
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  type: 'video' | 'article' | 'tutorial';
  image: string;
}

const popularCourses: CourseItem[] = [
  {
    title: 'Cơ bản về tiền điện tử cho người mới bắt đầu',
    level: 'beginner',
    duration: '45 phút',
    type: 'video',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3'
  },
  {
    title: 'Phân tích kỹ thuật: Các mô hình nến Nhật Bản',
    level: 'intermediate',
    duration: '60 phút',
    type: 'tutorial',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3'
  },
  {
    title: 'Chiến lược quản lý rủi ro trong giao dịch',
    level: 'intermediate',
    duration: '30 phút',
    type: 'article',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3'
  },
  {
    title: 'Giao dịch hợp đồng tương lai nâng cao',
    level: 'advanced',
    duration: '90 phút',
    type: 'video',
    image: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?ixlib=rb-4.0.3'
  }
];

const TradingAcademy = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-[#0B1118]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Học Viện Giao Dịch</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Từ người mới đến chuyên gia: Nâng cao kiến thức giao dịch của bạn với các khóa học, hướng dẫn và bài viết miễn phí.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: Video,
              title: 'Video hướng dẫn',
              description: 'Học qua hướng dẫn trực quan từ các chuyên gia giao dịch hàng đầu.'
            },
            {
              icon: FileText,
              title: 'Bài viết & Hướng dẫn',
              description: 'Khám phá các bài viết chuyên sâu và hướng dẫn từng bước về giao dịch.'
            },
            {
              icon: Award,
              title: 'Chứng chỉ giao dịch',
              description: 'Nhận chứng chỉ sau khi hoàn thành các khóa học từ Học viện Bitget.'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800/30 rounded-lg p-6 border border-gray-700 hover:border-blue-500/50 transition-all"
            >
              <feature.icon className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 mb-4">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold">Khóa Học Phổ Biến</h3>
            <button className="text-blue-500 hover:text-blue-400 flex items-center text-sm">
              Xem tất cả khóa học <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCourses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-gray-800/30 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500/30 transition-all group"
              >
                <div className="relative h-40 overflow-hidden">
                  <div className={`absolute top-2 left-2 z-10 px-2 py-1 rounded text-xs font-medium ${
                    course.level === 'beginner' ? 'bg-green-500/80' : 
                    course.level === 'intermediate' ? 'bg-yellow-500/80' : 'bg-red-500/80'
                  }`}>
                    {course.level === 'beginner' ? 'Cơ bản' : 
                     course.level === 'intermediate' ? 'Trung cấp' : 'Nâng cao'}
                  </div>
                  
                  {course.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div 
                        whileHover={{ scale: 1.2 }}
                        className="bg-blue-600/80 rounded-full p-3 backdrop-blur-sm"
                      >
                        <Play className="h-8 w-8" />
                      </motion.div>
                    </div>
                  )}
                  
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).onerror = null;
                      (e.target as HTMLImageElement).src = 'https://placehold.co/800x400?text=Crypto+Course';
                    }}
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center text-sm text-gray-400 mb-2">
                    {course.type === 'video' ? (
                      <Video className="h-4 w-4 mr-1" />
                    ) : course.type === 'article' ? (
                      <FileText className="h-4 w-4 mr-1" />
                    ) : (
                      <BookOpen className="h-4 w-4 mr-1" />
                    )}
                    <span className="mr-3">{course.type === 'video' ? 'Video' : course.type === 'article' ? 'Bài viết' : 'Hướng dẫn'}</span>
                    <span>{course.duration}</span>
                  </div>
                  <h4 className="font-semibold line-clamp-2 mb-2 group-hover:text-blue-400 transition-colors">{course.title}</h4>
                  <button className="text-blue-500 hover:text-blue-400 text-sm flex items-center">
                    Xem ngay
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl p-6 border border-blue-500/20"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-6 md:mb-0">
              <BookOpen className="h-12 w-12 text-blue-500 mr-4" />
              <div>
                <h3 className="text-xl font-bold">Hướng Dẫn Toàn Diện</h3>
                <p className="text-gray-400">Tải xuống ebook miễn phí về cơ bản tiền điện tử</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-medium"
            >
              Tải Xuống PDF
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TradingAcademy;
