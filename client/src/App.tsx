import { BrowserRouter as Router, Route, Routes, NavLink, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { useTheme } from './contexts/ThemeContext'; // Để lấy theme hiện tại
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import MarketAnalysisButton from './components/MarketAnalysisButton';
import HomePage from './pages/Home';
import MarketInsightsPage from './pages/MarketInsightsPage';
import BitgetEarnPage from './pages/BitgetEarnPage';
import TradePage from './pages/TradePage';
import AssetsPage from './pages/AssetsPage';
import Dashboard from './pages/Dashboard';
import PaperTrading from './pages/PaperTrading';
import TradeAlgoPilot from './pages/TradeAlgoPilot';
import Library from './pages/Library';
import Tutorials from './pages/Tutorials';
import BlogsNews from './pages/BlogsNews';
import Updates from './pages/Updates';
import About from './pages/About';
import Premium from './pages/Premium';
import BlogList from './pages/admin/BlogList';
import Login from './pages/Login';
import TutorialDetail from './pages/TutorialDetail';
import IndicatorDetail from './pages/IndicatorDetail';
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import NewsList from './pages/admin/NewsList';
import Userlist from './pages/admin/Userlist';
import AddBlog from './pages/admin/AddBlog';
import AddNews from './pages/admin/AddNews';
import EditBlog from './pages/admin/EditBlog';
import EditNews from './pages/admin/EditNews';
import { Home as HomeIcon, BarChart2, TrendingUp, LineChart, DollarSign, Wallet } from 'lucide-react'; // Đổi tên để tránh xung đột

// Move the app content to a separate component so we can use useLocation
function AppContent() {
  const location = useLocation();
  const { theme } = useTheme(); // Lấy theme hiện tại

  // Hide Navbar and BottomNav on admin routes
  const hideNavbar = location.pathname.startsWith('/admin');

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#0B1118] text-white' : 'bg-white text-gray-900'} transition-colors duration-200`}>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute children={<Dashboard />} />}
        />
        <Route
          path="/paper-trading"
          element={<PrivateRoute children={<PaperTrading />} />}
        />
        <Route
          path="/trade-algo-pilot"
          element={<PrivateRoute children={<TradeAlgoPilot />} />}
        />
        <Route path="/library" element={<Library />} />
        <Route path="/library/:id" element={<IndicatorDetail />} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/tutorials/:id" element={<TutorialDetail />} />
        <Route path="/blogs-news" element={<BlogsNews />} />
        <Route path="/updates" element={<Updates />} />
        <Route path="/about" element={<About />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/blogs" element={<BlogList />} />
        <Route path="/admin/news" element={<NewsList />} />
        <Route path="/admin/user" element={<Userlist />} />
        <Route path="/admin/add-blog" element={<AddBlog />} />
        <Route path="/admin/add-news" element={<AddNews />} />
        <Route path="/admin/blogs/edit/:id" element={<EditBlog />} />
        <Route path="/admin/news/edit/:id" element={<EditNews />} />
        
        {/* Updated routes with implemented pages */}
        <Route path="/market" element={<MarketInsightsPage />} />
        <Route path="/trade" element={<TradePage />} />
        <Route path="/futures" element={<div className="pt-20 pb-24 px-4"><h1 className="text-2xl font-bold mb-4">Futures</h1><p>Nội dung trang Futures đang được phát triển.</p></div>} />
        <Route path="/invest" element={<BitgetEarnPage />} />
        <Route path="/assets" element={<AssetsPage />} />
      </Routes>
      {!hideNavbar && <MarketAnalysisButton />}
      {!hideNavbar && (
        <nav className="fixed bottom-0 left-0 w-full bg-gray-900 text-gray-400 p-2 shadow-lg z-50">
          <div className="max-w-7xl mx-auto flex justify-around items-center">
            <NavLink to="/" className={({ isActive }: { isActive: boolean }) => `flex flex-col items-center text-center ${isActive ? 'text-white' : ''}`} end>
              <HomeIcon className="h-6 w-6" />
              <span className="text-xs">Trang chủ</span>
            </NavLink>
            <NavLink to="/market" className={({ isActive }: { isActive: boolean }) => `flex flex-col items-center text-center ${isActive ? 'text-white' : ''}`}>
              <BarChart2 className="h-6 w-6" />
              <span className="text-xs">Thị trường</span>
            </NavLink>
            <div className="flex flex-col items-center text-center text-cyan-400 font-bold">
              <span className="text-lg">{">"}</span>
              <span className="text-xs">1Z</span>
            </div>
            <NavLink to="/trade" className={({ isActive }: { isActive: boolean }) => `flex flex-col items-center text-center ${isActive ? 'text-white' : ''}`}>
              <TrendingUp className="h-6 w-6" />
              <span className="text-xs">Giao dịch</span>
            </NavLink>
            <NavLink to="/futures" className={({ isActive }: { isActive: boolean }) => `flex flex-col items-center text-center ${isActive ? 'text-white' : ''}`}>
              <LineChart className="h-6 w-6" />
              <span className="text-xs">Futures</span>
            </NavLink>
            <NavLink to="/invest" className={({ isActive }: { isActive: boolean }) => `flex flex-col items-center text-center ${isActive ? 'text-white' : ''}`}>
              <DollarSign className="h-6 w-6" />
              <span className="text-xs">Đầu tư</span>
            </NavLink>
            <NavLink to="/assets" className={({ isActive }: { isActive: boolean }) => `flex flex-col items-center text-center ${isActive ? 'text-white' : ''}`}>
              <Wallet className="h-6 w-6" />
              <span className="text-xs">Tài sản</span>
            </NavLink>
          </div>
        </nav>
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;