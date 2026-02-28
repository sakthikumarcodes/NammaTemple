import type { Pangali } from '@/lib/loadPangaliData';
import { formatINR } from '@/lib/formatINR';

export default function PangaliTable({ data }: { data: Pangali[] }) {
  return (
    <div className="rounded-xl border border-yellow-600/30 overflow-hidden bg-white/95">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[400px]">
          <thead className="bg-amber-100 text-xs sm:text-sm">
            <tr>
              <th className="p-2 sm:p-3 text-left text-slate-900 font-semibold">பெயர்</th>
              <th className="p-2 sm:p-3 text-right text-slate-900 font-semibold">கொடுத்தது</th>
              <th className="p-2 sm:p-3 text-right text-slate-900 font-semibold">மீதம்</th>
            </tr>
          </thead>

          <tbody>
            {data.map((p, index) => (
              <tr key={index} className="border-t border-slate-200 text-sm sm:text-base">
                <td className="p-2 sm:p-3 font-medium text-slate-900">{p.name}</td>
                <td className="p-2 sm:p-3 text-right text-slate-800">
                  ₹{formatINR(p.paid)}
                </td>
                <td className="p-2 sm:p-3 text-right text-red-900 font-medium">
                  ₹{formatINR(p.balance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
