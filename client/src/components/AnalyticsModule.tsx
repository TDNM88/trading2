import React from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { Activity, TrendingUp, Award, Target } from 'lucide-react';

const AnalyticsModule = () => {
  // Mock data - Replace with real data
  const performanceData = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    pnl: Math.random() * 10000 - 5000,
    cumulative: Math.random() * 50000
  }));

  const statistics = {
    successRate: 68,
    totalTrades: 156,
    avgReturn: 2450,
    winStreak: 5
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/90 backdrop-blur-sm p-4 rounded-lg border border-gray-800">
          <p className="text-gray-400">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: ₹{entry.value.toFixed(2)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Success Rate', value: `${statistics.successRate}%`, icon: Activity, color: 'blue' },
          { title: 'Total Trades', value: statistics.totalTrades, icon: TrendingUp, color: 'green' },
          { title: 'Avg. Return', value: `₹${statistics.avgReturn}`, icon: Award, color: 'yellow' },
          { title: 'Win Streak', value: statistics.winStreak, icon: Target, color: 'purple' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800/30 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`h-8 w-8 text-${stat.color}-500`} />
              <span className={`text-${stat.color}-500 text-sm font-medium`}>
                Last 30 days
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
            <p className="text-gray-400">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/30 rounded-xl border border-gray-700 p-6"
      >
        <h2 className="text-xl font-semibold mb-6">Performance Overview</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="colorPnl" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#4ADE80" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#4B5563" />
              <YAxis stroke="#4B5563" />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="cumulative"
                stroke="#4ADE80"
                fillOpacity={1}
                fill="url(#colorPnl)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Trade Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/30 rounded-xl border border-gray-700 p-6"
        >
          <h2 className="text-xl font-semibold mb-6">Trade Distribution</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { category: 'Equity', count: 45 },
                { category: 'F&O', count: 32 },
                { category: 'Options', count: 28 },
                { category: 'Futures', count: 15 }
              ]}>
                <XAxis dataKey="category" stroke="#4B5563" />
                <YAxis stroke="#4B5563" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#60A5FA" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/30 rounded-xl border border-gray-700 p-6"
        >
          <h2 className="text-xl font-semibold mb-6">Win/Loss Ratio</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Wins', value: statistics.successRate },
                    { name: 'Losses', value: 100 - statistics.successRate }
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#4ADE80"
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#4ADE80" />
                  <Cell fill="#EF4444" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsModule;