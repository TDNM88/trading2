import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Topnav from './Topnav';
import Sidebar from './Sidebar';
import { FiMenu, FiX } from 'react-icons/fi';

const EditNews: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    category: '',
    author: '',
    description: '',
  });

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/news/${id}`)
      .then((res) => {
        setForm({
          title: res.data.title || '',
          category: res.data.category || '',
          author: res.data.author || '',
          description: res.data.description || '',
        });
      })
      .catch((err) => console.error('Error fetching news:', err));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/news/${id}`, form);
      setMessage('News updated successfully.');
      setTimeout(() => navigate('/admin/news'), 1000);
    } catch (error) {
      console.error('Error updating news:', error);
      setMessage('Failed to update news.');
    }
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleMobileSidebar = () => setMobileSidebarOpen(!mobileSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

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

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topnav />
        <main className="flex-1 overflow-y-auto p-6 bg-white">
          <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold text-indigo-700 mb-6">Edit News</h2>
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
                Update News
              </button>

              {message && <p className="text-center text-black font-medium">{message}</p>}
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditNews;
