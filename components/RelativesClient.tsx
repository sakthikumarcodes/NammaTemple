'use client';

import { useState, useMemo } from 'react';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import type { Relative } from '@/lib/loadPangaliData';
import { formatINR } from '@/lib/formatINR';
import { useTranslation } from '@/hooks/useTranslation';

type SortOption = 'name' | 'forecast' | 'given' | 'remaining';

export default function RelativesClient({ data }: { data: Relative[] }) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('remaining');
  const { t } = useTranslation();

  const totalForecast = data.reduce((s, r) => s + r.forecast, 0);
  const totalGiven = data.reduce((s, r) => s + r.given, 0);
  const totalRemaining = totalForecast - totalGiven;

  const filteredAndSorted = useMemo(() => {
    let filtered = data.filter(
      r =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.relation.toLowerCase().includes(search.toLowerCase())
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'forecast':
          return b.forecast - a.forecast;
        case 'given':
          return b.given - a.given;
        case 'remaining':
          return b.forecast - b.given - (a.forecast - a.given);
        default:
          return 0;
      }
    });

    return filtered;
  }, [data, search, sortBy]);

  return (
    <BackgroundWrapper images={['/assets/Amman4.png']}>
      <div className="min-h-screen p-3 sm:p-5">
        <h1 className="text-2xl sm:text-3xl font-serif mb-2">
          🤝 {t('relativesTitle')}
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 mb-4 sm:mb-6">
          {t('relativesSubtitle')}
        </p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
            <div className="text-xs text-slate-500 mb-1">{t('totalForecast')}</div>
            <div className="text-lg font-semibold text-indigo-700">
              ₹{formatINR(totalForecast)}
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
            <div className="text-xs text-slate-500 mb-1">{t('totalGiven')}</div>
            <div className="text-lg font-semibold text-green-700">
              ₹{formatINR(totalGiven)}
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
            <div className="text-xs text-slate-500 mb-1">{t('totalRemaining')}</div>
            <div className="text-lg font-semibold text-red-700">
              ₹{formatINR(totalRemaining)}
            </div>
          </div>
        </div>

        {/* Search and Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <input
            type="text"
            placeholder={t('searchRelatives')}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as SortOption)}
            className="w-full sm:w-48 px-4 py-2 rounded-lg border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            <option value="remaining">{t('sortRemaining')}</option>
            <option value="forecast">{t('sortForecast')}</option>
            <option value="given">{t('sortGiven')}</option>
            <option value="name">{t('sortName')}</option>
          </select>
        </div>

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-4
          "
        >
          {filteredAndSorted.map((r, i) => {
            const remaining = r.forecast - r.given;
            const progress = r.forecast > 0 ? (r.given / r.forecast) * 100 : 0;
            return (
              <div
                key={i}
                className="
                  bg-white rounded-xl p-4 shadow-sm
                  border border-slate-200 hover:shadow-md transition
                "
              >
                <h3 className="font-semibold text-slate-800 truncate mb-1">
                  {r.name}
                </h3>
                <p className="text-xs text-slate-500 mb-3">
                  {r.relation}
                </p>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">{t('forecast')}:</span>
                    <span className="font-semibold text-slate-800">
                      ₹{formatINR(r.forecast)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">{t('given')}:</span>
                    <span className="font-semibold text-green-700">
                      ₹{formatINR(r.given)}
                    </span>
                  </div>
                  {remaining > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">{t('remaining')}:</span>
                      <span className="font-semibold text-red-700">
                        ₹{formatINR(remaining)}
                      </span>
                    </div>
                  )}
                </div>

                {r.forecast > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-200">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span>{t('progress')}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          progress >= 100
                            ? 'bg-green-500'
                            : progress >= 50
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredAndSorted.length === 0 && (
          <p className="mt-10 text-center text-slate-500 text-sm">
            {search ? t('noMatches') : t('noData')}
          </p>
        )}
      </div>
    </BackgroundWrapper>
  );
}
