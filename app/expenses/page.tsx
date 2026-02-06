import { loadExpensesData } from '@/lib/loadPangaliData';
import ExpensesClient from '@/components/ExpensesClient';

export default async function ExpensesPage() {
  const data = await loadExpensesData();
  return <ExpensesClient data={data} />;
}


