import Link from 'next/link';
import { loadPangaliData } from '@/lib/loadPangaliData';
import BackgroundWrapper from '@/components/BackgroundWrapper';

export default function HomePage() {
  const data = loadPangaliData();

  const totalCommitted = data.reduce((s, d) => s + d.committed, 0);
  const totalPaid = data.reduce((s, d) => s + d.paid, 0);
  const totalBalance = totalCommitted - totalPaid;

  return (
    <BackgroundWrapper images={["/assets/temple.jpg"]}>
      <div className="px-6 py-20 text-center">
        <h1 className="text-4xl font-serif mb-3">
          🛕 ஸ்ரீ அன்னலூஞ்சல் பாப்பாத்தி அம்மன் கோயில்
        </h1>

        <p className="text-slate-700 mb-10">
          திருப்பணிகள் – நிதி நிலவரம்
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
          <div className="bg-white rounded-xl shadow-sm p-5">
            <p className="text-sm text-slate-500">உறுதி தொகை</p>
            <p className="text-2xl font-semibold">
              ₹{totalCommitted.toLocaleString()}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5">
            <p className="text-sm text-slate-500">பெறப்பட்டது</p>
            <p className="text-2xl font-semibold text-green-700">
              ₹{totalPaid.toLocaleString()}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5">
            <p className="text-sm text-slate-500">மீதம்</p>
            <p className="text-2xl font-semibold text-red-700">
              ₹{totalBalance.toLocaleString()}
            </p>
          </div>
        </div>

        <Link
          href="/pangali"
          className="inline-block px-6 py-3 rounded-lg bg-slate-800 text-white text-sm font-medium hover:bg-slate-900 transition"
        >
          பங்காளிகள் விவரம் →
        </Link>

        <p className="mt-10 text-xs text-slate-600">
          *இந்தப் பக்கம் தகவல் வெளிப்படைத்தன்மைக்காக மட்டுமே*
        </p>
      </div>
    </BackgroundWrapper>
  );
}
