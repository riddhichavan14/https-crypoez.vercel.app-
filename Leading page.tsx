import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { TrendingUp, Shield, BookOpen, Coins, Play, Star } from 'lucide-react';
import { motion } from 'framer-motion'; // For animations
import { Carousel } from 'react-responsive-carousel'; // For image carousels
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel styles

// Sample images - Replace with your actual image paths
const heroImages = [
  '/events/Event1.jpg',
  '/events/Event2.jpg',
];

const blogImages = [
  '/blog/News1.jpg',
  '/blog/News2.jpg',
  '/blog/News3.jpg',
  '/blog/News4.jpg',
];

// Sample blog data - Replace with your actual blog data
const topBlogs = [
  {
    id: 1,
    title: "Understanding Blockchain Technology in 5 Minutes",
    description: "Demystify the core concepts of blockchain, the technology powering cryptocurrencies.",
    imageUrl: blogImages[0],
    link: "/blog/understanding-blockchain",
  },
  {
    id: 2,
    title: "Your First Crypto Trade: A Step-by-Step Guide",
    description: "Learn how to make your initial virtual crypto trade on CryptoEZ.",
    imageUrl: blogImages[1],
    link: "/blog/first-crypto-trade",
  },
  {
    id: 3,
    title: "The Future of Decentralized Finance (DeFi)",
    description: "Explore the exciting world of DeFi and its potential impact on traditional finance.",
    imageUrl: blogImages[2],
    link: "/blog/future-of-defi",
  },
  {
    id: 4,
    title: "Safeguarding Your Crypto Investments",
    description: "Essential tips and practices to keep your virtual crypto assets secure.",
    imageUrl: blogImages[3],
    link: "/blog/safeguarding-investments",
  },
];

const LandingPage: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-yellow-400 text-4xl md:text-6xl font-bold mb-6"
            >
              Understand & Experience Crypto <br />
              <span className="text-yellow-200"> The Easy Way</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              CryptoEZ is your friendly gateway to the world of cryptocurrency. Start with ₹10,000 virtual cash, learn the basics, and explore crypto investing without any risks.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              {currentUser ? (
                <Link
                  to="/dashboard"
                  className="bg-yellow-400 text-black px-8 py-3 rounded-xl font-semibold hover:bg-yellow-500 transition-colors inline-flex items-center justify-center space-x-2"
                >
                  <Play className="h-5 w-5" />
                  <span>Go to Dashboard</span>
                </Link>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="bg-yellow-400 text-black px-8 py-3 rounded-xl font-semibold hover:bg-yellow-500 transition-colors inline-flex items-center justify-center space-x-2"
                  >
                    <Play className="h-5 w-5" />
                    <span>Start Learning</span>
                  </Link>
                  <Link
                    to="/login"
                    className="border border-white/20 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors"
                  >
                    Login
                  </Link>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-white mb-4"
            >
              Why Choose CryptoSim?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-300 max-w-2xl mx-auto"
            >
              The safest way to learn cryptocurrency investing without risking real money.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Coins, title: "Virtual Trading", description: "Start with ₹10,000 virtual money and practice trading with real market data.", link: "/dashboard", color: "yellow" },
              { icon: TrendingUp, title: "Live Market Data", description: "Access real-time cryptocurrency prices and market trends from CoinGecko.", link: "/dashboard", color: "green" },
              { icon: Shield, title: "Risk-Free Learning", description: "Learn investment strategies without the fear of losing real money.", link: "/learn", color: "blue" },
              { icon: BookOpen, title: "Educational Content", description: "Learn crypto basics with our \"Explain Like I'm 5\" educational modules.", link: "/learn", color: "purple" },
              { icon: Star, title: "Portfolio Analytics", description: "Track your performance with detailed charts and risk analysis.", link: "/portfolio", color: "red" },
              { icon: Play, title: "Simulated UPI", description: "Experience realistic buying flow with our mock UPI integration.", link: "/portfolio", color: "yellow" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={feature.link}>
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-yellow-400 transition-all duration-300">
                    <div className={`bg-${feature.color}-400/20 rounded-xl p-3 w-fit mb-4`}>
                      <feature.icon className={`h-8 w-8 text-${feature.color}-400`} />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Carousel */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-yellow-400 text-4xl md:text-6xl font-bold mb-6 text-center"
      >
        Upcoming Events <br />
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="mt-16 w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-lg"
      >
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          showStatus={false}
          interval={5000}
          transitionTime={800}
        >
          {heroImages.map((src, index) => (
            <div key={index}>
              <img
                src={src}
                alt={`CryptoEZ Hero ${index + 1}`}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </Carousel>
      </motion.div>

      {/* Centered Button */}
      <div className="flex justify-center mt-10">
        <form action="/event">
        <button className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-500 transition-colors">
          Register Fast!
        </button>
        </form>
      </div>


      {/* Top Blogs Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-white mb-4"
            >
              Our Top Blogs
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-300 max-w-2xl mx-auto"
            >
              Dive deeper into the world of crypto with our most popular articles.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {topBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-yellow-400 transition-all duration-300"
              >
                <Link to={blog.link}>
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-t-2xl"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{blog.title}</h3>
                    <p className="text-gray-300 text-sm mb-4">{blog.description}</p>
                    <span className="text-yellow-400 hover:text-yellow-500 font-semibold text-sm">Read More &rarr;</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
            className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-3xl p-12 border border-yellow-400/30"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Your Crypto Journey?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Join thousands of users who are learning crypto investing the smart way.
            </p>
            {!currentUser && (
              <Link
                to="/signup"
                className="bg-yellow-400 text-black px-8 py-3 rounded-xl font-semibold hover:bg-yellow-500 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <Play className="h-5 w-5" />
                <span>Get Started Free</span>
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Become an Instructor/Content Writer Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
            className="bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-3xl p-12 border border-purple-400/30"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Share Your Crypto Investing Journey on CryptoEZ
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Have insights or stories to tell? Contribute your experience and help others navigate the world of crypto with confidence. Let’s make investing simpler together.
            </p>
            <Link
              to="/experience"
              className="bg-purple-400 text-white px-8 py-3 rounded-xl font-semibold hover:bg-purple-500 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <span>Answer a few quick questions</span>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
