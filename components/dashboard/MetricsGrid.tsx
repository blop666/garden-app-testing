// components/dashboard/MetricsGrid.tsx

import { Droplets, Thermometer, Wind, Heart } from 'lucide-react';
import MetricCard from './MetricCard';
import { SensorData } from '@/types';

interface MetricsGridProps {
  data: SensorData;
}

export default function MetricsGrid({ data }: MetricsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <MetricCard
        icon={Droplets}
        value={`${data.moisture.toFixed(0)}%`}
        label="Soil Moisture"
        color="blue"
      />
      <MetricCard
        icon={Thermometer}
        value={`${data.temperature.toFixed(0)}°C`}
        label="Temperature"
        color="orange"
      />
      <MetricCard
        icon={Wind}
        value={`${data.humidity.toFixed(0)}%`}
        label="Humidity"
        color="cyan"
      />
      <MetricCard
        icon={Heart}
        value={`${data.healthScore.toFixed(0)}`}
        label="Confident"
        color="red"
      />
    </div>
  );
}