// components/dashboard/RecommendationsCard.tsx

import { Lightbulb } from 'lucide-react';
import { Recommendation } from '@/types';

interface RecommendationsCardProps {
  recommendations: Recommendation;
}

export default function RecommendationsCard({ recommendations }: RecommendationsCardProps) {
  const bgColorClass = {
    green: 'bg-green-50 border-green-300',
    orange: 'bg-orange-50 border-orange-300',
    red: 'bg-red-50 border-red-300',
  }[recommendations.statusColor];

  const textColorClass = {
    green: 'text-green-600',
    orange: 'text-orange-600',
    red: 'text-red-600',
  }[recommendations.statusColor];

  return (
    <div className={`rounded-3xl shadow-2xl p-8 mb-6 border-2 ${bgColorClass}`}>
      <div className="flex items-start gap-4 mb-6">
        <Lightbulb className={`w-8 h-8 flex-shrink-0 ${textColorClass}`} />
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Smart Recommendations
          </h3>
          <p className={`font-semibold ${textColorClass}`}>
            Overall Status: {recommendations.overallStatus}
          </p>
        </div>
      </div>
      <ul className="space-y-3">
        {recommendations.recommendations.map((rec, index) => (
          <li key={index} className="flex items-start gap-3 text-gray-700">
            <span className="font-bold text-lg shrink-0">•</span>
            <span className="text-base leading-relaxed">{rec}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}