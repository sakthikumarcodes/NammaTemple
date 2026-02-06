export default function Footer() {
    const year = new Date().getFullYear();
  
    return (
      <footer className="mt-16 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-slate-600 space-y-2">
          <p className="font-medium text-slate-800">
            🛕 ஸ்ரீ அன்னலூஞ்சல் பாப்பாத்தி அம்மன் கோயில்
          </p>
  
          <p>
          இந்தப் பக்கம் நம் உறவினர்களுக்காக மட்டுமே. வெளியில் பகிர வேண்டாம். 🙏
          
          </p>
  
          <p className="text-xs text-slate-500">
            © {year} • இந்தப் பக்கம் தகவல் நோக்கத்திற்காக மட்டும்
          </p>
        </div>
      </footer>
    );
  }
  