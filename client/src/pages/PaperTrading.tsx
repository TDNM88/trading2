import React, { useState } from 'react';
import OrderEntry from '../components/OrderEntry';
import OrderBook from '../components/OrderBook';
import PositionBook from '../components/PositionBook';
import TradingViewChart from '../components/TradingViewChart';

const PaperTrading = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('NIFTY');

  return (
    
    <div className="min-h-screen bg-[#0B1118] mt-15 pt-16 px-4 md:px-8 lg:px-12">
      <h6 className="text-white  font-semibold mb-4">Live Chart - {selectedSymbol}</h6>
      <div className="flex flex-col lg:flex-row gap-6 min-h-[calc(100vh-4rem)]">
        
        {/* Left Panel: Chart + Order Book */}
        <div className="lg:w-2/3 flex flex-col gap-6">
          <div className="bg-[#1E293B] rounded-2xl border border-gray-700 p-5 shadow-md flex-1">
            
            <div className="h-[500px] w-full">
              <TradingViewChart symbol={selectedSymbol} />
            </div>
          </div>

          <div className="bg-[#1E293B] rounded-2xl border border-gray-700 p-5 shadow-md">
            <h2 className="text-white text-lg font-semibold mb-4">Order Book</h2>
            <OrderBook />
          </div>
        </div>

        {/* Right Panel: Order Entry + Position Book */}
        <div className="lg:w-1/3 flex flex-col gap-6">
          <div className="bg-[#1E293B] rounded-2xl border border-gray-700 p-5 shadow-md">
            <h2 className="text-white text-lg font-semibold mb-4">Order Entry</h2>
            <OrderEntry />
          </div>

          <div className="bg-[#1E293B] rounded-2xl border border-gray-700 p-5 shadow-md">
            <h2 className="text-white text-lg font-semibold mb-4">Position Book</h2>
            <PositionBook />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperTrading;
