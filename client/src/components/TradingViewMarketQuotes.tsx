import React, { useEffect, useRef } from 'react';

interface TradingViewMarketQuotesProps {
  width?: number | string;
  height?: number | string;
}

const TradingViewMarketQuotes: React.FC<TradingViewMarketQuotesProps> = ({
  width = '100%',
  height = 550
}) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create a function to initialize the widget
    const initializeWidget = () => {
      // Check if the script already exists
      const existingScript = document.getElementById('tradingview-widget-script');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.id = 'tradingview-widget-script';
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js';
      script.type = 'text/javascript';
      script.async = true;

      const config = {
        width,
        height,
        symbolsGroups: [
          {
            name: "Indices",
            originalName: "Indices",
            symbols: [
              {
                name: "FOREXCOM:SPXUSD",
                displayName: "S&P 500 Index"
              },
              {
                name: "FOREXCOM:NSXUSD",
                displayName: "US 100 Cash CFD"
              },
              {
                name: "FOREXCOM:DJI",
                displayName: "Dow Jones Industrial Average Index"
              },
              {
                name: "INDEX:NKY",
                displayName: "Japan 225"
              },
              {
                name: "INDEX:DEU40",
                displayName: "DAX Index"
              },
              {
                name: "FOREXCOM:UKXGBP",
                displayName: "FTSE 100 Index"
              },
              {
                name: "BSE:SENSEX",
                displayName: "SENSEX"
              }
            ]
          },
          {
            name: "Forex",
            originalName: "Forex",
            symbols: [
              {
                name: "FX:EURUSD",
                displayName: "EUR to USD"
              },
              {
                name: "FX:GBPUSD",
                displayName: "GBP to USD"
              },
              {
                name: "FX:USDJPY",
                displayName: "USD to JPY"
              },
              {
                name: "FX:USDCHF",
                displayName: "USD to CHF"
              },
              {
                name: "FX:AUDUSD",
                displayName: "AUD to USD"
              },
              {
                name: "FX:USDCAD",
                displayName: "USD to CAD"
              }
            ]
          },
          {
            name: "Futures",
            originalName: "Futures",
            symbols: [
              {
                name: "BMFBOVESPA:ISP1!",
                displayName: "S&P 500 Index Futures"
              },
              {
                name: "BMFBOVESPA:EUR1!",
                displayName: "Euro Futures"
              },
              {
                name: "PYTH:WTI3!",
                displayName: "WTI CRUDE OIL"
              },
              {
                name: "BMFBOVESPA:ETH1!",
                displayName: "Hydrous ethanol"
              },
              {
                name: "BMFBOVESPA:CCM1!",
                displayName: "Corn"
              }
            ]
          },
          {
            name: "Bonds",
            originalName: "Bonds",
            symbols: [
              {
                name: "EUREX:FGBL1!",
                displayName: "Euro Bund"
              },
              {
                name: "EUREX:FBTP1!",
                displayName: "Euro BTP"
              },
              {
                name: "EUREX:FGBM1!",
                displayName: "Euro BOBL"
              }
            ]
          }
        ],
        showSymbolLogo: false,
        isTransparent: true,
        colorTheme: "dark",
        locale: "en"
      };

      script.innerHTML = JSON.stringify(config);

      if (container.current) {
        container.current.innerHTML = '';
        const widgetDiv = document.createElement('div');
        widgetDiv.className = 'tradingview-widget-container__widget';
        container.current.appendChild(widgetDiv);
        
        // Wait for window load before appending the script
        if (document.readyState === 'complete') {
          container.current.appendChild(script);
        } else {
          window.addEventListener('load', () => {
            if (container.current) {
              container.current.appendChild(script);
            }
          });
        }
      }
    };

    // Initialize the widget
    initializeWidget();

    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
      const script = document.getElementById('tradingview-widget-script');
      if (script) {
        script.remove();
      }
    };
  }, [width, height]);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default TradingViewMarketQuotes;