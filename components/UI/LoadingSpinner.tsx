// components/ui/LoadingSpinner.tsx

import { Loader2 } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
      <div className="text-white text-center">
        <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4" />
        <p className="text-xl font-semibold">Loading Smart Garden...</p>
      </div>
    </div>
  );
}