import React, { useState, useEffect } from "react";
import NavBar from "../../frontend/components/NavBar";
import HeatMap from "../../frontend/components/HeatMap";
import ThreatFeed from "../../frontend/components/ThreatFeed";
import SafetyAdviceModal from "../../frontend/components/SafetyAdviceModal";
import { fetchUserLocation } from "./utils/location";
import { fetchThreats } from "./utils/api";

function App() {
  const [user, setUser] = useState(null); // { username, photoURL, city }
  const [currentCity, setCurrentCity] = useState("Surat");
  const [threats, setThreats] = useState([]);
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [heatMapData, setHeatMapData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

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
      const cities = ["Surat", "Delhi", "Mumbai", "Chennai", "Kolkata"];
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
    <div className="bg-gray-900 min-h-screen">
      <NavBar user={user} setUser={setUser} currentCity={currentCity} setCurrentCity={setCurrentCity} />
      <HeatMap data={heatMapData} currentCity={currentCity} />
      <ThreatFeed
        threats={threats}
        onCardClick={threat => {
          setSelectedThreat(threat);
          setModalOpen(true);
        }}
      />
      {modalOpen && (
        <SafetyAdviceModal
          threat={selectedThreat}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;