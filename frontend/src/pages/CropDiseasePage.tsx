import React, { useState, useCallback } from 'react';
import { Camera } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import ImageUpload from '../components/ImageUpload';
import ResultsPanel from '../components/ResultsPanel';
import type { DiseaseResult } from '../types/disease';

const mockDisease: DiseaseResult = {
  name: 'Tomato Leaf Blight',
  crop: 'Tomato',
  condition: 'Early Blight',
  confidence: 96,
  severity: 'Moderate',
  description:
    'Early blight is a fungal disease caused by Alternaria solani. It appears as dark brown spots with concentric rings on older leaves, eventually causing yellowing and defoliation.',
  symptoms: ['Brown spots on leaves', 'Yellow leaves', 'Dry edges on leaf margins'],
  causes: ['High humidity', 'Fungal infection (Alternaria solani)', 'Poor ventilation between plants'],
  treatments: [
    'Apply copper-based fungicide (Copper oxychloride 50% WP @ 2g/L)',
    'Remove affected leaves and destroy them immediately',
    'Use Mancozeb 75% WP fungicide every 7–10 days',
  ],
  preventions: [
    'Crop rotation — avoid planting tomatoes in the same field for 2+ years',
    'Remove infected leaves promptly',
    'Avoid overwatering and ensure proper drainage',
  ],
  localRemedies: [
    'Neem Spray — 5ml neem oil per liter of water',
    'Ash Powder — sprinkle wood ash at plant base',
    'Garlic Extract — crush garlic, soak overnight, spray on leaves',
  ],
  costEffective: [
    'Homemade copper sulfate solution (0.5%) — low-cost fungicide',
    'Collect rainwater for irrigation instead of groundwater',
  ],
  treatmentTypes: {
    chemical: ['Mancozeb 75% WP', 'Copper oxychloride 50% WP', 'Chlorothalonil spray'],
    organic: ['Neem oil spray', 'Garlic extract', 'Compost tea application'],
    biological: ['Trichoderma viride bio-fungicide', 'Pseudomonas fluorescens'],
  },
  estimatedCost: {
    organic: 'Rs. 250',
    chemical: 'Rs. 950',
  },
  nearbyShops: ['ABC Agro — Kurunegala', 'Green Agro — Dambulla', 'Farmer Store — Kandy'],
};

const CropDiseasePage: React.FC = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DiseaseResult | null>(null);

  const handleImageSelected = useCallback((_file: File, preview: string) => {
    setPreviewUrl(preview);
    setResult(null);
  }, []);

  const handleAnalyze = useCallback(() => {
    if (!previewUrl) return;
    setIsAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      setResult(mockDisease);
      setIsAnalyzing(false);
    }, 2000);
  }, [previewUrl]);

  return (
    <div>
      <PageHeader
        icon={Camera}
        title="AI Crop Disease Detection"
        subtitle="Upload a photo of your crop for instant AI-powered disease identification with personalized treatment recommendations."
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[500px]">
        <ImageUpload
          onImageSelected={handleImageSelected}
          onAnalyze={handleAnalyze}
          previewUrl={previewUrl}
          isAnalyzing={isAnalyzing}
        />
        <ResultsPanel result={result} isAnalyzing={isAnalyzing} />
      </div>
    </div>
  );
};

export default CropDiseasePage;
