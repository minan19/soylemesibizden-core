'use client';

import { useEffect } from 'react';
import { recordView, type RecentItem } from './RecentlyViewed';

export default function RecordView({ item }: { item: RecentItem }) {
  useEffect(() => {
    recordView(item);
  }, [item.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
