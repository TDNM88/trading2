import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Play, ExternalLink, Star, Eye, Clock, Globe,
  ChevronDown, ChevronUp, Check, AlertTriangle
} from 'lucide-react';

interface Step {
  title: string;
  description: string;
  image?: string;
}

const TutorialDetail = () => {
  const { id } = useParams();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Mock data - In a real app, fetch this based on the ID
  const tutorial = {
    id,
    title: 'Buy Low Strategy – Mastering Market Bottoms',
    description: 'Learn how to identify market bottoms and execute profitable buy-low trades with confidence.',
    videoUrl: 'https://www.youtube.com/watch?v=example',
    thumbnail: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80',
    instructor: 'Shubham Agarwal',
    duration: 45,
    language: 'Hindi',
    category: 'Technical Analysis',
    level: 'Intermediate',
    likes: 1245,
    views: 8900,
    publishedDate: '2024-03-01',
    prerequisites: [
      'Basic understanding of technical analysis',
      'TradingView account',
      'Basic charting knowledge'
    ],
    steps: [
      {
        title: 'Setting Up TradingView',
        description: 'Learn how to set up your TradingView workspace for optimal trading analysis.',
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80'
      },
      {
        title: 'Installing Required Indicators',
        description: 'Install and configure the necessary indicators for the strategy.',
        image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80'
      },
      {
        title: 'Identifying Market Bottoms',
        description: 'Learn the key patterns and signals that indicate a potential market bottom.',
        image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80'
      }
    ]
  };

  return (
    <div className="pt-24 pb-12 min-h-screen bg-[#0B1118]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <Link 
          to="/tutorials"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Tutorials
        </Link>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video and Steps */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Player */}
            <div className="bg-gray-800/30 rounded-xl overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={tutorial.thumbnail}
                  alt={tutorial.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <button className="w-20 h-20 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <Play className="h-10 w-10" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-2">{tutorial.title}</h1>
                <p className="text-gray-400 mb-4">{tutorial.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <span className={`px-2 py-1 rounded-full ${
                    tutorial.level === 'Beginner' ? 'bg-green-500/20 text-green-500' :
                    tutorial.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-500' :
                    'bg-red-500/20 text-red-500'
                  }`}>
                    {tutorial.level}
                  </span>
                  <span className="flex items-center text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    {tutorial.duration} min
                  </span>
                  <span className="flex items-center text-gray-400">
                    <Globe className="h-4 w-4 mr-1" />
                    {tutorial.language}
                  </span>
                  <span className="flex items-center text-gray-400">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    {tutorial.likes}
                  </span>
                  <span className="flex items-center text-gray-400">
                    <Eye className="h-4 w-4 text-blue-500 mr-1" />
                    {tutorial.views}
                  </span>
                </div>
              </div>
            </div>

            {/* YouTube Link */}
            <a
              href={tutorial.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl text-white font-medium transition-colors"
            >
              Watch on YouTube
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>

            {/* Prerequisites */}
            <div className="bg-gray-800/30 rounded-xl border border-gray-700 p-6">
              <h2 className="text-xl font-semibold mb-4">Prerequisites</h2>
              <ul className="space-y-3">
                {tutorial.prerequisites.map((prerequisite, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    {prerequisite}
                  </li>
                ))}
              </ul>
            </div>

            {/* Steps */}
            <div className="bg-gray-800/30 rounded-xl border border-gray-700 p-6">
              <h2 className="text-xl font-semibold mb-6">Step-by-Step Guide</h2>
              <div className="space-y-4">
                {tutorial.steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={false}
                    animate={{ height: activeSection === step.title ? 'auto' : 'auto' }}
                    className="border border-gray-700 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => setActiveSection(
                        activeSection === step.title ? null : step.title
                      )}
                      className="w-full px-6 py-4 flex items-center justify-between text-left"
                    >
                      <div className="flex items-center">
                        <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center mr-3">
                          {index + 1}
                        </span>
                        <span className="font-medium">{step.title}</span>
                      </div>
                      {activeSection === step.title ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    {activeSection === step.title && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-400 mb-4">{step.description}</p>
                        {step.image && (
                          <img
                            src={step.image}
                            alt={step.title}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Instructor */}
            <div className="bg-gray-800/30 rounded-xl border border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-4">Instructor</h3>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                  <span className="text-xl font-bold">{tutorial.instructor[0]}</span>
                </div>
                <div>
                  <h4 className="font-medium">{tutorial.instructor}</h4>
                  <p className="text-sm text-gray-400">Trading Expert</p>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-yellow-500/10 rounded-xl border border-yellow-500/20 p-6">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-yellow-500 mb-2">Important Notes</h3>
                  <ul className="text-sm text-yellow-200/80 space-y-2">
                    <li>This tutorial is for educational purposes only.</li>
                    <li>Always practice proper risk management.</li>
                    <li>Past performance does not guarantee future results.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Related Tutorials */}
            <div className="bg-gray-800/30 rounded-xl border border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-4">Related Tutorials</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((_, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block group"
                  >
                    <div className="aspect-video rounded-lg overflow-hidden mb-2">
                      <img
                        src={`https://images.unsplash.com/photo-${index === 0 ? '1642790106117-e829e14a795f' : index === 1 ? '1590283603385-17ffb3a7f29f' : '1611974789855-9c2a0a7236a3'}?auto=format&fit=crop&q=80`}
                        alt="Tutorial thumbnail"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="font-medium group-hover:text-blue-500 transition-colors">
                      Advanced Trading Strategy {index + 1}
                    </h4>
                    <p className="text-sm text-gray-400">45 min • English</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialDetail;