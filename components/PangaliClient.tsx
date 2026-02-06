'use client';

import { useMemo, useState } from 'react';
import PangaliCard from '@/components/PangaliCard';
import PangaliTable from '@/components/PangaliTable';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import type { Pangali } from '@/lib/loadPangaliData';

type StatusFilter = 'ALL' | 'COMPLETED' | 'PARTIAL' | 'YET_TO_GIVE';

export default function PangaliClient({ data }: { data: Pangali[] }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<StatusFilter>('ALL');

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
        <h1 className="text-2xl sm:text-3xl font-serif mb-3 sm:mb-4">
          👥 பங்காளிகள் – திருக்கொடை நிலை
        </h1>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <input
            type="text"
            placeholder="பெயரை தேடவும்…"
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
            <option value="ALL">அனைத்தும்</option>
            <option value="COMPLETED">முடிந்தது</option>
            <option value="PARTIAL">பகுதி</option>
            <option value="YET_TO_GIVE">இன்னும் வழங்கவில்லை</option>
          </select>
        </div>

        {/* Table */}
        <details className="mb-6">
          <summary className="cursor-pointer font-medium text-blue-700">
            📊 ஒருங்கிணைந்த பார்வை (Table View)
          </summary>
          <div className="mt-4">
            <PangaliTable data={filteredData} />
          </div>
        </details>

        {/* Tiles */}
        <div className="
          grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4
        ">
          {filteredData.map((p, i) => (
            <PangaliCard key={i} data={p} />
          ))}
        </div>

        {filteredData.length === 0 && (
          <p className="mt-10 text-center text-slate-500 text-sm">
            பொருந்தும் பதிவுகள் இல்லை
          </p>
        )}
      </div>
    </BackgroundWrapper>
  );
}
