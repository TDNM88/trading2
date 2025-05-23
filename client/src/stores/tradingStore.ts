import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Position {
  symbol: string;
  quantity: number;
  averagePrice: number;
  type: 'MIS' | 'NRML';
  pnl: number;
  unrealizedPnl: number;
}

export interface Order {
  id: string;
  symbol: string;
  type: 'MARKET' | 'LIMIT' | 'SL' | 'SL-M';
  side: 'BUY' | 'SELL';
  quantity: number;
  price?: number;
  triggerPrice?: number;
  status: 'OPEN' | 'EXECUTED' | 'CANCELLED' | 'REJECTED';
  orderType: 'MIS' | 'NRML';
  timestamp: Date;
}

interface TradingStore {
  balance: number;
  positions: Position[];
  orders: Order[];
  tradeHistory: Order[];
  
  // Account Management
  setBalance: (balance: number) => void;
  resetBalance: () => void;
  
  // Order Management
  placeOrder: (order: Omit<Order, 'id' | 'status' | 'timestamp'>) => void;
  cancelOrder: (orderId: string) => void;
  modifyOrder: (orderId: string, modifications: Partial<Order>) => void;
  
  // Position Management
  updatePosition: (position: Position) => void;
  closePosition: (symbol: string) => void;
  
  // Risk Management
  marginUsed: number;
  availableMargin: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  calculateMargin: () => number;
}

const DEFAULT_BALANCE = 1000000; // ₹10,00,000

export const useTradingStore = create<TradingStore>()(
  persist(
    (set, get) => ({
      balance: DEFAULT_BALANCE,
      positions: [],
      orders: [],
      tradeHistory: [],
      marginUsed: 0,
      availableMargin: DEFAULT_BALANCE,
      riskLevel: 'LOW',

      setBalance: (balance) => set({ balance }),
      
      resetBalance: () => set({ 
        balance: DEFAULT_BALANCE,
        positions: [],
        orders: [],
        marginUsed: 0,
        availableMargin: DEFAULT_BALANCE,
        riskLevel: 'LOW'
      }),

      placeOrder: (orderData) => {
        const order: Order = {
          ...orderData,
          id: Date.now().toString(),
          status: 'OPEN',
          timestamp: new Date()
        };

        set((state) => ({
          orders: [...state.orders, order],
          tradeHistory: [...state.tradeHistory, order]
        }));

        // Simulate order execution
        setTimeout(() => {
          set((state) => ({
            orders: state.orders.map((o) => 
              o.id === order.id ? { ...o, status: 'EXECUTED' } : o
            )
          }));
        }, 2000);
      },

      cancelOrder: (orderId) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status: 'CANCELLED' } : order
          )
        }));
      },

      modifyOrder: (orderId, modifications) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, ...modifications } : order
          )
        }));
      },

      updatePosition: (position) => {
        set((state) => {
          const existingPosition = state.positions.find(
            (p) => p.symbol === position.symbol
          );

          if (existingPosition) {
            return {
              positions: state.positions.map((p) =>
                p.symbol === position.symbol ? { ...p, ...position } : p
              )
            };
          }

          return {
            positions: [...state.positions, position]
          };
        });
      },

      closePosition: (symbol) => {
        set((state) => ({
          positions: state.positions.filter((p) => p.symbol !== symbol)
        }));
      },

      calculateMargin: () => {
        const state = get();
        const totalPositionValue = state.positions.reduce(
          (sum, pos) => sum + pos.quantity * pos.averagePrice,
          0
        );
        
        const marginUsed = totalPositionValue * 0.2; // 20% margin requirement
        const availableMargin = state.balance - marginUsed;
        
        set({
          marginUsed,
          availableMargin,
          riskLevel: availableMargin < state.balance * 0.3 ? 'HIGH' :
                     availableMargin < state.balance * 0.6 ? 'MEDIUM' : 'LOW'
        });

        return marginUsed;
      }
    }),
    {
      name: 'trading-store'
    }
  )
);