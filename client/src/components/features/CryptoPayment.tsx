import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Smartphone, QrCode, Zap, ArrowRight, Globe } from 'lucide-react';

const CryptoPayment = () => {
  return (
    <section className="py-20 bg-[#0B1118]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Thanh Toán Tiền Điện Tử</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Thanh toán nhanh chóng và an toàn bằng tiền điện tử với phí giao dịch thấp và xác nhận tức thì.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-blue-500/20 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">Thẻ Crypto Bitget</h3>
              <p className="text-gray-300 mb-6">
                Sử dụng thẻ Visa/Mastercard được hỗ trợ bởi tiền điện tử. Chi tiêu tiền điện tử của bạn ở mọi nơi trên thế giới.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <Globe className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
                  <p>Chấp nhận tại hơn 90 triệu địa điểm trên toàn cầu</p>
                </div>
                <div className="flex items-start">
                  <Zap className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
                  <p>Hoàn tiền lên đến 5% cho mỗi giao dịch</p>
                </div>
                <div className="flex items-start">
                  <CreditCard className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
                  <p>Chuyển đổi tự động từ tiền điện tử sang tiền fiat</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <motion.div 
                initial={{ y: 5 }}
                animate={{ y: -5 }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 1.5 
                }}
                className="absolute -top-24 -right-10"
              >
                <img 
                  src="https://placehold.co/300x200?text=Crypto+Card" 
                  alt="Crypto Card" 
                  className="w-48 h-auto transform rotate-12" 
                />
              </motion.div>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium flex items-center"
              >
                Đăng Ký Thẻ Crypto
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-green-900/30 to-blue-900/30 rounded-2xl p-8 border border-blue-500/20 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">Thanh Toán QR Code</h3>
              <p className="text-gray-300 mb-6">
                Thanh toán đơn giản bằng cách quét mã QR với ví tiền điện tử của bạn. Không cần ứng dụng bên thứ ba.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <Zap className="h-5 w-5 text-green-400 mr-3 mt-0.5" />
                  <p>Giao dịch tức thì, không cần đợi xác nhận</p>
                </div>
                <div className="flex items-start">
                  <QrCode className="h-5 w-5 text-green-400 mr-3 mt-0.5" />
                  <p>Thanh toán đơn giản bằng cách quét mã QR</p>
                </div>
                <div className="flex items-start">
                  <Smartphone className="h-5 w-5 text-green-400 mr-3 mt-0.5" />
                  <p>Tương thích với hầu hết các ví tiền điện tử phổ biến</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <motion.div 
                initial={{ scale: 0.95 }}
                animate={{ scale: 1.05 }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 2 
                }}
                className="absolute -top-20 -right-6"
              >
                <div className="bg-white p-3 rounded-lg shadow-lg">
                  <div className="bg-gray-900 p-1 rounded">
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=bitcoin:1AbCdEfGhIjKlMnOpQrStUvWxYz" 
                      alt="Bitcoin QR Code" 
                      className="w-32 h-32" 
                    />
                  </div>
                </div>
              </motion.div>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium flex items-center"
              >
                Tạo QR Thanh Toán
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl p-6 border border-blue-500/20"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-6 md:mb-0">
              <Smartphone className="h-12 w-12 text-blue-500 mr-4" />
              <div>
                <h3 className="text-xl font-bold">Tải Ví Bitget</h3>
                <p className="text-gray-400">Ví tiền điện tử an toàn và dễ sử dụng với hỗ trợ cho hơn 100 blockchain</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-medium"
            >
              Tải Ứng Dụng
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CryptoPayment;
