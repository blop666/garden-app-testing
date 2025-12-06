// components/ui/DemoBanner.tsx

import { AlertCircle } from 'lucide-react';

export default function DemoBanner() {
  return (
    <div className="bg-yellow-400 text-yellow-900 px-4 py-3 rounded-lg shadow-lg mb-6 flex items-center gap-3">
      <AlertCircle className="w-5 h-5 shrink-0" />
      <div className="flex-1">
        <p className="font-semibold">
           Demo Mode Active
        </p>
        <p className="text-sm">
          Your viewing simulated data. Connect ThingSpeak API for real sensor readings.
        </p>
      </div>
    </div>
  );
}