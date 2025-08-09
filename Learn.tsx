import React, { useState } from 'react';
import { BookOpen, Play, CheckCircle, Award, Brain, Shield, TrendingUp, AlertCircle } from 'lucide-react';

interface LessonProps {
  title: string;
  description: string;
  content: string;
  icon: React.ReactNode;
  color: string;
}

const Learn: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<LessonProps | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const lessons: LessonProps[] = [
    {
      title: "What is Cryptocurrency?",
      description: "Learn the basics of digital money and blockchain technology",
      content: `
        <h3>What is Cryptocurrency? 🪙</h3>
        <p>Think of cryptocurrency as <strong>digital money</strong> that exists only on computers and the internet. Just like you have coins and notes in your wallet, cryptocurrency is money that lives in a digital wallet.</p>
        
        <h4>Key Points:</h4>
        <ul>
          <li><strong>Digital Only:</strong> No physical coins or notes</li>
          <li><strong>Decentralized:</strong> No single bank or government controls it</li>
          <li><strong>Secure:</strong> Uses advanced math to keep transactions safe</li>
          <li><strong>Global:</strong> Can be sent anywhere in the world instantly</li>
        </ul>
        
        <h4>Real-World Example:</h4>
        <p>Imagine you want to send ₹1000 to a friend in another country. With traditional banking, it might take days and cost fees. With cryptocurrency, you can send it in minutes with lower fees!</p>
        
        <h4>Popular Cryptocurrencies:</h4>
        <ul>
          <li><strong>Bitcoin (BTC):</strong> The first and most famous cryptocurrency</li>
          <li><strong>Ethereum (ETH):</strong> Like Bitcoin but can also run smart contracts</li>
          <li><strong>Others:</strong> Thousands of different cryptocurrencies exist</li>
        </ul>
      `,
      icon: <BookOpen className="h-6 w-6" />,
      color: "blue"
    },
    {
      title: "Understanding Bitcoin",
      description: "Deep dive into the world's first cryptocurrency",
      content: `
        <h3>Understanding Bitcoin 🟡</h3>
        <p>Bitcoin is like <strong>digital gold</strong>. It was created in 2009 by a mysterious person (or group) called Satoshi Nakamoto. Think of it as the grandfather of all cryptocurrencies.</p>
        
        <h4>Why is Bitcoin Special?</h4>
        <ul>
          <li><strong>First Ever:</strong> Bitcoin was the first cryptocurrency ever created</li>
          <li><strong>Limited Supply:</strong> Only 21 million bitcoins will ever exist</li>
          <li><strong>Store of Value:</strong> Many people buy it as a long-term investment</li>
          <li><strong>Peer-to-Peer:</strong> Send money directly to anyone without banks</li>
        </ul>
        
        <h4>How Bitcoin Works (Simple Version):</h4>
        <p>Imagine a huge digital ledger (book) that everyone can see but no one can cheat. Every Bitcoin transaction is recorded in this ledger, called the <strong>blockchain</strong>.</p>
        
        <h4>Bitcoin vs Traditional Money:</h4>
        <table>
          <tr><th>Traditional Money</th><th>Bitcoin</th></tr>
          <tr><td>Controlled by banks</td><td>No central control</td></tr>
          <tr><td>Can be printed infinitely</td><td>Limited to 21 million</td></tr>
          <tr><td>Transactions can be reversed</td><td>Transactions are final</td></tr>
        </table>
        
        <h4>Fun Fact:</h4>
        <p>In 2010, someone bought 2 pizzas for 10,000 bitcoins. Those bitcoins would be worth millions today! 🍕</p>
      `,
      icon: <Award className="h-6 w-6" />,
      color: "yellow"
    },
    {
      title: "Blockchain for Beginners",
      description: "The technology that powers all cryptocurrencies",
      content: `
        <h3>Blockchain for Beginners 🔗</h3>
        <p>Imagine a notebook that everyone in the world can read, but no one can erase or change what's written. That's basically what blockchain is!</p>
        
        <h4>What is Blockchain?</h4>
        <p>Blockchain is like a <strong>digital ledger</strong> (record book) that stores information in blocks. Each block is connected to the next one, forming a chain.</p>
        
        <h4>Key Features:</h4>
        <ul>
          <li><strong>Transparent:</strong> Everyone can see all transactions</li>
          <li><strong>Secure:</strong> Very difficult to hack or change</li>
          <li><strong>Decentralized:</strong> No single point of failure</li>
          <li><strong>Permanent:</strong> Once recorded, it can't be easily deleted</li>
        </ul>
        
        <h4>Simple Example:</h4>
        <p>Think of blockchain like a classroom where:</p>
        <ul>
          <li>Every student has a copy of the attendance sheet</li>
          <li>When someone arrives, everyone updates their sheet</li>
          <li>If someone tries to cheat, everyone else will notice</li>
          <li>The record is permanent and can't be faked</li>
        </ul>
        
        <h4>Beyond Cryptocurrency:</h4>
        <p>Blockchain isn't just for money! It can be used for:</p>
        <ul>
          <li>Medical records</li>
          <li>Supply chain tracking</li>
          <li>Digital identity</li>
          <li>Smart contracts</li>
        </ul>
        
        <h4>Why Should You Care?</h4>
        <p>Understanding blockchain helps you understand why cryptocurrencies are secure and why they don't need banks to work!</p>
      `,
      icon: <Brain className="h-6 w-6" />,
      color: "purple"
    },
    {
      title: "Investment Risks",
      description: "Understanding the risks before you invest",
      content: `
        <h3>Investment Risks ⚠️</h3>
        <p>Investing in cryptocurrency can be exciting, but it's important to understand the risks. Think of it like learning to drive - you need to know the rules of the road!</p>
        
        <h4>Major Risks:</h4>
        <ul>
          <li><strong>Volatility:</strong> Prices can go up and down very quickly</li>
          <li><strong>Loss of Investment:</strong> You could lose all your money</li>
          <li><strong>Scams:</strong> Fake cryptocurrencies and fraudulent schemes</li>
          <li><strong>Technical Issues:</strong> Lost passwords, hacked exchanges</li>
          <li><strong>Regulatory Changes:</strong> Government rules might change</li>
        </ul>
        
        <h4>Real Examples:</h4>
        <ul>
          <li>Bitcoin once dropped 80% from its high in 2018</li>
          <li>Some cryptocurrencies have lost 99% of their value</li>
          <li>People have lost millions by forgetting their passwords</li>
        </ul>
        
        <h4>How to Protect Yourself:</h4>
        <ul>
          <li><strong>Start Small:</strong> Only invest what you can afford to lose</li>
          <li><strong>Do Research:</strong> Learn about what you're buying</li>
          <li><strong>Diversify:</strong> Don't put all money in one cryptocurrency</li>
          <li><strong>Use Reputable Exchanges:</strong> Choose well-known platforms</li>
          <li><strong>Keep Records:</strong> Track your investments and taxes</li>
        </ul>
        
        <h4>Golden Rule:</h4>
        <p><strong>Never invest more than you can afford to lose!</strong> Cryptocurrency should be a small part of your overall investment strategy.</p>
        
        <h4>Red Flags to Watch For:</h4>
        <ul>
          <li>Promises of guaranteed returns</li>
          <li>Pressure to invest quickly</li>
          <li>Unclear or missing information</li>
          <li>Celebrity endorsements without substance</li>
        </ul>
      `,
      icon: <Shield className="h-6 w-6" />,
      color: "red"
    },
    {
      title: "Investment Strategies",
      description: "Smart ways to approach cryptocurrency investing",
      content: `
        <h3>Investment Strategies 📈</h3>
        <p>Just like cooking, investing works better when you have a recipe to follow! Here are some proven strategies for cryptocurrency investing.</p>
        
        <h4>Popular Strategies:</h4>
        
        <h5>1. Dollar-Cost Averaging (DCA)</h5>
        <p>Instead of investing all your money at once, you invest a fixed amount regularly (like ₹1000 every month). This helps reduce the impact of price swings.</p>
        <p><strong>Example:</strong> Invest ₹1000 in Bitcoin every month for 12 months, regardless of the price.</p>
        
        <h5>2. HODL (Hold On for Dear Life)</h5>
        <p>Buy and hold for the long term (years), ignoring short-term price movements. This strategy requires patience but can be rewarding.</p>
        
        <h5>3. Portfolio Diversification</h5>
        <p>Don't put all your eggs in one basket! Spread your investment across different cryptocurrencies.</p>
        <p><strong>Example:</strong> 40% Bitcoin, 30% Ethereum, 20% other major coins, 10% cash</p>
        
        <h5>4. Taking Profits</h5>
        <p>Set targets and sell some of your investment when you reach them. This locks in gains.</p>
        <p><strong>Example:</strong> Sell 25% when your investment doubles</p>
        
        <h4>Risk Management:</h4>
        <ul>
          <li><strong>Position Size:</strong> Never risk more than 5-10% of your total wealth</li>
          <li><strong>Stop Losses:</strong> Set limits on how much you're willing to lose</li>
          <li><strong>Regular Reviews:</strong> Check your portfolio monthly, not daily</li>
          <li><strong>Emotional Control:</strong> Don't panic sell or FOMO buy</li>
        </ul>
        
        <h4>Beginner-Friendly Approach:</h4>
        <ol>
          <li>Start with the top 2-3 cryptocurrencies (Bitcoin, Ethereum)</li>
          <li>Invest a small amount you can afford to lose</li>
          <li>Set up automatic monthly purchases</li>
          <li>Don't check prices daily</li>
          <li>Learn as you go</li>
        </ol>
        
        <h4>Common Mistakes to Avoid:</h4>
        <ul>
          <li>Trying to time the market</li>
          <li>Investing based on social media hype</li>
          <li>Not doing your own research</li>
          <li>Panic selling during downturns</li>
          <li>Investing borrowed money</li>
        </ul>
      `,
      icon: <TrendingUp className="h-6 w-6" />,
      color: "green"
    }
  ];

  const handleLessonComplete = (title: string) => {
    if (!completedLessons.includes(title)) {
      setCompletedLessons([...completedLessons, title]);
    }
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'border-blue-400/30 bg-blue-400/20',
      yellow: 'border-yellow-400/30 bg-yellow-400/20',
      purple: 'border-purple-400/30 bg-purple-400/20',
      red: 'border-red-400/30 bg-red-400/20',
      green: 'border-green-400/30 bg-green-400/20'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  if (selectedLesson) {
    return (
      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedLesson(null)}
            className="mb-6 text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            ← Back to Lessons
          </button>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="prose prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: selectedLesson.content }} />
            </div>

            <div className="mt-8 pt-6 border-t border-white/20">
              <button
                onClick={() => handleLessonComplete(selectedLesson.title)}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  completedLessons.includes(selectedLesson.title)
                    ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                    : 'bg-yellow-400 text-black hover:bg-yellow-500'
                }`}
                disabled={completedLessons.includes(selectedLesson.title)}
              >
                {completedLessons.includes(selectedLesson.title) ? (
                  <>
                    <CheckCircle className="h-5 w-5 inline mr-2" />
                    Completed
                  </>
                ) : (
                  'Mark as Complete'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Crypto Learning Center</h1>
          <p className="text-gray-300 text-lg">Master cryptocurrency investing with our "Explain Like I'm 5" approach</p>
        </div>

        {/* Progress */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Your Progress</h3>
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-yellow-400" />
              <span className="text-white font-medium">
                {completedLessons.length} / {lessons.length} Lessons
              </span>
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div 
              className="bg-yellow-400 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(completedLessons.length / lessons.length) * 100}%` }}
            />
          </div>
          <p className="text-gray-300 text-sm mt-2">
            {completedLessons.length === lessons.length 
              ? 'Congratulations! You\'ve completed all lessons!'
              : `${lessons.length - completedLessons.length} lessons remaining`
            }
          </p>
        </div>

        {/* Lessons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.title);
            return (
              <div 
                key={index}
                className={`rounded-xl p-6 border transition-all duration-300 hover:scale-105 cursor-pointer ${getColorClasses(lesson.color)} ${
                  isCompleted ? 'ring-2 ring-green-400/50' : ''
                }`}
                onClick={() => setSelectedLesson(lesson)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${getColorClasses(lesson.color)}`}>
                    {lesson.icon}
                  </div>
                  {isCompleted && (
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{lesson.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{lesson.description}</p>

                <div className="flex items-center justify-between">
                  <button className="flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors">
                    <Play className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {isCompleted ? 'Review' : 'Start Learning'}
                    </span>
                  </button>
                  <span className="text-gray-400 text-xs">5 min read</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Risk Warning */}
        <div className="mt-12 bg-red-500/10 border border-red-500/30 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-6 w-6 text-red-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-red-400 font-semibold mb-2">Important Risk Disclaimer</h3>
              <p className="text-gray-300 text-sm">
                Cryptocurrency investments carry high risk and can result in significant losses. 
                This educational content is for informational purposes only and should not be 
                considered financial advice. Always do your own research and consult with qualified 
                financial advisors before making investment decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
