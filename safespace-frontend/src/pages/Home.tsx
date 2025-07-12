import React, { useState, useEffect } from 'react';
import HeatMap from '../components/HeatMap';
import ThreatCard from '../components/ThreatCard';
import AdviceModal from '../components/AdviceModal';
import axios from 'axios';

interface Threat {
  id: string;
  title: string;
  description: string;
  publishedDate: string;
  city: string;
  threatLevel: number;
  category: string;
  safetyAdvice?: string;
}

interface ThreatData {
  id: string;
  city: string;
  latitude: number;
  longitude: number;
  threatLevel: number;
  threatCount: number;
  description: string;
}

interface UserLocation {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
}

const Home: React.FC = () => {
  const [threats, setThreats] = useState<Threat[]>([]);
  const [heatMapData, setHeatMapData] = useState<ThreatData[]>([]);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);
  const [isAdviceModalOpen, setIsAdviceModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchCity, setSearchCity] = useState('');

  useEffect(() => {
    fetchUserLocation();
    fetchThreats();
    fetchHeatMapData();
  }, []);

  const fetchUserLocation = async () => {
    try {
      const response = await fetch('https://ipinfo.io/json');
      const data = await response.json();
      const [lat, lon] = data.loc.split(',');
      setUserLocation({
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
        city: data.city,
        country: data.country
      });
    } catch (error) {
      console.error('Error fetching user location:', error);
    }
  };

  const fetchThreats = async (city?: string) => {
    try {
      setIsLoading(true);
      const locationParam = city || userLocation?.city || 'Mumbai';
      
      // Mock API call - replace with actual Flask backend
      // const response = await axios.get(`/api/threats?location=${locationParam}`);
      
      // Mock data for demonstration
      const mockThreats: Threat[] = [
        {
          id: '1',
          title: 'Heavy Rainfall Warning',
          description: 'Meteorological department has issued a heavy rainfall warning for the next 24 hours. Expect waterlogging in low-lying areas.',
          publishedDate: new Date().toISOString(),
          city: locationParam,
          threatLevel: 7,
          category: 'weather'
        },
        {
          id: '2',
          title: 'Traffic Congestion Alert',
          description: 'Major traffic congestion reported on main highways due to road construction work.',
          publishedDate: new Date(Date.now() - 86400000).toISOString(),
          city: locationParam,
          threatLevel: 4,
          category: 'traffic'
        },
        {
          id: '3',
          title: 'Health Advisory',
          description: 'Health department advises precautionary measures due to seasonal flu outbreak.',
          publishedDate: new Date(Date.now() - 172800000).toISOString(),
          city: locationParam,
          threatLevel: 5,
          category: 'health'
        }
      ];
      
      setThreats(mockThreats);
    } catch (error) {
      console.error('Error fetching threats:', error);
      setError('Failed to fetch threat data');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchHeatMapData = async () => {
    try {
      // Mock heat map data for major Indian cities
      const mockHeatMapData: ThreatData[] = [
        {
          id: '1',
          city: 'Mumbai',
          latitude: 19.0760,
          longitude: 72.8777,
          threatLevel: 7,
          threatCount: 12,
          description: 'Multiple weather and traffic alerts'
        },
        {
          id: '2',
          city: 'Delhi',
          latitude: 28.6139,
          longitude: 77.2090,
          threatLevel: 6,
          threatCount: 8,
          description: 'Air quality and security alerts'
        },
        {
          id: '3',
          city: 'Bangalore',
          latitude: 12.9716,
          longitude: 77.5946,
          threatLevel: 4,
          threatCount: 5,
          description: 'Traffic and minor health advisories'
        },
        {
          id: '4',
          city: 'Chennai',
          latitude: 13.0827,
          longitude: 80.2707,
          threatLevel: 8,
          threatCount: 15,
          description: 'Severe weather warnings'
        },
        {
          id: '5',
          city: 'Kolkata',
          latitude: 22.5726,
          longitude: 88.3639,
          threatLevel: 5,
          threatCount: 7,
          description: 'Weather and health alerts'
        }
      ];
      
      setHeatMapData(mockHeatMapData);
    } catch (error) {
      console.error('Error fetching heat map data:', error);
    }
  };

  const handleThreatClick = (threat: Threat) => {
    setSelectedThreat(threat);
    setIsAdviceModalOpen(true);
  };

  const handleCitySearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchCity.trim()) {
      fetchThreats(searchCity);
    }
  };

  const getCurrentLocationData = () => {
    if (userLocation) {
      return {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        city: userLocation.city
      };
    }
    return undefined;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Safety Dashboard</h1>
          <p className="text-gray-600">
            Stay informed about threats and safety conditions in your area
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <form onSubmit={handleCitySearch} className="flex max-w-md">
            <input
              type="text"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              placeholder="Search for a city..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-r-lg transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Heat Map */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Threat Heat Map</h2>
          <HeatMap 
            userLocation={getCurrentLocationData()}
            threats={heatMapData}
          />
        </div>

        {/* Threat Feed */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Threat Feed - {userLocation?.city || 'Your Area'}
            </h2>
            <button
              onClick={() => fetchThreats()}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Refresh
            </button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading threats...</span>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5C2.962 18.333 3.924 20 5.464 20z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          ) : threats.length === 0 ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
              <div className="flex flex-col items-center">
                <span className="text-4xl mb-4">🛡️</span>
                <h3 className="text-lg font-semibold text-green-800 mb-2">All Clear!</h3>
                <p className="text-green-600">No active threats detected in your area.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {threats.map((threat) => (
                <ThreatCard
                  key={threat.id}
                  threat={threat}
                  onClick={handleThreatClick}
                />
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Threats</p>
                <p className="text-2xl font-semibold text-gray-900">{threats.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Your Location</p>
                <p className="text-2xl font-semibold text-gray-900">{userLocation?.city || 'Unknown'}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100">
                <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5C2.962 18.333 3.924 20 5.464 20z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Threat Level</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {threats.length > 0 ? (threats.reduce((sum, t) => sum + t.threatLevel, 0) / threats.length).toFixed(1) : '0'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advice Modal */}
      <AdviceModal
        isOpen={isAdviceModalOpen}
        onClose={() => setIsAdviceModalOpen(false)}
        threat={selectedThreat}
      />
    </div>
  );
};

export default Home;