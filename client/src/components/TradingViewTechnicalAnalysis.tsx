import React, { useEffect, useRef } from 'react';

interface TradingViewTechnicalAnalysisProps {
  symbol: string;
  exchange?: string;
}

const TradingViewTechnicalAnalysis: React.FC<TradingViewTechnicalAnalysisProps> = ({ 
  symbol,
  exchange = 'NSE'
}) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create container first
    if (container.current) {
      container.current.innerHTML = '';
      const widgetDiv = document.createElement('div');
      widgetDiv.className = 'tradingview-widget-container__widget';
      container.current.appendChild(widgetDiv);
    }

    // Delay script initialization to ensure DOM is ready
    setTimeout(() => {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js';
      script.type = 'text/javascript';
      script.async = true;

      const config = {
        "interval": "1m",
        "width": "100%",
        "isTransparent": true,
        "height": 450,
        "symbol": `${exchange}:${symbol}`,
        "showIntervalTabs": true,
        "displayMode": "multiple",
        "locale": "en",
        "colorTheme": "dark"
      };

      script.innerHTML = JSON.stringify(config);

      if (container.current) {
        container.current.appendChild(script);
      }
    }, 0);

    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, [symbol, exchange]);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default TradingViewTechnicalAnalysis;