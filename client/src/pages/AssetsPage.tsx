import { useState } from 'react';
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  RefreshCw,
  Search,
  Star,
  ChevronDown,
  Filter,
  MoreHorizontal,
  PieChart
} from 'lucide-react';

interface Asset {
  coin: string;
  name: string;
  balance: number;
  availableBalance: number;
  inOrder: number;
  value: number; // USD value
  change24h: number;
  favorite: boolean;
}

interface TransactionHistory {
  id: string;
  type: 'deposit' | 'withdrawal' | 'trade' | 'convert' | 'earn';
  coin: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: Date;
  txid?: string;
  fee?: number;
}

// Mock data
const mockAssets: Asset[] = [
  {
    coin: 'BTC',
    name: 'Bitcoin',
    balance: 0.12345,
    availableBalance: 0.12045,
    inOrder: 0.003,
    value: 8456.32,
    change24h: 2.3,
    favorite: true
  },
  {
    coin: 'ETH',
    name: 'Ethereum',
    balance: 3.5,
    availableBalance: 3.5,
    inOrder: 0,
    value: 11431.25,
    change24h: 1.8,
    favorite: true
  },
  {
    coin: 'SOL',
    name: 'Solana',
    balance: 42.5,
    availableBalance: 40.5,
    inOrder: 2,
    value: 6066.25,
    change24h: -0.9,
    favorite: false
  },
  {
    coin: 'USDT',
    name: 'Tether',
    balance: 5250.75,
    availableBalance: 4000.75,
    inOrder: 1250,
    value: 5250.75,
    change24h: 0.01,
    favorite: false
  },
  {
    coin: 'BNB',
    name: 'Binance Coin',
    balance: 12.35,
    availableBalance: 12.35,
    inOrder: 0,
    value: 6975.05,
    change24h: 0.5,
    favorite: false
  }
];

const mockTransactions: TransactionHistory[] = [
  {
    id: '12345',
    type: 'deposit',
    coin: 'BTC',
    amount: 0.05,
    status: 'completed',
    date: new Date(Date.now() - 86400000), // 1 day ago
    txid: '0x1234567890abcdef',
    fee: 0.0001
  },
  {
    id: '12346',
    type: 'withdrawal',
    coin: 'ETH',
    amount: 1.2,
    status: 'completed',
    date: new Date(Date.now() - 172800000), // 2 days ago
    txid: '0xabcdef1234567890',
    fee: 0.002
  },
  {
    id: '12347',
    type: 'trade',
    coin: 'BTC',
    amount: 0.02,
    status: 'completed',
    date: new Date(Date.now() - 259200000), // 3 days ago
  },
  {
    id: '12348',
    type: 'convert',
    coin: 'ETH',
    amount: 2.5,
    status: 'completed',
    date: new Date(Date.now() - 345600000), // 4 days ago
  },
  {
    id: '12349',
    type: 'deposit',
    coin: 'USDT',
    amount: 2000,
    status: 'pending',
    date: new Date(Date.now() - 3600000), // 1 hour ago
    txid: '0x0987654321abcdef',
  }
];

