// lib/mockData.ts

import { SensorData } from '@/types';

/**
 * Generate realistic mock sensor data
 * Data changes slightly each time to simulate real sensors
 */
export function generateMockData(): SensorData {
  // Add some randomness for realistic simulation
  const baseData = {
    moisture: 65,
    temperature: 24,
    humidity: 55,
    healthStatus: 1,
    healthScore: 95,
  };

  // Add random variation (±5%)
  const addVariation = (value: number, range: number = 5) => {
    const variation = (Math.random() - 0.5) * range;
    return Math.max(0, Math.min(100, value + variation));
  };

  return {
    moisture: addVariation(baseData.moisture, 10),
    temperature: addVariation(baseData.temperature, 3),
    humidity: addVariation(baseData.humidity, 8),
    healthStatus: baseData.healthStatus,
    healthScore: addVariation(baseData.healthScore, 5),
    timestamp: new Date().toISOString(),
  };
}

/**
 * Simulate sending water command
 * Returns success after fake delay
 */
export async function mockSendWaterCommand(): Promise<boolean> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log('🌊 [DEMO MODE] Water command sent (simulated)');
  return true;
}

/**
 * Get mock historical data for charts (future feature)
 */
export function generateMockHistory(points: number = 10): SensorData[] {
  const history: SensorData[] = [];
  const now = Date.now();
  
  for (let i = points - 1; i >= 0; i--) {
    const timestamp = new Date(now - i * 15 * 60 * 1000); // 15 min intervals
    history.push({
      ...generateMockData(),
      timestamp: timestamp.toISOString(),
    });
  }
  
  return history;
}