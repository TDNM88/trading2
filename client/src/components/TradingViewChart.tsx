import React, { useEffect, useRef } from 'react';

declare const TradingView: any;

interface TradingViewChartProps {
  symbol?: string;
  theme?: 'light' | 'dark';
}

const TradingViewChart: React.FC<TradingViewChartProps> = ({
  symbol = 'NIFTY',
  theme = 'dark',
}) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerId = `tradingview_${Math.random().toString(36).substring(7)}`;
    if (container.current) container.current.id = containerId;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (typeof TradingView !== 'undefined' && container.current) {
        new TradingView.widget({
          width: '100%',
          height: '100%',
          symbol: `NSE:${symbol}`,
          interval: 'D',
          timezone: 'Asia/Kolkata',
          theme,
          style: '1',
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: containerId,
          hide_top_toolbar: false,
          hide_legend: false,
          save_image: false,
          studies: ['MASimple@tv-basicstudies', 'RSI@tv-basicstudies'],
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      const scriptElement = document.querySelector('script[src="https://s3.tradingview.com/tv.js"]');
      if (scriptElement) document.head.removeChild(scriptElement);
    };
  }, [theme, symbol]);

  return (
    <div
      ref={container}
      className="tradingview-widget-container w-full h-full min-h-[600px]"
    />
  );
};

export default TradingViewChart;
