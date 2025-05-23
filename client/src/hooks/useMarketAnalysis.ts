import { useState, useCallback } from 'react';
import { MarketAnalysis, marketAnalysisService } from '../services/marketAnalysis';

export const useMarketAnalysis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<MarketAnalysis | null>(null);

  const analyzeMarket = useCallback(async (
    symbol: string,
    historicalPrices: number[],
    historicalVolumes: number[]
  ) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await marketAnalysisService.analyzeMarket(
        symbol,
        historicalPrices,
        historicalVolumes
      );
      setAnalysis(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze market';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    analyzeMarket,
    analysis,
    isLoading,
    error
  };
};