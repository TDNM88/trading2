import React from 'react';
import { motion } from 'framer-motion';

const Logo = () => {
  return (
    <div className="flex items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-14 h-14 lg:w-16 lg:h-16"
      >
        {/* Matrix-inspired digital rain effect */}
        <motion.div
          className="absolute inset-0 rounded-lg overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#00ff41]/20 to-transparent" />
          <div className="absolute inset-0 grid grid-cols-3 gap-px overflow-hidden opacity-30">
            {Array.from({ length: 9 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -20 }}
                animate={{ y: 20 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "linear"
                }}
                className="bg-[#00ff41]/30 h-full"
              />
            ))}
          </div>
        </motion.div>

        {/* Candlestick chart overlay */}
        <motion.svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.rect
            x="20" y="30" width="12" height="50"
            fill="#00ff41"
            initial={{ height: 0, y: 80 }}
            animate={{ height: 50, y: 30 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="drop-shadow-[0_0_8px_rgba(0,255,65,0.5)]"
          />
          <motion.rect
            x="36" y="20" width="12" height="60"
            fill="#00ff41"
            initial={{ height: 0, y: 80 }}
            animate={{ height: 60, y: 20 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="drop-shadow-[0_0_8px_rgba(0,255,65,0.5)]"
          />
          <motion.rect
            x="52" y="40" width="12" height="40"
            fill="#00ff41"
            initial={{ height: 0, y: 80 }}
            animate={{ height: 40, y: 40 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="drop-shadow-[0_0_8px_rgba(0,255,65,0.5)]"
          />
          <motion.rect
            x="68" y="10" width="12" height="70"
            fill="#00ff41"
            initial={{ height: 0, y: 80 }}
            animate={{ height: 70, y: 10 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="drop-shadow-[0_0_8px_rgba(0,255,65,0.5)]"
          />
        </motion.svg>

        {/* Hexagonal border with glow */}
        <motion.div
          className="absolute inset-0"
          style={{
            clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
            background: "linear-gradient(135deg, rgba(0, 255, 65, 0.3), rgba(0, 255, 65, 0.1))",
            boxShadow: "0 0 20px rgba(0, 255, 65, 0.3), inset 0 0 10px rgba(0, 255, 65, 0.2)",
            border: "1px solid rgba(0, 255, 65, 0.5)"
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>

      <div className="ml-4">
        <motion.h1 
          className="text-2xl lg:text-3xl font-bold tracking-wider font-mono"
          style={{
            background: "linear-gradient(to right, #00ff41, #00cc33)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 20px rgba(0, 255, 65, 0.3)"
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
          TRADING LIKE GOAT
        </motion.h1>
        <motion.p 
          className="text-xs lg:text-sm text-[#00ff41] tracking-[0.2em] font-mono mt-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          | a product from TDNM |
        </motion.p>
      </div>
    </div>
  );
};

export default Logo;