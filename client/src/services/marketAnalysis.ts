import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

export interface MarketIndicator {
  value: number;
  change: number;
  changePercent: number;
}

export interface TechnicalIndicator {
  name: string;
  value: number;
  signal: 'buy' | 'sell' | 'neutral';
  confidence: number;
}

export interface SupportResistance {
  level: number;
  type: 'support' | 'resistance';
  strength: 'weak' | 'medium' | 'strong';
}

export interface MarketSentiment {
  overall: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  factors: {
    name: string;
    impact: 'positive' | 'negative' | 'neutral';
    weight: number;
  }[];
}

export interface MarketAnalysis {
  timestamp: string;
  symbol: string;
  price: MarketIndicator;
  volume: MarketIndicator;
  technicalIndicators: TechnicalIndicator[];
  supportResistance: SupportResistance[];
  sentiment: MarketSentiment;
  riskLevel: 'low' | 'medium' | 'high';
  recommendedAction: 'buy' | 'sell' | 'hold';
  confidence: number;
  warnings: string[];
}

export class MarketAnalysisService {
  private calculateMovingAverage(prices: number[], period: number): number {
    if (prices.length < period) return 0;
    const sum = prices.slice(-period).reduce((a, b) => a + b, 0);
    return sum / period;
  }

  private calculateRSI(prices: number[], period: number = 14): number {
    if (prices.length < period + 1) return 50;

    let gains = 0;
    let losses = 0;

    for (let i = 1; i <= period; i++) {
      const change = prices[prices.length - i] - prices[prices.length - i - 1];
      if (change >= 0) {
        gains += change;
      } else {
        losses -= change;
      }
    }

    const avgGain = gains / period;
    const avgLoss = losses / period;
    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
  }

  private calculateVolatility(prices: number[], period: number = 20): number {
    if (prices.length < period) return 0;

    const returns = prices.slice(-period).map((price, i, arr) => {
      if (i === 0) return 0;
      return (price - arr[i - 1]) / arr[i - 1];
    });

    const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
    const variance = returns.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / returns.length;
    return Math.sqrt(variance);
  }

  private assessRiskLevel(
    volatility: number,
    rsi: number,
    volumeChange: number
  ): 'low' | 'medium' | 'high' {
    let riskScore = 0;

    // Volatility assessment
    if (volatility > 0.03) riskScore += 3;
    else if (volatility > 0.02) riskScore += 2;
    else riskScore += 1;

    // RSI assessment
    if (rsi > 70 || rsi < 30) riskScore += 3;
    else if (rsi > 65 || rsi < 35) riskScore += 2;
    else riskScore += 1;

    // Volume assessment
    if (Math.abs(volumeChange) > 50) riskScore += 3;
    else if (Math.abs(volumeChange) > 25) riskScore += 2;
    else riskScore += 1;

    if (riskScore >= 7) return 'high';
    if (riskScore >= 4) return 'medium';
    return 'low';
  }

  private generateSupportResistance(
    prices: number[],
    currentPrice: number
  ): SupportResistance[] {
    const levels: SupportResistance[] = [];
    const priceRange = Math.max(...prices) - Math.min(...prices);
    const step = priceRange / 10;

    // Generate support levels below current price
    for (let i = 1; i <= 2; i++) {
      const level = currentPrice - (step * i);
      levels.push({
        level: Number(level.toFixed(2)),
        type: 'support',
        strength: i === 1 ? 'strong' : 'medium'
      });
    }

    // Generate resistance levels above current price
    for (let i = 1; i <= 2; i++) {
      const level = currentPrice + (step * i);
      levels.push({
        level: Number(level.toFixed(2)),
        type: 'resistance',
        strength: i === 1 ? 'strong' : 'medium'
      });
    }

    return levels;
  }

