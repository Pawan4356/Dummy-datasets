import React, { useEffect, useState } from "react";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
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

export default function SafetyAdviceModal({ threat, darkMode, onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const severity = getThreatSeverity(threat.title, threat.description);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black transition-opacity duration-300 ${
        isVisible ? 'bg-opacity-60' : 'bg-opacity-0'
      }`}
      onClick={handleBackdropClick}
    >
      <div 
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glassmorphism container */}
        <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} bg-opacity-95 backdrop-blur-xl rounded-2xl shadow-2xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          {/* Header */}
          <div className="relative p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${severity.color} ${severity.textColor}`}>
                    {severity.level.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDate(threat.publishedAt)}
                  </span>
                </div>
              </div>
              <button 
                onClick={handleClose}
                className={`p-2 rounded-full transition-colors duration-200 ${darkMode ? 'hover:bg-gray-700 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'}`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Title */}
            <div className="mb-6">
              <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {threat.title}
              </h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Source: {threat.source?.name || 'Unknown'}
              </p>
            </div>

            {/* Description */}
            {threat.description && (
              <div className="mb-6">
                <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  📰 News Details
                </h3>
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {threat.description}
                  </p>
                </div>
              </div>
            )}

            {/* Safety Advice */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  🛡️ AI-Generated Safety Advice
                </h3>
              </div>
              
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gradient-to-r from-blue-900 to-purple-900' : 'bg-gradient-to-r from-blue-50 to-purple-50'} border ${darkMode ? 'border-blue-800' : 'border-blue-200'}`}>
                {threat.advice ? (
                  <div className="space-y-3">
                    {threat.advice.split('\n').filter(line => line.trim()).map((line, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                          <span className="text-white text-xs font-bold">{idx + 1}</span>
                        </div>
                        <p className={`text-sm leading-relaxed ${darkMode ? 'text-blue-100' : 'text-blue-900'}`}>
                          {line.replace(/^[•\-\*]\s*/, '').trim()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className={`text-sm ${darkMode ? 'text-blue-200' : 'text-blue-700'}`}>
                      Generating safety advice...
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Information */}
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div className="flex items-center space-x-2 mb-2">
                <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Important Reminders
                </h4>
              </div>
              <ul className={`text-sm space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li>• Always verify information from multiple sources</li>
                <li>• Contact local authorities if you're in immediate danger</li>
                <li>• Keep emergency contacts readily available</li>
                <li>• Stay informed about your local area's safety updates</li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className={`p-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-between items-center`}>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Powered by SafeSpace AI • Real-time threat intelligence
            </p>
            <button 
              onClick={handleClose}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}