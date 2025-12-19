// lib/thingspeak.ts

import { SensorData } from '@/types';
import { generateMockData, mockSendWaterCommand } from './mockData';

const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

const config = {
  channelId: process.env.NEXT_PUBLIC_THINGSPEAK_CHANNEL_ID || '',
  readApiKey: process.env.NEXT_PUBLIC_THINGSPEAK_READ_API_KEY || '',
  writeApiKey: process.env.NEXT_PUBLIC_THINGSPEAK_WRITE_API_KEY || '',
};

/**
 * Get latest sensor data
 * Returns mock data if in demo mode, otherwise calls ThingSpeak API
 */
export async function getLatestData(): Promise<SensorData | null> {
  // DEMO MODE: Return mock data
  if (DEMO_MODE) {
    console.log('🎭 [DEMO MODE] Using mock data');
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return generateMockData();
  }

  // PRODUCTION MODE: Call real API
  try {
    const url = `https://api.thingspeak.com/channels/${config.channelId}/feeds/last.json?api_key=${config.readApiKey}`;
    const response = await fetch(url, { cache: 'no-store' });
    
    if (!response.ok) {
      console.error('ThingSpeak API error:', response.status);
      return null;
    }
    
    const data = await response.json();
    
    return {
      moisture: parseFloat(data.field6 || '0'),
      temperature: parseFloat(data.field7 || '0'),
      humidity: parseFloat(data.field8 || '0'),
      healthStatus: parseInt(data.field5 || '0'),
      healthScore: parseFloat(data.field2 || '0'),
      diseaseCode: parseInt(data.field1 || '0'),
      timestamp: data.created_at || '',
    };
  } catch (error) {
    console.error('Error fetching ThingSpeak data:', error);
    return null;
  }
}

/**
 * Send water command
 * Simulates command if in demo mode, otherwise calls ThingSpeak API
 */
export async function sendWaterCommand(): Promise<boolean> {
  // DEMO MODE: Simulate command
  if (DEMO_MODE) {
    return mockSendWaterCommand();
  }

  // PRODUCTION MODE: Send real command
  try {
    const url = `https://api.thingspeak.com/update?api_key=${config.writeApiKey}&field6=1`;
    const response = await fetch(url);
    return response.ok;
  } catch (error) {
    console.error('Error sending water command:', error);
    return false;
  }
}

/**
 * Check if currently in demo mode
 */
export function isDemoMode(): boolean {
  return DEMO_MODE;
}