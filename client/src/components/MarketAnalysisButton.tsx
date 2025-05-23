import React, { useState } from 'react';
import { Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MarketAnalysisAI from './MarketAnalysisAI';

const MarketAnalysisButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 p-4 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-40"
        >
          <Bot className="h-6 w-6 text-white" />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && <MarketAnalysisAI onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

export default MarketAnalysisButton;