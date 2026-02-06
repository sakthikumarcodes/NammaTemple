import type { Pangali } from '@/lib/loadPangaliData';

export default function PangaliTable({ data }: { data: Pangali[] }) {
  return (
    <div className="rounded-xl border border-yellow-600/30 overflow-hidden bg-white/90">
      <table className="w-full">
        <thead className="bg-yellow-50 text-sm">
          <tr>
            <th className="p-3 text-left">பெயர்</th>
            <th className="p-3 text-right">கொடுத்தது</th>
            <th className="p-3 text-right">மீதம்</th>
          </tr>
        </thead>

        <tbody>
          {data.map((p, index) => (
            <tr key={index} className="border-t text-base">
              <td className="p-3 font-medium">{p.name}</td>
              <td className="p-3 text-right">
                ₹{p.paid.toLocaleString()}
              </td>
              <td className="p-3 text-right text-red-700">
                ₹{p.balance.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
