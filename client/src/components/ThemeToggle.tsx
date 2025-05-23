import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-800/50 dark:bg-white/10 hover:bg-gray-700/50 dark:hover:bg-white/20 transition-colors"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-6 h-6"
      >
        <motion.div
          animate={{ opacity: theme === 'dark' ? 0 : 1 }}
          className="absolute inset-0"
        >
          <Sun className="w-6 h-6 text-yellow-500" />
        </motion.div>
        <motion.div
          animate={{ opacity: theme === 'dark' ? 1 : 0 }}
          className="absolute inset-0"
        >
          <Moon className="w-6 h-6 text-blue-500" />
        </motion.div>
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;