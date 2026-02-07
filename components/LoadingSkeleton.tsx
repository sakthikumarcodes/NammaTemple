export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen p-3 sm:p-5 animate-pulse">
      <div className="max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="h-8 bg-slate-200 rounded-lg w-64 mb-6"></div>
        
        {/* Tiles skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-8">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-5">
              <div className="h-4 bg-slate-200 rounded w-24 mb-3"></div>
              <div className="h-8 bg-slate-200 rounded w-32"></div>
            </div>
          ))}
        </div>

        {/* Content skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-5">
              <div className="h-6 bg-slate-200 rounded w-48 mb-4"></div>
              <div className="h-48 bg-slate-100 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

