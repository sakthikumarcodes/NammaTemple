import { loadPangaliData } from '@/lib/loadPangaliData';
import PangaliClient from '@/components/PangaliClient';

export default async function PangaliPage() {
  const data = await loadPangaliData();
  return <PangaliClient data={data} />;
}
