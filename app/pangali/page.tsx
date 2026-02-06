import { loadPangaliData } from '@/lib/loadPangaliData';
import PangaliClient from '@/components/PangaliClient';

export default function PangaliPage() {
  const data = loadPangaliData();
  return <PangaliClient data={data} />;
}
