// lib/recommendations.ts

import { SensorData, Recommendation } from '@/types';

export function generateRecommendations(data: SensorData): Recommendation {
  const recs: string[] = [];
  let urgency: 'normal' | 'warning' | 'critical' = 'normal';
  let overallStatus = 'Good';
  let statusColor: 'green' | 'orange' | 'red' = 'green';

  // Critical conditions
  if (data.moisture < 20) {
    recs.push('🚨 URGENT: Soil is extremely dry! Water immediately.');
    urgency = 'critical';
    overallStatus = 'Critical';
    statusColor = 'red';
  } else if (data.moisture < 40) {
    recs.push('⚠️ Soil moisture is low. Consider watering soon.');
    if (urgency !== 'critical') urgency = 'warning';
  }

  if (data.temperature > 35) {
    recs.push('🌡️ Temperature is too high! Move plant to cooler location.');
    if (urgency !== 'critical') urgency = 'warning';
    statusColor = 'orange';
  } else if (data.temperature < 15) {
    recs.push('❄️ Temperature is too low. Move plant to warmer location.');
    if (urgency !== 'critical') urgency = 'warning';
  }

  if (data.humidity < 30) {
    recs.push('💨 Air is too dry. Consider misting leaves.');
  } else if (data.humidity > 80) {
    recs.push('💧 Humidity is very high. Ensure good air circulation.');
  }

  if (data.healthStatus === 0 || data.healthScore < 60) {
    recs.push('🍃 Plant health is poor. Check for diseased leaves.');
    if (urgency !== 'critical') urgency = 'warning';
    overallStatus = 'Unhealthy';
    statusColor = 'orange';
  }

  // Perfect conditions
  if (
    data.moisture >= 50 && data.moisture <= 70 &&
    data.temperature >= 20 && data.temperature <= 30 &&
    data.healthScore >= 80
  ) {
    recs.push('✅ Perfect conditions! Your plant is thriving.');
    overallStatus = 'Excellent';
    statusColor = 'green';
  }

  if (recs.length === 0) {
    recs.push('✅ All conditions are normal. Continue current care routine.');
  }

  return { recommendations: recs, urgency, overallStatus, statusColor };
}