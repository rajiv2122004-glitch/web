import React, { useState, useRef } from 'react';
import { usePortrait } from '../context/PortraitContext';
import { X, Upload, RotateCcw, Check, Image as ImageIcon } from 'lucide-react';

interface PhotoUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhotoUploaderModal: React.FC<PhotoUploaderModalProps> = ({ isOpen, onClose }) => {
  const { portraitUrl, setCustomPortrait, resetPortrait, isCustomPhoto } = usePortrait();
  const [urlInput, setUrlInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, or WebP).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setError('File is too large. Please select an image under 8MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setCustomPortrait(reader.result);
        setSuccess('Portrait updated successfully!');
        setError(null);
        setTimeout(() => setSuccess(null), 3000);
      }
    };
    reader.onerror = () => {
      setError('Failed to read image file.');
    };
    reader.readAsDataURL(file);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    try {
      new URL(urlInput);
      setCustomPortrait(urlInput.trim());
      setSuccess('Portrait updated from URL!');
      setUrlInput('');
      setError(null);
      setTimeout(() => setSuccess(null), 3000);
    } catch {
      setError('Please enter a valid URL.');
    }
  };

  const handleReset = () => {
    resetPortrait();
    setSuccess('Restored official portrait.');
    setError(null);
    setTimeout(() => setSuccess(null), 3000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg p-6 rounded-2xl bg-[#0b1220] border border-cyan-500/20 shadow-2xl text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 id="modal-title" className="text-lg font-semibold text-white">
              Portrait Identity Manager
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Customize or update Rajiv's official portrait across the website
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Preview */}
        <div className="flex items-center gap-4 py-4 border-b border-slate-800/80">
          <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-slate-900 border border-cyan-500/30 shrink-0">
            <img
              src={portraitUrl}
              alt="Active preview"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-slate-300">
              {isCustomPhoto ? 'Custom Uploaded Portrait' : 'Default Official Studio Portrait'}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5 truncate">
              {isCustomPhoto
                ? 'Persisted in your local browser storage'
                : 'Preserving natural appearance & styling'}
            </p>
            {isCustomPhoto && (
              <button
                onClick={handleReset}
                className="mt-2 inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset to default portrait
              </button>
            )}
          </div>
        </div>

        {/* Upload Options */}
        <div className="space-y-4 pt-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Upload from your computer
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/png, image/jpeg, image/webp"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-dashed border-cyan-500/40 hover:border-cyan-400 bg-cyan-950/20 hover:bg-cyan-950/40 text-cyan-200 text-xs font-medium transition-all"
            >
              <Upload className="w-4 h-4 text-cyan-400" />
              Choose Image File (JPG, PNG, WebP)
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800"></div>
            </div>
            <span className="relative px-3 text-[11px] text-slate-400 bg-[#0b1220] uppercase tracking-wider">
              or load via image URL
            </span>
          </div>

          <form onSubmit={handleUrlSubmit} className="flex gap-2">
            <input
              type="url"
              placeholder="https://example.com/rajiv-photo.jpg"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              className="px-4 py-2 text-xs font-medium rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white transition-colors"
            >
              Apply
            </button>
          </form>

          {error && (
            <p className="text-xs text-rose-400 bg-rose-950/30 border border-rose-900/40 p-2.5 rounded-lg">
              {error}
            </p>
          )}

          {success && (
            <p className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/30 border border-emerald-900/40 p-2.5 rounded-lg">
              <Check className="w-4 h-4" />
              {success}
            </p>
          )}
        </div>

        {/* Developer / Deployment Note */}
        <div className="mt-5 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
          <span className="text-cyan-300 font-medium">Permanent Customization Tip:</span> You can also drop your photo file into <code className="text-slate-200 bg-slate-800 px-1 py-0.5 rounded">/public/assets/portrait.jpg</code> and set it in <code className="text-slate-200 bg-slate-800 px-1 py-0.5 rounded">src/data/portfolioData.ts</code>.
        </div>
      </div>
    </div>
  );
};
