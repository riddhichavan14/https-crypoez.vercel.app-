import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: any;
  last_updated: string;
  sparkline_in_7d: {
    price: number[];
  };
}

export interface CoinPrice {
  [key: string]: {
    inr: number;
  };
}

export const fetchTopCoins = async (limit: number = 10): Promise<CoinData[]> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/coins/markets`,
      {
        params: {
          vs_currency: 'inr',
          order: 'market_cap_desc',
          per_page: limit,
          page: 1,
          sparkline: true,
          price_change_percentage: '24h'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching top coins:', error);
    return [];
  }
};

export const fetchCoinPrice = async (coinId: string): Promise<number> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/simple/price`,
      {
        params: {
          ids: coinId,
          vs_currencies: 'inr'
        }
      }
    );
    return response.data[coinId]?.inr || 0;
  } catch (error) {
    console.error('Error fetching coin price:', error);
    return 0;
  }
};

export const fetchCoinDetails = async (coinId: string): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/${coinId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching coin details:', error);
    return null;
  }
};
