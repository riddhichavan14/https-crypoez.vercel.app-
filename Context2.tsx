import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

interface Holding {
  symbol: string;
  name: string;
  amount: number;
  avgPrice: number;
  totalInvested: number;
}

interface Transaction {
  id: string;
  symbol: string;
  name: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  total: number;
  timestamp: Date;
}

interface PortfolioContextType {
  balance: number;
  holdings: Holding[];
  transactions: Transaction[];
  totalInvested: number;
  totalValue: number;
  totalGainLoss: number;
  loading: boolean;
  buyAsset: (symbol: string, name: string, amount: number, price: number) => Promise<void>;
  sellAsset: (symbol: string, amount: number, price: number) => Promise<void>;
  refreshPortfolio: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType>({
  balance: 10000,
  holdings: [],
  transactions: [],
  totalInvested: 0,
  totalValue: 0,
  totalGainLoss: 0,
  loading: true,
  buyAsset: async () => {},
  sellAsset: async () => {},
  refreshPortfolio: async () => {}
});

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [balance, setBalance] = useState(10000);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const totalInvested = holdings.reduce((sum, holding) => sum + holding.totalInvested, 0);
  const totalValue = holdings.reduce((sum, holding) => sum + (holding.amount * holding.avgPrice), 0);
  const totalGainLoss = totalValue - totalInvested;

  const loadPortfolio = async () => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    try {
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setBalance(data.balance || 10000);
        setHoldings(data.holdings || []);
        setTransactions(data.transactions || []);
      } else {
        // Initialize new user
        await setDoc(doc(db, 'users', currentUser.uid), {
          balance: 10000,
          holdings: [],
          transactions: []
        });
      }
    } catch (error) {
      console.error('Error loading portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const savePortfolio = async () => {
    if (!currentUser) return;

    try {
      await updateDoc(doc(db, 'users', currentUser.uid), {
        balance,
        holdings,
        transactions
      });
    } catch (error) {
      console.error('Error saving portfolio:', error);
    }
  };

  const buyAsset = async (symbol: string, name: string, amount: number, price: number) => {
    const total = amount * price;
    if (total > balance) {
      throw new Error('Insufficient balance');
    }

    const newBalance = balance - total;
    const existingHolding = holdings.find(h => h.symbol === symbol);

    let newHoldings: Holding[];
    if (existingHolding) {
      const newAmount = existingHolding.amount + amount;
      const newTotalInvested = existingHolding.totalInvested + total;
      const newAvgPrice = newTotalInvested / newAmount;

      newHoldings = holdings.map(h => 
        h.symbol === symbol 
          ? { ...h, amount: newAmount, avgPrice: newAvgPrice, totalInvested: newTotalInvested }
          : h
      );
    } else {
      newHoldings = [...holdings, {
        symbol,
        name,
        amount,
        avgPrice: price,
        totalInvested: total
      }];
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      symbol,
      name,
      type: 'buy',
      amount,
      price,
      total,
      timestamp: new Date()
    };

    setBalance(newBalance);
    setHoldings(newHoldings);
    setTransactions([newTransaction, ...transactions]);

    await savePortfolio();
  };

  const sellAsset = async (symbol: string, amount: number, price: number) => {
    const holding = holdings.find(h => h.symbol === symbol);
    if (!holding || holding.amount < amount) {
      throw new Error('Insufficient holdings');
    }

    const total = amount * price;
    const newBalance = balance + total;

    let newHoldings: Holding[];
    if (holding.amount === amount) {
      newHoldings = holdings.filter(h => h.symbol !== symbol);
    } else {
      const newAmount = holding.amount - amount;
      const soldValue = (amount / holding.amount) * holding.totalInvested;
      const newTotalInvested = holding.totalInvested - soldValue;

      newHoldings = holdings.map(h => 
        h.symbol === symbol 
          ? { ...h, amount: newAmount, totalInvested: newTotalInvested }
          : h
      );
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      symbol,
      name: holding.name,
      type: 'sell',
      amount,
      price,
      total,
      timestamp: new Date()
    };

    setBalance(newBalance);
    setHoldings(newHoldings);
    setTransactions([newTransaction, ...transactions]);

    await savePortfolio();
  };

  const refreshPortfolio = async () => {
    await loadPortfolio();
  };

  useEffect(() => {
    loadPortfolio();
  }, [currentUser]);

  const value = {
    balance,
    holdings,
    transactions,
    totalInvested,
    totalValue,
    totalGainLoss,
    loading,
    buyAsset,
    sellAsset,
    refreshPortfolio
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};
