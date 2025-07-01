import React, { useEffect, useRef } from 'react';

// Component hiển thị băng giá tiền điện tử từ TradingView
const TradingViewTickerTape = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Tạo thẻ script để nhúng widget TradingView
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
        { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
        { proName: "BINANCE:USDTUSD", title: "Tether" },
        { proName: "BINANCE:BGBUSDT", title: "Bitget Token" },
        { proName: "BINANCE:BNBUSD", title: "BNB" },
        { proName: "BINANCE:SOLUSD", title: "Solana" },
        { proName: "BINANCE:XRPUSD", title: "XRP" },
      ],
      showSymbolLogo: true, // Hiển thị logo của các đồng tiền
      isTransparent: true, // Nền trong suốt
      displayMode: "adaptive", // Chế độ hiển thị tự động điều chỉnh
      colorTheme: "dark", // Chủ đề màu tối
      locale: "vi" // Ngôn ngữ tiếng Việt
    });

    if (container.current) {
      container.current.innerHTML = ''; // Xóa nội dung cũ
      const widgetDiv = document.createElement('div');
      widgetDiv.className = 'tradingview-widget-container__widget';
      container.current.appendChild(widgetDiv);
      container.current.appendChild(script);
    }

    // Dọn dẹp khi component unmount
    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container mb-6" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a 
          href="https://www.tradingview.com/" 
          rel="noopener nofollow" 
          target="_blank" 
          className="text-blue-500 hover:text-blue-400"
        >
          Theo dõi tất cả thị trường trên TradingView
        </a>
      </div>
    </div>
  );
};

export default TradingViewTickerTape;