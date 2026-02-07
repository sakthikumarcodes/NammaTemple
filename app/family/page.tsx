import { loadFamilyData } from '@/lib/loadFamilyData';
import FamilyTreeClient from '@/components/FamilyTreeClient';

export default async function FamilyPage() {
  const data = await loadFamilyData();
  return <FamilyTreeClient data={data} />;
}

