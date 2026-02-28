'use client';

import { useMemo, useState } from 'react';
import PangaliCard from '@/components/PangaliCard';
import PangaliTable from '@/components/PangaliTable';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import PrintButton from '@/components/PrintButton';
import type { Pangali } from '@/lib/loadPangaliData';
import { useTranslation } from '@/hooks/useTranslation';

type StatusFilter = 'ALL' | 'COMPLETED' | 'PARTIAL' | 'YET_TO_GIVE';

export default function PangaliClient({ data }: { data: Pangali[] }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<StatusFilter>('ALL');
  const { t } = useTranslation();

  const filteredData = useMemo(() => {
    return data
      .filter(p => {
        const matchesSearch = p.name
          .toLowerCase()
          .includes(search.toLowerCase());

        let status: StatusFilter;
        if (p.balance === 0) status = 'COMPLETED';
        else if (p.paid === 0) status = 'YET_TO_GIVE';
        else status = 'PARTIAL';

        const matchesFilter =
          filter === 'ALL' || filter === status;

        return matchesSearch && matchesFilter;
      })
      .sort((a, b) => {
        // Sort by highest pending balance first (most urgent)
        if (b.balance !== a.balance) {
          return b.balance - a.balance;
        }
        // Then by name for consistency
        return a.name.localeCompare(b.name);
      });
  }, [data, search, filter]);

  return (
    <BackgroundWrapper images={['/assets/murugan.jpg']}>
      <div className="min-h-screen p-3 sm:p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
          <h1 className="text-2xl sm:text-3xl font-serif">
            👥 {t('pangaliTitle')}
          </h1>
          <div className="no-print">
            <PrintButton />
          </div>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5 no-print">
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 rounded-lg border border-slate-300
                       text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          />

          <select
            value={filter}
            onChange={e => setFilter(e.target.value as StatusFilter)}
            className="w-full sm:w-48 px-4 py-2 rounded-lg border border-slate-300
                       text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            <option value="ALL">{t('filterAll')}</option>
            <option value="COMPLETED">{t('filterCompleted')}</option>
            <option value="PARTIAL">{t('filterPartial')}</option>
            <option value="YET_TO_GIVE">{t('filterYetToGive')}</option>
          </select>
        </div>

        {/* Table */}
        <details className="mb-6 print:block" open>
          <summary className="cursor-pointer font-medium text-blue-900 no-print">
            📊 {t('viewTable')}
          </summary>
          <div className="mt-4">
            <PangaliTable data={filteredData} />
          </div>
        </details>

        {/* Tiles */}
        <div className="
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4
        ">
          {filteredData.map((p, i) => (
            <PangaliCard key={i} data={p} />
          ))}
        </div>

        {filteredData.length === 0 && (
          <p className="mt-10 text-center text-slate-700 text-sm">
            {t('filterAll')} {/* No matches found - can add to translations if needed */}
          </p>
        )}
      </div>
    </BackgroundWrapper>
  );
}
