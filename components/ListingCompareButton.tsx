'use client';

import { useCompare } from '@/hooks/useCompare';
import { GitCompare, Check } from 'lucide-react';

interface Props {
  listingId: string;
}

export default function ListingCompareButton({ listingId }: Props) {
  const { addToCompare, removeFromCompare, isInCompare, canAdd } = useCompare();
  const inCompare = isInCompare(listingId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompare) {
      removeFromCompare(listingId);
    } else if (canAdd) {
      addToCompare(listingId);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={!inCompare && !canAdd}
      title={
        inCompare
          ? 'Karşılaştırmadan Çıkar'
          : canAdd
          ? 'Karşılaştırmaya Ekle'
          : 'Maksimum 3 ilan seçebilirsiniz'
      }
      className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase transition-all border ${
        inCompare
          ? 'bg-[#00C49F] border-[#00C49F] text-white shadow-lg shadow-[#00C49F]/20'
          : canAdd
          ? 'bg-white border-gray-200 text-gray-400 hover:border-[#00C49F] hover:text-[#00C49F]'
          : 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed'
      }`}
    >
      {inCompare ? (
        <>
          <Check size={10} />
          Seçildi
        </>
      ) : (
        <>
          <GitCompare size={10} />
          Karşılaştır
        </>
      )}
    </button>
  );
}
