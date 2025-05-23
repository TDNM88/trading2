import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Tag, ExternalLink } from 'lucide-react';

interface Holiday {
  date: Date;
  holiday: string;
  type: string;
}

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  source: string;
  imageUrl: string;
  publishedAt: Date;
  url: string;
}

const holidays: Holiday[] = [
  {
    date: new Date('2024-03-25'),
    holiday: 'Holi',
    type: 'Trading Holiday'
  },
  {
    date: new Date('2024-03-29'),
    holiday: 'Good Friday',
    type: 'Trading Holiday'
  },
  {
    date: new Date('2024-04-09'),
    holiday: 'Gudi Padwa',
    type: 'Trading Holiday'
  },
  {
    date: new Date('2024-04-11'),
    holiday: 'Eid-Ul-Fitr (Ramzan Eid)',
    type: 'Trading Holiday'
  },
  {
    date: new Date('2024-04-17'),
    holiday: 'Ram Navami',
    type: 'Trading Holiday'
  },
  {
    date: new Date('2024-05-01'),
    holiday: 'Maharashtra Day',
    type: 'Trading Holiday'
  }
];

const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'Nifty hits new all-time high as IT stocks surge',
    summary: 'The Nifty 50 index reached a new milestone today, driven by strong performance in the technology sector. Major IT companies reported better-than-expected quarterly results.',
    category: 'Market Update',
    source: 'Financial Express',
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80',
    publishedAt: new Date(),
    url: '#'
  },
  {
    id: '2',
    title: 'RBI keeps repo rate unchanged at 6.5%',
    summary: 'The Reserve Bank of India maintained status quo on key policy rates for the sixth consecutive time, prioritizing growth while keeping inflation in check.',
    category: 'Policy',
    source: 'Economic Times',
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80',
    publishedAt: new Date(),
    url: '#'
  },
  {
    id: '3',
    title: 'FIIs turn net buyers in Indian equities',
    summary: 'Foreign Institutional Investors (FIIs) showed renewed interest in Indian markets, with net purchases exceeding ₹15,000 crore in the last week.',
    category: 'Investment',
    source: 'Business Standard',
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80',
    publishedAt: new Date(),
    url: '#'
  }
];

const NSEHolidays = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const isHoliday = (date: Date) => {
    return holidays.some(
      holiday =>
        holiday.date.getDate() === date.getDate() &&
        holiday.date.getMonth() === date.getMonth() &&
        holiday.date.getFullYear() === date.getFullYear()
    );
  };

  const getHolidayInfo = (date: Date) => {
    return holidays.find(
      holiday =>
        holiday.date.getDate() === date.getDate() &&
        holiday.date.getMonth() === date.getMonth() &&
        holiday.date.getFullYear() === date.getFullYear()
    );
  };

  return (
    <section className="py-12 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Market Events & News</h2>
          <p className="text-xl text-gray-400">Stay updated with market holidays and latest news</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendar Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-gray-800/30 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold flex items-center">
                <CalendarIcon className="h-5 w-5 text-blue-500 mr-2" />
                Trading Calendar
              </h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={prevMonth}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="font-medium">
                  {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </span>
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-400 py-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                <div key={`empty-${index}`} className="p-2" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), index + 1);
                const isToday = new Date().toDateString() === date.toDateString();
                const holiday = getHolidayInfo(date);
                const isSelected = selectedDate?.toDateString() === date.toDateString();

                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className={`relative p-2 text-center rounded-lg cursor-pointer transition-colors ${
                      isToday ? 'bg-blue-500/20 text-blue-500' :
                      holiday ? 'bg-red-500/10 text-red-500' :
                      isSelected ? 'bg-gray-700' : 'hover:bg-gray-700/50'
                    }`}
                    onClick={() => setSelectedDate(date)}
                  >
                    <span className="text-sm">{index + 1}</span>
                    {holiday && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full"
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Selected Date Info */}
            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">
                    {selectedDate.toLocaleDateString('default', { 
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </h4>
                  {isHoliday(selectedDate) && (
                    <span className="px-2 py-1 bg-red-500/20 text-red-500 text-sm rounded-full">
                      Holiday
                    </span>
                  )}
                </div>
                {isHoliday(selectedDate) && (
                  <div className="mt-2 text-gray-400">
                    <p>{getHolidayInfo(selectedDate)?.holiday}</p>
                    <p className="text-sm mt-1">{getHolidayInfo(selectedDate)?.type}</p>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* News Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {newsItems.map((news, index) => (
              <motion.article
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/30 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-colors group"
              >
                <div className="flex">
                  <div className="w-1/3">
                    <div className="aspect-video relative">
                      <img
                        src={news.imageUrl}
                        alt={news.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="w-2/3 p-6">
                    <div className="flex items-center space-x-4 mb-2">
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-500 text-xs rounded-full">
                        {news.category}
                      </span>
                      <div className="flex items-center text-gray-400 text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {news.publishedAt.toLocaleTimeString()}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-500 transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {news.summary}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{news.source}</span>
                      <a
                        href={news.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-500 hover:text-blue-400 text-sm font-medium"
                      >
                        Read More
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NSEHolidays;