import Link from 'next/link';
import Image from 'next/image';
import { loadExpensesData, loadPangaliData } from '@/lib/loadPangaliData';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import { formatINR } from '@/lib/formatINR';

export default async function HomePage() {
  const [data, expenses] = await Promise.all([loadPangaliData(), loadExpensesData()]);

  const totalCommitted = data.reduce((s, d) => s + d.committed, 0);
  const totalPaid = data.reduce((s, d) => s + d.paid, 0);
  const totalBalance = totalCommitted - totalPaid; // Pending from committed
  const totalForecastExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const overallPending = totalForecastExpenses - totalPaid; // Overall pending: Forecast - Paid
  const overallProgress = totalForecastExpenses ? Math.min(1, totalPaid / totalForecastExpenses) : 0;

  return (
    <BackgroundWrapper images={["/assets/temple.jpg"]}>
      <div className="px-4 sm:px-6 py-12 sm:py-20 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-3">
          <div className="relative h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0">
            <Image
              src="/assets/TempleIcon.png"
              alt="Temple Icon"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif">
            ஸ்ரீ அன்னலூஞ்சல் பாப்பாத்தி அம்மன் கோயில்
          </h1>
        </div>

        <p className="text-slate-700 mb-6 sm:mb-10 text-sm sm:text-base">
          திருப்பணிகள் – நிதி நிலவரம்
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 max-w-6xl mx-auto mb-8 sm:mb-12">
          {/* Forecast tile (clickable) */}
          <Link
            href="/expenses"
            className="bg-white rounded-xl shadow-sm p-5 text-left border border-indigo-100 hover:border-indigo-300 hover:shadow-md transition"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500 flex items-center gap-2">
              <span className="inline-flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-indigo-50 text-indigo-700 text-xs sm:text-sm">
                ₹
              </span>
              எதிர்பார்க்கும் செலவு
            </p>
            <p className="mt-2 text-xl sm:text-2xl font-semibold text-indigo-700">
              ₹{formatINR(totalForecastExpenses)}
            </p>
          </Link>

          {/* Committed */}
          <div className="bg-white rounded-xl shadow-sm p-5 text-left">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 flex items-center gap-2">
              <span className="inline-flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-slate-100 text-slate-700 text-xs">
                🤝
              </span>
              உறுதி தொகை
            </p>
            <p className="mt-2 text-xl sm:text-2xl font-semibold">
              ₹{formatINR(totalCommitted)}
            </p>
          </div>

          {/* Paid */}
          <div className="bg-white rounded-xl shadow-sm p-5 text-left">
            <p className="text-xs font-semibold uppercase tracking-wide text-green-600 flex items-center gap-2">
              <span className="inline-flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-green-50 text-green-700 text-xs">
                ✔
              </span>
              பெறப்பட்டது
            </p>
            <p className="mt-2 text-xl sm:text-2xl font-semibold text-green-700">
              ₹{formatINR(totalPaid)}
            </p>
          </div>

          {/* Balance (from committed) */}
          <div className="bg-white rounded-xl shadow-sm p-5 text-left">
            <p className="text-xs font-semibold uppercase tracking-wide text-red-600 flex items-center gap-2">
              <span className="inline-flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-red-50 text-red-700 text-xs">
                ⏳
              </span>
              மீதம் (உறுதி)
            </p>
            <p className="mt-2 text-xl sm:text-2xl font-semibold text-red-700">
              ₹{formatINR(totalBalance)}
            </p>
          </div>

          {/* Overall Pending (from forecast) */}
          <div className="bg-white rounded-xl shadow-sm p-5 text-left border border-orange-200">
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-600 flex items-center gap-2">
              <span className="inline-flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-orange-50 text-orange-700 text-xs">
                📊
              </span>
              மொத்த மீதம்
            </p>
            <p className="mt-2 text-xl sm:text-2xl font-semibold text-orange-700">
              ₹{formatINR(overallPending)}
            </p>
            <div className="mt-3">
              <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                <span>மொத்த முன்னேற்றம்</span>
                <span>{Math.round(overallProgress * 100)}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-green-500 via-yellow-400 to-red-500"
                  style={{ width: `${overallProgress * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <Link
          href="/pangali"
          className="inline-block px-6 py-3 rounded-lg bg-slate-800 text-white text-sm font-medium hover:bg-slate-900 transition"
        >
          பங்காளிகள் விவரம் →
        </Link>

        <div className="mt-4">
          <Link
            href="/expenses"
            className="inline-block px-6 py-3 rounded-lg bg-indigo-700 text-white text-sm font-medium hover:bg-indigo-800 transition"
          >
            செலவு விவரம் →
          </Link>
        </div>

        <p className="mt-10 text-xs text-slate-600">
        இந்தப் பக்கம் நம் உறவினர்களுக்காக மட்டுமே. வெளியில் பகிர வேண்டாம். 🙏        </p>
      </div>
    </BackgroundWrapper>
  );
}
