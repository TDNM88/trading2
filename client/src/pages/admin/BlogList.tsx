import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiEdit, FiTrash2, FiEye, FiMenu, FiX } from 'react-icons/fi';
import Topnav from './Topnav';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
}

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const navigate = useNavigate(); // ✅ useNavigate called inside component

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/blogs');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await axios.delete(`http://localhost:5000/api/blogs/${id}`);
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

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
          <h1 className="text-2xl font-bold text-indigo-700 mb-6">All Blogs</h1>
          <div className="overflow-auto">
            <table className="min-w-full bg-white rounded shadow">
              <thead className="bg-indigo-100 text-indigo-800">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">SI.No</th>
                  <th className="text-left px-4 py-3 font-semibold">Title</th>
                  <th className="text-left px-4 py-3 font-semibold">Author</th>
                  <th className="text-left px-4 py-3 font-semibold">Content</th>
                  <th className="text-center px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog, index) => (
                  <tr key={blog._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 text-black">{index + 1}</td>
                    <td className="px-4 py-3 text-black">{blog.title}</td>
                    <td className="px-4 py-3 text-black">{blog.author}</td>
                    <td className="px-4 py-3 truncate max-w-xs text-black">
                      {blog.content.length > 80 ? blog.content.slice(0, 80) + '...' : blog.content}
                    </td>
                    <td className="px-4 py-3 text-center space-x-3">
                      <button className="text-blue-600 hover:text-blue-800" title="View">
                        <FiEye />
                      </button>
                      <button
                        onClick={() => navigate(`/admin/blogs/edit/${blog._id}`)}
                        className="text-green-600 hover:text-green-800"
                        title="Edit"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {blogs.length === 0 && (
              <p className="text-center text-gray-500 mt-4">No blogs available.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default BlogList;
