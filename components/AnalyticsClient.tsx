'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import type { Pangali } from '@/lib/loadPangaliData';

export default function AnalyticsClient({ data }: { data: Pangali[] }) {
  /* ======================
     AGGREGATIONS
  ====================== */

  const totalCommitted = data.reduce((s, d) => s + d.committed, 0);
  const totalPaid = data.reduce((s, d) => s + d.paid, 0);
  const totalBalance = totalCommitted - totalPaid;

  /* ======================
     STATUS CLASSIFICATION
  ====================== */

  const completed = data.filter(p => p.balance === 0);
  const yetToGive = data.filter(p => p.paid === 0 && p.balance > 0);
  const partial = data.filter(p => p.paid > 0 && p.balance > 0);

  /* ======================
     CHART DATA
  ====================== */

  // Overall bar
  const barData = [
    { name: 'உறுதி', value: totalCommitted },
    { name: 'பெறப்பட்டது', value: totalPaid },
  ];

  // Status pie
  const statusPieData = [
    { name: 'முடிந்தது', value: completed.length },
    { name: 'பகுதி', value: partial.length },
    { name: 'இன்னும் வழங்கவில்லை', value: yetToGive.length },
  ];

  // Person-wise pending pie (TOP 8 + Others)
  const pendingPeople = data
    .filter(p => p.balance > 0)
    .sort((a, b) => b.balance - a.balance);

  const topPending = pendingPeople.slice(0, 8);
  const othersPending = pendingPeople.slice(8);

  const pendingPieData = [
    ...topPending.map(p => ({
      name: p.name,
      value: p.balance,
    })),
    ...(othersPending.length > 0
      ? [
          {
            name: 'மற்றவர்கள்',
            value: othersPending.reduce((s, p) => s + p.balance, 0),
          },
        ]
      : []),
  ];

  /* ======================
     COLORS
  ====================== */

  const STATUS_COLORS = ['#16a34a', '#facc15', '#dc2626'];
  const PENDING_COLORS = [
    '#dc2626',
    '#ef4444',
    '#f97316',
    '#fb7185',
    '#f59e0b',
    '#f87171',
    '#fdba74',
    '#fecaca',
    '#9ca3af',
  ];

  return (
    <BackgroundWrapper images={['/assets/temple.jpeg']}>
      <div className="p-5">
        <h1 className="text-3xl font-serif mb-6">
          📊 நிதி பகுப்பாய்வு
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ================= BAR CHART ================= */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-lg font-semibold mb-4">
              உறுதி vs பெறப்பட்டது
            </h2>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#334155" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ================= STATUS PIE ================= */}
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-lg font-semibold mb-4">
              பங்காளிகள் நிலை
            </h2>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusPieData}
                    dataKey="value"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={4}
                  >
                    {statusPieData.map((_, i) => (
                      <Cell key={i} fill={STATUS_COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ================= PERSON-WISE PENDING ================= */}
          <div className="bg-white rounded-xl shadow-sm p-5 lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4">
              பங்காளி வாரியான நிலுவை தொகை (Pending)
            </h2>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pendingPieData}
                    dataKey="value"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={2}
                  >
                    {pendingPieData.map((_, i) => (
                      <Cell
                        key={i}
                        fill={PENDING_COLORS[i % PENDING_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend layout="horizontal" />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              * Top 8 நிலுவை தொகை கொண்டவர்கள் தனியாக காட்டப்படுகின்றனர்
            </p>
          </div>

        </div>
      </div>
    </BackgroundWrapper>
  );
}
