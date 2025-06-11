import React, { useState } from "react";
import {
  FiHome,
  FiUsers,
  FiSettings,
  FiPieChart,
  FiShoppingCart,
  FiCalendar,
  FiMail,
  FiBell,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

import { AdminAuthContext } from "../../contexts/AdminAuthContext";
const Topnav = () => {
    
      const [sidebarOpen, setSidebarOpen] = useState(true);
      
        const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
        const navigate = useNavigate();
        const { logout } = React.useContext(AdminAuthContext);
        
  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };
  return (
    <div>{/* Top navigation */}
        <header className="bg-black shadow-sm z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <button
                onClick={toggleMobileSidebar}
                className="p-2 mr-2 rounded-lg hover:bg-gray-100 lg:hidden"
              >
                <FiMenu size={20} />
              </button>
              <h1 className="text-xl font-semibold text-white-800">
                Dashboard
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <FiMail size={20} />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <FiBell size={20} />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                  AD
                </div>
                {sidebarOpen && (
                  <span className="ml-2 text-sm font-medium">Admin User</span>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-gray-100"
                title="Logout"
              >
                <FiLogOut size={20} />
              </button>
            </div>
          </div>
        </header></div>
  )
}

export default Topnav