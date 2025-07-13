import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function HeatMap({ data, currentCity }) {
  const cityCoords = {
    Surat: [21.1702, 72.8311],
    Delhi: [28.6139, 77.2090],
    Mumbai: [19.0760, 72.8777],
    Chennai: [13.0827, 80.2707],
    Kolkata: [22.5726, 88.3639]
  };

  // Example: Show pin for current city
  const center = cityCoords[currentCity] || [22.9734, 78.6569]; // Center of India

  return (
    <div className="w-full h-96">
      <MapContainer center={center} zoom={5} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='© OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* HeatMap/Markers for each city */}
        {data.map(({ city, count }) => (
          <Marker
            key={city}
            position={cityCoords[city]}
          >
          {/* You can use a circle and color intensity for heatmap effect */}
          </Marker>
        ))}
        {/* Pin for current location */}
        <Marker position={center}>
        </Marker>
      </MapContainer>
    </div>
  );
}