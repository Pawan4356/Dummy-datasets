import React from 'react';

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

interface ThreatCardProps {
  threat: Threat;
  onClick: (threat: Threat) => void;
}

const ThreatCard: React.FC<ThreatCardProps> = ({ threat, onClick }) => {
  const getThreatLevelColor = (level: number): string => {
    if (level >= 8) return 'bg-red-100 text-red-800 border-red-200';
    if (level >= 6) return 'bg-orange-100 text-orange-800 border-orange-200';
    if (level >= 4) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (level >= 2) return 'bg-green-100 text-green-800 border-green-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getThreatLevelText = (level: number): string => {
    if (level >= 8) return 'Critical';
    if (level >= 6) return 'High';
    if (level >= 4) return 'Medium';
    if (level >= 2) return 'Low';
    return 'Minimal';
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryIcon = (category: string): string => {
    switch (category.toLowerCase()) {
      case 'weather':
        return '🌪️';
      case 'crime':
        return '🚨';
      case 'health':
        return '🏥';
      case 'security':
        return '🔒';
      case 'traffic':
        return '🚗';
      case 'natural disaster':
        return '⚠️';
      default:
        return '📢';
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer border border-gray-200"
      onClick={() => onClick(threat)}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{getCategoryIcon(threat.category)}</span>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                {threat.title}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-sm text-gray-500">📍 {threat.city}</span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-500">🕒 {formatDate(threat.publishedDate)}</span>
              </div>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getThreatLevelColor(threat.threatLevel)}`}>
            {getThreatLevelText(threat.threatLevel)}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {threat.description}
        </p>

        {/* Category */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {threat.category}
          </span>
          
          <button 
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1"
            onClick={(e) => {
              e.stopPropagation();
              onClick(threat);
            }}
          >
            <span>View Safety Advice</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Threat Level Bar */}
      <div className="px-6 pb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              threat.threatLevel >= 8 ? 'bg-red-500' :
              threat.threatLevel >= 6 ? 'bg-orange-500' :
              threat.threatLevel >= 4 ? 'bg-yellow-500' :
              threat.threatLevel >= 2 ? 'bg-green-500' :
              'bg-gray-500'
            }`}
            style={{ width: `${(threat.threatLevel / 10) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Threat Level</span>
          <span>{threat.threatLevel}/10</span>
        </div>
      </div>
    </div>
  );
};

export default ThreatCard;