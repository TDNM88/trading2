import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart as LineChartIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
  time: string;
  nifty: number;
  bankNifty: number;
}

const MarketCharts = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    // Generate initial data
    const initialData: ChartData[] = Array.from({ length: 20 }, (_, i) => {
      const baseTime = new Date();
      baseTime.setMinutes(baseTime.getMinutes() - (19 - i));
      
      return {
        time: baseTime.toLocaleTimeString(),
        nifty: 22000 + Math.random() * 1000,
        bankNifty: 47000 + Math.random() * 2000,
      };
    });
    
    setChartData(initialData);

    // Update data every minute
    const interval = setInterval(() => {
      setChartData(prevData => {
        const newData = [...prevData.slice(1)];
        newData.push({
          time: new Date().toLocaleTimeString(),
          nifty: newData[newData.length - 1].nifty + (Math.random() - 0.5) * 100,
          bankNifty: newData[newData.length - 1].bankNifty + (Math.random() - 0.5) * 200,
        });
        return newData;
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/90 backdrop-blur-sm p-4 rounded-lg border border-gray-800">
          <p className="text-gray-400">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toFixed(2)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-2">Market Charts</h2>
          <p className="text-gray-400">Real-time price movements of major indices</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[
            { name: 'NIFTY 50', dataKey: 'nifty', color: '#4ADE80' },
            { name: 'BANK NIFTY', dataKey: 'bankNifty', color: '#60A5FA' }
          ].map((index) => (
            <motion.div
              key={index.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/30 rounded-xl p-6 border border-gray-700"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold">{index.name}</h3>
                  <div className="flex items-center mt-1">
                    {chartData.length >= 2 && (
                      <>
                        <span className={`flex items-center text-sm ${
                          chartData[chartData.length - 1][index.dataKey] >= chartData[chartData.length - 2][index.dataKey]
                            ? 'text-green-500'
                            : 'text-red-500'
                        }`}>
                          {chartData[chartData.length - 1][index.dataKey] >= chartData[chartData.length - 2][index.dataKey] ? (
                            <TrendingUp className="h-4 w-4 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 mr-1" />
                          )}
                          {chartData[chartData.length - 1][index.dataKey].toFixed(2)}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <LineChartIcon className="h-6 w-6 text-gray-400" />
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <XAxis
                      dataKey="time"
                      stroke="#4B5563"
                      tick={{ fill: '#9CA3AF' }}
                    />
                    <YAxis
                      stroke="#4B5563"
                      tick={{ fill: '#9CA3AF' }}
                      domain={['auto', 'auto']}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey={index.dataKey}
                      stroke={index.color}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketCharts;