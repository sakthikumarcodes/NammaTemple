'use client';

import { useState } from 'react';
import type { Pangali } from '@/lib/loadPangaliData';
import { formatINR } from '@/lib/formatINR';

export default function PangaliCard({ data }: { data: Pangali }) {
  const [open, setOpen] = useState(false);

  // ✅ Correct business logic
  let status: 'Completed' | 'Partial' | 'Yet to Give';

  if (data.balance === 0) {
    status = 'Completed';
  } else if (data.paid === 0) {
    status = 'Yet to Give';
  } else {
    status = 'Partial';
  }

  // High-contrast colors for badge (mobile readability)
  const statusColor =
    status === 'Completed'
      ? 'bg-green-200 text-green-900 border-green-400'
      : status === 'Yet to Give'
      ? 'bg-red-200 text-red-900 border-red-400'
      : 'bg-amber-200 text-amber-900 border-amber-400';

  // ✅ Colorful card backgrounds based on status
  const cardBg =
    status === 'Completed'
      ? 'bg-green-50 border-green-200 hover:bg-green-100'
      : status === 'Yet to Give'
      ? 'bg-red-50 border-red-200 hover:bg-red-100'
      : 'bg-amber-50 border-amber-200 hover:bg-amber-100';

  return (
    <div
      onClick={() => setOpen(!open)}
      className={`
        rounded-xl
        border-2
        ${cardBg}
        p-4
        shadow-sm
        hover:shadow-md
        transition-all
        cursor-pointer
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {/* Status indicator dot - only show if not completed */}
          {status !== 'Completed' && (
            <div
              className={`h-2 w-2 rounded-full flex-shrink-0 ${
                status === 'Yet to Give'
                  ? 'bg-red-500'
                  : 'bg-yellow-500'
              }`}
            />
          )}
          <h3 className="text-sm font-semibold text-slate-900 truncate">
            {data.name}
          </h3>
        </div>

        {/* Status badge - only show if not completed */}
        {status !== 'Completed' && (
          <span
            className={`
              text-xs px-2.5 py-0.5 rounded-full border
              whitespace-nowrap flex-shrink-0 ${statusColor}
            `}
          >
            {status}
          </span>
        )}
      </div>

      {/* Expanded details - dark text for mobile readability */}
      {open && (
        <div className="mt-3 space-y-1 text-sm text-slate-800">
          <p>
            <span className="font-medium text-slate-900">ஊர்:</span> {data.place}
          </p>
          <p>
            <span className="font-medium text-slate-900">உறுதி:</span>{' '}
            ₹{formatINR(data.committed)}
          </p>
          <p>
            <span className="font-medium text-slate-900">கொடுத்தது:</span>{' '}
            ₹{formatINR(data.paid)}
          </p>
          <p className="font-semibold text-red-900">
            மீதம்: ₹{formatINR(data.balance)}
          </p>
        </div>
      )}
    </div>
  );
}
