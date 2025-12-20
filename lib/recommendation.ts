// lib/recommendations.ts

import { SensorData, Recommendation } from '@/types';
import { getDiseaseInfo, type DiseaseInfo } from './diseaseMap';

export function generateRecommendations(data: SensorData, diseaseInfo?: DiseaseInfo): Recommendation {
  const recs: string[] = [];
  let urgency: 'normal' | 'warning' | 'critical' = 'normal';
  let overallStatus = 'Good';
  let statusColor: 'green' | 'orange' | 'red' = 'green';

   if (!diseaseInfo && data.diseaseCode !== undefined) {
    diseaseInfo = getDiseaseInfo(data.diseaseCode);
  }

    if (diseaseInfo) {
    switch(diseaseInfo.name) {
      case 'Healthy':
        recs.push('✅ Your plant is healthy! Continue current care routine.');
        break;
        
      // case 'Bacterial Spot':
      //   recs.push('🦠 Bacterial spot detected!');
      //   recs.push('✂️ Remove infected leaves immediately and dispose of them.');
      //   recs.push('💊 Apply copper-based bactericide every 7-10 days.');
      //   recs.push('💧 Water at soil level - avoid wetting leaves.');
      //   urgency = 'warning';
      //   overallStatus = 'Needs Treatment';
      //   statusColor = 'orange';
      //   break;
        
      // case 'Early Blight':
      //   recs.push('🍂 Early blight detected!');
      //   recs.push('🌱 Remove lower leaves that show symptoms.');
      //   recs.push('💨 Improve air circulation around the plant.');
      //   recs.push('💊 Apply organic fungicide (neem oil or copper spray).');
      //   recs.push('🚫 Avoid overhead watering.');
      //   urgency = 'warning';
      //   overallStatus = 'Needs Treatment';
      //   statusColor = 'orange';
      //   break;
        
      case 'Late Blight':
        recs.push('⚠️ LATE BLIGHT - SERIOUS DISEASE!');
        recs.push('🔥 Remove and destroy ALL infected plants immediately!');
        recs.push('💊 Apply fungicide to nearby healthy plants.');
        recs.push('🚨 Isolate affected area - highly contagious!');
        recs.push('📞 Consider consulting agricultural expert.');
        urgency = 'critical';
        overallStatus = 'Critical - Act Now!';
        statusColor = 'red';
        break;
        
      case 'Leaf Mold':
        recs.push('🍄 Leaf mold detected!');
        recs.push('💨 Increase ventilation - improve air flow.');
        recs.push('💧 Reduce humidity around the plant.');
        recs.push('✂️ Remove affected leaves from bottom up.');
        recs.push('💊 Apply fungicide if spreading.');
        urgency = 'warning';
        overallStatus = 'Needs Treatment';
        statusColor = 'orange';
        break;
        
      case 'Septoria Leaf Spot':
        recs.push('🍃 Septoria leaf spot detected!');
        recs.push('✂️ Prune infected leaves, starting from bottom.');
        recs.push('🚫 Avoid wetting leaves when watering.');
        recs.push('🌱 Add mulch to prevent soil splash.');
        recs.push('💊 Apply fungicide every 7-14 days.');
        urgency = 'warning';
        statusColor = 'orange';
        break;
        
      // case 'Spider Mites':
      //   recs.push('🕷️ Spider mites infestation detected!');
      //   recs.push('💦 Spray leaves with strong water jet daily.');
      //   recs.push('🧴 Apply insecticidal soap or neem oil.');
      //   recs.push('💨 Increase humidity - mites prefer dry conditions.');
      //   recs.push('👀 Check underside of leaves regularly.');
      //   urgency = 'warning';
      //   statusColor = 'orange';
      //   break;
        
      // case 'Target Spot':
      //   recs.push('🎯 Target spot detected!');
      //   recs.push('✂️ Remove and destroy infected leaves.');
      //   recs.push('💊 Apply copper-based fungicide.');
      //   recs.push('🌱 Maintain good plant spacing for air circulation.');
      //   urgency = 'warning';
      //   statusColor = 'orange';
      //   break;
        
      // case 'Yellow Leaf Curl':
      //   recs.push('🌿 Yellow leaf curl virus detected!');
      //   recs.push('🦟 Control whiteflies - they spread this virus.');
      //   recs.push('🚨 Remove severely infected plants.');
      //   recs.push('🛡️ Use insect-proof netting to prevent spread.');
      //   recs.push('⚠️ No cure available - focus on prevention.');
      //   urgency = 'critical';
      //   statusColor = 'red';
      //   break;
        
      // case 'Mosaic Virus':
      //   recs.push('🦠 Mosaic virus detected!');
      //   recs.push('✂️ Remove infected plants immediately.');
      //   recs.push('🧼 Sanitize tools after each use.');
      //   recs.push('🚫 Do not compost infected plants.');
      //   recs.push('🛡️ Control aphids - they spread this virus.');
      //   urgency = 'critical';
      //   statusColor = 'red';
      //   break;
    }
  }

  // Critical conditions
  if (data.moisture < 20) {
    recs.push('🚨 URGENT: Soil is extremely dry! Water immediately.');
    urgency = 'critical';
    overallStatus = 'Critical';
    statusColor = 'red';
  } else if (data.moisture < 40) {
    recs.push('⚠️ Soil moisture is low. Consider watering soon.');
    // if (urgency !== 'critical') urgency = 'normal';
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
    recs.push('Perfect conditions! Your plant is thriving.');
    overallStatus = 'Excellent';
    statusColor = 'green';
  }

  if (recs.length === 0) {
    recs.push('All conditions are normal. Continue current care routine.');
  }

  return { recommendations: recs, urgency, overallStatus, statusColor };
}