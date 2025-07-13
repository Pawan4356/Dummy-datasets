import React from "react";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getThreatSeverity = (title, description) => {
  const text = (title + ' ' + description).toLowerCase();
  const highSeverityKeywords = ['murder', 'shooting', 'bomb', 'explosion', 'terror', 'attack', 'kidnap', 'rape'];
  const mediumSeverityKeywords = ['assault', 'theft', 'robbery', 'violence', 'riot', 'fire', 'accident'];
  
  if (highSeverityKeywords.some(keyword => text.includes(keyword))) {
    return { level: 'high', color: 'bg-red-500', textColor: 'text-red-100' };
  } else if (mediumSeverityKeywords.some(keyword => text.includes(keyword))) {
    return { level: 'medium', color: 'bg-orange-500', textColor: 'text-orange-100' };
  }
  return { level: 'low', color: 'bg-yellow-500', textColor: 'text-yellow-100' };
};

export default function ThreatFeed({ threats, darkMode, onCardClick }) {
  if (threats.length === 0) {
    return (
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-8 text-center`}>
        <div className="mb-4">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          No Active Threats
        </h3>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Great news! There are currently no reported threats in your area. Stay safe!
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {threats.map((threat, index) => {
        const severity = getThreatSeverity(threat.title, threat.description);
        
        return (
          <div
            key={threat.title + threat.publishedAt + index}
            className={`${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} 
              rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 
              border-l-4 border-l-red-500 overflow-hidden`}
            onClick={() => onCardClick(threat)}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${severity.color} ${severity.textColor}`}>
                    {severity.level.toUpperCase()}
                  </span>
                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {formatDate(threat.publishedAt)}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs text-blue-500">Click for advice</span>
                </div>
              </div>

              {/* Title */}
              <h3 className={`text-lg font-semibold mb-3 line-clamp-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {threat.title}
              </h3>

              {/* Description */}
              <p className={`text-sm mb-4 line-clamp-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {threat.description || 'No description available'}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {threat.source?.name || 'Unknown'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                    Breaking News
                  </span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        );
      })}
    </div>
  );
}