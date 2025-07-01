import React, { useEffect, useRef } from 'react';

// Định nghĩa props cho component
interface TradingViewMiniChartProps {
  symbol: string;
  width?: number;
  height?: number;
}

// Component hiển thị biểu đồ giá nhỏ từ TradingView
const TradingViewMiniChart = ({ symbol, width = 240, height = 160 }: TradingViewMiniChartProps) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Tạo thẻ script để nhúng widget TradingView
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: symbol,
      width: width,
      height: height,
      locale: "vi", // Ngôn ngữ tiếng Việt
      dateRange: "12M", // Phạm vi thời gian 12 tháng
      colorTheme: "dark", // Chủ đề màu tối
      isTransparent: true, // Nền trong suốt
      autosize: true, // Tự động điều chỉnh kích thước
      largeChartUrl: "", // URL biểu đồ lớn (trống)
      chartOnly: true // Chỉ hiển thị biểu đồ
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
  }, [symbol, width, height]);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default TradingViewMiniChart;