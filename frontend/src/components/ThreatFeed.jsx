import React from "react";

export default function ThreatFeed({ threats, onCardClick }) {
  return (
    <div className="px-8 py-6 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {threats.map(threat => (
        <div
          key={threat.title + threat.publishedAt}
          className="bg-gray-800 rounded-lg shadow-lg p-4 cursor-pointer hover:scale-105 transition-all"
          onClick={() => onCardClick(threat)}
        >
          <div className="flex justify-between items-center">
            <span className="text-red-500 font-bold">🔴 {threat.title}</span>
            <span className="text-xs text-gray-400">{threat.publishedAt}</span>
          </div>
          <div className="mt-2 text-gray-200">{threat.description}</div>
          <div className="mt-2 text-blue-300">{threat.city}</div>
        </div>
      ))}
    </div>
  );
}