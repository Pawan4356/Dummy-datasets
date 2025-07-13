import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import HeatMap from "./components/HeatMap";
import ThreatFeed from "./components/ThreatFeed";
import SafetyAdviceModal from "./components/SafetyAdviceModal";
import { fetchUserLocation } from "./utils/location";
import { fetchThreats } from "./utils/api";

function App() {
  const [user, setUser] = useState(null); // { username, photoURL, city }
  const [currentCity, setCurrentCity] = useState("Surat");
  const [threats, setThreats] = useState([]);
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [heatMapData, setHeatMapData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Fetch user location on mount
  useEffect(() => {
    fetchUserLocation().then(city => {
      setCurrentCity(city);
      setUser(user => user ? { ...user, city } : null);
    });
  }, []);

  // Fetch threats when city changes
  useEffect(() => {
    fetchThreats(currentCity).then(data => setThreats(data.news));
  }, [currentCity]);

  // Fetch heatmap data (could be all cities)
  useEffect(() => {
    // Example: fetchThreats for multiple cities & aggregate for heatmap
    async function getHeatMap() {
      const cities = ["Surat", "Delhi", "Mumbai", "Chennai", "Kolkata", "Bangalore", "Hyderabad", "Pune"];
      const results = await Promise.all(cities.map(fetchThreats));
      setHeatMapData(
        results.map((res, idx) => ({
          city: cities[idx],
          count: res.news.length,
        }))
      );
    }
    getHeatMap();
  }, []);

  return (
    <div className={`${darkMode ? 'bg-gray-900' : 'bg-gray-100'} min-h-screen transition-colors duration-300`}>
      <NavBar 
        user={user} 
        setUser={setUser} 
        currentCity={currentCity} 
        setCurrentCity={setCurrentCity}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <div className="container mx-auto px-4">
        <div className="pt-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg mb-6`}>
            <HeatMap data={heatMapData} currentCity={currentCity} darkMode={darkMode} />
          </div>
          <div>
            <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              🔴 Threat Feed - {currentCity}
            </h2>
            <ThreatFeed
              threats={threats}
              darkMode={darkMode}
              onCardClick={threat => {
                setSelectedThreat(threat);
                setModalOpen(true);
              }}
            />
          </div>
        </div>
      </div>
      {modalOpen && (
        <SafetyAdviceModal
          threat={selectedThreat}
          darkMode={darkMode}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;