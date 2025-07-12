import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginModal from './components/LoginModal';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

interface User {
  name: string;
  email: string;
  profilePicture?: string;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('safespace-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      // Mock authentication - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        name: 'John Doe',
        email: email,
        profilePicture: '/default-avatar.png'
      };
      
      setUser(mockUser);
      setIsLoggedIn(true);
      localStorage.setItem('safespace-user', JSON.stringify(mockUser));
      setIsLoginModalOpen(false);
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('safespace-user');
  };

  const handleSignupClick = () => {
    setIsLoginModalOpen(false);
    // Navigate to signup page - this will be handled by the router
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, you'd persist this to localStorage
  };

  return (
    <Router>
      <div className={`App ${isDarkMode ? 'dark' : ''}`}>
        <Navbar
          isLoggedIn={isLoggedIn}
          user={user || undefined}
          onLoginClick={() => setIsLoginModalOpen(true)}
          onSignupClick={handleSignupClick}
          onLogout={handleLogout}
        />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/login" 
            element={
              isLoggedIn ? <Navigate to="/" replace /> : <Login />
            } 
          />
          <Route 
            path="/signup" 
            element={
              isLoggedIn ? <Navigate to="/" replace /> : <Signup />
            } 
          />
        </Routes>

        {/* Login Modal */}
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLogin={handleLogin}
          onSwitchToSignup={() => {
            setIsLoginModalOpen(false);
            window.location.href = '/signup';
          }}
        />

        {/* Dark Mode Toggle - Bonus Feature */}
        <button
          onClick={toggleDarkMode}
          className="fixed bottom-4 right-4 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
          title="Toggle Dark Mode"
        >
          {isDarkMode ? '🌞' : '🌙'}
        </button>
      </div>
    </Router>
  );
}

export default App;
