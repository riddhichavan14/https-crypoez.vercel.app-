import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../contexts/PortfolioContext';
import { fetchTopCoins, CoinData } from '../services/coinGeckoApi';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Clock, DollarSign, Target, AlertTriangle } from 'lucide-react';

const Portfolio: React.FC = () => {
  const { holdings, transactions, balance, totalValue, totalGainLoss } = usePortfolio();
  const [currentPrices, setCurrentPrices] = useState<{[key: string]: number}>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCurrentPrices = async () => {
      const coins = await fetchTopCoins(50);
      const prices: {[key: string]: number} = {};

      coins.forEach(coin => {
        prices[coin.symbol] = coin.current_price;
      });

      setCurrentPrices(prices);
      setLoading(false);
    };

    loadCurrentPrices();
  }, []);

  const enrichedHoldings = holdings.map(holding => {
    const currentPrice = currentPrices[holding.symbol] || holding.avgPrice;
    const currentValue = holding.amount * currentPrice;
    const gainLoss = currentValue - holding.totalInvested;
    const gainLossPercentage = (gainLoss / holding.totalInvested) * 100;

    return {
      ...holding,
      currentPrice,
      currentValue,
      gainLoss,
      gainLossPercentage
    };
  });

  const pieData = enrichedHoldings.map(holding => ({
    name: holding.symbol.toUpperCase(),
    value: holding.currentValue,
    color: `hsl(${Math.random() * 360}, 70%, 50%)`
  }));

  const riskLevel = holdings.length <= 2 ? 'High' : holdings.length <= 5 ? 'Medium' : 'Low';
  const riskColor = riskLevel === 'High' ? 'text-red-400' : riskLevel === 'Medium' ? 'text-yellow-400' : 'text-green-400';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading portfolio data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Portfolio</h1>
          <p className="text-gray-300">Track your investments and performance</p>
        </div>

        {/* Portfolio Summary */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-300 text-sm">Total Value</h3>
              <DollarSign className="h-5 w-5 text-yellow-400" />
            </div>
            <p className="text-2xl font-bold text-white">₹{totalValue.toFixed(2)}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-300 text-sm">Total P&L</h3>
              {totalGainLoss >= 0 ? (
                <TrendingUp className="h-5 w-5 text-green-400" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-400" />
              )}
            </div>
            <p className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {totalGainLoss >= 0 ? '+' : ''}₹{totalGainLoss.toFixed(2)}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-300 text-sm">Risk Level</h3>
              <AlertTriangle className={`h-5 w-5 ${riskColor}`} />
            </div>
            <p className={`text-2xl font-bold ${riskColor}`}>{riskLevel}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-300 text-sm">Diversification</h3>
              <Target className="h-5 w-5 text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-white">{holdings.length} Assets</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Portfolio Distribution */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">Portfolio Distribution</h3>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `₹${value.toFixed(2)}`} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-400">
                <p>No holdings to display</p>
              </div>
            )}
          </div>

          {/* Performance Chart */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">Performance by Asset</h3>
            {enrichedHoldings.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={enrichedHoldings}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="symbol" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      `₹${value.toFixed(2)}`,
                      name === 'gainLoss' ? 'P&L' : 'Value'
                    ]}
                    labelStyle={{ color: '#000' }}
                  />
                  <Legend />
                  <Bar dataKey="currentValue" fill="#fbbf24" name="Current Value" />
                  <Bar dataKey="gainLoss" fill="#10b981" name="P&L" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-400">
                <p>No performance data to display</p>
              </div>
            )}
          </div>
        </div>

        {/* Holdings Table */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
          <h3 className="text-xl font-bold text-white mb-4">Holdings</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left text-gray-300 py-3">Asset</th>
                  <th className="text-right text-gray-300 py-3">Amount</th>
                  <th className="text-right text-gray-300 py-3">Avg Price</th>
                  <th className="text-right text-gray-300 py-3">Current Price</th>
                  <th className="text-right text-gray-300 py-3">Current Value</th>
                  <th className="text-right text-gray-300 py-3">P&L</th>
                </tr>
              </thead>
              <tbody>
                {enrichedHoldings.map((holding) => (
                  <tr key={holding.symbol} className="border-b border-white/10">
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        <div>
                          <p className="text-white font-medium">{holding.name}</p>
                          <p className="text-gray-400 text-sm">{holding.symbol.toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-right py-4">
                      <p className="text-white">{holding.amount.toFixed(6)}</p>
                    </td>
                    <td className="text-right py-4">
                      <p className="text-white">₹{holding.avgPrice.toFixed(2)}</p>
                    </td>
                    <td className="text-right py-4">
                      <p className="text-white">₹{holding.currentPrice.toFixed(2)}</p>
                    </td>
                    <td className="text-right py-4">
                      <p className="text-white">₹{holding.currentValue.toFixed(2)}</p>
                    </td>
                    <td className="text-right py-4">
                      <p className={holding.gainLoss >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {holding.gainLoss >= 0 ? '+' : ''}₹{holding.gainLoss.toFixed(2)}
                      </p>
                      <p className={`text-sm ${holding.gainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {holding.gainLoss >= 0 ? '+' : ''}{holding.gainLossPercentage.toFixed(2)}%
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {enrichedHoldings.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <p>No holdings yet. Start investing to see your portfolio here!</p>
              </div>
            )}
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            {transactions.slice(0, 10).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${transaction.type === 'buy' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                    {transaction.type === 'buy' ? (
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      {transaction.type === 'buy' ? 'Bought' : 'Sold'} {transaction.name}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {transaction.amount.toFixed(6)} {transaction.symbol.toUpperCase()} at ₹{transaction.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">₹{transaction.total.toFixed(2)}</p>
                  <p className="text-gray-400 text-sm">
                    {transaction.timestamp.toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
            {transactions.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <Clock className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No transactions yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
