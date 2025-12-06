// components/dashboard/PlantCard.tsx

import StatusBadge from '@/components/UI/StatusBadge';

interface PlantCardProps {
  healthStatus: number;
}

export default function PlantCard({ healthStatus }: PlantCardProps) {
  const status = healthStatus === 1 ? 'Healthy' : 'Unhealthy';
  
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Plant image section */}
        <div className="w-full md:w-48 h-48 bg-linier-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center shrink-0">
          {/* Plant icon SVG */}
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M60 100C60 100 30 80 30 50C30 36.1929 41.1929 25 55 25C61.25 25 66.25 27.5 70 31.25C73.75 27.5 78.75 25 85 25C98.8071 25 110 36.1929 110 50C110 80 80 100 60 100Z"
              fill="#10B981"
            />
            <circle cx="60" cy="90" r="10" fill="#EF4444" />
            <path
              d="M60 31.25V90"
              stroke="#FBBF24"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>
        
        {/* Plant info section */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            My Garden Plant
          </h2>
          <StatusBadge status={status} />
        </div>
      </div>
    </div>
  );
}