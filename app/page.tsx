// app/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { getLatestData, isDemoMode } from '@/lib/thingspeak';
import { generateRecommendations } from '@/lib/recommendation';
import { formatTimestamp } from '@/lib/utils';
import { SensorData, Recommendation } from '@/types';
import { getDiseaseInfo } from '../lib/diseaseMap';


import LoadingSpinner from '@/components/UI/LoadingSpinner';
import DemoBanner from '@/components/UI/DemoBanner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PlantCard from '@/components/dashboard/PlantCard';
import MetricsGrid from '@/components/dashboard/MetricsGrid';
import RecommendationsCard from '@/components/dashboard/RecomendationCard';
// import WaterButton from '@/components/dashboard/WaterButton';

export default function Dashboard() {
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation | null>(null);
  const [lastUpdate, setLastUpdate] = useState('Loading...');
  const [isLoading, setIsLoading] = useState(true);
  const [demoMode, setDemoMode] = useState(false);

  const fetchData = async () => {
    const data = await getLatestData();
    
    if (data) {
      setSensorData(data);
      setLastUpdate(formatTimestamp(data.timestamp));
      const diseaseInfo = getDiseaseInfo(data.diseaseCode || 0);

      
      const recs = generateRecommendations(data);
      setRecommendations(recs);
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    // Check if demo mode is active
    setDemoMode(typeof window !== 'undefined' && 
                process.env.NEXT_PUBLIC_DEMO_MODE === 'true');;
    
    // Fetch initial data
    fetchData();
    
    // Auto-refresh every 15 seconds
    const interval = setInterval(fetchData, 15000);
    
    return () => clearInterval(interval);
  }, []);

  if (isLoading || !sensorData || !recommendations) {
    return <LoadingSpinner />;
  }
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400/50 to-green-500 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Header lastUpdate={lastUpdate} onRefresh={fetchData} />
        
        
        {/* Show demo banner if in demo mode */}
        {demoMode && <DemoBanner />}
        
        <PlantCard healthStatus={sensorData.healthStatus} />
        
        <MetricsGrid data={sensorData} />
        
        <RecommendationsCard recommendations={recommendations} sensorData={sensorData} />
        
        {/* <WaterButton onWaterSuccess={fetchData} /> */}
        
        <Footer />
      </div>
      
    </div>
  );
}