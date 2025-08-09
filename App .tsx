import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PortfolioProvider } from './contexts/PortfolioContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BlogList from './blog/BlogList'
import BlogPost1 from './blog/BlogPost1';
import BlogPost2 from './blog/BlogPost2';
import BlogPost3 from './blog/BlogPost3';
import BlogPost4 from './blog/BlogPost4';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import Learn from './pages/Learn';
import Experience from './pages/Experience';
import ProtectedRoute from './components/ProtectedRoute';
import Eventpage from './events/EventPage';
import Error from './pages/Error'

function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <Navbar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/understanding-blockchain" element={<BlogPost1 />} />
              <Route path="/blog/first-crypto-trade" element={<BlogPost2 />} />
              <Route path="/blog/future-of-defi" element={<BlogPost3 />} />
              <Route path="/blog/safeguarding-investments" element={<BlogPost4 />} />
              <Route path="/event" element={<Eventpage />} />
              <Route path='/experience' element={<Experience />}/>
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/portfolio" element={
                <ProtectedRoute>
                  <Portfolio />
                </ProtectedRoute>
              } />
              <Route path="/learn" element={
                <ProtectedRoute>
                  <Learn />
                </ProtectedRoute>
              } />
              <Route path="*" element={<Error />}/>
            </Routes>
            <Footer />
          </div>
        </Router>
      </PortfolioProvider>
    </AuthProvider>
  );
}

export default App;
