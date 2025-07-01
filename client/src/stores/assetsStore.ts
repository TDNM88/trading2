import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Asset {
  id: string;
  coin: string;
  name: string;
  balance: number;
  availableBalance: number;
  inOrder: number;
  value: number; // USD value
  change24h: number;
  favorite: boolean;
  priceUsd: number;
  address?: string;
  network?: string;
  logoUrl?: string;
}

export interface TransactionHistory {
  id: string;
  type: 'deposit' | 'withdrawal' | 'trade' | 'convert' | 'earn' | 'liquidation';
  coin: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed' | 'processing';
  date: Date;
  txid?: string;
  fee?: number;
  from?: string;
  to?: string;
  network?: string;
}

export interface Position {
  id: string;
  symbol: string;
  leverage: number;
  side: 'long' | 'short';
  entryPrice: number;
  markPrice: number;
  size: number;
  margin: number;
  liquidationPrice: number;
  pnl: number;
  pnlPercentage: number;
  openTime: Date;
  updateTime: Date;
}

export interface Order {
  id: string;
  symbol: string;
  type: 'limit' | 'market' | 'stop' | 'take_profit' | 'trailing_stop';
  side: 'buy' | 'sell';
  price: number;
  triggerPrice?: number;
  quantity: number;
  filled: number;
  remainingQuantity: number;
  status: 'open' | 'filled' | 'partially_filled' | 'canceled' | 'rejected';
  timeInForce: 'GTC' | 'IOC' | 'FOK';
  createdAt: Date;
  updatedAt: Date;
}

interface AssetsState {
  // Assets data
  assets: Asset[];
  transactions: TransactionHistory[];
  
  // Trading data
  balance: number;
  availableBalance: number;
  inOrderBalance: number;
  totalPnL: number;
  todayPnL: number;
  positions: Position[];
  orders: Order[];
  
  // Stats
  totalDeposits: number;
  totalWithdrawals: number;
  tradingVolume24h: number;
  tradingVolume7d: number;
  tradingVolume30d: number;
  
  // Actions
  setFavorite: (coinId: string, favorite: boolean) => void;
  addTransaction: (transaction: Omit<TransactionHistory, 'id' | 'date'>) => void;
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'filled' | 'remainingQuantity' | 'status'>) => void;
  cancelOrder: (orderId: string) => void;
  
  // Getters
  getAsset: (coinId: string) => Asset | undefined;
  getTransactions: (coinId?: string) => TransactionHistory[];
  getPositions: (symbol?: string) => Position[];
  getOrders: (symbol?: string) => Order[];
}

// Helper to create dates relative to now
const daysAgo = (days: number) => new Date(Date.now() - 86400000 * days);
const hoursAgo = (hours: number) => new Date(Date.now() - 3600000 * hours);
const minutesAgo = (minutes: number) => new Date(Date.now() - 60000 * minutes);

