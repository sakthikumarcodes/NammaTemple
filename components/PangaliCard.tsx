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

  // ✅ Professional, subtle colors for badge
  const statusColor =
    status === 'Completed'
      ? 'bg-green-100 text-green-800 border-green-300'
      : status === 'Yet to Give'
      ? 'bg-red-100 text-red-800 border-red-300'
      : 'bg-yellow-100 text-yellow-800 border-yellow-300';

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
          {/* Status indicator dot */}
          <div
            className={`h-2 w-2 rounded-full flex-shrink-0 ${
              status === 'Completed'
                ? 'bg-green-500'
                : status === 'Yet to Give'
                ? 'bg-red-500'
                : 'bg-yellow-500'
            }`}
          />
          <h3 className="text-sm font-semibold text-slate-800 truncate">
            {data.name}
          </h3>
        </div>

        <span
          className={`
            text-xs px-2.5 py-0.5 rounded-full border
            whitespace-nowrap flex-shrink-0 ${statusColor}
          `}
        >
          {status}
        </span>
      </div>

      {/* Expanded details */}
      {open && (
        <div className="mt-3 space-y-1 text-sm text-slate-600">
          <p>
            <span className="font-medium">ஊர்:</span> {data.place}
          </p>
          <p>
            <span className="font-medium">உறுதி:</span>{' '}
            ₹{formatINR(data.committed)}
          </p>
          <p>
            <span className="font-medium">கொடுத்தது:</span>{' '}
            ₹{formatINR(data.paid)}
          </p>
          <p className="font-semibold text-red-700">
            மீதம்: ₹{formatINR(data.balance)}
          </p>
        </div>
      )}
    </div>
  );
}
