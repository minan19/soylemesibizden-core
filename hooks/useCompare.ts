'use client';

import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'sovereign_compare_ids';
const MAX_COMPARE = 3;

export function useCompare() {
  const [compareIds, setCompareIds] = useState<string[]>([]);

  // LocalStorage'dan yükle — validate each entry is a non-empty string ≤36 chars
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const safe = parsed.filter(
            (v): v is string => typeof v === 'string' && v.length > 0 && v.length <= 36
          );
          setCompareIds(safe);
        }
      }
    } catch { /* ignore */ }
  }, []);

  // LocalStorage'a kaydet
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(compareIds));
    } catch { /* ignore */ }
  }, [compareIds]);

  const addToCompare = useCallback((id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev;
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, id];
    });
  }, []);

  const removeFromCompare = useCallback((id: string) => {
    setCompareIds((prev) => prev.filter((x) => x !== id));
  }, []);

  const clearCompare = useCallback(() => setCompareIds([]), []);

  const isInCompare = useCallback((id: string) => compareIds.includes(id), [compareIds]);

  const canAdd = compareIds.length < MAX_COMPARE;

  return { compareIds, addToCompare, removeFromCompare, clearCompare, isInCompare, canAdd, count: compareIds.length };
}
