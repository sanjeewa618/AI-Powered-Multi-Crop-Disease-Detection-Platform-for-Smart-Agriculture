import React, { useRef } from 'react';

interface ImageUploadProps {
  onImageSelected: (file: File, preview: string) => void;
  onAnalyze: () => void;
  previewUrl: string | null;
  isAnalyzing: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected, onAnalyze, previewUrl, isAnalyzing }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      onImageSelected(file, e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <div 
        onClick={() => !previewUrl && fileInputRef.current?.click()}
        className="relative w-full aspect-[4/3] max-h-[400px] bg-[#E8F5E9] border-2 border-dashed border-green-brand/60 rounded-xl flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-green-100 transition-colors overflow-hidden"
      >
        {previewUrl ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <img
              src={previewUrl}
              alt="Uploaded leaf"
              className="w-[85%] h-[85%] object-cover rounded-xl shadow-lg border-4 border-white"
            />
            <p className="text-slate-500 text-sm font-medium">Click to change image</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-3xl shadow-sm text-green-brand">
              📷
            </div>
            <p className="text-slate-600 font-semibold text-lg">Click to browse or drop image</p>
            <p className="text-slate-400 text-sm">PNG, JPG up to 10MB</p>
          </div>
        )}
        
        {/* Invisible overlay for clicks when preview is present */}
        {previewUrl && (
           <div 
             className="absolute inset-0 cursor-pointer" 
             onClick={() => fileInputRef.current?.click()} 
           />
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleInputChange}
      />

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="btn-green flex-1 text-sm py-3"
        >
          <span className="text-lg">📷</span> Choose image
        </button>
        <button
          onClick={onAnalyze}
          disabled={!previewUrl || isAnalyzing}
          className="btn-purple flex-1 text-sm py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? (
            <><span className="animate-spin">⚙️</span> Analyzing...</>
          ) : (
            <><span className="text-lg">⚡</span> Analyze with AI</>
          )}
        </button>
      </div>

      {/* Photography Tips */}
      <div className="bg-slate-100 rounded-xl p-4 border border-slate-200/60 mt-6">
        <div className="flex items-center gap-2">
          <span className="text-blue-400 text-lg">💡</span>
          <span className="text-slate-500 text-sm font-medium">Photography Tips for Best Results</span>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
