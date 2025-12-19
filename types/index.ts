
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
  diseaseInfo: typeof DISEASE_CODES[number];
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


// For AI in bottom

export type MessageRole = "user" | "model"

export interface MessagePart {
  text: string
}

export interface Message {
  role: MessageRole;
  parts: MessagePart[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ChatHistory extends Array<Message>{};

export interface GerationConfig {
    temperature: number;
    topP: number;
    responseMimeType: string;
}

export interface ChatSettings {
  temperature: number;
  model: string;
  systemInstruction: string;
}