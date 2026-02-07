import { loadExpensesData } from '@/lib/loadPangaliData';
import ExpensesClient from '@/components/ExpensesClient';
import { Suspense } from 'react';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import ErrorDisplay from '@/components/ErrorDisplay';

export default async function ExpensesPage() {
  try {
    const data = await loadExpensesData();
    return (
      <Suspense fallback={<LoadingSkeleton />}>
        <ExpensesClient data={data} />
      </Suspense>
    );
  } catch (error) {
    return (
      <ErrorDisplay
        message={
          error instanceof Error
            ? error.message
            : 'An error occurred while loading expenses data'
        }
      />
    );
  }
}



