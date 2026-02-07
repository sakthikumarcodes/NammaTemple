'use client';

import { useTranslation } from '@/hooks/useTranslation';

export default function PrintButton() {
  const { t } = useTranslation();

  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition text-sm font-medium flex items-center gap-2"
    >
      <span>🖨️</span>
      <span>{t('print')}</span>
    </button>
  );
}

