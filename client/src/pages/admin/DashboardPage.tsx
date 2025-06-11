import { useState } from "react";
import {
  FiHome,
  FiUsers,
  FiSettings,
  FiPieChart,
  FiShoppingCart,
  FiCalendar,
  FiMail,

  FiMenu,
  FiX,
} from "react-icons/fi";

import Recentorder from "./Recentorder";

import Revenueoverview from "./Revenueoverview";
import Cards from "./Cards";
import Topnav from "./Topnav";
import Sidebar from "./Sidebar";

const DashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Mobile sidebar backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleMobileSidebar}
        ></div>
      )}

      {/* Sidebar */}

      <div
        className={`fixed lg:static z-30 w-64 bg-indigo-800 text-white transition-all duration-300 ease-in-out
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0 lg:w-20"
          }
          ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-indigo-700">
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-lg hover:bg-indigo-700 lg:block hidden"
          >
            {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
          <button
            onClick={toggleMobileSidebar}
            className="p-1 rounded-lg hover:bg-indigo-700 lg:hidden block"
          >
            <FiX size={20} />
          </button>
        </div>
           <Sidebar/>
      </div>
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topnav/>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
                 <Cards />
            <Revenueoverview />
          <div>
            <Recentorder />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
