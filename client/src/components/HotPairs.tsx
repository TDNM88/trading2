import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface HotPair {
  symbol: string;
  price: number;
  change: number;
}

const HotPairs = () => {
  const pairs: HotPair[] = [
    { symbol: 'BTC-USD', price: 88453.1, change: 0.12 },
    { symbol: 'ETH-USD', price: 3245.67, change: -0.28 },
    { symbol: 'SOL-USD', price: 145.32, change: 3.42 },
    { symbol: 'OP-USD', price: 3.45, change: 3.31 },
    { symbol: 'DOGE-USD', price: 0.123, change: 3.14 },
    { symbol: 'ZK-USD', price: 2.34, change: 2.03 },
    { symbol: 'BNB-USD', price: 432.12, change: 1.72 },
    { symbol: 'NEAR-USD', price: 5.67, change: -1.58 }
  ];

  return (
    <div className="w-full bg-[#0B1118] border-b border-gray-800">
      <div className="flex items-center overflow-x-auto whitespace-nowrap py-1 px-4">
        <span className="text-gray-400 mr-4">Hot Pairs</span>
        {pairs.map((pair, index) => (
          <div
            key={index}
            className="flex items-center space-x-1 mr-6 last:mr-0"
          >
            <span className="text-gray-300">{pair.symbol}</span>
            <span className={pair.change >= 0 ? 'text-green-500' : 'text-red-500'}>
              {pair.change >= 0 ? (
                <TrendingUp className="h-4 w-4 inline" />
              ) : (
                <TrendingDown className="h-4 w-4 inline" />
              )}
              {pair.change >= 0 ? '+' : ''}{pair.change}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotPairs;