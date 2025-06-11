import React, { useState } from 'react';
import axios from 'axios';
import Topnav from './Topnav';
import Sidebar from './Sidebar';

const AddBlog: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    content: '',
    author: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/blogs', form);
      setMessage('✅ Blog added successfully!');
      setForm({ title: '', content: '', author: '' });
    } catch (error) {
      console.error('Error adding blog:', error);
      setMessage('❌ Failed to add blog.');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Sidebar Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static z-30 bg-indigo-800 text-white transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'}
          ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-64`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topnav />
        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-3xl font-bold text-indigo-700 mb-8">📝 Add New Blog</h1>

          <div className="bg-white rounded-2xl shadow-md p-8 max-w-3xl mx-auto border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-800">Blog Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                  placeholder="Enter blog title"
                />
              </div>

              {/* Author */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-800">Author</label>
                <input
                  type="text"
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                  placeholder="Enter author name"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-800">Content</label>
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                  placeholder="Write your blog content..."
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 shadow-sm"
                >
                  Publish Blog
                </button>
              </div>

              {/* Feedback Message */}
              {message && (
                <p className="text-center text-sm font-medium mt-4 text-black">{message}</p>
              )}
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddBlog;
