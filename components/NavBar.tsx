import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="w-full border-b border-amber-300/30 shadow-md">
      <div 
        className="w-full bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800"
        style={{
          backgroundImage: 'linear-gradient(135deg, #d97706 0%, #b45309 25%, #92400e 50%, #78350f 75%, #92400e 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            href="/" 
            className="text-lg font-serif font-bold text-white hover:text-amber-100 transition-colors"
          >
            🛕 ஸ்ரீ அன்னலூஞ்சல் பாப்பாத்தி அம்மன் கோயில்
          </Link>

          <nav className="flex gap-6 text-sm font-semibold">
            <Link 
              href="/" 
              className="text-white hover:text-amber-100 transition-colors border-b-2 border-transparent hover:border-amber-200 pb-1"
            >
              Home
            </Link>
            <Link 
              href="/pangali" 
              className="text-white hover:text-amber-100 transition-colors border-b-2 border-transparent hover:border-amber-200 pb-1"
            >
              Pangali
            </Link>
            <Link href="/analytics" className="hover:text-slate-900">
                Analytics
            </Link>

          </nav>
        </div>
      </div>
    </header>
  );
}
