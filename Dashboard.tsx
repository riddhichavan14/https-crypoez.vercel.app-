import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../contexts/PortfolioContext';
import { fetchTopCoins, CoinData } from '../services/coinGeckoApi';
import CoinCard from '../components/CoinCard';
import BuyModal from '../components/BuyModal';
import { TrendingUp, TrendingDown, Wallet, BookOpen, PieChart, RefreshCw } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { balance, totalValue, totalGainLoss, holdings } = usePortfolio();
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoin, setSelectedCoin] = useState<CoinData | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadCoins = async () => {
    setLoading(true);
    const coinData = await fetchTopCoins(10);
    setCoins(coinData);
    setLoading(false);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadCoins();
    setRefreshing(false);
  };

  useEffect(() => {
    loadCoins();
  }, []);

  const totalPortfolioValue = balance + totalValue;
  const isPositive = totalGainLoss >= 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading market data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-300">Welcome back! Here's your portfolio overview.</p>
        </div>

        {/* Portfolio Summary */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-300 text-sm">Total Balance</h3>
              <Wallet className="h-5 w-5 text-yellow-400" />
            </div>
            <p className="text-2xl font-bold text-white">₹{totalPortfolioValue.toFixed(2)}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-300 text-sm">Available Cash</h3>
              <Wallet className="h-5 w-5 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-white">₹{balance.toFixed(2)}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-300 text-sm">Total P&L</h3>
              {isPositive ? (
                <TrendingUp className="h-5 w-5 text-green-400" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-400" />
              )}
            </div>
            <p className={`text-2xl font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}₹{totalGainLoss.toFixed(2)}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-300 text-sm">Coins Held</h3>
              <PieChart className="h-5 w-5 text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-white">{holdings.length}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-xl p-6 border border-yellow-400/30">
            <h3 className="text-white font-semibold mb-2">Buy Crypto</h3>
            <p className="text-gray-300 text-sm mb-4">
              Invest in your favorite cryptocurrencies
            </p>
            <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors">
              Start Trading
            </button>
          </div>

          <div className="bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-xl p-6 border border-blue-400/30">
            <h3 className="text-white font-semibold mb-2">Learn Crypto</h3>
            <p className="text-gray-300 text-sm mb-4">
              Master the basics of cryptocurrency
            </p>
            <button className="bg-blue-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-blue-500 transition-colors">
              <BookOpen className="h-4 w-4 inline mr-2" />
              Start Learning
            </button>
          </div>

          <div className="bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-xl p-6 border border-green-400/30">
            <h3 className="text-white font-semibold mb-2">My Portfolio</h3>
            <p className="text-gray-300 text-sm mb-4">
              Track your investments and performance
            </p>
            <button className="bg-green-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-green-500 transition-colors">
              <PieChart className="h-4 w-4 inline mr-2" />
              View Portfolio
            </button>
          </div>
        </div>

        {/* Market Overview */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Market Overview</h2>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center space-x-2 bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coins.map((coin) => (
              <CoinCard
                key={coin.id}
                coin={coin}
                onBuyClick={setSelectedCoin}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Buy Modal */}
      {selectedCoin && (
        <BuyModal
          coin={selectedCoin}
          isOpen={!!selectedCoin}
          onClose={() => setSelectedCoin(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
