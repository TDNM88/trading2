import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

interface UserControlPanelProps {
  onLogout: () => void;
}

const UserControlPanel = ({ onLogout }: UserControlPanelProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 right-0 px-4 py-2 z-20 flex items-center gap-2"
    >
      <Link
        to="/admin"
        className="flex items-center gap-2 px-4 py-2 bg-gray-800/90 hover:bg-gray-700/90 border border-gray-700 rounded-lg backdrop-blur-sm transition-colors"
      >
        <Settings className="h-5 w-5 text-gray-300" />
        <span className="text-gray-300">Admin</span>
      </Link>
      
      <button
        onClick={onLogout}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800/90 hover:bg-red-900/90 border border-gray-700 hover:border-red-700 rounded-lg backdrop-blur-sm transition-colors"
      >
        <LogOut className="h-5 w-5 text-gray-300" />
        <span className="text-gray-300">Logout</span>
      </button>
    </motion.div>
  );
};

export default UserControlPanel;