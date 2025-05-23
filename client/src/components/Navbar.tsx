import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  BookOpen, BookText, Users, Crown, X,
  LayoutDashboard, TrendingUp, Bot, Newspaper,
  Bell, Brain, ChevronDown, ChevronUp, Home
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';
import UserControlPanel from './UserControlPanel';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  const menuGroups = {
    trading: [
      { to: "/dashboard", icon: LayoutDashboard, text: "Dashboard" },
      { to: "/paper-trading", icon: TrendingUp, text: "Paper Trading" },
      { to: "/trade-algo-pilot", icon: Brain, text: "Trade Algo Pilot" },
    ],
    learn: [
      { to: "/library", icon: BookOpen, text: "Library" },
      { to: "/tutorials", icon: BookText, text: "Tutorials" },
    ],
    info: [
      { to: "/blogs-news", icon: Newspaper, text: "Blogs & News" },
      { to: "/updates", icon: Bell, text: "New Updates" },
      { to: "/about", icon: Users, text: "About" },
    ]
  };

  const MenuIcon = () => (
    <button 
      className="lg:hidden relative w-10 h-10 focus:outline-none group"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      aria-label={isMenuOpen ? "Close menu" : "Open menu"}
    >
      <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
        <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
          <motion.div
            animate={isMenuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
            className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-hover:bg-blue-500"
          />
          <motion.div
            animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="bg-white h-[2px] w-7 rounded transform transition-all duration-300 group-hover:bg-blue-500"
          />
          <motion.div
            animate={isMenuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
            className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-hover:bg-blue-500"
          />
        </div>
      </div>
    </button>
  );

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white/90 dark:bg-[#0B1118]/90 backdrop-blur-xl z-30 mb-16 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/" 
              className="flex-shrink-0 flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <Logo />
            </Link>
            
            <div className="hidden lg:flex items-center space-x-8 relative z-50">
              <Link
                to="/"
                className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-blue-500/10 transition-all duration-200"
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>

              {Object.entries(menuGroups).map(([key, items]) => (
                <div key={key} className="relative group">
                  <button 
                    className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-blue-500/10 transition-all duration-200"
                    onMouseEnter={() => setActiveDropdown(key)}
                    onClick={() => setActiveDropdown(activeDropdown === key ? null : key)}
                  >
                    {key === 'trading' && <TrendingUp className="h-5 w-5" />}
                    {key === 'learn' && <BookOpen className="h-5 w-5" />}
                    {key === 'info' && <Newspaper className="h-5 w-5" />}
                    <span className="capitalize">{key}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === key ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === key && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 w-56 py-2 mt-1 bg-white dark:bg-[#0B1118] border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl"
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        {items.map((item) => (
                          <NavLink key={item.to} {...item} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-blue-500/10" />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <Link
                to="/premium"
                className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium hover:shadow-lg transition-all duration-200"
              >
                <Crown className="h-5 w-5" />
                <span>Premium</span>
              </Link>

              <ThemeToggle />
            </div>
            
            <MenuIcon />
          </div>
        </div>
      </nav>

      <UserControlPanel onLogout={handleLogout} />

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-[#0B1118] shadow-xl lg:hidden z-40 overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                  <Logo />
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                  >
                    <X className="h-6 w-6 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                  <div className="p-4 space-y-6">
                    <MobileNavLink
                      to="/"
                      icon={Home}
                      text="Home"
                      onClick={() => setIsMenuOpen(false)}
                    />

                    {Object.entries(menuGroups).map(([key, items]) => (
                      <div key={key} className="space-y-2">
                        <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-400 uppercase tracking-wider px-2">
                          {key}
                        </h3>
                        {items.map((item) => (
                          <MobileNavLink
                            key={item.to}
                            {...item}
                            onClick={() => setIsMenuOpen(false)}
                          />
                        ))}
                      </div>
                    ))}

                    <div className="pt-4">
                      <ThemeToggle />
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                  <Link
                    to="/premium"
                    className="flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium hover:shadow-lg transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Crown className="h-5 w-5" />
                    <span>Premium Access</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const NavLink = ({ 
  to, 
  icon: Icon, 
  text,
  className = ""
}: { 
  to: string; 
  icon: React.ElementType; 
  text: string;
  className?: string;
}) => (
  <Link
    to={to}
    className={`flex items-center space-x-1.5 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-500 transition-colors ${className}`}
  >
    <Icon className="h-5 w-5" />
    <span>{text}</span>
  </Link>
);

const MobileNavLink = ({
  to,
  icon: Icon,
  text,
  onClick
}: {
  to: string;
  icon: React.ElementType;
  text: string;
  onClick?: () => void;
}) => (
  <Link
    to={to}
    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-blue-500/10 transition-all duration-200"
    onClick={onClick}
  >
    <Icon className="h-5 w-5" />
    <span>{text}</span>
  </Link>
);

export default Navbar;