  public async analyzeMarket(
    symbol: string,
    historicalPrices: number[],
    historicalVolumes: number[]
  ): Promise<MarketAnalysis> {
    try {
      // Current values
      const currentPrice = historicalPrices[historicalPrices.length - 1];
      const previousPrice = historicalPrices[historicalPrices.length - 2];
      const priceChange = currentPrice - previousPrice;
      const priceChangePercent = (priceChange / previousPrice) * 100;

      const currentVolume = historicalVolumes[historicalVolumes.length - 1];
      const previousVolume = historicalVolumes[historicalVolumes.length - 2];
      const volumeChange = ((currentVolume - previousVolume) / previousVolume) * 100;

      // Technical indicators
      const sma20 = this.calculateMovingAverage(historicalPrices, 20);
      const sma50 = this.calculateMovingAverage(historicalPrices, 50);
      const rsi = this.calculateRSI(historicalPrices);
      const volatility = this.calculateVolatility(historicalPrices);

      // Generate technical signals
      const technicalIndicators: TechnicalIndicator[] = [
        {
          name: 'RSI',
          value: Number(rsi.toFixed(2)),
          signal: rsi > 70 ? 'sell' : rsi < 30 ? 'buy' : 'neutral',
          confidence: 0.8
        },
        {
          name: 'SMA Cross',
          value: Number((sma20 - sma50).toFixed(2)),
          signal: sma20 > sma50 ? 'buy' : sma20 < sma50 ? 'sell' : 'neutral',
          confidence: 0.75
        },
        {
          name: 'Volume',
          value: Number(volumeChange.toFixed(2)),
          signal: volumeChange > 20 ? 'buy' : volumeChange < -20 ? 'sell' : 'neutral',
          confidence: 0.6
        }
      ];

      // Risk assessment
      const riskLevel = this.assessRiskLevel(volatility, rsi, volumeChange);

      // Generate support and resistance levels
      const supportResistance = this.generateSupportResistance(historicalPrices, currentPrice);

      // Market sentiment analysis
      const sentiment: MarketSentiment = {
        overall: 'neutral',
        confidence: 0.7,
        factors: [
          {
            name: 'Technical Indicators',
            impact: technicalIndicators.filter(i => i.signal === 'buy').length >
                   technicalIndicators.filter(i => i.signal === 'sell').length
              ? 'positive'
              : 'negative',
            weight: 0.4
          },
          {
            name: 'Volume Analysis',
            impact: volumeChange > 0 ? 'positive' : 'negative',
            weight: 0.3
          },
          {
            name: 'Price Action',
            impact: priceChange > 0 ? 'positive' : 'negative',
            weight: 0.3
          }
        ]
      };

      // Calculate overall sentiment
      const sentimentScore = sentiment.factors.reduce((score, factor) => {
        return score + (factor.impact === 'positive' ? 1 : -1) * factor.weight;
      }, 0);

      sentiment.overall = sentimentScore > 0.2 ? 'bullish' : sentimentScore < -0.2 ? 'bearish' : 'neutral';

      // Generate warnings
      const warnings: string[] = [];
      if (rsi > 70) warnings.push('Overbought conditions detected');
      if (rsi < 30) warnings.push('Oversold conditions detected');
      if (Math.abs(volumeChange) > 50) warnings.push('Unusual volume activity detected');
      if (volatility > 0.03) warnings.push('High volatility detected');

      // Determine recommended action
      let recommendedAction: 'buy' | 'sell' | 'hold' = 'hold';
      let confidence = 0;

      const bullishSignals = technicalIndicators.filter(i => i.signal === 'buy').length;
      const bearishSignals = technicalIndicators.filter(i => i.signal === 'sell').length;

      if (bullishSignals > bearishSignals && sentiment.overall === 'bullish') {
        recommendedAction = 'buy';
        confidence = 0.8;
      } else if (bearishSignals > bullishSignals && sentiment.overall === 'bearish') {
        recommendedAction = 'sell';
        confidence = 0.8;
      } else {
        recommendedAction = 'hold';
        confidence = 0.6;
      }

      return {
        timestamp: new Date().toISOString(),
        symbol,
        price: {
          value: currentPrice,
          change: priceChange,
          changePercent: priceChangePercent
        },
        volume: {
          value: currentVolume,
          change: currentVolume - previousVolume,
          changePercent: volumeChange
        },
        technicalIndicators,
        supportResistance,
        sentiment,
        riskLevel,
        recommendedAction,
        confidence,
        warnings
      };
    } catch (error) {
      console.error('Error in market analysis:', error);
      throw new Error('Failed to analyze market data');
    }
  }
}

export const marketAnalysisService = new MarketAnalysisService();