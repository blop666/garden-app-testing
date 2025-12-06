// components/layout/Header.tsx

'use client';

import { RefreshCw } from 'lucide-react';

interface HeaderProps {
  lastUpdate: string;
  onRefresh: () => void;
}

export default function Header({ lastUpdate, onRefresh }: HeaderProps) {
  return (
    <header className="mb-8">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3 mb-2">
            {/* Plant icon */}
            {/* <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 40C24 40 12 32 12 20C12 14.4772 16.4772 10 22 10C24.5 10 26.5 11 28 12.5C29.5 11 31.5 10 34 10C39.5228 10 44 14.4772 44 20C44 32 32 40 24 40Z"
                fill="#4ADE80"
              />
              <circle cx="24" cy="36" r="4" fill="#EF4444" />
              <path
                d="M24 12.5V36"
                stroke="#FCD34D"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg> */}
            <h1 className="text-5xl font-bold text-white">Smart Garden</h1>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <p className="text-sm">Updated: {lastUpdate}</p>
          </div>
        </div>
        <button
          onClick={onRefresh}
          className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all duration-200 hover:scale-110"
          aria-label="Refresh"
        >
          <RefreshCw className="w-6 h-6 text-white" />
        </button>
      </div>
    </header>
  );
}