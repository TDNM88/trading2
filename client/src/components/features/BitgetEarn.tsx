import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Clock, Shield, ArrowRight } from 'lucide-react';

interface TokenOption {
  name: string;
  symbol: string;
  apy: string;
  duration: string;
  logo: string;
}

const TokenOptions: TokenOption[] = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    apy: '6.5%',
    duration: 'Linh hoạt',
    logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg'
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    apy: '5.8%',
    duration: 'Linh hoạt',
    logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg'
  },
  {
    name: 'Tether',
    symbol: 'USDT',
    apy: '12.0%',
    duration: '90 ngày',
    logo: 'https://cryptologos.cc/logos/tether-usdt-logo.svg'
  },
  {
    name: 'USD Coin',
    symbol: 'USDC',
    apy: '12.5%',
    duration: '90 ngày',
    logo: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.svg'
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    apy: '8.2%',
    duration: 'Linh hoạt',
    logo: 'https://cryptologos.cc/logos/solana-sol-logo.svg'
  },
  {
    name: 'Avalanche',
    symbol: 'AVAX',
    apy: '9.5%',
    duration: '30 ngày',
    logo: 'https://cryptologos.cc/logos/avalanche-avax-logo.svg'
  },
];

const BitgetEarn = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#0B1118] to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Bitget Earn</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Kiếm lợi nhuận lên đến 20% APR với các tùy chọn tiết kiệm và staking linh hoạt. Khám phá cách kiếm thu nhập thụ động từ tài sản của bạn.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: DollarSign,
              title: 'Lợi nhuận cao',
              description: 'Kiếm tới 20% APR trên các stablecoin và 12% trên các cryptocurrency phổ biến.'
            },
            {
              icon: Clock,
              title: 'Linh hoạt',
              description: 'Chọn giữa các kỳ hạn linh hoạt hoặc cố định với thời gian khóa từ 7 đến 90 ngày.'
            },
            {
              icon: Shield,
              title: 'An toàn & Bảo mật',
              description: 'Tiền của bạn được bảo vệ bởi Quỹ Bảo Vệ Người Dùng trị giá 300 triệu USD.'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800/30 rounded-lg p-6 border border-gray-700 hover:border-blue-500/50 transition-all"
            >
              <feature.icon className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 mb-4">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
          <h3 className="text-2xl font-bold mb-6 text-center">Các Tùy Chọn Staking Phổ Biến</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TokenOptions.map((token, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-gray-900/70 p-4 rounded-lg border border-gray-800 hover:border-blue-500/30 transition-all"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={token.logo} 
                    alt={token.name} 
                    className="w-8 h-8 mr-3" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).onerror = null;
                      (e.target as HTMLImageElement).src = 'https://placehold.co/200x200?text=' + token.symbol;
                    }}
                  />
                  <div>
                    <h4 className="font-medium">{token.name}</h4>
                    <span className="text-sm text-gray-400">{token.symbol}</span>
                  </div>
                </div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-gray-400">APY</span>
                  <span className="text-green-500 font-bold">{token.apy}</span>
                </div>
                <div className="flex justify-between text-sm mb-4">
                  <span className="text-gray-400">Thời gian</span>
                  <span>{token.duration}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium text-sm"
                >
                  Stake {token.symbol}
                </motion.button>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium inline-flex items-center"
            >
              Xem Tất Cả Tùy Chọn
              <ArrowRight className="ml-2 h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BitgetEarn;
