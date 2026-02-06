'use client';

import { useState } from 'react';
import type { Pangali } from '@/lib/loadPangaliData';

export default function PangaliCard({ data }: { data: Pangali }) {
  const [open, setOpen] = useState(false);

  // ✅ Correct business logic
  let status: 'Completed' | 'Partial' | 'Yet to Give';

  // If both committed and paid are 0, show "Yet to Give"
  if (data.committed === 0 && data.paid === 0) {
    status = 'Yet to Give';
  } else if (data.balance === 0) {
    status = 'Completed';
  } else if (data.paid === 0) {
    status = 'Yet to Give';
  } else {
    status = 'Partial';
  }

  // ✅ Professional, subtle colors
  const statusColor =
    status === 'Completed'
      ? 'bg-green-50 text-green-700 border-green-200'
      : status === 'Yet to Give'
      ? 'bg-red-50 text-red-700 border-red-200'
      : 'bg-yellow-50 text-yellow-700 border-yellow-200';

  return (
    <div
      onClick={() => setOpen(!open)}
      className="
        rounded-xl
        border border-slate-200
        bg-white
        p-4
        shadow-sm
        hover:shadow-md
        transition
        cursor-pointer
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-slate-800 truncate">
          {data.name}
        </h3>

        <span
          className={`
            text-xs px-2.5 py-0.5 rounded-full border
            whitespace-nowrap ${statusColor}
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
            ₹{data.committed.toLocaleString()}
          </p>
          <p>
            <span className="font-medium">கொடுத்தது:</span>{' '}
            ₹{data.paid.toLocaleString()}
          </p>
          <p className="font-semibold text-red-700">
            மீதம்: ₹{data.balance.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}