const AssetsPage = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'history'>('overview');
  const [assetView, setAssetView] = useState<'all' | 'favorites'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'balance' | 'name' | 'value' | 'change'>('value');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Total balance calculation
  const totalBalance = mockAssets.reduce((sum, asset) => sum + asset.value, 0);
  const totalAvailableBalance = mockAssets.reduce((sum, asset) => sum + (asset.value * asset.availableBalance / asset.balance), 0);
  const totalInOrderBalance = mockAssets.reduce((sum, asset) => sum + (asset.value * asset.inOrder / asset.balance), 0);

  // Filter assets based on search term and favorite selection
  const filteredAssets = mockAssets
    .filter(asset => assetView === 'all' || asset.favorite)
    .filter(asset => 
      asset.coin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let compareA, compareB;
      
      // Determine what to sort by
      switch(sortBy) {
        case 'name':
          compareA = a.name.toLowerCase();
          compareB = b.name.toLowerCase();
          break;
        case 'balance':
          compareA = a.balance;
          compareB = b.balance;
          break;
        case 'change':
          compareA = a.change24h;
          compareB = b.change24h;
          break;
        case 'value':
        default:
          compareA = a.value;
          compareB = b.value;
      }
      
      // Apply sort direction
      if (sortDirection === 'asc') {
        return compareA > compareB ? 1 : -1;
      } else {
        return compareA < compareB ? 1 : -1;
      }
    });

  const handleSort = (newSortBy: 'balance' | 'name' | 'value' | 'change') => {
    if (sortBy === newSortBy) {
      // Toggle direction if clicking the same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Default to descending for value and balance, ascending for name
      setSortBy(newSortBy);
      setSortDirection(newSortBy === 'name' ? 'asc' : 'desc');
    }
  };

  const toggleFavorite = (coin: string) => {
    // In a real app, this would update the state or call an API
    console.log(`Toggle favorite for ${coin}`);
  };

  // Format date helper function
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="pt-20 pb-24 px-4">
      {/* Header with balance info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Tài sản</h1>
          <p className="text-gray-400 mt-1">Quản lý tài sản số của bạn</p>
        </div>
        
        <div className="flex space-x-3 mt-4 md:mt-0">
          <button 
            type="button"
            className="flex items-center space-x-2 bg-gray-800/30 hover:bg-gray-800/50 rounded-lg px-4 py-2 text-sm transition-colors"
          >
            <ArrowDownToLine size={16} />
            <span>Nạp tiền</span>
          </button>
          <button 
            type="button"
            className="flex items-center space-x-2 bg-gray-800/30 hover:bg-gray-800/50 rounded-lg px-4 py-2 text-sm transition-colors"
          >
            <ArrowUpFromLine size={16} />
            <span>Rút tiền</span>
          </button>
          <button 
            type="button"
            className="flex items-center justify-center bg-gray-800/30 hover:bg-gray-800/50 rounded-lg px-3 py-2 text-sm transition-colors"
          >
            <RefreshCw size={16} />
            <span>Làm mới</span>
          </button>
        </div>
      </div>

      {/* Balance summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800/30 rounded-xl border border-gray-700 p-4">
          <div className="text-gray-400 mb-1 text-sm">Tổng tài sản</div>
          <div className="text-2xl font-bold">${totalBalance.toLocaleString()}</div>
          <div className="flex items-center mt-4 space-x-2">
            <PieChart size={16} className="text-blue-500" />
            <span className="text-sm text-gray-400">Phân bổ danh mục đầu tư</span>
          </div>
        </div>
        
        <div className="bg-gray-800/30 rounded-xl border border-gray-700 p-4">
          <div className="text-gray-400 mb-1 text-sm">Số dư khả dụng</div>
          <div className="text-2xl font-bold">${totalAvailableBalance.toLocaleString()}</div>
          <div className="text-sm text-gray-400 mt-4">Có thể sử dụng để giao dịch, chuyển khoản</div>
        </div>
        
        <div className="bg-gray-800/30 rounded-xl border border-gray-700 p-4">
          <div className="text-gray-400 mb-1 text-sm">Số dư trong lệnh</div>
          <div className="text-2xl font-bold">${totalInOrderBalance.toLocaleString()}</div>
          <div className="text-sm text-gray-400 mt-4">Đang được sử dụng trong các lệnh đang chờ</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700 mb-6">
        <button
          type="button" 
          className={`py-3 px-6 font-medium ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-400'}`}
          onClick={() => setActiveTab('overview')}
        >
          Tổng quan tài sản
        </button>
        <button 
          type="button"
          className={`py-3 px-6 font-medium ${activeTab === 'history' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-400'}`}
          onClick={() => setActiveTab('history')}
        >
          Lịch sử giao dịch
        </button>
      </div>

      {activeTab === 'overview' ? (
        <>
          {/* Search and filter controls */}
          <div className="flex flex-col md:flex-row justify-between mb-4 space-y-3 md:space-y-0">
            <div className="relative md:w-64">
              <input
                type="text"
                placeholder="Tìm kiếm coin..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800/30 border border-gray-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            
            <div className="flex space-x-3">
              <div className="flex overflow-hidden rounded-lg border border-gray-700">
                <button 
                  type="button"
                  className={`px-4 py-2 text-sm ${assetView === 'favorites' ? 'bg-blue-600' : 'bg-gray-800/30'}`}
                  onClick={() => setAssetView('favorites')}
                >
                  <Star size={16} className="inline mr-1" fill={assetView === 'favorites' ? 'currentColor' : 'none'} />
                  Yêu thích
                </button>
                <button 
                  type="button"
                  className={`px-4 py-2 text-sm ${assetView === 'all' ? 'bg-blue-600' : 'bg-gray-800/30'}`}
                  onClick={() => setAssetView('all')}
                >
                  Tất cả
                </button>
              </div>
              
              <button 
                type="button"
                className="flex items-center space-x-2 bg-gray-800/30 hover:bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-sm"
              >
                <Filter size={16} />
                <span>Lọc</span>
              </button>
            </div>
          </div>

          {/* Assets list */}
          <div className="bg-gray-800/30 rounded-xl border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800/50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-12">
                      {/* Favorites column */}
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('name')}
                    >
                      Coin
                      {sortBy === 'name' && (
                        <ChevronDown size={16} className={`inline ml-1 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} />
                      )}
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('balance')}
                    >
                      Số lượng
                      {sortBy === 'balance' && (
                        <ChevronDown size={16} className={`inline ml-1 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} />
                      )}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Khả dụng
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('value')}
                    >
                      Giá trị
                      {sortBy === 'value' && (
                        <ChevronDown size={16} className={`inline ml-1 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} />
                      )}
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('change')}
                    >
                      Thay đổi 24h
                      {sortBy === 'change' && (
                        <ChevronDown size={16} className={`inline ml-1 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`} />
                      )}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredAssets.length > 0 ? (
                    filteredAssets.map((asset, index) => (
                      <tr key={asset.coin} className={index % 2 === 0 ? 'bg-gray-800/20' : 'bg-gray-800/30'}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button 
                            type="button"
                            onClick={() => toggleFavorite(asset.coin)}
                            className="text-gray-400 hover:text-yellow-500 transition-colors"
                          >
                            <Star
                              size={16}
                              fill={asset.favorite ? 'currentColor' : 'none'}
                              className={asset.favorite ? 'text-yellow-500' : ''}
                            />
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 bg-gray-700 rounded-full flex items-center justify-center font-bold text-sm mr-3">
                              {asset.coin.substring(0, 3)}
                            </div>
                            <div>
                              <div className="font-medium">{asset.name}</div>
                              <div className="text-sm text-gray-400">{asset.coin}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>{asset.balance}</div>
                          <div className="text-sm text-gray-400">{asset.inOrder > 0 && `${asset.inOrder} trong lệnh`}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {asset.availableBalance}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          ${asset.value.toLocaleString()}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap ${asset.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button 
                              type="button"
                              className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-xs"
                            >
                              Giao dịch
                            </button>
                            <button 
                              type="button"
                              className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-white text-xs"
                            >
                              <MoreHorizontal size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                        Không tìm thấy tài sản nào khớp với tìm kiếm của bạn.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* Transaction History Tab */
        <div className="bg-gray-800/30 rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Ngày
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Loại
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Coin
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Số lượng
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Fee
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {mockTransactions.map((tx, index) => (
                  <tr key={tx.id} className={index % 2 === 0 ? 'bg-gray-800/20' : 'bg-gray-800/30'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDate(tx.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">
                      {tx.type === 'deposit' ? 'Nạp tiền' :
                       tx.type === 'withdrawal' ? 'Rút tiền' :
                       tx.type === 'trade' ? 'Giao dịch' :
                       tx.type === 'convert' ? 'Chuyển đổi' : 'Earn'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {tx.coin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {tx.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                      {tx.fee || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${tx.status === 'completed' ? 'bg-green-900/30 text-green-500' : tx.status === 'pending' ? 'bg-yellow-900/30 text-yellow-500' : 'bg-red-900/30 text-red-500'}`}>
                        {tx.status === 'completed' ? 'Hoàn tất' : tx.status === 'pending' ? 'Đang xử lý' : 'Thất bại'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetsPage;
