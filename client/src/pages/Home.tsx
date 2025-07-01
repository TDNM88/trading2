import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, LineChart, Trophy, Users, TrendingUp, Activity, Zap, PlayCircle, BookOpen } from 'lucide-react';
import TradingViewTickerTape from '../components/TradingViewTickerTape';
import TradingViewMiniChart from '../components/TradingViewMiniChart';
import HelpForm from '../components/HelpForm';

const Home = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-[#0B1118]">
        {/* GIF Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-[#0B1118] z-10"></div>
          <div className="absolute inset-0 bg-[#0B1118]/60 z-[5]"></div>
          <img 
            src="https://media.giphy.com/media/JtBZm3Getg3dqxK0zP/giphy.gif" 
            alt="Ứng dụng demo gửi KH"
            className="absolute inset-0 w-full h-full object-cover z-[1]"
          />
          {/* Fallback background for when GIF is loading */}
          <div 
            className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80')] bg-cover bg-center"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
              1Z TRADING APP
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Buy, sell, and trade Bitcoin, Ethereum, and 500+ cryptocurrencies with real-time analytics and professional tools.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white text-lg font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center">
                  <PlayCircle className="w-6 h-6 mr-2" />
                  <span>Trade Now</span>
                  <motion.div
                    className="absolute right-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300"
                    initial={{ x: -10 }}
                    animate={{ x: 0 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-full sm:w-auto px-8 py-4 bg-gray-800/50 rounded-xl border-2 border-blue-500/30 text-lg font-semibold overflow-hidden transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10"
              >
                <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center text-blue-400 group-hover:text-blue-300">
                  <BookOpen className="w-6 h-6 mr-2" />
                  <span>Download App</span>
                  <motion.div
                    className="absolute right-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300"
                    initial={{ x: -10 }}
                    animate={{ x: 0 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#0B1118]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: LineChart,
                title: "Real-Time Analytics",
                description: "Access live market data and predictive indicators"
              },
              {
                icon: TrendingUp,
                title: "Copy Trading",
                description: "Follow elite traders and replicate their strategies"
              },
              {
                icon: Activity,
                title: "Futures Trading",
                description: "Trade with up to 125x leverage on BTC, ETH, and more"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900/30 p-6 rounded-lg border border-gray-800 hover:border-blue-500/50 transition-colors"
              >
                <feature.icon className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trading Tools Section */}
      <section className="py-20 bg-gradient-to-b from-[#0B1118] to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Trading Tools</h2>
            <p className="text-xl text-gray-400">Everything you need to trade successfully</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Spot Trading",
                description: "Trade over 500 cryptocurrencies with low fees"
              },
              {
                icon: Trophy,
                title: "Staking & Earn",
                description: "Earn up to 20% APR with flexible savings products"
              },
              {
                icon: Users,
                title: "Community Insights",
                description: "Access exclusive market analysis and trading signals"
              }
            ].map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800/30 rounded-lg p-6 border border-gray-700 hover:border-blue-500/50 transition-all"
              >
                <tool.icon className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
                <p className="text-gray-400 mb-4">{tool.description}</p>
                <button className="text-blue-500 hover:text-blue-400 font-medium flex items-center">
                  Learn More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "50K+", label: "Traders" },
              { value: "95%", label: "Success Rate" },
              { value: "24/7", label: "Support" },
              { value: "100+", label: "Trading Tools" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-500 mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TradingViewTickerTape Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Crypto Markets Overview</h2>
            <p className="text-xl text-gray-400">Track top cryptocurrencies in real-time</p>
          </motion.div>
          <TradingViewTickerTape />
        </div>
      </section>

      {/* Market Charts Section */}
      <section className="py-20 bg-[#0B1118]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Live Crypto Prices</h2>
            <p className="text-xl text-gray-400">Monitor real-time price movements</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TradingViewMiniChart symbol="BITSTAMP:BTCUSD" width={350} height={220} />
            <TradingViewMiniChart symbol="BITSTAMP:ETHUSD" width={350} height={220} />
            <TradingViewMiniChart symbol="BINANCE:USDTUSD" width={350} height={220} />
          </div>
        </div>
      </section>

      {/* Help Form Section */}
      <HelpForm />
    </div>
  );
};

export default Home;
