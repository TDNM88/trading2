import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Filter, RefreshCcw } from 'lucide-react';
import PersonalTradingDashboard from './PersonalTradingDashboard';

interface MarketData {
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
}

interface IndexData {
  nifty50: MarketData;
  bankNifty: MarketData;
}

interface SectoralIndex {
  name: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
}

// Default market data
const defaultMarketData: IndexData = {
  nifty50: {
    price: 22345.30,
    change: 156.35,
    changePercent: 0.72,
    high: 22400.10,
    low: 22250.80
  },
  bankNifty: {
    price: 47123.45,
    change: -234.20,
    changePercent: -0.49,
    high: 47500.30,
    low: 47000.15
  }
};

// Function to simulate market data updates
const simulateMarketData = (prevData: IndexData): IndexData => {
  const updateIndex = (prev: MarketData): MarketData => {
    const priceChange = (Math.random() - 0.5) * 20;
    const newPrice = prev.price + priceChange;
    const newHigh = Math.max(prev.high, newPrice);
    const newLow = Math.min(prev.low, newPrice);
    
    return {
      price: newPrice,
      change: newPrice - (prev.price - prev.change),
      changePercent: ((newPrice - (prev.price - prev.change)) / (prev.price - prev.change)) * 100,
      high: newHigh,
      low: newLow
    };
  };

  return {
    nifty50: updateIndex(prevData.nifty50),
    bankNifty: updateIndex(prevData.bankNifty)
  };
};

const sectoralIndices: SectoralIndex[] = [
  {
    name: "Auto",
    price: 18234.56,
    change: 145.30,
    changePercent: 0.80,
    high: 18300.00,
    low: 18150.25
  },
  {
    name: "IT",
    price: 36789.20,
    change: -256.40,
    changePercent: -0.69,
    high: 37000.50,
    low: 36700.80
  },
  {
    name: "Pharma",
    price: 14567.80,
    change: 89.45,
    changePercent: 0.62,
    high: 14600.00,
    low: 14500.30
  },
  {
    name: "FMCG",
    price: 52345.67,
    change: 234.56,
    changePercent: 0.45,
    high: 52400.00,
    low: 52200.00
  },
  {
    name: "Metal",
    price: 7890.23,
    change: -45.67,
    changePercent: -0.57,
    high: 7950.00,
    low: 7850.00
  },
  {
    name: "Realty",
    price: 890.45,
    change: 12.34,
    changePercent: 1.41,
    high: 895.00,
    low: 885.00
  },
  {
    name: "Energy",
    price: 25678.90,
    change: 167.89,
    changePercent: 0.66,
    high: 25700.00,
    low: 25600.00
  },
  {
    name: "Media",
    price: 2345.67,
    change: -23.45,
    changePercent: -0.99,
    high: 2360.00,
    low: 2340.00
  },
  {
    name: "PSU Bank",
    price: 4567.89,
    change: 34.56,
    changePercent: 0.76,
    high: 4580.00,
    low: 4550.00
  },
  {
    name: "Private Bank",
    price: 23456.78,
    change: -123.45,
    changePercent: -0.52,
    high: 23500.00,
    low: 23400.00
  }
];

const FinancialDashboard = () => {
  const [data, setData] = useState<IndexData>(defaultMarketData);
  const [sectors, setSectors] = useState<SectoralIndex[]>(sectoralIndices);
  const [sortBy, setSortBy] = useState<'name' | 'change' | 'price'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    // Initial update
    setData(simulateMarketData(defaultMarketData));
    setLastUpdated(new Date());

    // Update every minute
    const interval = setInterval(() => {
      setData(prevData => simulateMarketData(prevData));
      setLastUpdated(new Date());

      // Also update sectoral indices with random variations
      setSectors(prevSectors => 
        prevSectors.map(sector => ({
          ...sector,
          price: sector.price + (Math.random() - 0.5) * 50,
          change: (Math.random() - 0.5) * 20,
          changePercent: (Math.random() - 0.5) * 2
        }))
      );
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleSort = (criteria: 'name' | 'change' | 'price') => {
    setSortBy(criteria);
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    
    const sortedSectors = [...sectors].sort((a, b) => {
      if (criteria === 'name') {
        return sortOrder === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      if (criteria === 'change') {
        return sortOrder === 'asc'
          ? a.changePercent - b.changePercent
          : b.changePercent - a.changePercent;
      }
      return sortOrder === 'asc'
        ? a.price - b.price
        : b.price - a.price;
    });

    setSectors(sortedSectors);
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Personal Trading Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <PersonalTradingDashboard />
        </motion.div>

        {/* Primary Indices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {[
            { name: "NIFTY 50", data: data.nifty50 },
            { name: "BANK NIFTY", data: data.bankNifty }
          ].map((index) => (
            <motion.div
              key={index.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/30 rounded-xl p-6 border border-gray-700"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-400">{index.name}</h3>
                  <div className="flex items-baseline mt-2">
                    <span className="text-3xl font-bold">
                      {index.data.price.toFixed(2)}
                    </span>
                    <span className={`ml-4 flex items-center ${
                      index.data.change >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {index.data.change >= 0 ? (
                        <TrendingUp className="h-5 w-5 mr-1" />
                      ) : (
                        <TrendingDown className="h-5 w-5 mr-1" />
                      )}
                      {Math.abs(index.data.change).toFixed(2)} ({Math.abs(index.data.changePercent).toFixed(2)}%)
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm">
                    <span className="text-gray-400">High: </span>
                    <span className="text-green-500">{index.data.high.toFixed(2)}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-400">Low: </span>
                    <span className="text-red-500">{index.data.low.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sectoral Indices */}
        <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Sectoral Indices</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleSort('name')}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    sortBy === 'name' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  Name
                </button>
                <button
                  onClick={() => handleSort('change')}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    sortBy === 'change' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  Change %
                </button>
                <button
                  onClick={() => handleSort('price')}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    sortBy === 'price' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  Price
                </button>
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <RefreshCcw className="h-4 w-4 mr-2" />
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sectors.map((sector, index) => (
              <motion.div
                key={sector.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-gray-900/50 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{sector.name}</h4>
                  <span className={`flex items-center text-sm ${
                    sector.change >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {sector.change >= 0 ? (
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 mr-1" />
                    )}
                    {Math.abs(sector.changePercent).toFixed(2)}%
                  </span>
                </div>
                <div className="text-2xl font-semibold mb-2">
                  {sector.price.toFixed(2)}
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>H: {sector.high.toFixed(2)}</span>
                  <span>L: {sector.low.toFixed(2)}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialDashboard;