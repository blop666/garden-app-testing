
import { Check } from 'lucide-react';

interface StatusBadgeProps {
  status: 'Healthy' | 'Unhealthy';
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const isHealthy = status === 'Healthy';
  
  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold ${
        isHealthy
          ? 'bg-green-500 text-white'
          : 'bg-orange-500 text-white'
      }`}
    >
      {isHealthy && <Check className="w-5 h-5" />}
      {status}
    </div>
  );
}