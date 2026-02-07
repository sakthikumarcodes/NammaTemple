'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import { formatINR } from '@/lib/formatINR';

interface HomePageClientProps {
  totalCommitted: number;
  totalPaid: number;
  totalBalance: number;
  totalForecastExpenses: number;
  overallPending: number;
  overallProgress: number;
}

export default function HomePageClient({
  totalCommitted,
  totalPaid,
  totalBalance,
  totalForecastExpenses,
  overallPending,
  overallProgress,
}: HomePageClientProps) {
  const { language } = useLanguage();
  const t = (key: keyof typeof import('@/lib/translations').translations.ta) => getTranslation(language, key);

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
            {t('templeName')}
          </h1>
        </div>

        <p className="text-slate-700 mb-4 sm:mb-6 text-sm sm:text-base">
          {t('subtitle')}
        </p>

        {/* Temple Location Card */}
        <div className="max-w-4xl mx-auto mb-6 sm:mb-10">
          <div className="bg-white/95 rounded-xl shadow-sm p-3 sm:p-4 border border-amber-200/50">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-lg sm:text-xl">📍</span>
                <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
                  {t('templeAddress')}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 flex-1 min-w-0">
                {t('address')}
              </p>
              <a
                href="https://maps.app.goo.gl/GKSoeKmpZtB6iVog8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-amber-700 hover:text-amber-800 font-medium transition-colors whitespace-nowrap flex-shrink-0"
              >
                <span>🗺️</span>
                <span>{t('viewOnGoogleMaps')}</span>
                <span className="text-xs">↗</span>
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 max-w-6xl mx-auto mb-8 sm:mb-12">
          {/* 1. Expected Expenses (clickable) */}
          <Link
            href="/expenses"
            className="bg-white rounded-xl shadow-sm p-5 text-left border border-indigo-100 hover:border-indigo-300 hover:shadow-md transition"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-500 flex items-center gap-2">
              <span className="inline-flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-indigo-50 text-indigo-700 text-xs sm:text-sm">
                ₹
              </span>
              {t('expectedExpenses')}
            </p>
            <p className="mt-2 text-xl sm:text-2xl font-semibold text-indigo-700">
              ₹{formatINR(totalForecastExpenses)}
            </p>
          </Link>

          {/* 2. Committed */}
          <div className="bg-white rounded-xl shadow-sm p-5 text-left">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 flex items-center gap-2">
              <span className="inline-flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-slate-100 text-slate-700 text-xs">
                🤝
              </span>
              {t('committed')}
            </p>
            <p className="mt-2 text-xl sm:text-2xl font-semibold">
              ₹{formatINR(totalCommitted)}
            </p>
          </div>

          {/* 3. Paid (Received) */}
          <div className="bg-white rounded-xl shadow-sm p-5 text-left">
            <p className="text-xs font-semibold uppercase tracking-wide text-green-600 flex items-center gap-2">
              <span className="inline-flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-green-50 text-green-700 text-xs">
                ✔
              </span>
              {t('paid')}
            </p>
            <p className="mt-2 text-xl sm:text-2xl font-semibold text-green-700">
              ₹{formatINR(totalPaid)}
            </p>
          </div>

          {/* 4. Balance (Committed - Received) */}
          <div className="bg-white rounded-xl shadow-sm p-5 text-left">
            <p className="text-xs font-semibold uppercase tracking-wide text-red-600 flex items-center gap-2">
              <span className="inline-flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-red-50 text-red-700 text-xs">
                ⏳
              </span>
              {t('balance')}
            </p>
            <p className="mt-2 text-xl sm:text-2xl font-semibold text-red-700">
              ₹{formatINR(totalBalance)}
            </p>
            <div className="mt-3">
              <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                <span>{t('totalProgress')}</span>
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

          {/* 5. Overall Pending (from Forecast) */}
          <div className="bg-white rounded-xl shadow-sm p-5 text-left border border-red-100 hover:border-red-300 hover:shadow-md transition">
            <p className="text-xs font-semibold uppercase tracking-wide text-red-500 flex items-center gap-2">
              <span className="inline-flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-red-50 text-red-700 text-xs sm:text-sm">
                🚨
              </span>
              {t('overallPending')}
            </p>
            <p className="mt-2 text-xl sm:text-2xl font-semibold text-red-700">
              ₹{formatINR(overallPending)}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/pangali"
            className="inline-block px-6 py-3 rounded-lg bg-slate-800 text-white text-sm font-medium hover:bg-slate-900 transition"
          >
            {t('viewPangali')}
          </Link>

          <Link
            href="/expenses"
            className="inline-block px-6 py-3 rounded-lg bg-indigo-700 text-white text-sm font-medium hover:bg-indigo-800 transition"
          >
            {t('viewExpenses')}
          </Link>
        </div>

        <p className="mt-10 text-xs text-slate-600">
          {t('disclaimer')}
        </p>
      </div>
    </BackgroundWrapper>
  );
}

