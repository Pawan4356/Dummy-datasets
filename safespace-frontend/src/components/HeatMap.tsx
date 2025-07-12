import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface ThreatData {
  id: string;
  city: string;
  latitude: number;
  longitude: number;
  threatLevel: number; // 1-10
  threatCount: number;
  description: string;
}

interface UserLocation {
  latitude: number;
  longitude: number;
  city: string;
}

interface HeatMapProps {
  userLocation?: UserLocation;
  threats: ThreatData[];
}

const HeatMap: React.FC<HeatMapProps> = ({ userLocation, threats }) => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([20.5937, 78.9629]); // India center
  const [zoomLevel, setZoomLevel] = useState(5);

  useEffect(() => {
    if (userLocation) {
      setMapCenter([userLocation.latitude, userLocation.longitude]);
      setZoomLevel(10);
    }
  }, [userLocation]);

  const getThreatColor = (threatLevel: number): string => {
    if (threatLevel >= 8) return '#dc2626'; // Red
    if (threatLevel >= 6) return '#ea580c'; // Orange
    if (threatLevel >= 4) return '#f59e0b'; // Yellow
    if (threatLevel >= 2) return '#10b981'; // Green
    return '#6b7280'; // Gray
  };

  const getThreatRadius = (threatCount: number): number => {
    return Math.min(Math.max(threatCount * 5, 10), 50);
  };

  const createCustomIcon = (threatLevel: number) => {
    const color = getThreatColor(threatLevel);
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  };

  return (
    <div className="w-full h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={mapCenter}
        zoom={zoomLevel}
        className="w-full h-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User Location Marker */}
        {userLocation && (
          <Marker
            position={[userLocation.latitude, userLocation.longitude]}
            icon={L.divIcon({
              className: 'user-location-marker',
              html: '<div style="background-color: #3b82f6; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>',
              iconSize: [16, 16],
              iconAnchor: [8, 8],
            })}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-semibold text-blue-600">Your Location</h3>
                <p className="text-sm text-gray-600">{userLocation.city}</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Threat Markers */}
        {threats.map((threat) => (
          <CircleMarker
            key={threat.id}
            center={[threat.latitude, threat.longitude]}
            radius={getThreatRadius(threat.threatCount)}
            pathOptions={{
              color: getThreatColor(threat.threatLevel),
              fillColor: getThreatColor(threat.threatLevel),
              fillOpacity: 0.6,
              weight: 2,
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-semibold text-gray-800 mb-2">{threat.city}</h3>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Threat Level:</span>
                    <span className={`text-sm font-medium ${
                      threat.threatLevel >= 8 ? 'text-red-600' :
                      threat.threatLevel >= 6 ? 'text-orange-600' :
                      threat.threatLevel >= 4 ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {threat.threatLevel}/10
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Active Threats:</span>
                    <span className="text-sm font-medium">{threat.threatCount}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-2">{threat.description}</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg z-[1000]">
        <h4 className="font-semibold text-gray-800 mb-2">Threat Level</h4>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-red-600"></div>
            <span className="text-sm">Critical (8-10)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-orange-600"></div>
            <span className="text-sm">High (6-7)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
            <span className="text-sm">Medium (4-5)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-green-600"></div>
            <span className="text-sm">Low (2-3)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-gray-500"></div>
            <span className="text-sm">Minimal (0-1)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatMap;