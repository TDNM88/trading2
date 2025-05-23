import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import MarketAnalysisButton from './components/MarketAnalysisButton';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import PaperTrading from './pages/PaperTrading';
import TradeAlgoPilot from './pages/TradeAlgoPilot';
import Library from './pages/Library';
import Tutorials from './pages/Tutorials';
import BlogsNews from './pages/BlogsNews';
import Updates from './pages/Updates';
import About from './pages/About';
import Premium from './pages/Premium';
import Login from './pages/Login';
import TutorialDetail from './pages/TutorialDetail';
import IndicatorDetail from './pages/IndicatorDetail';
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';

// Move the app content to a separate component so we can use useLocation
function AppContent() {
  const location = useLocation();

  // Hide Navbar on admin routes
  const hideNavbar = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B1118] text-gray-900 dark:text-white transition-colors duration-200">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            
              <Dashboard />
            
          }
        />
        <Route
          path="/paper-trading"
          element={
            
              <PaperTrading />
          
          }
        />
        <Route
          path="/trade-algo-pilot"
          element={
            
              <TradeAlgoPilot />
          
          }
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
        <Route path="/admin/Dashboard" element={<DashboardPage />} />
      </Routes>
      {!hideNavbar && <MarketAnalysisButton />}
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
