export interface DiseaseResult {
  name: string;
  crop: string;
  condition: string;
  confidence: number;
  severity: 'Low' | 'Moderate' | 'High' | 'Critical';
  description: string;
  symptoms: string[];
  causes: string[];
  treatments: string[];
  preventions: string[];
  localRemedies: string[];
  costEffective: string[];
  treatmentTypes: {
    chemical: string[];
    organic: string[];
    biological: string[];
  };
  estimatedCost: {
    organic: string;
    chemical: string;
  };
  nearbyShops: string[];
}

export interface ScanHistoryItem {
  id: string;
  imageUrl: string;
  crop: string;
  disease: string;
  confidence: number;
  date: string;
  status: 'Healthy' | 'Diseased' | 'Pending';
}
