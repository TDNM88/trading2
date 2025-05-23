import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, Calendar, Clock, ArrowRight, 
  CheckCircle, AlertTriangle, Info
} from 'lucide-react';

const updates = [
  {
    id: 1,
    type: 'feature',
    title: 'New Trading Algorithm Released',
    description: 'Introducing our latest Mean Reversion strategy for options trading.',
    date: '2024-03-07',
    time: '14:30',
    status: 'new'
  },
  {
    id: 2,
    type: 'maintenance',
    title: 'Scheduled Platform Maintenance',
    description: 'System upgrade scheduled for improved performance.',
    date: '2024-03-08',
    time: '02:00',
    status: 'upcoming'
  },
  {
    id: 3,
    type: 'alert',
    title: 'Market Holiday Notice',
    description: 'Markets will be closed on March 25, 2024 for Holi.',
    date: '2024-03-25',
    time: 'All Day',
    status: 'important'
  }
];

const Updates = () => {
  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Latest Updates</h1>
          <p className="text-xl text-gray-400">Stay informed about new features and platform updates</p>
        </motion.div>

        {/* Update Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { 
              title: 'New Features', 
              count: 5,
              icon: CheckCircle,
              color: 'green'
            },
            { 
              title: 'Maintenance', 
              count: 2,
              icon: Info,
              color: 'blue'
            },
            { 
              title: 'Important Alerts', 
              count: 3,
              icon: AlertTriangle,
              color: 'yellow'
            }
          ].map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gray-800/30 rounded-xl p-6 border border-gray-700`}
            >
              <div className="flex items-center justify-between mb-4">
                <category.icon className={`h-8 w-8 text-${category.color}-500`} />
                <span className={`px-3 py-1 rounded-full text-sm bg-${category.color}-500/20 text-${category.color}-500`}>
                  {category.count} Updates
                </span>
              </div>
              <h3 className="text-lg font-semibold">{category.title}</h3>
            </motion.div>
          ))}
        </div>

        {/* Updates Timeline */}
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-700" />
          
          <div className="space-y-8">
            {updates.map((update, index) => (
              <motion.div
                key={update.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-16"
              >
                <div className="absolute left-6 top-3 w-4 h-4 rounded-full bg-blue-500 transform -translate-x-1/2" />
                
                <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      update.type === 'feature'
                        ? 'bg-green-500/20 text-green-500'
                        : update.type === 'maintenance'
                        ? 'bg-blue-500/20 text-blue-500'
                        : 'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {update.type.charAt(0).toUpperCase() + update.type.slice(1)}
                    </span>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" /> {update.date}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {update.time}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{update.title}</h3>
                  <p className="text-gray-400 mb-4">{update.description}</p>
                  
                  <button className="flex items-center text-blue-500 hover:text-blue-400">
                    Learn More
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Subscribe to Updates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-gray-800/30 rounded-xl p-8 border border-gray-700 text-center"
        >
          <Bell className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Stay Updated</h2>
          <p className="text-gray-400 mb-6">Get notified about new features and platform updates</p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-gray-700/50 rounded-l-xl border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-r-xl text-white">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Updates;