import React, { useState } from 'react';
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
  FiX
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { AdminAuthContext } from '../../contexts/AdminAuthContext';

const DashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = React.useContext(AdminAuthContext);

  // Sample data - replace with real data from your API
  const stats = [
    { title: 'Total Users', value: '2,543', change: '+12%', trend: 'up' },
    { title: 'Revenue', value: '$12,345', change: '+8%', trend: 'up' },
    { title: 'Orders', value: '543', change: '-3%', trend: 'down' },
    { title: 'Conversion', value: '3.2%', change: '+0.5%', trend: 'up' }
  ];

  const recentOrders = [
    { id: '#12345', customer: 'John Doe', date: '2023-05-15', amount: '$125.00', status: 'Delivered' },
    { id: '#12346', customer: 'Jane Smith', date: '2023-05-14', amount: '$89.00', status: 'Shipped' },
    { id: '#12347', customer: 'Robert Johnson', date: '2023-05-14', amount: '$235.00', status: 'Processing' },
    { id: '#12348', customer: 'Emily Davis', date: '2023-05-13', amount: '$64.00', status: 'Delivered' },
    { id: '#12349', customer: 'Michael Wilson', date: '2023-05-12', amount: '$189.00', status: 'Delivered' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

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
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'}
          ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
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

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <a 
                href="#"
                className="flex items-center p-3 rounded-lg bg-indigo-700"
              >
                <FiHome size={20} />
                {sidebarOpen && <span className="ml-3">Dashboard</span>}
              </a>
            </li>
            <li>
              <a 
                href="#"
                className="flex items-center p-3 rounded-lg hover:bg-indigo-700"
              >
                <FiUsers size={20} />
                {sidebarOpen && <span className="ml-3">Users</span>}
              </a>
            </li>
            <li>
              <a 
                href="#"
                className="flex items-center p-3 rounded-lg hover:bg-indigo-700"
              >
                <FiShoppingCart size={20} />
                {sidebarOpen && <span className="ml-3">Products</span>}
              </a>
            </li>
            <li>
              <a 
                href="#"
                className="flex items-center p-3 rounded-lg hover:bg-indigo-700"
              >
                <FiPieChart size={20} />
                {sidebarOpen && <span className="ml-3">Analytics</span>}
              </a>
            </li>
            <li>
              <a 
                href="#"
                className="flex items-center p-3 rounded-lg hover:bg-indigo-700"
              >
                <FiCalendar size={20} />
                {sidebarOpen && <span className="ml-3">Calendar</span>}
              </a>
            </li>
            <li>
              <a 
                href="#"
                className="flex items-center p-3 rounded-lg hover:bg-indigo-700"
              >
                <FiMail size={20} />
                {sidebarOpen && <span className="ml-3">Messages</span>}
              </a>
            </li>
            <li>
              <a 
                href="#"
                className="flex items-center p-3 rounded-lg hover:bg-indigo-700"
              >
                <FiSettings size={20} />
                {sidebarOpen && <span className="ml-3">Settings</span>}
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <button 
                onClick={toggleMobileSidebar}
                className="p-2 mr-2 rounded-lg hover:bg-gray-100 lg:hidden"
              >
                <FiMenu size={20} />
              </button>
              <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
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
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <p className="text-2xl font-semibold text-gray-800 mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {stat.trend === 'up' ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                      </svg>
                    )}
                  </div>
                </div>
                <p className={`text-sm mt-2 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last week
                </p>
              </div>
            ))}
          </div>

          {/* Charts and recent orders */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Revenue Overview</h2>
                <select className="text-sm border border-gray-300 rounded px-3 py-1">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
              <div className="h-80">
                {/* Chart placeholder - replace with your chart library */}
                <div className="flex items-center justify-center h-full bg-gray-100 rounded">
                  <p className="text-gray-500">Revenue chart will appear here</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h2>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <FiUsers className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">New user registered</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent orders table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                             order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 
                             'bg-yellow-100 text-yellow-800'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">View</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">24</span> results
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;