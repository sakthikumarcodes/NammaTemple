import { loadPangaliData } from '@/lib/loadPangaliData';
import AnalyticsClient from '@/components/AnalyticsClient';

export default async function AnalyticsPage() {
  const data = await loadPangaliData();
  return <AnalyticsClient data={data} />;
}
