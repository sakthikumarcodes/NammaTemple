import { loadExpensesData, loadPangaliData } from '@/lib/loadPangaliData';
import HomePageClient from '@/components/HomePageClient';

export default async function HomePage() {
  const [data, expenses] = await Promise.all([loadPangaliData(), loadExpensesData()]);

  const totalCommitted = data.reduce((s, d) => s + d.committed, 0);
  const totalPaid = data.reduce((s, d) => s + d.paid, 0);
  const totalBalance = totalCommitted - totalPaid; // Pending from committed
  const totalForecastExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const overallPending = totalForecastExpenses - totalPaid; // Overall pending: Forecast - Paid
  const overallProgress = totalForecastExpenses ? Math.min(1, totalPaid / totalForecastExpenses) : 0;

  return (
    <HomePageClient
      totalCommitted={totalCommitted}
      totalPaid={totalPaid}
      totalBalance={totalBalance}
      totalForecastExpenses={totalForecastExpenses}
      overallPending={overallPending}
      overallProgress={overallProgress}
    />
  );
}
