import React, { useState, useEffect } from 'react';

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

interface AdviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  threat: Threat | null;
}

const AdviceModal: React.FC<AdviceModalProps> = ({ isOpen, onClose, threat }) => {
  const [safetyAdvice, setSafetyAdvice] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && threat) {
      fetchSafetyAdvice();
    }
  }, [isOpen, threat]);

  const fetchSafetyAdvice = async () => {
    if (!threat) return;

    if (threat.safetyAdvice) {
      setSafetyAdvice(threat.safetyAdvice);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // This would typically call your Flask backend API
      // For now, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock safety advice based on threat category
      const mockAdvice = generateMockAdvice(threat.category, threat.threatLevel);
      setSafetyAdvice(mockAdvice);
    } catch (err) {
      setError('Failed to fetch safety advice. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateMockAdvice = (category: string, level: number): string => {
    const baseAdvice = {
      weather: [
        "Stay indoors and avoid unnecessary travel",
        "Keep emergency supplies ready (water, food, flashlight)",
        "Monitor local weather updates regularly",
        "Secure outdoor items that could become projectiles"
      ],
      crime: [
        "Avoid walking alone, especially at night",
        "Stay in well-lit, populated areas",
        "Keep valuables out of sight",
        "Trust your instincts and report suspicious activity"
      ],
      health: [
        "Follow local health guidelines and recommendations",
        "Maintain good hygiene practices",
        "Seek medical attention if you experience symptoms",
        "Stay informed about health advisories"
      ],
      security: [
        "Remain vigilant in public spaces",
        "Report any suspicious activities to authorities",
        "Follow security protocols in your area",
        "Keep emergency contact numbers handy"
      ],
      traffic: [
        "Use alternative routes if possible",
        "Allow extra time for your journey",
        "Follow traffic updates and road closures",
        "Consider using public transportation"
      ]
    };

    const categoryAdvice = baseAdvice[category as keyof typeof baseAdvice] || baseAdvice.security;
    
    let advice = categoryAdvice.join('\n• ');
    
    if (level >= 8) {
      advice = "🚨 CRITICAL ALERT 🚨\n\n• " + advice + "\n\n• Consider evacuating the area if advised by authorities\n• Keep emergency services numbers readily available";
    } else if (level >= 6) {
      advice = "⚠️ HIGH ALERT ⚠️\n\n• " + advice + "\n\n• Stay extra vigilant and follow official guidelines";
    } else {
      advice = "ℹ️ SAFETY ADVICE ℹ️\n\n• " + advice;
    }

    return advice;
  };

  const getThreatLevelColor = (level: number): string => {
    if (level >= 8) return 'text-red-600';
    if (level >= 6) return 'text-orange-600';
    if (level >= 4) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getCategoryIcon = (category: string): string => {
    switch (category?.toLowerCase()) {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="relative max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Glassmorphism Background */}
        <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl border border-white border-opacity-20 shadow-2xl"></div>
        
        {/* Content */}
        <div className="relative bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white bg-opacity-95 backdrop-blur-sm border-b border-gray-200 p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{getCategoryIcon(threat?.category || '')}</span>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Safety Advice</h2>
                  <p className="text-sm text-gray-600">{threat?.city}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Threat Info */}
          <div className="p-6 border-b border-gray-200">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">{threat?.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{threat?.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Published: {new Date(threat?.publishedDate || '').toLocaleDateString()}
                </span>
                <span className={`font-semibold ${getThreatLevelColor(threat?.threatLevel || 0)}`}>
                  Threat Level: {threat?.threatLevel}/10
                </span>
              </div>
            </div>
          </div>

          {/* Safety Advice */}
          <div className="p-6">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">🛡️</span>
                AI-Generated Safety Recommendations
              </h3>
              
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600">Generating safety advice...</span>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
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
              ) : (
                <div className="space-y-4">
                  <div className="bg-white bg-opacity-60 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-30">
                    <pre className="whitespace-pre-wrap text-gray-700 text-sm leading-relaxed font-medium">
                      {safetyAdvice}
                    </pre>
                  </div>
                  
                  {/* Emergency Contacts */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2">Emergency Contacts</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium text-red-700">Police:</span> 100
                      </div>
                      <div>
                        <span className="font-medium text-red-700">Fire:</span> 101
                      </div>
                      <div>
                        <span className="font-medium text-red-700">Ambulance:</span> 102
                      </div>
                      <div>
                        <span className="font-medium text-red-700">Disaster:</span> 108
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white bg-opacity-95 backdrop-blur-sm border-t border-gray-200 p-6 rounded-b-2xl">
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">
                Stay safe and follow official guidelines
              </p>
              <button
                onClick={onClose}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdviceModal;