import React from 'react';
import { motion } from 'framer-motion';

const Blog = () => {
  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">Market Insights</h1>
          <p className="text-xl text-gray-400">Latest trading analysis and market updates</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Understanding Market Trends in 2025",
              excerpt: "An in-depth analysis of current market trends and what they mean for traders.",
              image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80",
              date: "March 15, 2025"
            },
            {
              title: "Top Trading Strategies for Volatile Markets",
              excerpt: "Essential strategies to help you navigate through market volatility.",
              image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80",
              date: "March 12, 2025"
            }
          ].map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800/50 rounded-xl overflow-hidden"
            >
              <div className="aspect-video relative">
                <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <span className="text-sm text-blue-500">{post.date}</span>
                <h2 className="text-xl font-semibold mt-2 mb-3">{post.title}</h2>
                <p className="text-gray-400 mb-4">{post.excerpt}</p>
                <button className="text-blue-500 hover:text-blue-400 font-medium">
                  Read More →
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;