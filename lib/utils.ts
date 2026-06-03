/**
 * Sovereign shared utility functions
 * Single source of truth — import from here instead of copy-pasting.
 */

/**
 * Format a Turkish Lira amount into a human-readable string.
 * e.g. 2_500_000 → "2.50 Milyon ₺"
 */
export function formatCurrency(val: number): string {
  if (!isFinite(val) || isNaN(val)) return '—';
  if (val >= 1e9) return (val / 1e9).toFixed(2) + ' Milyar ₺';
  if (val >= 1e6) return (val / 1e6).toFixed(2) + ' Milyon ₺';
  if (val >= 1e3) return (val / 1e3).toFixed(0) + 'K ₺';
  return val.toLocaleString('tr-TR') + ' ₺';
}

/**
 * Clamp a number between min and max (inclusive).
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Truncate a string to maxLength characters, appending "…" if truncated.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '…';
}
