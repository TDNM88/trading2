import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { 
  FiHome, 
  FiUsers, 
  FiFileText, 
  FiGlobe, 
  FiShoppingBag,
  FiChevronDown 
} from 'react-icons/fi';
import { useNavigate } from "react-router-dom";

import { AdminAuthContext } from "../../contexts/AdminAuthContext";
const Sidebar = () => {
    
      const [sidebarOpen, setSidebarOpen] = useState(true);
      const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
      const navigate = useNavigate();
      const { logout } = React.useContext(AdminAuthContext);
    const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };
  return (
    <div>
       <nav className="p-4">
      <ul className="space-y-2">
        <li>
          <Link to="/dashboard" className="flex items-center p-3 rounded-lg bg-indigo-700">
            <FiHome size={20} />
            {sidebarOpen && <span className="ml-3">Dashboard</span>}
          </Link>
        </li>

        {/* Users Dropdown */}
        <li>
          <details className="group">
            <summary className="flex items-center p-3 rounded-lg hover:bg-indigo-700 cursor-pointer">
              <FiUsers size={20} />
              {sidebarOpen && (
                <div className="flex justify-between items-center w-full ml-3">
                  <span>Users</span>
                  <FiChevronDown className="transform group-open:rotate-180 transition-transform" size={16} />
                </div>
              )}
            </summary>
            {sidebarOpen && (
              <ul className="ml-8 mt-1 space-y-1">
                <li>
                  <Link to="/users/add" className="flex items-center p-2 rounded-lg hover:bg-indigo-600 text-sm">
                    Add
                  </Link>
                </li>
                <li>
                  <Link to="/admin/user" className="flex items-center p-2 rounded-lg hover:bg-indigo-600 text-sm">
                    View
                  </Link>
                </li>
              </ul>
            )}
          </details>
        </li>

        {/* Blog Dropdown */}
        <li>
          <details className="group">
            <summary className="flex items-center p-3 rounded-lg hover:bg-indigo-700 cursor-pointer">
              <FiFileText size={20} />
              {sidebarOpen && (
                <div className="flex justify-between items-center w-full ml-3">
                  <span>Blog</span>
                  <FiChevronDown className="transform group-open:rotate-180 transition-transform" size={16} />
                </div>
              )}
            </summary>
            {sidebarOpen && (
              <ul className="ml-8 mt-1 space-y-1">
                <li>
                  <Link to="/admin/add-blog" className="flex items-center p-2 rounded-lg hover:bg-indigo-600 text-sm">
                    Add
                  </Link>
                </li>
                <li>
                  <Link to="/admin/blogs" className="flex items-center p-2 rounded-lg hover:bg-indigo-600 text-sm">
                    View
                  </Link>
                </li>
              </ul>
            )}
          </details>
        </li>

        {/* News Dropdown */}
        <li>
          <details className="group">
            <summary className="flex items-center p-3 rounded-lg hover:bg-indigo-700 cursor-pointer">
              <FiGlobe size={20} />
              {sidebarOpen && (
                <div className="flex justify-between items-center w-full ml-3">
                  <span>News</span>
                  <FiChevronDown className="transform group-open:rotate-180 transition-transform" size={16} />
                </div>
              )}
            </summary>
            {sidebarOpen && (
              <ul className="ml-8 mt-1 space-y-1">
                <li>
                  <Link to="/admin/add-news" className="flex items-center p-2 rounded-lg hover:bg-indigo-600 text-sm">
                    Add
                  </Link>
                </li>
                <li>
                  <Link to="/admin/news" className="flex items-center p-2 rounded-lg hover:bg-indigo-600 text-sm">
                    View
                  </Link>
                </li>
              </ul>
            )}
          </details>
        </li>

        {/* Order Dropdown */}
        <li>
          <details className="group">
            <summary className="flex items-center p-3 rounded-lg hover:bg-indigo-700 cursor-pointer">
              <FiShoppingBag size={20} />
              {sidebarOpen && (
                <div className="flex justify-between items-center w-full ml-3">
                  <span>Order</span>
                  <FiChevronDown className="transform group-open:rotate-180 transition-transform" size={16} />
                </div>
              )}
            </summary>
            {sidebarOpen && (
              <ul className="ml-8 mt-1 space-y-1">
                
                <li>
                  <Link to="/orders/view" className="flex items-center p-2 rounded-lg hover:bg-indigo-600 text-sm">
                    View All Orders
                  </Link>
                </li>
              </ul>
            )}
          </details>
        </li>
      </ul>
    </nav></div>
  )
}

export default Sidebar