export const useAssetsStore = create<AssetsState>()(
  persist(
    (set, get) => ({
      // Assets data
      assets: [
        {
          id: 'btc',
          coin: 'BTC',
          name: 'Bitcoin',
          balance: 1.25435,
          availableBalance: 1.1543,
          inOrder: 0.1,
          value: 75432.21,
          change24h: 2.3,
          favorite: true,
          priceUsd: 60132.85,
          address: 'bc1q9gpjt9h0yx3k5mvqkj34g5ggahwphjw44mhfj3',
          network: 'Bitcoin',
          logoUrl: '[https://cryptologos.cc/logos/bitcoin-btc-logo.png'](https://cryptologos.cc/logos/bitcoin-btc-logo.png')
        },
        {
          id: 'eth',
          coin: 'ETH',
          name: 'Ethereum',
          balance: 18.532,
          availableBalance: 15.25,
          inOrder: 3.282,
          value: 60431.24,
          change24h: 1.8,
          favorite: true,
          priceUsd: 3260.43,
          address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
          network: 'Ethereum',
          logoUrl: '[https://cryptologos.cc/logos/ethereum-eth-logo.png'](https://cryptologos.cc/logos/ethereum-eth-logo.png')
        },
        {
          id: 'sol',
          coin: 'SOL',
          name: 'Solana',
          balance: 245.75,
          availableBalance: 200.25,
          inOrder: 45.5,
          value: 35021.56,
          change24h: -0.9,
          favorite: true,
          priceUsd: 142.51,
          address: 'GWSnJqjKTQJCMLVj2jHTdn4qyKNxGTrp5RhYFWB6M3Y3',
          network: 'Solana',
          logoUrl: '[https://cryptologos.cc/logos/solana-sol-logo.png'](https://cryptologos.cc/logos/solana-sol-logo.png')
        },
        {
          id: 'usdt',
          coin: 'USDT',
          name: 'Tether USD',
          balance: 65250.75,
          availableBalance: 55250.75,
          inOrder: 10000,
          value: 65250.75,
          change24h: 0.01,
          favorite: false,
          priceUsd: 1.0,
          address: 'TYjYGbWefHBMFsTzo5sUJKgmx85qyciYVd',
          network: 'Tron (TRC20)',
          logoUrl: '[https://cryptologos.cc/logos/tether-usdt-logo.png'](https://cryptologos.cc/logos/tether-usdt-logo.png')
        },
        {
          id: 'bnb',
          coin: 'BNB',
          name: 'BNB',
          balance: 75.35,
          availableBalance: 75.35,
          inOrder: 0,
          value: 42463.05,
          change24h: 0.5,
          favorite: false,
          priceUsd: 563.55,
          address: 'bnb1m4m8vxppdc8xgade4l34tqn2t0psjqvry6dusj',
          network: 'BNB Chain',
          logoUrl: '[https://cryptologos.cc/logos/bnb-bnb-logo.png'](https://cryptologos.cc/logos/bnb-bnb-logo.png')
        },
        {
          id: 'xrp',
          coin: 'XRP',
          name: 'XRP',
          balance: 15000,
          availableBalance: 15000,
          inOrder: 0,
          value: 8250,
          change24h: -1.2,
          favorite: false,
          priceUsd: 0.55,
          address: 'rLW9gnQo7BQhU6igk5keqYnH3TVrCxGRzm',
          network: 'XRP Ledger',
          logoUrl: '[https://cryptologos.cc/logos/xrp-xrp-logo.png'](https://cryptologos.cc/logos/xrp-xrp-logo.png')
        },
        {
          id: 'ada',
          coin: 'ADA',
          name: 'Cardano',
          balance: 32000,
          availableBalance: 32000,
          inOrder: 0,
          value: 12800,
          change24h: 3.5,
          favorite: false,
          priceUsd: 0.4,
          address: 'addr1qy572kptpy8tk7kd2h7mgzk3vgq4wmf5n5mcnlcdjg8q7apvj83np4s0dz2jf9q5tmncsuzvnh8vu3j3x6arfh7qmyxqnqm398',
          network: 'Cardano',
          logoUrl: '[https://cryptologos.cc/logos/cardano-ada-logo.png'](https://cryptologos.cc/logos/cardano-ada-logo.png')
        },
        {
          id: 'dot',
          coin: 'DOT',
          name: 'Polkadot',
          balance: 1250,
          availableBalance: 1250,
          inOrder: 0,
          value: 7500,
          change24h: -0.8,
          favorite: false,
          priceUsd: 6.0,
          address: '13FeKC32r2hLVBDHsFRidNj72cKjungJ8EGogMzxm9gJJedk',
          network: 'Polkadot',
          logoUrl: '[https://cryptologos.cc/logos/polkadot-new-dot-logo.png'](https://cryptologos.cc/logos/polkadot-new-dot-logo.png')
        },
        {
          id: 'usdc',
          coin: 'USDC',
          name: 'USD Coin',
          balance: 43250.50,
          availableBalance: 43250.50,
          inOrder: 0,
          value: 43250.50,
          change24h: 0.0,
          favorite: false,
          priceUsd: 1.0,
          address: '0x1234567890123456789012345678901234567890',
          network: 'Ethereum (ERC20)',
          logoUrl: '[https://cryptologos.cc/logos/usd-coin-usdc-logo.png'](https://cryptologos.cc/logos/usd-coin-usdc-logo.png')
        },
        {
          id: 'shib',
          coin: 'SHIB',
          name: 'Shiba Inu',
          balance: 500000000,
          availableBalance: 500000000,
          inOrder: 0,
          value: 5000,
          change24h: 5.2,
          favorite: false,
          priceUsd: 0.00001,
          address: '0x9876543210987654321098765432109876543210',
          network: 'Ethereum (ERC20)',
          logoUrl: '[https://cryptologos.cc/logos/shiba-inu-shib-logo.png'](https://cryptologos.cc/logos/shiba-inu-shib-logo.png')
        },
      ],
      
      transactions: [
        {
          id: 'tx001',
          type: 'deposit',
          coin: 'BTC',
          amount: 0.5,
          status: 'completed',
          date: daysAgo(2),
          txid: '0x3a6e914bb5d8c6e0df556a18e3df9e852b2c15ef0100eebe18faa36abb3d5bda',
          fee: 0.0001,
          network: 'Bitcoin'
        },
        {
          id: 'tx002',
          type: 'deposit',
          coin: 'ETH',
          amount: 5.25,
          status: 'completed',
          date: daysAgo(5),
          txid: '0x4a7c893a5e3d96f0dc55b8d771dd51c579b45c9d9c6484e8b990e1c6eb9df805',
          fee: 0.002,
          network: 'Ethereum'
        },
        {
          id: 'tx003',
          type: 'withdrawal',
          coin: 'BTC',
          amount: 0.1,
          status: 'completed',
          date: daysAgo(10),
          txid: '0x9bc89a77b82fbf939e82f74ce4d424dbb0632f98f13084e735e251d7b083ad23',
          fee: 0.0002,
          to: 'bc1q9gpjt9h0yx3k5mvqkj34g5ggahwphjw44mhfj3',
          network: 'Bitcoin'
        },
        {
          id: 'tx004',
          type: 'trade',
          coin: 'BTC',
          amount: 0.25,
          status: 'completed',
          date: daysAgo(2),
          fee: 0.00025
        },
        {
          id: 'tx005',
          type: 'trade',
          coin: 'ETH',
          amount: 3.0,
          status: 'completed',
          date: daysAgo(3),
          fee: 0.0025
        },
        {
          id: 'tx006',
          type: 'deposit',
          coin: 'USDT',
          amount: 10000,
          status: 'pending',
          date: hoursAgo(4),
          txid: '0x6ea3a75837d16ed20e728ba4a99551a4602dd9eb235d3cbdb49831cb93357e73',
          network: 'Tron (TRC20)'
        },
        {
          id: 'tx007',
          type: 'convert',
          coin: 'BTC',
          amount: 0.05,
          status