import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom markers for different threat levels
const createThreatIcon = (count, color) => {
  return L.divIcon({
    html: `<div style="background-color: ${color}; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">${count}</div>`,
    className: 'custom-div-icon',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

const getThreatColor = (count) => {
  if (count >= 8) return '#dc2626'; // Red for high threats
  if (count >= 5) return '#ea580c'; // Orange for medium threats
  if (count >= 3) return '#d97706'; // Yellow for low-medium threats
  return '#16a34a'; // Green for low threats
};

const getThreatIntensity = (count) => {
  if (count >= 8) return 0.8;
  if (count >= 5) return 0.6;
  if (count >= 3) return 0.4;
  return 0.2;
};

// Map update component
function MapUpdater({ currentCity, cityCoords }) {
  const map = useMap();
  
  useEffect(() => {
    const coords = cityCoords[currentCity] || [22.9734, 78.6569];
    map.setView(coords, 6);
  }, [currentCity, cityCoords, map]);
  
  return null;
}

export default function HeatMap({ data, currentCity, darkMode }) {
  const cityCoords = {
    Surat: [21.1702, 72.8311],
    Delhi: [28.6139, 77.2090],
    Mumbai: [19.0760, 72.8777],
    Chennai: [13.0827, 80.2707],
    Kolkata: [22.5726, 88.3639],
    Bangalore: [12.9716, 77.5946],
    Hyderabad: [17.3850, 78.4867],
    Pune: [18.5204, 73.8567],
    Ahmedabad: [23.0225, 72.5714],
    Jaipur: [26.9124, 75.7873],
    Lucknow: [26.8467, 80.9462],
    Kanpur: [26.4499, 80.3319],
    Nagpur: [21.1458, 79.0882],
    Indore: [22.7196, 75.8577],
    Thane: [19.2183, 72.9781],
    Bhopal: [23.2599, 77.4126],
    Visakhapatnam: [17.6868, 83.2185],
    Pimpri: [18.6298, 73.8087],
    Patna: [25.5941, 85.1376],
    Vadodara: [22.3072, 73.1812]
  };

  const center = cityCoords[currentCity] || [22.9734, 78.6569];
  const mapRef = useRef(null);

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden">
      <div className="relative w-full h-full">
        <MapContainer 
          center={center} 
          zoom={6} 
          style={{ height: "100%", width: "100%" }}
          ref={mapRef}
          className="rounded-lg"
        >
          <TileLayer
            attribution='© OpenStreetMap contributors'
            url={darkMode 
              ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            }
          />
          
          <MapUpdater currentCity={currentCity} cityCoords={cityCoords} />
          
          {/* Threat markers and heat circles */}
          {data.map(({ city, count }) => {
            const coords = cityCoords[city];
            if (!coords) return null;
            
            const color = getThreatColor(count);
            const intensity = getThreatIntensity(count);
            
            return (
              <div key={city}>
                {/* Heat circle */}
                <Circle
                  center={coords}
                  radius={count * 5000} // Adjust radius based on threat count
                  pathOptions={{
                    color: color,
                    fillColor: color,
                    fillOpacity: intensity,
                    weight: 2,
                  }}
                />
                
                {/* Threat marker */}
                <Marker
                  position={coords}
                  icon={createThreatIcon(count, color)}
                >
                  <Popup>
                    <div className="p-3 min-w-[200px]">
                      <h3 className="font-bold text-lg text-gray-800 mb-2">{city}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Threat Level:</span>
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            count >= 8 ? 'bg-red-100 text-red-800' :
                            count >= 5 ? 'bg-orange-100 text-orange-800' :
                            count >= 3 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {count >= 8 ? 'High' : count >= 5 ? 'Medium' : count >= 3 ? 'Low-Medium' : 'Low'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Active Threats:</span>
                          <span className="font-semibold">{count}</span>
                        </div>
                        <div className="mt-3 pt-2 border-t">
                          <p className="text-sm text-gray-500">
                            Click on threat feed below for detailed safety advice
                          </p>
                        </div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              </div>
            );
          })}
          
          {/* Current location marker */}
          <Marker position={center}>
            <Popup>
              <div className="p-3">
                <h3 className="font-bold text-lg text-gray-800 mb-2">📍 Your Location</h3>
                <p className="text-gray-600">{currentCity}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Currently showing threats for this area
                </p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
        
        {/* Legend */}
        <div className={`absolute bottom-4 left-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-lg z-[1000]`}>
          <h4 className={`font-bold text-sm mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Threat Level</h4>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-600 rounded-full"></div>
              <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>High (8+)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-orange-600 rounded-full"></div>
              <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Medium (5-7)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
              <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Low-Med (3-4)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-600 rounded-full"></div>
              <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Low (1-2)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}