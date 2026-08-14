'use client';

import { useState, useEffect } from 'react';
import { StickyNote } from 'lucide-react';

const STORAGE_KEY = 'sbd_listing_notes';

interface Props {
  listingId: string;
}

export default function ListingNoteIndicator({ listingId }: Props) {
  const [hasNote, setHasNote] = useState(false);

  useEffect(() => {
    try {
      const notes = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
      setHasNote(!!notes[listingId]);
    } catch {
      setHasNote(false);
    }
  }, [listingId]);

  if (!hasNote) return null;

  return (
    <span title="Bu ilana not eklediniz" className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-100">
      <StickyNote size={9} /> NOT
    </span>
  );
}
