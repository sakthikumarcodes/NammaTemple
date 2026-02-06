import { loadPangaliData } from '@/lib/loadPangaliData';
import AnalyticsClient from '@/components/AnalyticsClient';

export default function AnalyticsPage() {
  const data = loadPangaliData();
  return <AnalyticsClient data={data} />;
}
