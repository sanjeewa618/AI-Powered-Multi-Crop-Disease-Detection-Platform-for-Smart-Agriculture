import React, { useEffect, useRef, useState } from 'react';
import { Camera, Lightbulb, Loader2, ScanLine, Upload, Zap } from 'lucide-react';

interface ImageUploadProps {
  onImageSelected: (file: File, preview: string) => void;
  onAnalyze: () => void;
  previewUrl: string | null;
  isAnalyzing: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected, onAnalyze, previewUrl, isAnalyzing }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [mode, setMode] = useState<'upload' | 'camera'>('upload');
  const [cameraError, setCameraError] = useState<string | null>(null);

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  const dataURLToBlob = (dataUrl: string) => {
    const [header, data] = dataUrl.split(',');
    const mime = header.match(/:(.*?);/)?.[1] || 'image/jpeg';
    const byteString = atob(data);
    const arrayBuffer = new Uint8Array(byteString.length);

    for (let i = 0; i < byteString.length; i += 1) {
      arrayBuffer[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mime });
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      onImageSelected(file, e.target?.result as string);
      setMode('upload');
      stopCamera();
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const startCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError('Camera access is not available on this browser.');
      return;
    }

    try {
      setCameraError(null);
      setMode('camera');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch {
      setCameraError('Unable to access the camera. Please allow camera permission and try again.');
      setMode('upload');
    }
  };

  const handleCapture = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg');
    const blob = dataURLToBlob(dataUrl);
    const file = new File([blob], 'captured-leaf.jpg', { type: 'image/jpeg' });

    onImageSelected(file, dataUrl);
    stopCamera();
    setMode('upload');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            stopCamera();
            setMode('upload');
          }}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            mode === 'upload' ? 'bg-green-brand text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Upload className="mr-2 inline h-4 w-4" /> Upload Image
        </button>
        <button
          type="button"
          onClick={() => startCamera()}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            mode === 'camera' ? 'bg-green-brand text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Camera className="mr-2 inline h-4 w-4" /> Open Camera
        </button>
      </div>

      <div
        onClick={() => !previewUrl && mode === 'upload' && fileInputRef.current?.click()}
        className="relative w-full aspect-[4/3] max-h-[400px] bg-[#E8F5E9] border-2 border-dashed border-green-brand/60 rounded-xl flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-green-100 transition-colors overflow-hidden"
      >
        {previewUrl ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <img
              src={previewUrl}
              alt="Leaf preview"
              className="w-[85%] h-[85%] object-cover rounded-xl shadow-lg border-4 border-white"
            />
            <p className="text-slate-500 text-sm font-medium">Tap to change the image</p>
          </div>
        ) : mode === 'camera' ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3">
            <video
              ref={videoRef}
              className="w-full h-full object-cover rounded-xl"
              autoPlay
              muted
              playsInline
            />
            <div className="absolute bottom-4 flex gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCapture();
                }}
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-md"
              >
                <ScanLine className="mr-2 inline h-4 w-4" /> Capture Photo
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm text-green-brand">
              <Camera className="w-8 h-8" strokeWidth={1.75} />
            </div>
            <p className="text-slate-600 font-semibold text-lg">Upload a leaf image or use your camera</p>
            <p className="text-slate-400 text-sm">PNG, JPG up to 10MB · Live camera capture supported</p>
          </div>
        )}

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

      {cameraError && <p className="text-sm text-red-500">{cameraError}</p>}

      <div className="flex gap-4">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="btn-green flex-1 text-sm py-3"
        >
          <Upload className="w-5 h-5" /> Choose image
        </button>
        <button
          onClick={onAnalyze}
          disabled={!previewUrl || isAnalyzing}
          className="btn-purple flex-1 text-sm py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Analyzing...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" fill="currentColor" strokeWidth={0} /> Analyze with AI
            </>
          )}
        </button>
      </div>

      <div className="bg-slate-100 rounded-xl p-4 border border-slate-200/60 mt-6">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-blue-400" />
          <span className="text-slate-500 text-sm font-medium">Photography Tips for Best Results</span>
        </div>
        <ul className="mt-3 space-y-2 text-sm text-slate-500">
          <li>• Place the leaf flat against a plain background.</li>
          <li>• Keep the leaf well lit and avoid shadows.</li>
          <li>• Capture the full leaf and its edges clearly.</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageUpload;
