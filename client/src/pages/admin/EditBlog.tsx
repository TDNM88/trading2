import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Topnav from './Topnav';
import Sidebar from './Sidebar';
import { FiMenu, FiX } from 'react-icons/fi';

const EditBlog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/blogs/${id}`).then((res) => {
      setTitle(res.data.title);
      setContent(res.data.content);
      setAuthor(res.data.author);
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/blogs/${id}`, {
        title,
        content,
        author,
      });
      navigate('/admin/blogs');
    } catch (error) {
      console.error('Error updating blog:', error);
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
          <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold text-indigo-700 mb-6">Edit Blog</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="w-full border p-3 rounded placeholder:text-black text-black"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
              />
              <input
                className="w-full border p-3 rounded placeholder:text-black text-black"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author"
                required
              />
              <textarea
                className="w-full border p-3 rounded h-40 placeholder:text-black text-black"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content"
                required
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Update Blog
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditBlog;
