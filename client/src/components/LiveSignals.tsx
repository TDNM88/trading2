import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Radio, Youtube } from 'lucide-react';

const LiveSignals = () => {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Live Trading Signals</h2>
              <p className="text-gray-400">Real-time trading insights and analysis</p>
            </div>
            <div className="flex items-center">
              <Radio className="h-5 w-5 text-red-500 animate-pulse mr-2" />
              <span className="text-red-500 font-medium">LIVE</span>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4"
        >
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
            <div className="text-sm text-yellow-200/80">
              <p className="font-semibold mb-1">Disclaimer:</p>
              <p>The trading signals and information provided here are for educational purposes only. They do not constitute financial advice or trading recommendations. Trading involves substantial risk of loss and is not suitable for all investors. Past performance is not indicative of future results. Always conduct your own research and consider your financial situation before making any investment decisions.</p>
            </div>
          </div>
        </motion.div>

        {/* Live Streams Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* YouTube Live Stream */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/30 rounded-xl border border-gray-700 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center">
                <Youtube className="h-5 w-5 text-red-500 mr-2" />
                <h3 className="font-semibold">Live Market Analysis</h3>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse mr-2" />
                <span className="text-sm text-red-500">Live</span>
              </div>
            </div>
            <div className="aspect-video">
              <iframe
                src="https://www.youtube.com/embed/live_stream?channel=YOUR_CHANNEL_ID"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="w-full h-full"
              ></iframe>
            </div>
          </motion.div>

          {/* Discord Stream */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/30 rounded-xl border border-gray-700 overflow-hidden"
          >
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center">
                <Radio className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="font-semibold">Trading Signals</h3>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse mr-2" />
                <span className="text-sm text-blue-500">Live</span>
              </div>
            </div>
            <div className="aspect-video">
              <iframe
                src="https://discord.com/widget?id=YOUR_DISCORD_SERVER_ID&theme=dark"
                width="100%"
                height="100%"
                allowtransparency="true"
                frameBorder="0"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                className="w-full h-full"
              ></iframe>
            </div>
          </motion.div>
        </div>

        {/* Trading Rules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {[
            "Always use stop-loss orders to manage risk",
            "Never risk more than 2% of your capital per trade",
            "Follow the trend - don't try to catch falling knives",
            "Maintain proper position sizing",
            "Don't trade during major news events",
            "Keep a trading journal for all your trades"
          ].map((rule, index) => (
            <div
              key={index}
              className="bg-gray-800/30 rounded-lg p-4 border border-gray-700"
            >
              <p className="text-gray-300">
                <span className="text-blue-500 font-medium mr-2">Rule {index + 1}:</span>
                {rule}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LiveSignals;