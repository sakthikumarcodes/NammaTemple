import { loadPangaliData } from '@/lib/loadPangaliData';
import PangaliClient from '@/components/PangaliClient';
import { Suspense } from 'react';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import ErrorDisplay from '@/components/ErrorDisplay';

export default async function PangaliPage() {
  try {
    const data = await loadPangaliData();
    return (
      <Suspense fallback={<LoadingSkeleton />}>
        <PangaliClient data={data} />
      </Suspense>
    );
  } catch (error) {
    return (
      <ErrorDisplay
        message={
          error instanceof Error
            ? error.message
            : 'An error occurred while loading pangali data'
        }
      />
    );
  }
}
