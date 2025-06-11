import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiEdit, FiTrash2, FiEye, FiMenu, FiX } from 'react-icons/fi';
import Topnav from './Topnav';
import Sidebar from './Sidebar';

interface User {
  _id: string;
  email: string;
  tradingViewId: string;
  tradingStyle: string;
  capital: string;
  experience: string;
}

const Userlist: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleMobileSidebar = () => setMobileSidebarOpen(!mobileSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Mobile backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static z-30 bg-indigo-800 text-white transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'}
          ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-64`}
      >
        <div className="flex items-center justify-between p-4 border-b border-indigo-700">
          <button onClick={toggleSidebar} className="p-1 rounded-lg hover:bg-indigo-700 hidden lg:block">
            {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
          <button onClick={toggleMobileSidebar} className="p-1 rounded-lg hover:bg-indigo-700 block lg:hidden">
            <FiX size={20} />
          </button>
        </div>
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topnav />
        <main className="flex-1 overflow-y-auto p-6 bg-white">
          <h1 className="text-2xl font-bold text-indigo-700 mb-6">All Users</h1>
          <div className="overflow-auto">
            <table className="min-w-full bg-white rounded shadow">
              <thead className="bg-indigo-100 text-indigo-800">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">S.No</th>
                  <th className="text-left px-4 py-3 font-semibold">Email</th>
                  <th className="text-left px-4 py-3 font-semibold">TradingView ID</th>
                  <th className="text-left px-4 py-3 font-semibold">Trading Style</th>
                  <th className="text-left px-4 py-3 font-semibold">Capital</th>
                  <th className="text-left px-4 py-3 font-semibold">Experience</th>
                  <th className="text-center px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 text-black">{index + 1}</td>
                    <td className="px-4 py-3 text-black">{user.email}</td>
                    <td className="px-4 py-3 text-black">{user.tradingViewId}</td>
                    <td className="px-4 py-3 text-black">{user.tradingStyle}</td>
                    <td className="px-4 py-3 text-black">{user.capital}</td>
                    <td className="px-4 py-3 text-black">{user.experience}</td>
                    <td className="px-4 py-3 text-center space-x-3">
                      <button className="text-blue-600 hover:text-blue-800" title="View">
                        <FiEye />
                      </button>
                      <button className="text-green-600 hover:text-green-800" title="Edit">
                        <FiEdit />
                      </button>
                      <button className="text-red-600 hover:text-red-800" title="Delete">
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && (
              <p className="text-center text-gray-500 mt-4">No users available.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Userlist;
