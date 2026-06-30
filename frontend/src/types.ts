export interface DiseaseResult {
  name: string;
  crop: string;
  condition: string;
  confidence: number;
  severity: 'Low' | 'Moderate' | 'High' | 'Critical';
  description: string;
  treatments: string[];
  preventions: string[];
  localRemedies: string[];
  costEffective: string[];
}
