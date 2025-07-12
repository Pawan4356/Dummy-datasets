import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface UserLocation {
  city: string;
  country: string;
}

interface NavbarProps {
  isLoggedIn: boolean;
  user?: {
    name: string;
    profilePicture?: string;
  };
  onLoginClick: () => void;
  onSignupClick: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isLoggedIn,
  user,
  onLoginClick,
  onSignupClick,
  onLogout
}) => {
  const [currentLocation, setCurrentLocation] = useState<UserLocation | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Fetch current location using IPInfo API
    const fetchLocation = async () => {
      try {
        const response = await fetch('https://ipinfo.io/json');
        const data = await response.json();
        setCurrentLocation({
          city: data.city,
          country: data.country
        });
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    fetchLocation();
  }, []);

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl">🛡</span>
              <span className="text-xl font-bold text-gray-900">SafeSpace</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                {/* User Info */}
                <div className="flex items-center space-x-3">
                  <img
                    src={user?.profilePicture || '/default-avatar.png'}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">{user?.name}</p>
                    {currentLocation && (
                      <p className="text-gray-500">{currentLocation.city}, {currentLocation.country}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={onLoginClick}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </button>
                <button
                  onClick={onSignupClick}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {isLoggedIn ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 px-3 py-2">
                    <img
                      src={user?.profilePicture || '/default-avatar.png'}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">{user?.name}</p>
                      {currentLocation && (
                        <p className="text-gray-500">{currentLocation.city}, {currentLocation.country}</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={onLogout}
                    className="w-full text-left text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={onLoginClick}
                    className="w-full text-left text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </button>
                  <button
                    onClick={onSignupClick}
                    className="w-full text-left bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;