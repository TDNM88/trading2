import React, { useState } from 'react';
import axios from 'axios';
import Topnav from './Topnav';
import Sidebar from './Sidebar';

const AddNews: React.FC = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    author: '',
  });
  const [message, setMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/news', form);
      setMessage('✅ News added successfully!');
      setForm({ title: '', description: '', category: '', author: '' });
    } catch (error) {
      console.error('Error adding news:', error);
      setMessage('❌ Failed to add news.');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {mobileSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={() => setMobileSidebarOpen(false)} />
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
          <h1 className="text-3xl font-bold text-indigo-700 mb-8">📰 Add News Article</h1>

          <div className="bg-white rounded-2xl shadow-md p-8 max-w-3xl mx-auto border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-800">News Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter news headline"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-800">Category</label>
                <input
                  type="text"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Politics, Sports"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-800">Author</label>
                <input
                  type="text"
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  required
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-800">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Write the full news description..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
                />
              </div>

              <button
                type="submit"
                className="bg-indigo-700 text-white px-6 py-2 rounded-lg hover:bg-indigo-800 transition duration-300"
              >
                Publish News
              </button>

              {message && <p className="text-center text-black font-medium">{message}</p>}
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddNews;
