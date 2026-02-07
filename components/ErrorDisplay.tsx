'use client';

interface ErrorDisplayProps {
  message?: string;
  onReload?: () => void;
}

export default function ErrorDisplay({ message, onReload }: ErrorDisplayProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h2 className="text-xl font-semibold text-slate-800 mb-2">
          Failed to load data
        </h2>
        <p className="text-slate-600 mb-4 text-sm">
          {message || 'An error occurred while loading data'}
        </p>
        <button
          onClick={onReload || (() => window.location.reload())}
          className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition text-sm"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}

