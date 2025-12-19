
export interface SensorData {
  moisture: number;
  temperature: number;
  humidity: number;
  healthStatus: number; // 0 = unhealthy, 1 = healthy
  healthScore: number;
  diseaseCode: number;  
  timestamp: string;
}

export interface SensorDataWithDisease extends SensorData {
  diseaseName: string;
}

export interface Recommendation {
  recommendations: string[];
  urgency: 'normal' | 'warning' | 'critical';
  overallStatus: string;
  statusColor: 'green' | 'orange' | 'red';
}

export interface ThingSpeakConfig {
  channelId: string;
  readApiKey: string;
  writeApiKey: string;
}



