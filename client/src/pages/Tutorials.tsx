import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Play, Clock, Globe, Star, ChevronDown, Eye, BookOpen, ArrowRight, TrendingUp, BarChart as ChartBar, Shield, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: string;
  duration: number;
  language: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  likes: number;
  views: number;
  publishedDate: string;
}

const tutorials: Tutorial[] = [
  {
    id: '1',
    title: 'Buy Low Strategy – Mastering Market Bottoms',
    description: 'Learn how to identify market bottoms and execute profitable buy-low trades with confidence.',
    thumbnail: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80',
    instructor: 'Shubham Agarwal',
    duration: 45,
    language: 'Hindi',
    category: 'Technical Analysis',
    level: 'Intermediate',
    likes: 1245,
    views: 8900,
    publishedDate: '2024-03-01'
  },
  {
    id: '2',
    title: 'Options Trading Masterclass',
    description: 'Complete guide to options trading strategies and risk management techniques.',
    thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80',
    instructor: 'Rajesh Kumar',
    duration: 120,
    language: 'English',
    category: 'Options Trading',
    level: 'Advanced',
    likes: 2156,
    views: 12400,
    publishedDate: '2024-02-28'
  },
  {
    id: '3',
    title: 'Risk Management Fundamentals',
    description: 'Essential risk management principles every trader should know.',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80',
    instructor: 'Priya Sharma',
    duration: 30,
    language: 'English',
    category: 'Risk Management',
    level: 'Beginner',
    likes: 1890,
    views: 15600,
    publishedDate: '2024-02-25'
  },
  {
    id: '4',
    title: 'Algorithmic Trading Basics',
    description: 'Introduction to algorithmic trading and automated strategy development.',
    thumbnail: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80',
    instructor: 'Amit Patel',
    duration: 60,
    language: 'English',
    category: 'Algo Trading',
    level: 'Intermediate',
    likes: 1567,
    views: 9870,
    publishedDate: '2024-02-20'
  },
  {
    id: '5',
    title: 'Advanced Chart Patterns',
    description: 'Master complex chart patterns for better trade entries and exits.',
    thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80',
    instructor: 'Vikram Singh',
    duration: 90,
    language: 'Hindi',
    category: 'Technical Analysis',
    level: 'Advanced',
    likes: 2345,
    views: 18900,
    publishedDate: '2024-02-15'
  },
  {
    id: '6',
    title: 'Intraday Trading Strategies',
    description: 'Profitable intraday trading techniques with live market examples.',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80',
    instructor: 'Neha Gupta',
    duration: 75,
    language: 'Hindi',
    category: 'Technical Analysis',
    level: 'Intermediate',
    likes: 1987,
    views: 14500,
    publishedDate: '2024-02-10'
  }
];

const categories = [
  'All',
  'Technical Analysis',
  'Options Trading',
  'Risk Management',
  'Algo Trading',
  'Fundamental Analysis'
];

const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
const languages = ['All Languages', 'English', 'Hindi'];
const durations = ['All Durations', 'Short (<30 min)', 'Medium (30-60 min)', 'Long (>60 min)'];

const Tutorials = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedLanguage, setSelectedLanguage] = useState('All Languages');
  const [selectedDuration, setSelectedDuration] = useState('All Durations');

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tutorial.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All Levels' || tutorial.level === selectedLevel;
    const matchesLanguage = selectedLanguage === 'All Languages' || tutorial.language === selectedLanguage;
    const matchesDuration = selectedDuration === 'All Durations' ||
      (selectedDuration === 'Short (<30 min)' && tutorial.duration < 30) ||
      (selectedDuration === 'Medium (30-60 min)' && tutorial.duration >= 30 && tutorial.duration <= 60) ||
      (selectedDuration === 'Long (>60 min)' && tutorial.duration > 60);

    return matchesSearch && matchesCategory && matchesLevel && matchesLanguage && matchesDuration;
  });

  return (
    <div className="min-h-screen bg-[#0B1118]">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-[#0B1118]" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Master Trading with Expert-Led Tutorials
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
              Learn trading strategies, technical indicators, and risk management with step-by-step video tutorials
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg font-semibold flex items-center">
                Explore Tutorials
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="px-8 py-4 rounded-lg border border-blue-500/30 hover:border-blue-500 text-blue-500 text-lg font-semibold transition-colors">
                View Roadmap
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Structured Learning",
                description: "Step-by-step tutorials with practical examples"
              },
              {
                icon: Brain,
                title: "Expert Instructors",
                description: "Learn from experienced market professionals"
              },
              {
                icon: ChartBar,
                title: "Practice Exercises",
                description: "Apply concepts with hands-on exercises"
              },
              {
                icon: Shield,
                title: "Risk Management",
                description: "Learn to protect your trading capital"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800/30 rounded-xl p-6 border border-gray-700"
              >
                <feature.icon className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tutorials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>

              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
              >
                {languages.map(language => (
                  <option key={language} value={language}>{language}</option>
                ))}
              </select>

              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
              >
                {durations.map(duration => (
                  <option key={duration} value={duration}>{duration}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Tutorials Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTutorials.map((tutorial, index) => (
              <motion.div
                key={tutorial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800/30 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all group"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={tutorial.thumbnail}
                    alt={tutorial.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                  <button className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-blue-600/90 hover:bg-blue-600 transition-colors flex items-center justify-center">
                      <Play className="h-8 w-8" />
                    </div>
                  </button>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-sm">
                    <span className={`px-2 py-1 rounded-full ${
                      tutorial.level === 'Beginner' ? 'bg-green-500/20 text-green-500' :
                      tutorial.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-500' :
                      'bg-red-500/20 text-red-500'
                    }`}>
                      {tutorial.level}
                    </span>
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        {tutorial.likes}
                      </span>
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 text-blue-500 mr-1" />
                        {tutorial.views}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-500 transition-colors">
                    {tutorial.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {tutorial.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {tutorial.duration} min
                      </span>
                      <span className="flex items-center">
                        <Globe className="h-4 w-4 mr-1" />
                        {tutorial.language}
                      </span>
                    </div>
                    <Link
                      to={`/tutorials/${tutorial.id}`}
                      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    >
                      View More
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tutorials;