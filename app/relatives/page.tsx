import { loadRelativesData } from '@/lib/loadPangaliData';
import RelativesClient from '@/components/RelativesClient';

export default async function RelativesPage() {
  const data = await loadRelativesData();
  return <RelativesClient data={data} />;
}
