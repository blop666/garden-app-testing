// components/dashboard/MetricCard.tsx

import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  color: 'blue' | 'orange' | 'cyan' | 'red';
}

export default function MetricCard({ icon: Icon, value, label, color }: MetricCardProps) {
  const colorClasses = {
    blue: 'text-blue-500',
    orange: 'text-orange-500',
    cyan: 'text-cyan-500',
    red: 'text-red-500',
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200">
      <Icon className={`w-12 h-12 mb-4 ${colorClasses[color]}`} strokeWidth={2} />
      <div className={`text-4xl font-bold mb-2 ${colorClasses[color]}`}>
        {value}
      </div>
      <div className="text-gray-600 text-sm font-medium">
        {label}
      </div>
    </div>
  );
}