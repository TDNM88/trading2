import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, BookOpen, PenTool as Tool, Settings, Plus, Trash2, Edit, Save, X } from 'lucide-react';

interface Indicator {
  id: string;
  name: string;
  description: string;
  type: string;
  settings: string;
}

interface LibraryItem {
  id: string;
  title: string;
  description: string;
  category: string;
  content: string;
}

interface Tool {
  id: string;
  name: string;
  description: string;
  features: string[];
  status: 'active' | 'inactive';
}

const Admin = () => {
  const [activeTab, setActiveTab] = useState('indicators');
  const [indicators, setIndicators] = useState<Indicator[]>([]);
  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  // New item states
  const [newIndicator, setNewIndicator] = useState<Indicator>({
    id: '',
    name: '',
    description: '',
    type: '',
    settings: ''
  });

  const [newLibraryItem, setNewLibraryItem] = useState<LibraryItem>({
    id: '',
    title: '',
    description: '',
    category: '',
    content: ''
  });

  const [newTool, setNewTool] = useState<Tool>({
    id: '',
    name: '',
    description: '',
    features: [],
    status: 'active'
  });

  const handleAddIndicator = () => {
    if (newIndicator.name && newIndicator.description) {
      setIndicators([...indicators, { ...newIndicator, id: Date.now().toString() }]);
      setNewIndicator({ id: '', name: '', description: '', type: '', settings: '' });
    }
  };

  const handleAddLibraryItem = () => {
    if (newLibraryItem.title && newLibraryItem.description) {
      setLibraryItems([...libraryItems, { ...newLibraryItem, id: Date.now().toString() }]);
      setNewLibraryItem({ id: '', title: '', description: '', category: '', content: '' });
    }
  };

  const handleAddTool = () => {
    if (newTool.name && newTool.description) {
      setTools([...tools, { ...newTool, id: Date.now().toString() }]);
      setNewTool({ id: '', name: '', description: '', features: [], status: 'active' });
    }
  };

  const handleDelete = (id: string, type: 'indicator' | 'library' | 'tool') => {
    switch (type) {
      case 'indicator':
        setIndicators(indicators.filter(item => item.id !== id));
        break;
      case 'library':
        setLibraryItems(libraryItems.filter(item => item.id !== id));
        break;
      case 'tool':
        setTools(tools.filter(item => item.id !== id));
        break;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'indicators':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4">Add New Indicator</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Indicator Name"
                  value={newIndicator.name}
                  onChange={(e) => setNewIndicator({ ...newIndicator, name: e.target.value })}
                  className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Type"
                  value={newIndicator.type}
                  onChange={(e) => setNewIndicator({ ...newIndicator, type: e.target.value })}
                  className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
                />
                <textarea
                  placeholder="Description"
                  value={newIndicator.description}
                  onChange={(e) => setNewIndicator({ ...newIndicator, description: e.target.value })}
                  className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-blue-500 md:col-span-2"
                />
                <textarea
                  placeholder="Settings (JSON)"
                  value={newIndicator.settings}
                  onChange={(e) => setNewIndicator({ ...newIndicator, settings: e.target.value })}
                  className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-blue-500 md:col-span-2"
                />
                <button
                  onClick={handleAddIndicator}
                  className="md:col-span-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Indicator
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {indicators.map(indicator => (
                <motion.div
                  key={indicator.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-800/30 rounded-xl p-6 border border-gray-700"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-semibold">{indicator.name}</h4>
                      <p className="text-gray-400 mt-1">{indicator.description}</p>
                      <div className="mt-2 flex gap-2">
                        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-500 text-sm">
                          {indicator.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(indicator.id, 'indicator')}
                        className="p-2 rounded-lg hover:bg-red-500/20 text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setEditingId(indicator.id)}
                        className="p-2 rounded-lg hover:bg-blue-500/20 text-blue-500"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'library':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4">Add Library Item</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={newLibraryItem.title}
                  onChange={(e) => setNewLibraryItem({ ...newLibraryItem, title: e.target.value })}
                  className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={newLibraryItem.category}
                  onChange={(e) => setNewLibraryItem({ ...newLibraryItem, category: e.target.value })}
                  className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
                />
                <textarea
                  placeholder="Description"
                  value={newLibraryItem.description}
                  onChange={(e) => setNewLibraryItem({ ...newLibraryItem, description: e.target.value })}
                  className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-blue-500 md:col-span-2"
                />
                <textarea
                  placeholder="Content"
                  value={newLibraryItem.content}
                  onChange={(e) => setNewLibraryItem({ ...newLibraryItem, content: e.target.value })}
                  className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-blue-500 md:col-span-2"
                  rows={4}
                />
                <button
                  onClick={handleAddLibraryItem}
                  className="md:col-span-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Library Item
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {libraryItems.map(item => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-800/30 rounded-xl p-6 border border-gray-700"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-semibold">{item.title}</h4>
                      <p className="text-gray-400 mt-1">{item.description}</p>
                      <div className="mt-2">
                        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-500 text-sm">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(item.id, 'library')}
                        className="p-2 rounded-lg hover:bg-red-500/20 text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setEditingId(item.id)}
                        className="p-2 rounded-lg hover:bg-blue-500/20 text-blue-500"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'tools':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4">Add New Tool</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Tool Name"
                  value={newTool.name}
                  onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
                  className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
                />
                <select
                  value={newTool.status}
                  onChange={(e) => setNewTool({ ...newTool, status: e.target.value as 'active' | 'inactive' })}
                  className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <textarea
                  placeholder="Description"
                  value={newTool.description}
                  onChange={(e) => setNewTool({ ...newTool, description: e.target.value })}
                  className="px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-blue-500 md:col-span-2"
                />
                <div className="md:col-span-2">
                  <input
                    type="text"
                    placeholder="Add feature and press Enter"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value) {
                        e.preventDefault();
                        setNewTool({
                          ...newTool,
                          features: [...newTool.features, e.currentTarget.value]
                        });
                        e.currentTarget.value = '';
                      }
                    }}
                    className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newTool.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-500 text-sm flex items-center gap-2"
                      >
                        {feature}
                        <button
                          onClick={() => setNewTool({
                            ...newTool,
                            features: newTool.features.filter((_, i) => i !== index)
                          })}
                          className="hover:text-blue-400"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={handleAddTool}
                  className="md:col-span-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Tool
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {tools.map(tool => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-800/30 rounded-xl p-6 border border-gray-700"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-semibold">{tool.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          tool.status === 'active' 
                            ? 'bg-green-500/20 text-green-500'
                            : 'bg-red-500/20 text-red-500'
                        }`}>
                          {tool.status}
                        </span>
                      </div>
                      <p className="text-gray-400 mt-1">{tool.description}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {tool.features.map((feature, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-500 text-sm"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(tool.id, 'tool')}
                        className="p-2 rounded-lg hover:bg-red-500/20 text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setEditingId(tool.id)}
                        className="p-2 rounded-lg hover:bg-blue-500/20 text-blue-500"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
          <p className="text-xl text-gray-400">Manage your trading platform content</p>
        </motion.div>

        <div className="flex space-x-4 mb-8">
          <TabButton
            active={activeTab === 'indicators'}
            onClick={() => setActiveTab('indicators')}
            icon={<LineChart className="h-5 w-5" />}
            text="Indicators"
          />
          <TabButton
            active={activeTab === 'library'}
            onClick={() => setActiveTab('library')}
            icon={<BookOpen className="h-5 w-5" />}
            text="Library"
          />
          <TabButton
            active={activeTab === 'tools'}
            onClick={() => setActiveTab('tools')}
            icon={<Tool className="h-5 w-5" />}
            text="Tools"
          />
          <TabButton
            active={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
            icon={<Settings className="h-5 w-5" />}
            text="Settings"
          />
        </div>

        {renderTabContent()}
      </div>
    </div>
  );
};

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  text: string;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, icon, text }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
      active
        ? 'bg-blue-600 text-white'
        : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800'
    }`}
  >
    {icon}
    <span>{text}</span>
  </button>
);

export default Admin;