// lib/diseaseMapping.ts

export const DISEASE_CODES = {
  0: {
    name: 'Unknown',
    severity: 'unknown' as const,
    color: '#6B7280',
    icon: '❓',
    description: 'Unable to detect disease',
  },
  1: {
    name: 'Healthy',
    severity: 'healthy' as const,
    color: '#10B981',
    icon: '✅',
    description: 'Plant is in good health',
  },
  2: {
    name: 'Bacterial Spot',
    severity: 'moderate' as const,
    color: '#F59E0B',
    icon: '🦠',
    description: 'Bacterial infection causing leaf spots',
  },
  3: {
    name: 'Early Blight',
    severity: 'moderate' as const,
    color: '#F59E0B',
    icon: '🍂',
    description: 'Fungal disease affecting lower leaves',
  },
  4: {
    name: 'Late Blight',
    severity: 'critical' as const,
    color: '#EF4444',
    icon: '⚠️',
    description: 'Serious fungal disease, act immediately',
  },
  5: {
    name: 'Leaf Mold',
    severity: 'moderate' as const,
    color: '#F59E0B',
    icon: '🍄',
    description: 'Fungal growth on leaves',
  },
  6: {
    name: 'Septoria Leaf Spot',
    severity: 'moderate' as const,
    color: '#F59E0B',
    icon: '🍃',
    description: 'Fungal disease with circular spots',
  },
  7: {
    name: 'Spider Mites',
    severity: 'moderate' as const,
    color: '#F59E0B',
    icon: '🕷️',
    description: 'Pest infestation causing leaf damage',
  },
  8: {
    name: 'Target Spot',
    severity: 'moderate' as const,
    color: '#F59E0B',
    icon: '🎯',
    description: 'Fungal disease with target-like spots',
  },
  9: {
    name: 'Yellow Leaf Curl',
    severity: 'high' as const,
    color: '#EF4444',
    icon: '🌿',
    description: 'Viral disease causing leaf curling',
  },
  10: {
    name: 'Mosaic Virus',
    severity: 'high' as const,
    color: '#EF4444',
    icon: '🦠',
    description: 'Viral infection with mosaic patterns',
  },
} as const;

export type DiseaseCode = keyof typeof DISEASE_CODES;
export type DiseaseInfo = typeof DISEASE_CODES[DiseaseCode];

export function getDiseaseInfo(code: number): DiseaseInfo {
  return DISEASE_CODES[code as DiseaseCode] || DISEASE_CODES[0];
}

export function getDiseaseName(code: number): string {
  return getDiseaseInfo(code).name;
}