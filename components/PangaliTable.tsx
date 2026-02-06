import type { Pangali } from '@/lib/loadPangaliData';
import { formatINR } from '@/lib/formatINR';

export default function PangaliTable({ data }: { data: Pangali[] }) {
  return (
    <div className="rounded-xl border border-yellow-600/30 overflow-hidden bg-white/90">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[400px]">
          <thead className="bg-yellow-50 text-xs sm:text-sm">
            <tr>
              <th className="p-2 sm:p-3 text-left">பெயர்</th>
              <th className="p-2 sm:p-3 text-right">கொடுத்தது</th>
              <th className="p-2 sm:p-3 text-right">மீதம்</th>
            </tr>
          </thead>

          <tbody>
            {data.map((p, index) => (
              <tr key={index} className="border-t text-sm sm:text-base">
                <td className="p-2 sm:p-3 font-medium">{p.name}</td>
                <td className="p-2 sm:p-3 text-right">
                  ₹{formatINR(p.paid)}
                </td>
                <td className="p-2 sm:p-3 text-right text-red-700">
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
