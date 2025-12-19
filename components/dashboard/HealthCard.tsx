// components/dashboard/HealthCard.tsx (NEW COMPONENT)

import { getDiseaseInfo } from '@/lib/diseaseMap';

interface HealthCardProps {
  healthStatus: number;
  healthScore: number;
  diseaseCode: number;
}

export default function HealthCard({ healthStatus, healthScore, diseaseCode }: HealthCardProps) {
  const diseaseInfo = getDiseaseInfo(diseaseCode);
  
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
      <h3 className="text-2xl font-bold mb-4">🔍 Health Detection</h3>
      
      {/* Disease Info */}
      <div className={`p-6 rounded-2xl mb-4 ${
        diseaseInfo.severity === 'healthy' ? 'bg-green-50 border-2 border-green-500' :
        diseaseInfo.severity === 'critical' ? 'bg-red-50 border-2 border-red-500' :
        'bg-orange-50 border-2 border-orange-500'
      }`}>
        <div className="flex items-center gap-4 mb-3">
          <span className="text-5xl">{diseaseInfo.icon}</span>
          <div>
            <h4 className="text-xl font-bold" style={{ color: diseaseInfo.color }}>
              {diseaseInfo.name}
            </h4>
            <p className="text-sm text-gray-600">{diseaseInfo.description}</p>
          </div>
        </div>
        
        {/* Health Score Bar */}
        <div className="mt-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Health Score</span>
            <span className="text-sm font-bold">{healthScore}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className={`h-4 rounded-full transition-all duration-500 ${
                healthScore >= 80 ? 'bg-green-500' :
                healthScore >= 50 ? 'bg-orange-500' :
                'bg-red-500'
              }`}
              style={{ width: `${healthScore}%` }}
            />
          </div>
        </div>
      </div>
      
      {/* Detection Timestamp */}
      <p className="text-sm text-gray-500 text-center">
        Last detected: Just now
      </p>
    </div>
  );
}